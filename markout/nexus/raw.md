---
date: 2026-02-05 05:31:53
templateKey: project
title: Nexus
published: True
tags:
  - projects
  - organization
---

Nexus is a task tracker and second-brain for collaborating with AI agents on software development. It keeps project boards, task details, subtasks, daily notes, and Git worktree context together in one system.

## Why Nexus

I built Nexus because I work with AI agents across multiple parallel work streams and need a way to:

- Track what agents are working on and have them check-in regularly
- Capture lightweight memories without forcing everything to become executable work immediately
- Keep task-to-branch context when starting work
- Use daily notes inside the same system

## Architecture

```
Human
  |
  +-- Agent Harness (GitHub Copilot CLI)
  |     +-- Agents (orchestrator + specialists)
  |     +-- Platform hooks / commands
  |
  +-- nexus CLI (PEP 723 single-file script)
  |     |
  |     +-- Nexus API (FastAPI, port 8090)
  |           +-- Nexus DB (Postgres 16 + pgvector)
  |
  +-- Go TUI (primary interface)
  +-- Git (worktrees, branches)
```

## Components

### Core Stack

- **Nexus API** — FastAPI REST backend. Projects, tasks, tags, dependencies, comments, and global discoveries. Tasks flow through `backlog` → `wip` → `done` with first-class readiness (`is_ready`) and blocking (`is_blocked`) markers.
- **Nexus DB** — Postgres 16 with pgvector for vector storage (future AI memory features).
- **nexus CLI** — PEP 723 single-file Python script. All agent-to-Nexus communication goes through this. JSON output for agents, human-readable for humans.
- **Go TUI** — Terminal UI, the primary interface for dayFalse-to-day task management.

### Agent Integration

- **Copilot CLI plugin** (`copilot/`) — GitHub Copilot integration with custom skills:
  - `nexus` — Core task and lifecycle commands
  - `nexus-specialist` — Task-specific expertise
  - `nexus-delegation` — Delegation patterns
  - `daily-summary` — Daily progress summaries
- **Hooks** — Session lifecycle hooks that sync state between Nexus and agent sessions:
  - `session-start.sh` — Initialize worktree metadata
  - `session-end.sh` — Archive session state
  - `session-sync.sh` — Periodic checkpoint
  - Liveness probes for agent monitoring

### Task Lifecycle

```
start → implement → review → merge → done → finish
```

- `nexus start <id>` — Creates `nx-<id>` worktree from base branch
- `nexus review <id> --verdict PASS` — Authoritative merge gate
- `nexus merge <id>` — Rebases and merges `--no-ff`
- `nexus done <id>` — Marks task complete
- `nexus finish <id>` — Removes worktree and deletes branch

### Discoveries (Second Brain)

Discoveries are durable memory captures that may be global, project-linked, or task-linked. They're **not** executable work — they don't get branches, worktrees, or the full task lifecycle. When ready, they can be promoted into tasks.

- `nexus discovery inbox` — Triage view for new/promotable/stale discoveries
- `nexus discovery list` — Browse all discoveries
- `nexus remember "..."` — Lightweight capture
- `nexus discovery promote <id>` — Convert to executable task

## Key Features

- **Task tracking** — Projects, tasks, subtasks, tags, dependencies, comments
- **Readiness tracking** — Explicit `is_ready` marker for backlog refinement
- **First-class blocking** — `is_blocked` + `blocked_reason` with DB-enforced invariants
- **Discoveries** — Lightweight memory that doesn't force work creation
- **Typed memory links** — Graph-style relationships between discoveries, tasks, projects, and Copilot sessions
- **Worktree management** — Automatic branch/worktree creation and cleanup
- **Session persistence** — Agents can persist state to DB for cross-session continuity
- **Archive + restore** — Hygiene mechanism for discoveries (archived items stay durable but hidden from active views)
- **Multi-timezone** — Daily notes default to `America/Chicago`, configurable via `NEXUS_TIMEZONE`

## Scope

Nexus is scoped to **one machine** per deployment. No remote centralization planned. The client runs per-machine against a local Postgres instance.

Rationale: If you need cross-team collaboration and centralized tracking, existing solutions (GitHub Issues, Jira, Azure DevOps + MCP servers) already solve this well. Nexus focuses on the individual developer working with AI agents on a single workstation.

## Future Wants

- **Daemon agent** — Watch task tracker for new issues, spawn agent sessions in appropriate worktrees
- **Daily reporting** — Ask an agent what all the other agents did today using Nexus as source of truth
- **EOY goal tracking** — Agent summarization by Quarter or smart goal category
- **EKS deployment** — Deploy API + Postgres to EKS to run more parallel agent stacks (work use case)
- A canvas-style front-end that allows me to better visualize and plan out task-dependencies
