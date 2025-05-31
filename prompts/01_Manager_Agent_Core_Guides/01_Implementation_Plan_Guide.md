APM Implementation Plan Formatting Guide
The Implementation_Plan.md is your core artifact for translating strategic goals into clear, actionable tasks. Follow this format after User approval of the proposed plan structure.

Core Goals
Clarity for agents and User

Granularity for actionable execution

Consistent formatting for logs and prompt generation

Alignment with Memory Bank and task delegation

Adaptability for future refinements

Format Standard (Markdown)
1. File Intro
md
Kopieren
Bearbeiten
# Implementation Plan

Project Goal: [Brief overview]
2. Phased Structure (if needed)
Use ## Phase X: Title - Agent Group [Name] (Agent A, Agent B)

3. Task Format
Use ### Task ID – Agent(s): Title
Example:

md
Kopieren
Bearbeiten
### Task 1.1 – Agent_Dev: Setup Backend Auth
Follow with:

Objective: 1–2 sentences

Then list sub-tasks:

md
Kopieren
Bearbeiten
1. Define DB schema  
   - Add fields: id, email, hash  
   Guidance: Use bcrypt for hashing  
2. Implement login API  
   - Route: POST /api/login  
   Guidance: Return JWT if valid
Multi-agent tasks must include agent names per sub-task:

md
Kopieren
Bearbeiten
1. (Agent A) Research APIs  
2. (Agent B) Code integration  
3. (Agent C) Write tests  
4. Memory Bank Reference
Add a section describing the logging setup:

md
Kopieren
Bearbeiten
## Memory Bank System

This project uses:  
- Single file `Memory_Bank.md`  
*or*  
- Directory `/Memory/` with per-task logs (see Memory/README.md)
5. Handover Protocol Reference
Always include at the end:

md
Kopieren
Bearbeiten
## Note on Handover Protocol

For continuity across long sessions or agent transitions, refer to:

`prompts/01_Manager_Agent_Core_Guides/05_Handover_Protocol_Guide.md`
Best Practices
Include clear agent assignments

Use consistent headings and identifiers

Use nested bullet points for fine-grained steps

Add guidance notes when methods/tools matter

Prepare for iterative edits after User feedback

After Plan Is Created
Help User generate task prompts (see 03_Task_Assignment_Prompts_Guide.md)

Review agents’ logs (see 04_Review_And_Feedback_Guide.md)

Update plan as project evolves

Trigger handover protocol when needed