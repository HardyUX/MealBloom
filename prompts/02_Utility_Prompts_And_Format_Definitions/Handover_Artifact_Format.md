APM Handover Artifact Formats
Defines the standard format for:

Handover_File.md: Context dump for the incoming agent

Handover_Prompt.md: Instructional bootstrap prompt

Applicable to all agent types (Manager, Implementer, Specialized).

Handover_File.md Structure
md
Kopieren
Bearbeiten
# APM Handover File – [Project Name] – [Date]
Section 1: Overview
Outgoing/Incoming Agent ID

Reason (e.g., Context Limit, Task Transfer)

Memory Bank location & structure

1–3 sentence project/task status summary

Section 2: Goal & Current Objectives
For Managers: full project goal

For Specialized: current task focus

Section 3: Plan Status
Link to Implementation_Plan.md

Phase/Task focus

Completed / In-progress / Upcoming tasks

Deviations from plan (if any)

Section 4: Key Decisions & Rationale
[Decision] – Rationale – Approved by – Date

Section 5: Agent Roster
List agents, tasks, and statuses
(Omit or simplify for specialized handovers)

Section 6: Recent Memory Bank Entries
Copy/paste only the most relevant entries for current or upcoming work.

Section 7: Recent Conversational Context
Summarize key unlogged User directives from last 5–10 messages:

New priorities, clarified goals, updated deadlines

Use bullet points

Section 8: Critical Code / Config / Outputs
Embed key code or configs for ongoing task:

python
Kopieren
Bearbeiten
# Example
def critical_function(): ...
Section 9: Obstacles & Risks
Blockers, errors, risks with details and current status

Section 10: Outstanding Directives
Unresolved User or Manager instructions

Section 11: Key Files (Optional but Recommended)
File paths + purpose (e.g., src/utils/helper.py: shared functions)

Handover_Prompt.md Structure
md
Kopieren
Bearbeiten
# APM Agent Initialization – Handover Protocol
1. APM Context (Condensed if agent is familiar)
Role: You’re taking over from [Outgoing Agent]

Responsibilities: [State core duty]

Logging: Use Memory Bank at [Path], follow log format

User: Your primary communication point

2. Process the Handover
You must:

Read the full Handover_File.md
Focus on:

Section 3: Task Status

Section 6: Memory Entries

Section 7: User Directives

Section 8–10: Code, Obstacles, Outstanding Items

Identify Next Steps
Define your top 1–2 actions

Confirm with User

Summarize current state

State intended next actions

Ask critical clarifying questions
Do not proceed until User confirms

3. Initial Objective
State the first task you expect the incoming agent to take on (e.g., resume coding Task X, respond to issue Y, create prompt for Agent Z)

Specialized Agent Handovers
Trim content to relevant task scope

Focus on Section 2–3, 6–10 of Handover File

Skip full APM intro in prompt if not needed

General Formatting Rules
Use clean Markdown

Replace [Placeholders] before use

Prioritize clarity, recency, and relevance

Verification Step (Section 2.3 of prompt) is mandatory