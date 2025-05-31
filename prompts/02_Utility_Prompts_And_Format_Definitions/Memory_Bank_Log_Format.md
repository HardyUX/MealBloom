APM Memory Bank Log Format
Logs track progress, support handovers, and preserve project context. Each entry must be clear, concise, and follow this format.

When to Log
Log to Memory_Bank.md after:

Completing a task or major step

Hitting a blocker or error

Producing a significant result
Only after User confirms logging is appropriate.

Logging Rules
Use the exact Task Reference from Implementation_Plan.md

Log to the correct file path (ask User if unsure)

Append entries at the end

Format using the structure below

Summarize key actions and outcomes—not full transcripts

Entry Format (Markdown)
md
Kopieren
Bearbeiten
---
**Agent:** [Your Agent ID]  
**Task Reference:** [Exact ID from plan or prompt]

**Summary:**  
[1–2 sentence overview of what was done]

**Details:**  
- Steps taken, in order  
- Rationale for key decisions  
- Link actions to task requirements  
- Key findings or observations

**Output/Result:**  
```[code, log snippet, file ref, result summary]```  
(Use code blocks. Mention file paths. Use `+`/`-` for added/removed lines if helpful.)

**Status:** [One of:]  
- **Completed**  
- **Partially Completed** (explain in Details)  
- **Blocked** (state cause below)  
- **Error** (include error message)  
- **Information Only**

**Issues/Blockers:**  
[Error, blocker, or “None”]

**Next Steps (Optional):**  
[What’s next, or “None”]
Example
md
Kopieren
Bearbeiten
---
**Agent:** Agent A  
**Task Reference:** Phase 1 / Task A / Item 2

**Summary:**  
Implemented `POST /api/users/register` with input validation and password hashing.

**Details:**  
- Created endpoint in `routes/user.js`  
- Used `express-validator` to validate email/password  
- Used bcrypt (cost 12) to hash passwords  
- Stored user via ORM and returned token  
- Tested locally with valid/invalid input

**Output/Result:**  
```js
// routes/user.js snippet
check('email').isEmail(),
check('password').isLength({ min: 8 })
// ...
const salt = await bcrypt.genSalt(12);
user.password = await bcrypt.hash(password, salt);
Status: Completed
Issues/Blockers: None
Next Steps: Ready for Task A / Item 3

yaml
Kopieren
Bearbeiten

---

## Log Effectively

### Do:
- Focus on **what**, **why**, and **result**
- Include **only relevant** code or outputs
- Use bullet points and code blocks for clarity

### Avoid:
- Verbose step-by-step narration  
- Copying full files or printouts  
- Repeating what’s already in the plan

---

### Better:
> “Loaded `train.csv`. Used `.head()`, `.info()`, `.describe()` to confirm data integrity and schema. 5 nulls in 'text'; needs handling.”

### Worse:
> “Ran `read_csv`, then `.head()`, `.info()`, then `.describe()`... then printed... then looked at output... then...”