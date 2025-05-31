APM Handover Protocol Guide
Ensures seamless project continuity when switching AI agent instances due to context limits, long durations, or strategic reasons.

When to Trigger
Initiate when:

Agent’s context window is near full

User requests agent replacement

Project duration exceeds agent context lifespan

Manager Agent should monitor context and advise handover when needed.

Core Handover Components
1. Handover_File.md (Project Context Dump)
Includes:

Project summary (goals, status)

Plan status: completed/in-progress/upcoming tasks

Key decisions + rationale

Agent roster (roles, assignments, status)

Latest Memory Bank logs

Critical code/config snippets

Obstacles or unresolved issues

Recent user directives

(Optional) File manifest
Must follow: Handover_Artifact_Format.md

2. Handover_Prompt.md (New Agent Initialization)
Includes:

Short APM intro (adapted from Initiation Prompt)

Handover context explanation

Summary of Handover_File.md contents

Clear instructions to read/process handover file

Immediate priorities for new agent

Ask new agent to confirm readiness via summary
Must follow: Handover_Artifact_Format.md

Standard Handover Procedure
User confirms need for handover

Manager Agent creates:

Handover_File.md with current project state

Handover_Prompt.md with tasking and next steps

User reviews both files

User starts new agent instance with prompt + file

New agent confirms understanding and readiness

Specialized Agent Handover
Simplify handover file to only relevant task/code/log context

Prompt focuses on reinitializing same specialized task

Manager Agent typically manages the transition

Include Recent User Context (Required)
Before finalizing:

Review last ~5–10 turns with User

Summarize key unlogged directives, shifts, or clarifications

Add to Handover_File.md under:
Section 7: Recent Conversational Context & Key User Directives

Use this to refine Handover_Prompt.md too

Why: This prevents disconnects between User intent and formal logs.

Final Notes
User oversees artifact approval and agent reinitialization

Clarity, accuracy, and structure are critical

Iterative revisions allowed before final handover

Ensures project momentum and preserves institutional memory