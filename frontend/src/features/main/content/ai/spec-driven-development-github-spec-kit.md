# Spec-Driven Development with GitHub Spec Kit

This topic explains how to run Spec-Driven Development (SDD) using GitHub Spec Kit from idea to implementation.

The current fullstack-guide project is a good real-world example because features were defined and evolved through spec artifacts before implementation.

## What Is SDD?

Spec-Driven Development means you define the feature clearly first, then derive plans, checklists, tasks, analysis, and implementation from those artifacts.

Core value:

- fewer ambiguous requirements
- better planning quality
- traceable implementation decisions
- reduced rework during coding

## Prerequisites

Before starting:

- VS Code with GitHub Copilot Chat enabled
- project workspace opened
- write permissions for the project
- Python tooling installed to run uv

Recommended:

- basic understanding of markdown-based specs
- familiarity with feature folders in specs/

## Installation

Install uv, then install the Spec Kit CLI:

```powershell
uv tool install specify-cli
```

Optional verification:

```powershell
uv tool list
```

## End-to-End Spec Kit Flow

### 1. Use the Prompt for /speckit.constitution

Goal: define project principles and decision rules.

What you produce:

- team standards
- architectural guardrails
- quality expectations

Why it matters:

- every later step aligns to agreed principles

### 2. Use /speckit.specify Prompt

Goal: convert a feature idea into a clear specification.

Typical output in a feature folder:

- spec.md
- optional supporting notes for scope and behavior

Include:

- business context
- user outcomes
- functional requirements
- constraints and assumptions

### 3. Run /speckit.clarify (Optional)

Goal: close requirement gaps before planning.

This step asks targeted questions and tightens ambiguous areas.

Use when:

- requirements are broad
- edge cases are unknown
- acceptance behavior is not explicit

### 4. Run /speckit.plan

Goal: create an implementation plan from the approved spec.

Typical artifacts:

- plan.md
- research.md
- data-model.md
- contracts and technical decisions

The plan should map requirements to architecture and delivery steps.

### 5. Run /speckit.checklist (Optional)

Goal: generate quality checklists for requirement and UX completeness.

Typical outputs:

- requirement checklist
- UX checklist

Use this to enforce definition-of-done criteria before coding.

### 6. Run /speckit.tasks

Goal: generate a dependency-ordered task list.

Typical output:

- tasks.md

Good tasks are:

- actionable
- small enough to execute
- ordered by technical dependency

### 7. Run /speckit.analyze (Optional)

Goal: perform consistency and quality analysis across artifacts.

Checks typically include:

- alignment of spec.md, plan.md, tasks.md
- missing coverage
- conflicting assumptions

Run this before implementation to catch drift early.

### 8. Run /speckit.implement

Goal: execute tasks from tasks.md and update code.

During this step:

- implement feature slices in dependency order
- validate behavior incrementally
- keep artifacts and code aligned

### 9. Run /speckit.converge

Goal: perform final verification and append any missing work.

Converge helps ensure implementation coverage is complete by comparing built work with planned/spec artifacts.

## Concrete Example: A Minimal spec.md

```markdown
# Feature: Export Order History as CSV

## User Outcome
As a customer, I can download my last 12 months of orders as a CSV file.

## Functional Requirements
- FR-1: Export must include order date, order ID, total, and status.
- FR-2: Export limited to orders belonging to the authenticated user.
- FR-3: Empty result set still returns a valid CSV with headers only.

## Constraints
- Must reuse the existing /api/orders authorization middleware.
- Response size capped at 10,000 rows per request.
```

Even a small, concrete spec like this is enough to drive a meaningful `/speckit.plan` — the point isn't length, it's making the requirements and constraints explicit and testable rather than living only in a conversation or ticket title.

## Decision Guide: Which Optional Steps to Skip

- **Skip `/speckit.clarify`** only when the feature is small and requirements are already unambiguous (e.g. a well-understood bug fix or a tiny, fully-specified endpoint) — run it whenever multiple reasonable interpretations of the requirement exist.
- **Skip `/speckit.checklist`** for low-risk, low-visibility internal tooling — keep it for anything user-facing or with compliance/security implications, where a definition-of-done checklist catches gaps before they become expensive to fix.
- **Never skip `/speckit.analyze`** on a multi-person or multi-week feature — the cost of catching a spec/plan/tasks inconsistency before implementation is far lower than catching it mid-implementation.
- **Never skip `/speckit.converge`** — it's the step that catches partially-implemented requirements, and skipping it is how "done" work quietly ships with missing edge cases.

## Handling Invalidated Assumptions Mid-Sprint

If an assumption the spec was built on turns out to be wrong partway through implementation (e.g. a downstream API doesn't support a field the plan assumed was available), don't silently patch around it in code — go back to the spec: update `spec.md` to reflect the new reality, re-run `/speckit.plan` (or at least manually reconcile `plan.md`) so the artifacts and the code stay in sync, and only then continue `/speckit.implement`. Treating the spec as a living document that gets updated when reality changes — rather than a one-time upfront document — is what keeps SDD's traceability benefit intact instead of the artifacts silently drifting out of date from the actual shipped behavior.

## Example: This Project as an SDD Reference

In this repository, feature folders under specs/ follow the SDD lifecycle pattern, for example:

- spec.md: feature intent and requirements
- plan.md: architecture and delivery plan
- tasks.md: execution backlog
- optional contracts/ and checklists/

This structure demonstrates how SDD keeps feature work explicit and auditable.

## Practical Tips

- keep each spec focused on one feature
- clarify uncertain requirements before planning
- avoid generating tasks before plan quality is strong
- treat optional steps (clarify, checklist, analyze) as risk reducers
- run converge before declaring completion

## Common Mistakes

- jumping directly to implementation without a stable spec
- vague acceptance criteria in spec.md
- tasks that are too broad and not dependency-aware
- skipping final converge check and missing partial requirements

## Quick Start Checklist

1. Install tooling (uv and specify-cli).
2. Establish principles with /speckit.constitution.
3. Define feature requirements with /speckit.specify.
4. Clarify gaps with /speckit.clarify when needed.
5. Build plan via /speckit.plan.
6. Generate quality checks with /speckit.checklist when needed.
7. Create executable tasks with /speckit.tasks.
8. Validate artifact consistency using /speckit.analyze.
9. Implement with /speckit.implement.
10. Finalize with /speckit.converge.

## Summary

GitHub Spec Kit gives a repeatable SDD workflow from requirements to final verification.

For medium-complexity features, using the full flow dramatically improves delivery clarity, reduces requirement drift, and makes implementation outcomes easier to validate.
