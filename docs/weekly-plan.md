# Weekly Plan Draft

## Goal

This weekly plan is a recommended phased roadmap for building the MVP in controlled increments. It is a planning guide, not a fixed schedule.

## Phase Rule

Each week should end with a small, reviewable, testable result. Do not attempt full end-to-end completion in the first implementation cycle.

## Week 1: Project Baseline

Focus:

- confirm repository strategy,
- confirm document-first scope,
- define environment variable policy,
- define service boundaries,
- decide initial sample data format for personas.

Expected output:

- approved planning documents,
- initial repository structure decision,
- implementation slice selection.

## Week 2: Document Ingestion Slice

Focus:

- document upload scope,
- supported file types for MVP,
- text extraction flow,
- processing status model.

Expected output:

- smallest runnable ingestion slice design,
- test cases for upload and extraction behavior.

## Week 3: Chunking and Retrieval Slice

Focus:

- chunking policy,
- embedding generation contract,
- vector storage choice for MVP,
- retrieval request and response shape.

Expected output:

- validated retrieval slice design,
- sample data flow from document to searchable chunk.

## Week 4: Persona and Question Slice

Focus:

- sample persona format,
- persona storage approach,
- persona-based question generation flow,
- question count and session constraints for MVP.

Expected output:

- persona sampling strategy,
- question generation interface draft.

## Week 5: RAG Answer Slice

Focus:

- retrieval-to-answer pipeline shape,
- answer evidence traceability,
- failure handling for missing evidence,
- answer storage contract.

Expected output:

- narrow RAG answer generation flow definition,
- answer persistence and result linkage plan.

## Week 6: Evaluation Slice

Focus:

- rubric-to-prompt mapping,
- score output schema,
- issue summary format,
- improvement suggestion format.

Expected output:

- evaluator contract,
- evaluation sample outputs,
- score storage design direction.

## Week 7: Dashboard Slice

Focus:

- result listing priorities,
- result detail view needs,
- filtering and session inspection needs,
- minimum admin workflow.

Expected output:

- dashboard data requirements,
- minimum result presentation structure.

## Week 8: MVP Integration Review

Focus:

- verify all slices connect logically,
- remove unnecessary scope,
- identify blockers before implementation scaling,
- confirm next milestone.

Expected output:

- MVP gap list,
- implementation priority list,
- revised milestone recommendation.

## Implementation Discipline

For every phase:

1. define the smallest working unit,
2. clarify inputs and outputs,
3. implement one slice at a time,
4. test before expanding scope,
5. avoid unrelated refactoring.

## Stop Conditions

Pause and re-confirm direction if:

- the work starts expanding beyond MVP,
- stack changes are proposed without user approval,
- multiple services are being built at once without a narrow slice,
- requirements become ambiguous,
- the implementation plan no longer matches `PROJECT_GUIDE.md`.
