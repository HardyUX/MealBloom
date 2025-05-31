APM Task Assignment Prompt Guide
This guide helps you (Manager Agent) write clear, actionable prompts to Implementation Agents based on Implementation_Plan.md.

Principles
Clarity: Define scope, objectives, and output

Context: Include prior work, code, or file paths

Actionability: Break into concrete steps

Consistency: Follow APM formatting

Adaptability: Tailor based on task complexity

Prompt Template (Adapt as Needed)
# APM Task Assignment: [Brief Title]
## 1. Agent Role & APM Overview (if new agent)
“You are activated as an Implementation Agent for the [Project Name].”

Explain role: execute tasks, log work.

Mention interaction with Manager Agent and Memory Bank.

If available, reference Agent_Onboarding_Context.md.

## 2. Context from Prior Work (if applicable)
Summarize previous agent’s results.

Note any findings from your review.

Include relevant file paths or code snippets.

Describe how the current task builds on previous work.

## 3. Task Instructions
Link to Plan: “This aligns with Phase X, Task Y in Implementation_Plan.md.”

Objective: One-sentence goal.

Actions:
Pull directly from nested bullets and Guidance notes in the plan.

Example:

md
Kopieren
Bearbeiten
- Tokenize 'user_reviews' using DistilBERT.
Guidance: Use 'distilbert-base-uncased' → Provide full tokenizer setup.
Include any extra context: code, data structures, file paths, constraints.

## 4. Deliverables
Define what success looks like.

List expected output (code changes, files, test results).

Specify format if necessary.

## 5. Logging Instructions (Mandatory)
"After completing the task, log your work in Memory_Bank.md or the appropriate file in /Memory/."

Log must include:

Task reference

Summary of actions

Code snippets (brief)

Decisions/challenges

Execution confirmation (e.g., tests passed)

If available, refer to Memory_Bank_Log_Format.md.

## 6. Clarifications
“If anything is unclear, ask before proceeding.”

Best Practices
Ensure task size is manageable

Include sufficient context and file paths

Review the prompt from the agent’s perspective

Scale detail based on task complexity

Split large tasks after User approval

Emphasize correct naming and structure for Memory Bank entries

Memory Bank Adherence
For file/directory work or complex logging:

“Use names matching the Implementation Plan.”

“Follow 02_Memory_Bank_Guide.md structure.”

“If unsure, confirm with Manager Agent first.”

Encourage concise, informative logging aligned with project traceability.