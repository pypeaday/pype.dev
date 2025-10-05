# Hey, this is the repo for my blog, pype.dev

This is where I keep all the source code, content, and configs for my personal blog, which you can read at [pype.dev](https://pype.dev). It's my little corner of the internet where I write about my homelab, tech, faith, and whatever else is on my mind.

## What's Going On In Here?

This site is built with a few key things I really enjoy using:

-   **[Markata](https://markata.dev/)**: I'm using this to build the site. It's a neat Python-based static site generator that lets me just write Markdown and it handles the rest. Super flexible.

-   **Password Protection**: I built a custom Markata plugin to password-protect some of my posts. It was a fun challenge getting the Python encryption on the backend to play nice with the client-side JavaScript for decryption.

-   **Private Post Obfuscation**: You might notice some `.b64` files in the `pages/private` directory. That's a little trick I'm using to keep private posts in the repo without GitHub's search snooping on them. The build process handles decoding and re-encoding automatically, which is pretty slick.

### How I Handle Private Posts

This is a bit of a weird workflow, but it works for me.

-   **To edit a private post**: I run `just decode-private`. This turns the `.b64` files in `pages/private/` back into readable `.md` files.
-   **When I'm done editing**: I run `just encode-private`. This encodes them back to `.b64` and deletes the markdown file.

> NOTE: decoding without saving and encoding first will blow away changes - so just be cautious of that in this pattern

The main `just build` command does this all for you, so I only run these manual commands when I actually need to change the content of a private post.

## A Quick Map of the Repo

```
.
├── Justfile             # All my command shortcuts live here
├── markata.toml         # The main config file for Markata
├── markout/             # Where the final static site gets built
├── pages/
│   ├── private/         # My secret, obfuscated posts (.b64)
│   └── ...              # All my public blog posts (.md)
├── static/
│   └── app.css          # The compiled Tailwind CSS
├── tailwind/
│   └── input.css        # The Tailwind source file
└── templates/           # My Jinja2 templates
```

## CI/CD

I've got a GitHub Actions workflow set up. Every time I push to `main`, it automatically builds and deploys the site. 
