# PROJECT_GUIDE

## 1. Purpose

This project is a web platform that automatically evaluates the quality of RAG-based AI counseling chatbot answers using Korean personas.

The platform is not a simple chatbot service. Its primary purpose is to verify whether AI-generated answers:

- are grounded in uploaded source documents,
- reflect the user's situation and intent,
- omit important information such as eligibility, deadlines, conditions, and required documents.

This document defines the project goal, scope, development principles, and change-control rules so that future work stays aligned with user intent.

## 2. Product Goal

The product should help an administrator upload institutional documents such as academic notices, scholarship guides, and FAQ materials, then automatically run persona-based test sessions and evaluate the quality of generated RAG answers.

Administrators should be able to inspect:

- generated persona questions,
- RAG answers,
- supporting retrieved evidence,
- evaluation scores,
- identified problems,
- suggested improvements.

## 3. Core Workflow

The intended end-to-end flow is:

1. Admin uploads academic, scholarship, or FAQ documents.
2. System extracts text from uploaded documents.
3. System splits text into chunks and generates embeddings.
4. System stores chunks in a vector database.
5. System creates personas from sample personas or Nemotron-Personas-Korea-based data.
6. Persona Agent generates questions based on each persona's situation.
7. RAG Answer Agent retrieves evidence from uploaded documents and produces grounded answers.
8. Evaluator Agent scores answer quality using five criteria.
9. Admin reviews questions, answers, evidence, scores, issues, and improvement suggestions in a dashboard.

## 4. MVP Scope

The first development target is an MVP. The MVP must remain small, testable, and executable.

### Required MVP Features

1. Document upload
2. Document text extraction
3. Chunk splitting
4. Embedding storage
5. Vector search
6. Persona creation or sampling
7. Persona-based question generation
8. RAG-based answer generation
9. Automatic answer evaluation
10. Evaluation result storage
11. Dashboard viewing

### Minimum Screens

1. Document list and upload page
2. Persona list page
3. Test session execution page
4. Question, answer, and evaluation result page

## 5. Recommended Domain Entities

The following entities are the current recommendation, not a fixed schema:

- `User`
- `Document`
- `DocumentChunk`
- `Persona`
- `TestSession`
- `GeneratedQuestion`
- `RagAnswer`
- `EvaluationResult`

Actual schema design must be implemented later, in small steps, after explicit user direction.

## 6. Evaluation Criteria

Each answer should be scored from 1 to 5 on the following five criteria:

1. Accuracy
2. Groundedness
3. Persona Context Reflection
4. Clarity
5. Missing Information

The system should also store:

- total score,
- issue summary,
- improvement suggestions.

### Definitions

- Accuracy: whether the answer matches the uploaded document content.
- Groundedness: whether the answer is based on retrieved source evidence.
- Persona Context Reflection: whether the answer reflects the persona's situation and question intent.
- Clarity: whether the answer is easy to understand.
- Missing Information: whether important details such as deadline, eligibility, conditions, and required documents are missing.

## 7. Technology Principles

The project should follow these stack constraints unless the user explicitly changes them:

- Frontend: React or Next.js
- Backend: Spring Boot
- AI Server: FastAPI
- DB: MySQL or PostgreSQL
- Vector DB: ChromaDB or pgvector
- Deployment: Docker Compose first
- LLM and Embedding: API-based setup is acceptable for initial stages
- Dataset strategy: start with sample JSON or CSV before full Nemotron integration

## 8. Development Principles

These principles are mandatory for future work in this repository:

1. Build in small increments, not as one full-system implementation.
2. Implement and test by feature unit.
3. Understand the current project structure before editing existing files.
4. Do not perform large refactors unless the user explicitly requests them.
5. Do not change the requested technology stack unless the user explicitly requests it.
6. Do not delete files or folders unless the user explicitly requests it.
7. Do not hardcode API keys, tokens, passwords, or secrets in code.
8. Do not commit `.env`; provide `.env.example` instead when environment variables are needed.
9. Prefer small runnable code over large incomplete architecture.
10. When changing one area, avoid unnecessary changes in other areas.
11. If requirements are unclear, ask before making broad changes.
12. Commit, push, and PR creation happen only when the user requests them.

## 9. Non-Goals For The Current Stage

The following are explicitly out of scope until the user asks for them:

- full production architecture,
- complete Nemotron dataset integration,
- large-scale optimization,
- premature microservice decomposition,
- advanced agent orchestration beyond MVP needs,
- broad UI polish before core workflow validation.

## 10. Current Phase Rules

At the current phase, work is documentation-first. Do not implement:

- Spring Boot application code,
- FastAPI application code,
- React or Next.js application code,
- database schema or migrations,
- RAG pipeline code,
- agent orchestration code,
- vector database integration code.

Only planning, documentation, architecture definition, API drafting, rubric definition, and development sequencing are allowed unless the user changes direction.

## 11. Decision-Making Rules For Codex

When working on this repository in later tasks, Codex should follow these rules:

1. Treat `PROJECT_GUIDE.md` as the default project contract.
2. Preserve user-provided scope boundaries.
3. Avoid speculative implementation.
4. Avoid generating broad scaffolding unless explicitly requested.
5. Prefer reversible, incremental steps.
6. State assumptions clearly when the codebase does not yet define them.

## 12. Document Map

Related planning documents:

- `README.md`
- `docs/architecture.md`
- `docs/api-spec.md`
- `docs/evaluation-rubric.md`
- `docs/weekly-plan.md`

If any of those documents conflict with this guide, this file takes priority unless the user says otherwise.
