#!/usr/bin/env python3
"""Generate cover images for posts missing `cover:` via AUTOMATIC1111 txt2img.

Writes PNGs into IMAGES_REPO/blog-media and stamps `cover:` frontmatter
with the statically.io CDN URL. Idempotent: skips posts with a cover.

Env vars:
  SD_API_URL   A1111 API base (default http://localhost:7860)
  IMAGES_REPO  path to images.pype.dev clone (required)
  PAGES_DIR    content root (default pages)
  SD_MODEL     checkpoint override for all posts (default: tag map, else revAnimated)
  OLLAMA_URL   ollama API (default http://localhost:11434)
  OLLAMA_MODEL prompt-writing model (default llama3.2); unset to skip LLM prompts

Flags:
  --dry-run     print prompts, write nothing
  --limit N     only process N posts
  --slug STR    only posts whose filename contains STR
  --tag TAG     only posts with TAG
  --preview DIR write PNGs to DIR named <slug>.png, no frontmatter/repo writes
  --type TKEY   only posts with templateKey: TKEY (e.g. dailyNote, til, thoughts)
  --force       regenerate posts that already have cover: (requires --slug, --tag, or --type)
"""

import base64
import hashlib
import json
import os
import re
import sys
import time
import urllib.request
from datetime import datetime
from pathlib import Path

SD_API_URL = os.environ.get("SD_API_URL", "http://localhost:7860")
OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434")
OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "llama3.2")
IMAGES_REPO = Path(os.environ["IMAGES_REPO"]) if "IMAGES_REPO" in os.environ else None
PAGES_DIR = Path(os.environ.get("PAGES_DIR", "pages"))
CDN = "https://raw.githubusercontent.com/pypeaday/images.pype.dev/main/blog-media/"

STYLE = (
    "abstract cinematic cover art, atmospheric composition, "
    "deep shadows with volumetric light, muted dark palette with subtle "
    "mint and amber accents, symbolic visual metaphor, matte painting, "
    "wide panoramic banner, high detail"
)
NEGATIVE = os.environ.get(
    "NEGATIVE",
    "people, person, human, face, portrait, body, figure, silhouette, "
    "animal, creature, text, letters, logo, watermark, blurry, lowres, "
    "noisy, grainy, oversharpened, deformed, distorted, artifacts",
)
WIDTH, HEIGHT, STEPS, CFG = 1024, 512, 30, 8

DEFAULT_MODEL = os.environ.get("SD_MODEL", "revAnimated")
# tag -> checkpoint; MODEL_TAGS order = precedence (earlier wins);
# SD_MODEL env overrides for all
TAG_MODEL = {
    "advent": "modernDisneyXL",
    "faith": "modernDisneyXL",
    "sermon": "modernDisneyXL",
    "mens-group": "revAnimated",
}
MODEL_TAGS = ["mens-group", "advent", "faith", "sermon"]

# style rules per templateKey (fallback: abstract cinematic)
TYPE_RULES = {
    "dailyNote": "quiet intimate illustration, cozy personal journal mood, "
                 "a single warm lamp-lit scene, small vignette composition, "
                 "soft textures, muted palette with amber glow, no people, "
                 "no text, no letters. ",
    "til": "minimal technical illustration, clean schematic linework, "
           "diagram aesthetic, precise geometric objects, dark background "
           "with mint accent lines, no people, no text, no letters. ",
    "thoughts": "contemplative surreal landscape, dreamlike symbolism, "
                "vast scale with a single focal object, soft volumetric "
                "light, muted dark palette, no people, no text, no letters. ",
    "note": "calm illustrative scene, gentle composition, soft natural "
            "light, muted palette with mint and amber accents, no people, "
            "no text, no letters. ",
}

# activation keywords per checkpoint (substring match on model name)
MODEL_TRIGGERS = {
    "disney": "modisn disney",
    "modi": "modisn disney",
    "anything-v3": "masterpiece, best quality",
    "inkpunk": "nvinkpunk",
    "synthwavepunk": "synthwave, retrowave",
    "3danimation": "3d render, pixar style",
    "harrypotter": "harry potter style",
    "rpg": "rpg game art",
    "sympony": "pony",
    "toonyou": "toonyou",
}

# lighter negative for illustration models that handle subjects well
MODEL_NEGATIVE = {
    "disney": "portrait, close-up, text, watermark, logo, blurry, lowres, noisy, deformed, distorted",
    "modi": "portrait, close-up, text, watermark, logo, blurry, lowres, noisy, deformed, distorted",
}

FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.S)
COVER_RE = re.compile(r"^cover\s*:\s*(.*)$", re.M)
PERSON_RE = re.compile(
    r"\b(people|person|human|man|woman|men|women|face|hand|body|figure|"
    r"silhouette|historian|student|worker|child|girl|boy|crowd)\b", re.I
)
REFUSAL_RE = re.compile(
    r"i can'?t|i cannot|cannot provide|can'?t provide|can'?t assist|cannot assist|"
    r"unable to|i'?m sorry|not able to|refus", re.I
)


def api(path, payload, retries=30):
    req = urllib.request.Request(
        f"{SD_API_URL}{path}", json.dumps(payload).encode(),
        {"Content-Type": "application/json"},
    )
    for i in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=600) as r:
                return json.loads(r.read())
        except urllib.error.HTTPError as e:
            if e.code != 404 or i == retries - 1:
                raise
            time.sleep(2)  # checkpoint swap in progress


def frontmatter(text):
    m = FM_RE.match(text)
    return m.group(1) if m else None


def field(fm, key):
    m = re.search(rf"^{key}[ \t]*:[ \t]*(.*)$", fm, re.M)
    if not m:
        return ""
    v = m.group(1).strip().strip('"').strip("'")
    if v:
        return v.strip("[]")
    items = []
    for line in fm[m.end() :].splitlines():
        lm = re.match(r"^[ \t]+-[ \t]+(.*)$", line)
        if lm:
            items.append(lm.group(1).strip().strip('"').strip("'"))
        elif line.strip():
            break
    return ", ".join(items)


def stamp(path, url):
    text = path.read_text()
    m = FM_RE.match(text)
    fm = m.group(1)
    new_line = f'cover: "{url}"'
    if COVER_RE.search(fm):
        fm_new = COVER_RE.sub(new_line, fm)
    else:
        fm_new = fm.rstrip("\n") + "\n" + new_line
    path.write_text(text[: m.start(1)] + fm_new + text[m.end(1) :])


def set_model(name):
    with urllib.request.urlopen(f"{SD_API_URL}/sdapi/v1/sd-models", timeout=30) as r:
        titles = [m["title"] for m in json.loads(r.read())]
    cands = [t for t in titles if name in t]
    match = next((t for t in cands if "inpaint" not in t.lower()), cands[0] if cands else None)
    if not match:
        sys.exit(f"model {name} not found; available: {titles}")
    api("/sdapi/v1/options", {"sd_model_checkpoint": match})
    print(f"loading {match}...")
    for _ in range(60):
        with urllib.request.urlopen(f"{SD_API_URL}/sdapi/v1/options", timeout=10) as r:
            cur = json.loads(r.read()).get("sd_model_checkpoint") or ""
        if match.split(" ")[0] in cur:
            return match
        time.sleep(2)
    print("warn: model switch not confirmed, proceeding anyway")
    return match


def prompt_for(path, disney=False, template_key=""):
    text = path.read_text()
    fm = frontmatter(text) or ""
    title = field(fm, "title") or path.stem.replace("-", " ")
    desc = field(fm, "description")
    tags = field(fm, "tags").strip("[]")
    if OLLAMA_MODEL:
        body = FM_RE.sub("", text, count=1)[:2000]
        try:
            return llm_prompt(title, desc, tags, body, disney=disney,
                              template_key=template_key)
        except Exception as e:
            print(f"  llm fallback ({e})")
    parts = ", ".join(p for p in (title, desc, tags) if p)
    return f"{parts}, {STYLE}"


def llm_prompt(title, desc, tags, body, disney=False, template_key=""):
    rules = (
        "whimsical animated-film illustration, symbolic visual metaphor for "
        "the post's idea, expressive lighting, rich warm palette with "
        "teal and amber accents, wide establishing shot where architecture "
        "and landscape dominate the frame, any people or animals only as "
        "small incidental elements within the scene and never the focal "
        "point, no close-ups, no portraits, no text, no letters. "
        if disney else
        TYPE_RULES.get(
            template_key,
            "abstract cinematic matte painting, symbolic visual metaphor for "
            "the post's idea, atmospheric lighting, dark muted palette with "
            "subtle mint and amber accents, wide panoramic banner, no people, "
            "no figures, no faces, no hands, no animals, no text, no letters. "
            "Depict only objects, architecture, landscapes, light, weather, "
            "and symbolic structures. ",
        )
    )
    ask = (
        "Write a single Stable Diffusion image prompt for a blog cover.\n"
        f"Post title: {title}\nTags: {tags}\nDescription: {desc}\n"
        f"Post excerpt:\n{body}\n"
        f"Style rules: {rules}"
        "Reply with ONLY the comma-separated prompt phrases."
    )
    req = urllib.request.Request(
        f"{OLLAMA_URL}/api/generate",
        json.dumps({"model": OLLAMA_MODEL, "prompt": ask, "stream": False,
                    "keep_alive": "30s", "options": {"num_ctx": 2048}}).encode(),
        {"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        out = json.loads(r.read())["response"]
    out = re.sub(r"<think>.*?</think>", "", out, flags=re.S).strip().strip('"')
    out = out.encode("ascii", "ignore").decode()
    if len(out) > 400:
        out = out[:400].rsplit(",", 1)[0]
    suffix = "" if disney or template_key in TYPE_RULES else STYLE
    return f"{out}, {suffix}" if suffix and suffix not in out else out


def main():
    dry = "--dry-run" in sys.argv
    limit = int(sys.argv[sys.argv.index("--limit") + 1]) if "--limit" in sys.argv else None
    slug = sys.argv[sys.argv.index("--slug") + 1] if "--slug" in sys.argv else None
    tag = sys.argv[sys.argv.index("--tag") + 1] if "--tag" in sys.argv else None
    preview = Path(sys.argv[sys.argv.index("--preview") + 1]) if "--preview" in sys.argv else None
    tkey = sys.argv[sys.argv.index("--type") + 1] if "--type" in sys.argv else None
    force = "--force" in sys.argv
    if force and not (slug or tag or tkey):
        sys.exit("--force requires --slug, --tag, or --type")
    if not dry and not preview and not IMAGES_REPO:
        sys.exit("set IMAGES_REPO to a clone of images.pype.dev")
    cur = trigger = ""
    neg = NEGATIVE

    targets = []  # (path, model_name)
    for path in sorted(PAGES_DIR.rglob("*.md")):
        if slug and slug not in path.name:
            continue
        fm = frontmatter(path.read_text())
        if fm is None or (field(fm, "cover") and not force):
            continue
        tags = [t.strip() for t in field(fm, "tags").split(",") if t.strip()]
        if tag and tag not in tags:
            continue
        if tkey and field(fm, "templateKey") != tkey:
            continue
        model = DEFAULT_MODEL if os.environ.get("SD_MODEL") else next(
            (TAG_MODEL[t] for t in MODEL_TAGS if t in tags), DEFAULT_MODEL
        )
        targets.append((path, model))

    targets.sort(key=lambda t: t[1])
    print(f"{len(targets)} posts missing cover")
    done = 0
    for path, model_name in targets:
        if limit and done >= limit:
            break
        if not dry and model_name.split(" ")[0] not in cur:
            cur = set_model(model_name)
            trigger = next(
                (v for k, v in MODEL_TRIGGERS.items() if k in cur.lower()), ""
            )
            neg = next(
                (v for k, v in MODEL_NEGATIVE.items() if k in cur.lower()),
                NEGATIVE,
            )
        text = path.read_text()
        fm = frontmatter(text) or ""
        disney = "disney" in (cur or model_name).lower()
        tkey = field(fm, "templateKey")

        # dailyNotes share one cover per month: monthly-daily-YYYY-MM.png
        monthly = path.stem[:7] if (
            tkey == "dailyNote" and re.match(r"\d{4}-\d{2}", path.stem)
        ) else ""
        mfile = f"monthly-daily-{monthly}.png" if monthly else ""
        if monthly and not dry and not preview and (IMAGES_REPO / "blog-media" / mfile).exists():
            stamp(path, CDN + mfile)
            print(f"{path.name} -> {mfile} (shared)")
            done += 1
            continue

        prompt = prompt_for(path, disney=disney, template_key=tkey)
        if REFUSAL_RE.search(prompt):
            parts = ", ".join(p for p in (field(fm, "title"), field(fm, "description")) if p)
            prompt = f"{parts}, {STYLE}"
        if not disney and PERSON_RE.search(prompt):
            try:
                prompt = llm_prompt(
                    field(fm, "title"), field(fm, "description"),
                    field(fm, "tags"), FM_RE.sub("", text, count=1)[:2000],
                    template_key=tkey,
                )
            except Exception:
                pass
        if not disney and PERSON_RE.search(prompt):
            parts = ", ".join(p for p in (field(fm, "title"), field(fm, "description")) if p)
            prompt = f"{parts}, {STYLE}"
        if trigger:
            prompt = f"{trigger}, {prompt}"
        print(f"{path.name}: {prompt[:100]}...")
        if dry:
            done += 1
            continue

        ts = datetime.now().strftime("%Y%m%d%H%M%S")
        h = hashlib.sha1(f"{path}{prompt}".encode()).hexdigest()[:8]
        fname = mfile or f"{ts}_{h}.png"

        r = api("/sdapi/v1/txt2img", {
            "prompt": prompt, "negative_prompt": neg,
            "width": WIDTH, "height": HEIGHT, "steps": STEPS,
            "cfg_scale": CFG,
            "sampler_name": "DPM++ 2M SDE", "scheduler": "Karras",
        })
        png = base64.b64decode(r["images"][0])
        params_txt = (
            f"{prompt}\n\nNegative prompt: {neg}\n"
            f"Steps: {STEPS}, Size: {WIDTH}x{HEIGHT}, Model: {cur}\n"
        )
        if preview:
            preview.mkdir(parents=True, exist_ok=True)
            (preview / f"{path.stem}.png").write_bytes(png)
            (preview / f"{path.stem}.txt").write_text(params_txt)
            print(f"  -> {preview}/{path.stem}.png")
        else:
            (IMAGES_REPO / "blog-media").mkdir(parents=True, exist_ok=True)
            (IMAGES_REPO / "blog-media" / fname).write_bytes(png)
            (IMAGES_REPO / "blog-media" / f"{fname[:-4]}.txt").write_text(params_txt)
            stamp(path, CDN + fname)
            print(f"  -> {fname}")
        done += 1


if __name__ == "__main__":
    main()
