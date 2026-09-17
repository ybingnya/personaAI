# API Spec Draft

## 1. Scope

This document provides a draft API outline for the MVP. It is not final and should be implemented incrementally after explicit approval.

The draft assumes:

- frontend calls backend APIs,
- backend coordinates persistence,
- backend calls the AI server where needed.

## 2. API Design Principles

1. Keep the first API version small and task-oriented.
2. Expose processing status explicitly.
3. Return identifiers for each created resource.
4. Preserve traceability between question, answer, evidence, and evaluation.
5. Avoid premature endpoint expansion.

## 3. Resource Overview

- `documents`
- `personas`
- `test-sessions`
- `questions`
- `answers`
- `evaluations`

## 4. Backend API Draft

### 4.1 Documents

#### `POST /api/documents`

Purpose:

- upload a new source document.

Request:

- multipart file
- optional title
- optional category such as `academic`, `scholarship`, `faq`

Response draft:

```json
{
  "documentId": "doc_001",
  "title": "2026 Scholarship Guide",
  "category": "scholarship",
  "status": "UPLOADED"
}
```

#### `GET /api/documents`

Purpose:

- list uploaded documents and processing status.

#### `GET /api/documents/{documentId}`

Purpose:

- retrieve document metadata and ingestion state.

#### `POST /api/documents/{documentId}/process`

Purpose:

- trigger text extraction, chunking, embedding, and indexing for MVP control.

Response draft:

```json
{
  "documentId": "doc_001",
  "status": "PROCESSING"
}
```

### 4.2 Personas

#### `POST /api/personas`

Purpose:

- create or register a persona entry.

Initial MVP note:

- should support manual sample persona creation before dataset-driven generation.

#### `GET /api/personas`

Purpose:

- list personas.

#### `POST /api/personas/sample`

Purpose:

- create persona records from sample JSON or CSV input strategy.

### 4.3 Test Sessions

#### `POST /api/test-sessions`

Purpose:

- create a test session for one persona and one or more target documents.

Request draft:

```json
{
  "personaId": "persona_001",
  "documentIds": ["doc_001"],
  "questionCount": 3
}
```

Response draft:

```json
{
  "testSessionId": "session_001",
  "status": "CREATED"
}
```

#### `POST /api/test-sessions/{sessionId}/run`

Purpose:

- run question generation, answer generation, and evaluation for the session.

#### `GET /api/test-sessions`

Purpose:

- list test sessions and status summary.

#### `GET /api/test-sessions/{sessionId}`

Purpose:

- retrieve session summary, including current processing status.

### 4.4 Results

#### `GET /api/test-sessions/{sessionId}/results`

Purpose:

- retrieve generated questions, answers, evidence references, scores, issue summary, and suggestions.

Response draft:

```json
{
  "testSessionId": "session_001",
  "persona": {
    "personaId": "persona_001",
    "name": "Scholarship Applicant A"
  },
  "results": [
    {
      "questionId": "q_001",
      "question": "Can I apply for this scholarship if I am taking a leave of absence next semester?",
      "answerId": "a_001",
      "answer": "Draft answer text",
      "evidence": [
        {
          "documentId": "doc_001",
          "chunkId": "chunk_015"
        }
      ],
      "evaluation": {
        "accuracy": 4,
        "groundedness": 4,
        "personaContextReflection": 5,
        "clarity": 4,
        "missingInformation": 3,
        "totalScore": 20,
        "issueSummary": "Leave-of-absence condition is only partially explained.",
        "improvementSuggestion": "Clarify whether the applicant must maintain enrollment status during the scholarship period."
      }
    }
  ]
}
```

## 5. AI Server Internal API Draft

These endpoints are draft service boundaries between backend and AI server.

### `POST /internal/documents/extract-text`

Purpose:

- extract text from a document file or file reference.

### `POST /internal/documents/chunk`

Purpose:

- split extracted text into chunks.

### `POST /internal/embeddings/generate`

Purpose:

- generate embeddings for chunks.

### `POST /internal/retrieval/search`

Purpose:

- retrieve relevant chunks for a question.

### `POST /internal/personas/generate-questions`

Purpose:

- generate persona-based test questions.

### `POST /internal/rag/generate-answer`

Purpose:

- generate grounded answers using retrieved evidence.

### `POST /internal/evaluations/score`

Purpose:

- score an answer according to the evaluation rubric.

## 6. Status Model Draft

Suggested status values for MVP planning:

- `UPLOADED`
- `PROCESSING`
- `READY`
- `FAILED`
- `CREATED`
- `RUNNING`
- `COMPLETED`

Exact status modeling should be decided during implementation.

## 7. Open Questions

- Should document processing start automatically after upload or require a manual trigger?
- Should one test session target multiple documents in MVP, or only one?
- Should persona creation be fully manual in the first slice?
- Should result retrieval be paginated from the start or only when volume grows?
