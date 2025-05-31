APM Memory Bank System Guide
The Memory Bank is a structured logging system for recording agent outputs, actions, and decisions. It ensures traceability and alignment with the Implementation_Plan.md.

Core Design Goals
Scalable to fit project size

Organized for easy navigation

Clear and aligned with the Implementation Plan structure

Consistent in naming and format

Reflective of all phases/tasks from the Plan

Choosing a System: Single vs Multi-File
Assess the plan’s expected complexity to decide:

Factor	High Complexity (Use Multi-File)	Low Complexity (Use Single File)
Phases	Multiple distinct phases	None or single-phase
Number of tasks	Many tasks, distinct domains, many agents	Few tasks, tightly related
Detail	Tasks with sub-steps, long logs	Simple tasks, light logs
Duration & team size	Long-term, multi-agent	Shorter, fewer agents

🗂 Option 1: Single-File System (Memory_Bank.md)
Use When: Simple, low-scope projects.

Setup:

md
Kopieren
Bearbeiten
# APM Project Memory Bank

Project Goal: [from Plan]  
Date Initiated: [YYYY-MM-DD]  
Manager Agent Session ID: [if available]  
Implementation Plan Reference: `Implementation_Plan.md`

---

## Log Entries
Log entries must follow: Memory_Bank_Log_Format.md

Option 2: Multi-File System (Memory/ directory)
Use When: Projects with phases, complexity, or high volume.

Setup:

Create Memory/ directory

Add Memory/README.md with structure explanation

Create subdirectories per Phase (if applicable):

swift
Kopieren
Bearbeiten
Memory/Phase_1_Backend_Setup/
Create task logs:

swift
Kopieren
Bearbeiten
Memory/Phase_1_Backend_Setup/Task_1.1_User_Auth_Log.md
Log File Header:

md
Kopieren
Bearbeiten
# APM Task Log: [Task Title]

Project Goal: [from Plan]  
Phase: [or "N/A"]  
Task Reference in Plan: [### Task X - Description]  
Assigned Agent(s): [from Plan]  
Log File Creation Date: [YYYY-MM-DD]

---

## Log Entries
Proposing to the User
When presenting the plan summary:

Propose either:

“A single Memory_Bank.md for simplicity.”

“A Memory/ directory with structured log files due to task/phase complexity.”

Justify based on project characteristics

Then:
Proceed to create both the Implementation_Plan.md and the Memory Bank structure.

Ongoing Logging & Expansion
All entries must follow Memory_Bank_Log_Format.md

New logs/phases should continue with the same structure

Ensure task/phase names match exactly with Implementation_Plan.md

Naming & Validation Rules
Structure	Format Example
Phase dir	Memory/Phase_1_Project_Setup/
Task log file	Memory/Task_1.1_Env_Init_Log.md

Verify before creation:

Confirm naming against the current Implementation Plan

If unclear or plan has changed → ask the User before proceeding

Summary
Choose structure based on plan complexity

Keep Memory Bank aligned with the Plan

Use consistent naming and formatting

Confirm all names against the latest Implementation_Plan.md