# Requirements Document

## 1. Application Overview

**Name**: personaAI

**Description**: A frontend-only admin web platform prototype that evaluates the quality of RAG-based AI counseling answers using Korean personas. Admins manage documents, personas, test sessions, and view evaluation results. All data is mock only. This prototype is intended for UI planning and developer handoff.

**Scope Constraints**:
- No real backend integration, no database, no authentication, no Supabase, no payment, no real AI/API calls, no real RAG pipeline, no real file processing, no real vector search, no real document parsing
- Tech stack: React + Vite, frontend only

---

## 2. Users and Use Cases

**Target User**: Admin operators who manage document ingestion, persona configuration, test session execution, and evaluation review.

**Core Use Case**: Admin uploads documents, configures personas, creates test sessions, and reviews RAG answer evaluation results via a clean editorial interface.

---

## 3. Page Structure and Functional Description

### 3.1 Page Hierarchy

```
App (Top Navigation Layout)
├── Logo: personaAI
├── Nav: Dashboard
├── Nav: Documents
│   └── Document Detail
├── Nav: Personas
├── Nav: Test Sessions
├── Nav: Results
│   └── Result Detail
└── Nav: Settings
```

### 3.2 Top Navigation

- Fixed top bar with logo \"personaAI\" on the left
- Navigation links: Dashboard, Documents, Personas, Test Sessions, Results, Settings
- Active state highlight on current page link

---

### 3.3 Page 1: Dashboard

**Purpose**: Overview of system status, recent activity, and quick entry points.

**Sections**:

1. **Hero Block** (large pastel color-block section)
   - Large editorial headline: \"Evaluate RAG answers with Korean personas.\"
   - Short subheadline describing the pipeline: Documents → Personas → Questions → RAG Answers → Evaluation → Dashboard
   - Primary CTA: black pill button \"Start Evaluation Session\"
   - Secondary CTA: white pill button \"View Results\"

2. **Metric Cards** (6 cards)
   - Uploaded Documents
   - Ready Documents
   - Sample Personas
   - Completed Sessions
   - Average Score
   - Low Score Answers

3. **Document Processing Status Summary**
   - Summary of documents by status: UPLOADED, PROCESSING, READY, FAILED

4. **Recent Test Sessions**
   - List of recent sessions: title, persona, status, created date

5. **Recent Evaluation Results**
   - List of recent results: question preview, total score, status

6. **Needs Review Section**
   - Answers flagged for low groundedness or missing information
   - Each item shows: question preview, score, issue label

---

### 3.4 Page 2: Documents

**Purpose**: Upload and manage source documents.

**Sections**:

1. **Page Title**: \"Documents\"

2. **Upload Section** (large pastel color-block section)
   - Document title input field
   - Category selector: Academic, Scholarship, FAQ
   - File picker / drag-and-drop upload area; accepted types: PDF, DOCX, TXT
   - Black pill button: \"Upload Document\"
   - States: upload success, upload error, empty state

3. **Document List Table** (white canvas)
   - Columns: Title, Original Filename, Category, Content Type, File Size, Status, Uploaded Date, Actions
   - Actions: View Details, Delete
   - Status badges: UPLOADED, PROCESSING, READY, FAILED

**Mock Document Examples**:
- 2024학년도 1학기 수강신청 안내 (Academic, PDF)
- 국가장학금 신청 가이드 (Scholarship, PDF)
- 휴학 및 복학 절차 안내 (Academic, DOCX)
- 졸업 요건 및 심사 안내 (Academic, PDF)
- 학자금 대출 신청 FAQ (FAQ, TXT)
- 복수전공 신청 안내 (Academic, PDF)

---

### 3.5 Page 3: Document Detail

**Purpose**: View metadata and processing status of a single document.

**Sections**:

1. **Document Metadata Card**
   - Fields: File Name, Title, Category, Content Type, File Size, Uploaded Date, Current Status

2. **Processing Timeline**
   - Steps: Uploaded → Text Extracted → Chunked → Embedded → Ready
   - Visual step indicator showing current stage

3. **Extracted Text Preview** (placeholder section)
   - Placeholder note: extraction not active in this prototype

4. **Generated Chunks** (placeholder section)
   - Placeholder note: chunking not active in this prototype

5. **Embedding Note**
   - Placeholder note: embedding not active in this prototype

---

### 3.6 Page 4: Personas

**Purpose**: Manage Korean personas used for question generation.

**Sections**:

1. **Page Title**: \"Personas\"

2. **Action Bar**
   - Black pill button: \"Add Sample Personas\"

3. **Persona Cards or Table**
   - Fields per persona: Persona Label, Age, Region, Occupation, Education Level, Situation, Interests

4. **Empty State** when no personas exist

**Mock Persona Examples**:

| Label | Age | Region | Occupation | Education Level | Situation | Interests |
|---|---|---|---|---|---|---|
| 졸업을 앞둔 4학년 학생 | 24 | 서울 | 대학생 | 4학년 | 졸업 요건 충족 여부 확인 중 | 취업 준비, 졸업논문 |
| 장학금 신청을 고민하는 저소득층 학생 | 21 | 부산 | 대학생 | 2학년 | 가정 형편으로 장학금 필요 | 국가장학금, 교내장학금 |
| 휴학 후 복학 예정인 학생 | 23 | 대구 | 대학생 | 3학년 | 군 복무 후 복학 준비 중 | 복학 절차, 수강신청 |
| 지방에서 상경한 신입생 | 19 | 전주 | 대학생 | 1학년 | 대학 생활 적응 중 | 기숙사, 학교 생활 |
| 수강신청에 어려움을 겪는 복수전공 학생 | 22 | 인천 | 대학생 | 3학년 | 복수전공 이수 계획 수립 중 | 수강신청, 학점 관리 |
| 등록금 납부와 학자금 대출을 고민하는 학생 | 20 | 광주 | 대학생 | 2학년 | 학자금 대출 신청 검토 중 | 대출 조건, 납부 일정 |

---

### 3.7 Page 5: Test Sessions

**Purpose**: Create and manage evaluation test sessions.

**Sections**:

1. **Session Creation Form**
   - Session title input
   - Persona selector (multi or single)
   - Document selector (multi)
   - Question count selector
   - Black pill button: \"Create Test Session\"
   - Secondary pill button: \"Run Evaluation\"

2. **Session List Table**
   - Columns: Session Title, Selected Persona, Selected Documents, Question Count, Status, Created Date, Actions
   - Status badges: CREATED, RUNNING, COMPLETED, FAILED
   - Actions: View, Delete

---

### 3.8 Page 6: Results

**Purpose**: Browse and filter all evaluation results.

**Sections**:

1. **Filter Bar**
   - Filters: Session, Persona, Document, Score Range, Status

2. **Results List** (cards or table)
   - Per result: Persona summary, Generated question, RAG answer preview, Retrieved evidence chunks count, Five evaluation scores (Accuracy, Groundedness, Persona Reflection, Clarity, Completeness), Total score out of 25, Issue summary, Improvement suggestion
   - Score badges with color coding
   - Visual emphasis for low scores
   - \"Needs Review\" label for low-quality answers

**Mock Result Examples** (Korean content):
- Question: \"국가장학금 신청 자격은 어떻게 되나요?\"
- Question: \"휴학 중에도 장학금을 받을 수 있나요?\"
- Question: \"졸업 요건을 충족하려면 어떤 조건이 필요한가요?\"
- Question: \"수강신청 시 최대 몇 학점까지 신청할 수 있나요?\"
- Question: \"장학금 신청에 필요한 서류는 무엇인가요?\"
- Question: \"국가장학금 신청 기간은 언제인가요?\"
- Question: \"복학 예정자가 처리해야 할 행정 절차는 무엇인가요?\"

---

### 3.9 Page 7: Result Detail

**Purpose**: View full evaluation detail for a single result.

**Section 1: Persona Context**
- Persona Label, Age, Region, Occupation, Education Level, Situation, Interests

**Section 2: Question / Answer / Evidence**
- Generated question
- RAG answer (full text)
- Retrieved evidence chunks: each chunk shows Document Title, Chunk ID, Evidence preview text

**Section 3: Evaluation Score Breakdown**
- Individual scores: Accuracy (1-5), Groundedness (1-5), Persona Reflection (1-5), Clarity (1-5), Completeness (1-5)
- Total score out of 25
- Issue summary
- Improvement suggestion

**Action**:
- Black pill button: \"Mark for Improvement\"

---

### 3.10 Page 8: Settings

**Purpose**: Placeholder configuration panel.

**Sections** (all placeholders, not active in prototype):
- LLM Provider placeholder
- Embedding Provider placeholder
- Vector DB placeholder
- Evaluation Rubric Version placeholder
- Note displayed: \"These settings are not active in this prototype.\"

---

## 4. Business Rules and Logic

### 4.1 Evaluation Rubric

Five criteria, each scored 1 to 5, total out of 25:

| Criterion | Description |
|---|---|
| Accuracy | Factual correctness of the answer |
| Groundedness | Answer is supported by retrieved evidence |
| Persona Reflection | Answer is appropriate for the persona's context |
| Clarity | Answer is clear and easy to understand |
| Completeness | Answer covers all aspects of the question |

### 4.2 Low Score / Needs Review Logic

- Answers with total score below a threshold (e.g., below 15 out of 25) or any single criterion scored 1-2 are flagged as \"Needs Review\"
- Flagged answers display: what is wrong, what information is unsupported, what is missing, how to improve

### 4.3 Document Processing Pipeline (Mock Display Only)

Stages displayed in UI: Uploaded → Text Extracted → Chunked → Embedded → Ready
- All stages are mock; no real processing occurs

### 4.4 Session Status Flow (Mock)

CREATED → RUNNING → COMPLETED (or FAILED)

---

## 5. Visual States

| Page / Component | States |
|---|---|
| Documents upload area | Empty, Loading, Success, Error |
| Document list | Empty, Populated, Failed item |
| Document Detail timeline | Each step: pending, active, completed, failed |
| Personas list | Empty, Populated |
| Test Sessions list | Empty, Populated; session badges: CREATED, RUNNING, COMPLETED, FAILED |
| Results list | Empty, Populated, Needs Review highlighted |
| Result Detail scores | Normal score, Low score (visual emphasis) |
| Settings | Static placeholder |
| Dashboard metrics | Populated with mock numbers |

---

## 6. UI Documentation Section

### 6.1 Page List and Purpose

| Page | Purpose |
|---|---|
| Dashboard | System overview, metrics, recent activity, needs review |
| Documents | Upload and manage source documents |
| Document Detail | View document metadata and processing timeline |
| Personas | Manage Korean personas |
| Test Sessions | Create and manage evaluation sessions |
| Results | Browse and filter evaluation results |
| Result Detail | Full evaluation breakdown for one result |
| Settings | Configuration placeholders |

### 6.2 Main Components Per Page

| Page | Key Components |
|---|---|
| Dashboard | HeroBlock, MetricCard, StatusSummary, SessionList, ResultList, NeedsReviewList |
| Documents | UploadForm, DocumentTable, StatusBadge |
| Document Detail | MetadataCard, ProcessingTimeline, TextPreviewPlaceholder, ChunksPlaceholder |
| Personas | PersonaCard, AddPersonasButton, EmptyState |
| Test Sessions | SessionForm, SessionTable, StatusBadge |
| Results | FilterBar, ResultCard, ScoreBadge, NeedsReviewLabel |
| Result Detail | PersonaContextSection, QAEvidenceSection, ScoreBreakdownSection, MarkButton |
| Settings | ProviderPlaceholder, RubricPlaceholder, PrototypeNote |

### 6.3 Mock Data Structure

**Document**
```
{
  id, title, originalFilename, category (Academic|Scholarship|FAQ),
  contentType, fileSize, status (UPLOADED|PROCESSING|READY|FAILED),
  uploadedDate
}
```

**Persona**
```
{
  id, label, age, region, occupation,
  educationLevel, situation, interests
}
```

**TestSession**
```
{
  id, title, personaId, documentIds,
  questionCount, status (CREATED|RUNNING|COMPLETED|FAILED),
  createdDate
}
```

**EvaluationResult**
```
{
  id, sessionId, personaId, documentId,
  generatedQuestion, ragAnswer,
  evidenceChunks: [{ documentTitle, chunkId, previewText }],
  scores: { accuracy, groundedness, personaReflection, clarity, completeness },
  totalScore, issueSummary, improvementSuggestion,
  needsReview (boolean)
}
```

### 6.4 Expected Backend API Mapping

| Action | Expected Endpoint (future) |
|---|---|
| Upload document | POST /api/documents |
| List documents | GET /api/documents |
| Get document detail | GET /api/documents/:id |
| Delete document | DELETE /api/documents/:id |
| List personas | GET /api/personas |
| Add sample personas | POST /api/personas/sample |
| Create test session | POST /api/sessions |
| Run evaluation | POST /api/sessions/:id/run |
| List results | GET /api/results |
| Get result detail | GET /api/results/:id |
| Mark for improvement | PATCH /api/results/:id/mark |

### 6.5 States Per Page

See Section 5 (Visual States) above.

### 6.6 Design Tokens

| Token | Value / Description |
|---|---|
| Primary CTA | Black pill button, white text |
| Secondary CTA | White pill button, black border and text |
| Hero block background | Large pastel color block (e.g., soft yellow, soft blue, or soft green) |
| Status badge: READY / COMPLETED | Green |
| Status badge: PROCESSING / RUNNING | Blue or amber |
| Status badge: FAILED | Red |
| Status badge: UPLOADED / CREATED | Gray |
| Needs Review label | Red or orange accent |
| Low score emphasis | Red text or red background tint on score cell |
| Typography | Clean editorial sans-serif |
| Canvas background | White for tables and content areas |
| Navigation | Top bar, clean minimal style |

---

## 7. Acceptance Criteria

1. Open the app and verify the top navigation displays: personaAI logo, Dashboard, Documents, Personas, Test Sessions, Results, Settings.
2. Navigate to Dashboard and confirm hero headline, pipeline subheadline, 6 metric cards, recent sessions, recent results, and Needs Review section are visible with mock data.
3. Navigate to Documents, verify the upload form (title input, category selector, file picker, upload button) and document list table with mock documents and status badges are displayed.
4. Click a document row to open Document Detail and confirm metadata card and processing timeline steps are shown.
5. Navigate to Personas and confirm 6 mock Korean persona entries are displayed with all fields.
6. Navigate to Test Sessions, verify the session creation form and session list with status badges are present.
7. Navigate to Results, verify filter bar and result cards with scores, Needs Review labels, and low score emphasis are displayed.
8. Click a result to open Result Detail and confirm all three sections (Persona Context, Question/Answer/Evidence, Score Breakdown) and the \"Mark for Improvement\" button are present.
9. Navigate to Settings and confirm all four placeholder sections and the prototype note are displayed.

---

## 8. Out of Scope (Not Implemented in This Version)

- Real backend integration and database
- Authentication and authorization
- Supabase integration
- Payment functionality
- Real AI or LLM API calls
- Real RAG pipeline execution
- Real file parsing, text extraction, chunking, embedding
- Real vector search
- Actual LLM provider, embedding provider, or vector DB configuration
- Any server-side processing
