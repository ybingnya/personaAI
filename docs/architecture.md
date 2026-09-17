# Architecture Draft

## 1. Goal

This document describes the intended high-level architecture for the `personaAI` MVP. It is a planning document only and does not imply implementation has started.

## 2. System Overview

The planned system is divided into three main application areas:

1. Frontend
2. Backend
3. AI Server

### Frontend

Responsible for:

- administrator UI,
- document upload interface,
- persona list view,
- test session execution view,
- result dashboard.

Planned stack:

- React or Next.js

### Backend

Responsible for:

- user-facing API,
- document metadata management,
- session orchestration,
- result persistence,
- dashboard query APIs,
- integration coordination with the AI server.

Planned stack:

- Spring Boot

### AI Server

Responsible for:

- text preprocessing support,
- embedding requests,
- persona generation or sampling,
- question generation,
- RAG answer generation,
- evaluation scoring and summary generation.

Planned stack:

- FastAPI

## 3. Supporting Storage

### Relational Database

Purpose:

- persistent storage for users, documents, personas, sessions, answers, and evaluations.

Candidates:

- PostgreSQL
- MySQL

### Vector Database

Purpose:

- store document chunk embeddings and support semantic retrieval.

Candidates:

- ChromaDB
- pgvector

## 4. Planned Request Flow

### Document Ingestion Flow

1. Admin uploads a document through the frontend.
2. Backend stores file metadata and forwards processing to the AI server or a processing module.
3. Text is extracted from the file.
4. Extracted text is chunked.
5. Embeddings are generated.
6. Chunks and embeddings are stored in vector storage.
7. Processing status is saved for later inspection.

### Test Session Flow

1. Admin selects a persona or persona source.
2. Backend creates a test session.
3. AI server generates one or more persona-based questions.
4. AI server performs retrieval against stored chunks.
5. AI server generates a grounded RAG answer.
6. AI server evaluates the answer with the rubric.
7. Backend stores the question, answer, evidence, scores, issue summary, and suggestions.
8. Frontend dashboard displays results.

## 5. Proposed Logical Components

These are logical components only, not code modules yet:

- Document Management
- Document Processing
- Embedding and Retrieval
- Persona Management
- Question Generation
- RAG Answer Generation
- Answer Evaluation
- Test Session Management
- Dashboard Query Layer

## 6. Recommended Early Boundaries

To keep MVP work controlled:

- Frontend should focus on admin workflows only.
- Backend should own persistence and orchestration.
- AI server should own LLM-related operations.
- Retrieval and evaluation logic should remain replaceable.
- Persona generation should support both sample data and future dataset-based expansion.

## 7. Suggested Initial Data Relationships

This is a conceptual model, not a schema:

- One `Document` has many `DocumentChunk` records.
- One `Persona` can participate in many `TestSession` records.
- One `TestSession` can have many `GeneratedQuestion` records.
- One `GeneratedQuestion` has one `RagAnswer` in MVP scope.
- One `RagAnswer` has one `EvaluationResult` in MVP scope.

## 8. Architecture Principles

1. MVP first.
2. Prefer simple synchronous flows before adding queues or distributed complexity.
3. Keep contracts explicit between backend and AI server.
4. Make every major step observable by status.
5. Preserve evidence traceability from answer back to source chunk.

## 9. Deferred Decisions

These decisions remain open for a later implementation phase:

- React versus Next.js
- MySQL versus PostgreSQL
- ChromaDB versus pgvector
- exact LLM provider
- exact embedding provider
- authentication scope for the admin interface
- asynchronous job orchestration strategy

## 10. Risks To Watch

- document extraction quality variance,
- weak retrieval producing low-quality grounded answers,
- persona realism mismatch with actual student questions,
- evaluation prompts drifting from rubric intent,
- overbuilding before the MVP loop is validated.
