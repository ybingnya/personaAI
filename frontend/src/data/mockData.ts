// personaAI — Mock Data

export type DocumentCategory =
  | 'Academic'
  | 'Scholarship'
  | 'Course Registration'
  | 'Graduation'
  | 'Student Support'
  | 'FAQ';
export type DocumentStatus = 'UPLOADED' | 'PROCESSING' | 'READY' | 'FAILED';
export type SessionStatus = 'CREATED' | 'RUNNING' | 'COMPLETED' | 'FAILED';

export interface Document {
  id: string;
  title: string;
  originalFilename: string;
  category: DocumentCategory;
  contentType: string;
  fileSize: string;
  status: DocumentStatus;
  uploadedDate: string;
  chunkCount?: number;
}

export interface Persona {
  id: string;
  label: string;
  age: number;
  region: string;
  occupation: string;
  educationLevel: string;
  situation: string;
  interests: string;
}

export interface TestSession {
  id: string;
  title: string;
  personaIds: string[];
  personaLabels: string[];
  documentIds: string[];
  documentTitles: string[];
  questionsPerPersona: number;
  totalQuestions: number;
  answeredQuestions: number;
  evaluatedQuestions: number;
  status: SessionStatus;
  createdDate: string;
  // Legacy single-persona fields kept for backward compat
  personaId?: string;
  personaLabel?: string;
  questionCount?: number;
}

export interface EvidenceChunk {
  chunkId: string;
  documentTitle: string;
  previewText: string;
}

export interface EvalScores {
  accuracy: number;
  groundedness: number;
  personaReflection: number;
  clarity: number;
  completeness: number;
}

export interface EvaluationResult {
  id: string;
  sessionId: string;
  sessionTitle: string;
  personaId: string;
  personaLabel: string;
  documentId: string;
  documentTitle: string;
  generatedQuestion: string;
  ragAnswer: string;
  evidenceChunks: EvidenceChunk[];
  scores: EvalScores;
  totalScore: number;
  issueSummary: string;
  improvementSuggestion: string;
  needsReview: boolean;
}

// ── Documents ──────────────────────────────────────────────────────────────
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: '2026학년도 교내장학금 안내',
    originalFilename: '2026_campus_scholarship.pdf',
    category: 'Scholarship',
    contentType: 'PDF',
    fileSize: '1.6 MB',
    status: 'READY',
    uploadedDate: '2026-08-01',
    chunkCount: 34,
  },
  {
    id: 'doc-2',
    title: '2026-2학기 수강신청 안내',
    originalFilename: '2026_2_course_registration.pdf',
    category: 'Course Registration',
    contentType: 'PDF',
    fileSize: '2.1 MB',
    status: 'READY',
    uploadedDate: '2026-08-03',
    chunkCount: 48,
  },
  {
    id: 'doc-3',
    title: '졸업요건 및 졸업인증제 안내',
    originalFilename: 'graduation_requirements_2026.pdf',
    category: 'Graduation',
    contentType: 'PDF',
    fileSize: '3.1 MB',
    status: 'READY',
    uploadedDate: '2026-08-05',
    chunkCount: 61,
  },
  {
    id: 'doc-4',
    title: '휴학 및 복학 신청 안내',
    originalFilename: 'leave_return_guide_2026.pdf',
    category: 'Academic',
    contentType: 'PDF',
    fileSize: '890 KB',
    status: 'READY',
    uploadedDate: '2026-08-07',
    chunkCount: 22,
  },
  {
    id: 'doc-5',
    title: '국가장학금 신청 안내',
    originalFilename: 'national_scholarship_2026.pdf',
    category: 'Scholarship',
    contentType: 'PDF',
    fileSize: '2.4 MB',
    status: 'READY',
    uploadedDate: '2026-08-10',
    chunkCount: 53,
  },
  {
    id: 'doc-6',
    title: '학생 생활관(기숙사) 신청 안내',
    originalFilename: 'dormitory_2026.docx',
    category: 'Student Support',
    contentType: 'DOCX',
    fileSize: '980 KB',
    status: 'PROCESSING',
    uploadedDate: '2026-08-15',
  },
  {
    id: 'doc-7',
    title: '학자금 대출 및 등록금 FAQ',
    originalFilename: 'tuition_loan_faq_2026.txt',
    category: 'FAQ',
    contentType: 'TXT',
    fileSize: '145 KB',
    status: 'UPLOADED',
    uploadedDate: '2026-08-18',
  },
];

// ── Sample Chunks (for detail view) ───────────────────────────────────────
export interface DocumentChunk {
  chunkId: string;
  chunkIndex: number;
  previewText: string;
  charCount: number;
}

export const mockChunks: Record<string, DocumentChunk[]> = {
  'doc-1': [
    { chunkId: 'doc1-chunk-1', chunkIndex: 1, previewText: '교내장학금 안내 — 한국대학교는 재학생의 학업 장려를 위하여 성적 우수자 및 저소득층 학생을 대상으로 교내장학금을 지급합니다.', charCount: 98 },
    { chunkId: 'doc1-chunk-12', chunkIndex: 12, previewText: '성적 기준 장학금: 직전 학기 평점평균이 3.5 이상인 재학생을 대상으로 하며, 해당 학기 12학점 이상 이수자에 한합니다. 신청 기간은 2026년 9월 14일부터 9월 25일까지입니다.', charCount: 112 },
    { chunkId: 'doc1-chunk-18', chunkIndex: 18, previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털(portal.university.ac.kr)에서 온라인으로 제출하며 방문 접수는 불가합니다.', charCount: 104 },
    { chunkId: 'doc1-chunk-24', chunkIndex: 24, previewText: '저소득층 우대 장학금: 가구소득 3분위 이하 학생은 성적 기준 완화 적용(3.0 이상). 증빙서류로 건강보험료 납부확인서 제출 필요.', charCount: 89 },
  ],
  'doc-2': [
    { chunkId: 'doc2-chunk-1', chunkIndex: 1, previewText: '2026학년도 2학기 수강신청 안내 — 수강신청 기간: 1차 2026년 8월 25일~27일, 2차 8월 29일~30일. 수강정정 기간: 9월 3일~5일.', charCount: 95 },
    { chunkId: 'doc2-chunk-6', chunkIndex: 6, previewText: '학기당 최대 이수학점: 기본 18학점, 직전 학기 3.5 이상인 경우 21학점, 4.0 이상인 경우 24학점까지 신청 가능합니다.', charCount: 86 },
    { chunkId: 'doc2-chunk-11', chunkIndex: 11, previewText: '복수전공 및 부전공 학생의 경우, 주전공 우선 수강신청 후 복수전공 과목을 추가로 신청할 수 있습니다. 복수전공 필수과목은 수강신청 기간 내 반드시 신청해야 합니다.', charCount: 108 },
  ],
};

// ── Personas ───────────────────────────────────────────────────────────────
export const mockPersonas: Persona[] = [
  {
    id: 'per-1',
    label: '교내장학금 신청을 고민하는 3학년 학생',
    age: 22,
    region: '서울',
    occupation: '대학생',
    educationLevel: '3학년',
    situation: '직전 학기 평점이 3.6으로 교내 장학금 신청 가능 여부를 확인하고 싶어함',
    interests: '장학금, 등록금, 취업',
  },
  {
    id: 'per-2',
    label: '저소득층 장학금 신청을 고민하는 2학년 학생',
    age: 21,
    region: '부산',
    occupation: '대학생',
    educationLevel: '2학년',
    situation: '가정 형편이 어려워 국가장학금 및 교내장학금 신청을 적극적으로 검토 중',
    interests: '국가장학금, 교내장학금, 생활비 지원',
  },
  {
    id: 'per-3',
    label: '졸업요건을 확인하는 4학년 학생',
    age: 24,
    region: '서울',
    occupation: '대학생',
    educationLevel: '4학년',
    situation: '졸업 요건 충족 여부와 졸업인증 조건을 확인하고 싶어함',
    interests: '취업 준비, 졸업논문, 졸업 후 진로',
  },
  {
    id: 'per-4',
    label: '휴학 후 복학 예정인 학생',
    age: 23,
    region: '대구',
    occupation: '대학생',
    educationLevel: '3학년',
    situation: '군 복무를 마치고 다음 학기 복학을 준비 중. 복학 신청 기간과 장학금 수혜 가능 여부 확인 필요',
    interests: '복학 절차, 수강신청, 학점 이수 계획',
  },
  {
    id: 'per-5',
    label: '수강신청에 어려움을 겪는 복수전공 학생',
    age: 22,
    region: '인천',
    occupation: '대학생',
    educationLevel: '3학년',
    situation: '복수전공을 이수하면서 주전공과 복수전공의 필수과목 이수 계획에 어려움을 겪고 있음',
    interests: '수강신청, 학점 관리, 복수전공 이수 요건',
  },
  {
    id: 'per-6',
    label: '등록금 납부와 학자금 대출을 고민하는 학생',
    age: 20,
    region: '광주',
    occupation: '대학생',
    educationLevel: '2학년',
    situation: '등록금 납부 기한이 다가왔으나 자금이 부족하여 학자금 대출 신청을 검토 중',
    interests: '학자금 대출 조건, 납부 일정, 분할납부 가능 여부',
  },
  {
    id: 'per-7',
    label: '지방에서 상경한 신입생',
    age: 19,
    region: '전주',
    occupation: '대학생',
    educationLevel: '1학년',
    situation: '처음으로 서울에서 대학 생활 시작. 수강신청 방법과 기숙사 신청 정보 필요',
    interests: '기숙사, 학교 생활 적응, 장학금, 수강신청',
  },
  {
    id: 'per-8',
    label: '국가장학금 소득분위 확인이 필요한 학생',
    age: 21,
    region: '대전',
    occupation: '대학생',
    educationLevel: '2학년',
    situation: '가족 소득이 변경되어 국가장학금 소득분위가 어떻게 산정되는지 알고 싶어함',
    interests: '국가장학금, 소득분위, 장학금 자격',
  },
  {
    id: 'per-9',
    label: '전과를 고려하는 학생',
    age: 20,
    region: '수원',
    occupation: '대학생',
    educationLevel: '2학년',
    situation: '현재 학과와 맞지 않아 전과를 고려 중. 전과 신청 조건과 절차를 확인하고 싶어함',
    interests: '전과, 복수전공, 학점 이수',
  },
  {
    id: 'per-10',
    label: '외국어 졸업인증 요건을 확인하는 학생',
    age: 23,
    region: '서울',
    occupation: '대학생',
    educationLevel: '4학년',
    situation: '토익 성적이 있는데 졸업인증 외국어 기준을 충족하는지 확인 필요',
    interests: '졸업인증, 외국어 시험, 졸업 요건',
  },
];

// ── Persona generator helper ──────────────────────────────────────────────
const REGIONS = ['서울', '부산', '대구', '인천', '광주', '대전', '수원', '전주', '창원', '청주'];
const YEARS = ['1학년', '2학년', '3학년', '4학년'];
const SITUATIONS = [
  '장학금 신청 가능 여부를 확인하고 싶어함',
  '수강신청 학점 제한에 대해 문의하려고 함',
  '졸업 요건 충족 여부를 확인 중',
  '복학 신청 절차를 알아보고 있음',
  '국가장학금 소득분위 산정 방식이 궁금함',
  '기숙사 신청 일정을 알고 싶어함',
  '복수전공 신청 조건을 확인하고 싶어함',
  '학자금 대출 조건과 절차를 알아보고 있음',
];
const INTERESTS_LIST = [
  '장학금, 등록금, 생활비',
  '수강신청, 학점 관리',
  '졸업 요건, 취업 준비',
  '복학 절차, 군 복무',
  '기숙사, 학교 생활',
  '복수전공, 전과',
  '학자금 대출, 납부',
  '국가장학금, 소득분위',
];

export function generatePersonas(count: number): Persona[] {
  return Array.from({ length: count }, (_, i) => {
    const baseIdx = i % mockPersonas.length;
    const base = mockPersonas[baseIdx];
    const age = 19 + (i % 7);
    const year = YEARS[i % YEARS.length];
    const region = REGIONS[i % REGIONS.length];
    return {
      id: `per-gen-${i + 1}`,
      label: `${age}세 / ${region} / 대학생 / ${year}`,
      age,
      region,
      occupation: '대학생',
      educationLevel: year,
      situation: SITUATIONS[i % SITUATIONS.length],
      interests: INTERESTS_LIST[i % INTERESTS_LIST.length],
    };
    return base; // unreachable but keeps TS happy
  });
}

// ── Test Sessions ──────────────────────────────────────────────────────────
export const mockSessions: TestSession[] = [
  {
    id: 'ses-1',
    title: '2026 Scholarship Chatbot Evaluation',
    personaIds: ['per-1', 'per-2', 'per-8'],
    personaLabels: ['교내장학금 신청을 고민하는 3학년 학생', '저소득층 장학금 신청을 고민하는 2학년 학생', '국가장학금 소득분위 확인이 필요한 학생'],
    documentIds: ['doc-1', 'doc-5'],
    documentTitles: ['2026학년도 교내장학금 안내', '국가장학금 신청 안내'],
    questionsPerPersona: 3,
    totalQuestions: 9,
    answeredQuestions: 9,
    evaluatedQuestions: 9,
    status: 'COMPLETED',
    createdDate: '2026-09-01',
    personaId: 'per-1',
    personaLabel: '교내장학금 신청을 고민하는 3학년 학생',
    questionCount: 9,
  },
  {
    id: 'ses-2',
    title: '2026-2학기 수강신청 평가',
    personaIds: ['per-5', 'per-7'],
    personaLabels: ['수강신청에 어려움을 겪는 복수전공 학생', '지방에서 상경한 신입생'],
    documentIds: ['doc-2'],
    documentTitles: ['2026-2학기 수강신청 안내'],
    questionsPerPersona: 3,
    totalQuestions: 6,
    answeredQuestions: 6,
    evaluatedQuestions: 6,
    status: 'COMPLETED',
    createdDate: '2026-09-03',
    personaId: 'per-5',
    personaLabel: '수강신청에 어려움을 겪는 복수전공 학생',
    questionCount: 6,
  },
  {
    id: 'ses-3',
    title: '졸업요건 및 복학 평가',
    personaIds: ['per-3', 'per-4'],
    personaLabels: ['졸업요건을 확인하는 4학년 학생', '휴학 후 복학 예정인 학생'],
    documentIds: ['doc-3', 'doc-4'],
    documentTitles: ['졸업요건 및 졸업인증제 안내', '휴학 및 복학 신청 안내'],
    questionsPerPersona: 3,
    totalQuestions: 6,
    answeredQuestions: 4,
    evaluatedQuestions: 3,
    status: 'RUNNING',
    createdDate: '2026-09-07',
    personaId: 'per-3',
    personaLabel: '졸업요건을 확인하는 4학년 학생',
    questionCount: 6,
  },
  {
    id: 'ses-4',
    title: '학자금 대출 FAQ 평가',
    personaIds: ['per-6'],
    personaLabels: ['등록금 납부와 학자금 대출을 고민하는 학생'],
    documentIds: ['doc-7'],
    documentTitles: ['학자금 대출 및 등록금 FAQ'],
    questionsPerPersona: 5,
    totalQuestions: 5,
    answeredQuestions: 0,
    evaluatedQuestions: 0,
    status: 'CREATED',
    createdDate: '2026-09-09',
    personaId: 'per-6',
    personaLabel: '등록금 납부와 학자금 대출을 고민하는 학생',
    questionCount: 5,
  },
];

// ── Evaluation Results ─────────────────────────────────────────────────────
export const mockResults: EvaluationResult[] = [
  {
    id: 'res-1',
    sessionId: 'ses-1',
    sessionTitle: '2026 Scholarship Chatbot Evaluation',
    personaId: 'per-1',
    personaLabel: '교내장학금 신청을 고민하는 3학년 학생',
    documentId: 'doc-1',
    documentTitle: '2026학년도 교내장학금 안내',
    generatedQuestion: '저는 현재 3학년이고 지난 학기 평점이 3.6인데, 교내 장학금에 신청할 수 있나요?',
    ragAnswer:
      '직전 학기 평점평균이 3.5 이상이므로 성적 기준은 충족합니다. 다만 해당 장학금은 재학생을 대상으로 하며, 신청 기간(2026년 9월 14일 ~ 9월 25일)과 제출 서류(장학금 신청서, 재학증명서, 성적증명서)를 추가로 확인하고 준비해야 합니다. 신청은 학생포털(portal.university.ac.kr)에서 온라인으로만 접수 가능합니다.',
    evidenceChunks: [
      {
        chunkId: 'doc1-chunk-12',
        documentTitle: '2026학년도 교내장학금 안내',
        previewText: '성적 기준 장학금: 직전 학기 평점평균이 3.5 이상인 재학생을 대상으로 하며, 해당 학기 12학점 이상 이수자에 한합니다. 신청 기간은 2026년 9월 14일부터 9월 25일까지입니다.',
      },
      {
        chunkId: 'doc1-chunk-18',
        documentTitle: '2026학년도 교내장학금 안내',
        previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털(portal.university.ac.kr)에서 온라인으로 제출하며 방문 접수는 불가합니다.',
      },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 4, clarity: 5, completeness: 3 },
    totalScore: 22,
    issueSummary: '신청 기간과 필수 제출 서류가 답변에서 누락됨.',
    improvementSuggestion: '신청 가능 여부뿐 아니라 신청 기간과 제출 서류까지 함께 안내하도록 답변을 보완해야 함.',
    needsReview: false,
  },
  {
    id: 'res-2',
    sessionId: 'ses-1',
    sessionTitle: '2026 Scholarship Chatbot Evaluation',
    personaId: 'per-2',
    personaLabel: '저소득층 장학금 신청을 고민하는 2학년 학생',
    documentId: 'doc-5',
    documentTitle: '국가장학금 신청 안내',
    generatedQuestion: '휴학 중에도 국가장학금을 받을 수 있나요?',
    ragAnswer: '장학금 수혜는 가능합니다. 자세한 사항은 담당 부서에 문의하시기 바랍니다.',
    evidenceChunks: [
      {
        chunkId: 'doc5-chunk-8',
        documentTitle: '국가장학금 신청 안내',
        previewText: '휴학생은 원칙적으로 국가장학금 수혜 대상이 아닙니다. 단, 질병 휴학, 임신·출산 휴학의 경우 예외 적용 가능...',
      },
    ],
    scores: { accuracy: 2, groundedness: 1, personaReflection: 2, clarity: 3, completeness: 1 },
    totalScore: 9,
    issueSummary: '답변이 문서 내용과 상충됩니다. 휴학생은 원칙적으로 수혜 불가이나 답변은 "가능하다"고 잘못 기술했습니다.',
    improvementSuggestion: '원칙적으로 수혜 불가임을 명시하고, 질병·임신·출산 휴학 등 예외 조건을 문서 기반으로 명확히 안내해야 합니다.',
    needsReview: true,
  },
  {
    id: 'res-3',
    sessionId: 'ses-2',
    sessionTitle: '2026-2학기 수강신청 평가',
    personaId: 'per-5',
    personaLabel: '수강신청에 어려움을 겪는 복수전공 학생',
    documentId: 'doc-2',
    documentTitle: '2026-2학기 수강신청 안내',
    generatedQuestion: '수강신청 시 최대 몇 학점까지 신청할 수 있나요?',
    ragAnswer: '일반적으로 학기당 최대 21학점까지 신청할 수 있습니다. 단, 직전 학기 성적이 4.0 이상인 경우 24학점까지 신청 가능합니다.',
    evidenceChunks: [
      {
        chunkId: 'doc2-chunk-6',
        documentTitle: '2026-2학기 수강신청 안내',
        previewText: '학기당 최대 이수학점: 기본 18학점, 직전 학기 3.5 이상인 경우 21학점, 4.0 이상인 경우 24학점까지 신청 가능합니다.',
      },
    ],
    scores: { accuracy: 2, groundedness: 3, personaReflection: 3, clarity: 4, completeness: 2 },
    totalScore: 14,
    issueSummary: '답변이 기본 한도를 18학점이 아닌 21학점으로 잘못 기재했습니다.',
    improvementSuggestion: '문서의 정확한 수치(18/21/24학점)를 인용하고, 각 기준에 해당하는 성적 요건을 명확히 구분하여 답변해야 합니다.',
    needsReview: true,
  },
  {
    id: 'res-4',
    sessionId: 'ses-2',
    sessionTitle: '2026-2학기 수강신청 평가',
    personaId: 'per-7',
    personaLabel: '지방에서 상경한 신입생',
    documentId: 'doc-2',
    documentTitle: '2026-2학기 수강신청 안내',
    generatedQuestion: '1학년 신입생의 수강신청 기간은 언제인가요?',
    ragAnswer: '1차 수강신청은 2026년 8월 25일부터 27일까지이며, 2차 수강신청은 8월 29일부터 30일까지입니다. 수강 정정 기간은 9월 3일부터 5일까지 진행됩니다. 신입생은 1차 수강신청에 참여할 수 있습니다.',
    evidenceChunks: [
      {
        chunkId: 'doc2-chunk-1',
        documentTitle: '2026-2학기 수강신청 안내',
        previewText: '수강신청 기간: 1차 2026년 8월 25일~27일, 2차 8월 29일~30일. 수강정정 기간: 9월 3일~5일.',
      },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 5, clarity: 5, completeness: 4 },
    totalScore: 24,
    issueSummary: '신입생 우선 배정 시스템에 대한 설명이 없습니다.',
    improvementSuggestion: '신입생 대상 수강신청 시스템 특이사항(우선 배정 과목 등)을 추가하면 완성도가 높아집니다.',
    needsReview: false,
  },
  {
    id: 'res-5',
    sessionId: 'ses-1',
    sessionTitle: '2026 Scholarship Chatbot Evaluation',
    personaId: 'per-8',
    personaLabel: '국가장학금 소득분위 확인이 필요한 학생',
    documentId: 'doc-5',
    documentTitle: '국가장학금 신청 안내',
    generatedQuestion: '국가장학금 소득분위는 어떻게 계산되나요?',
    ragAnswer: '국가장학금 소득분위는 가구의 건강보험료 납부액을 기준으로 산정됩니다. 가구원 수와 건강보험료 금액에 따라 1~10분위로 나뉘며, 8분위 이하인 경우 신청 가능합니다. 최신 소득분위 기준표는 한국장학재단 홈페이지에서 확인할 수 있습니다.',
    evidenceChunks: [
      {
        chunkId: 'doc5-chunk-3',
        documentTitle: '국가장학금 신청 안내',
        previewText: '소득분위 산정 기준: 건강보험료 납부액 기준. 가구원 수별 소득분위 기준표는 한국장학재단 홈페이지 참조...',
      },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 4, clarity: 5, completeness: 5 },
    totalScore: 24,
    issueSummary: '분위별 지원 금액 정보가 없습니다.',
    improvementSuggestion: '분위별 지원 금액(예: 1~3분위 전액, 4~6분위 일부 등)을 함께 안내하면 페르소나에게 더 유용한 답변이 됩니다.',
    needsReview: false,
  },
  {
    id: 'res-6',
    sessionId: 'ses-1',
    sessionTitle: '2026 Scholarship Chatbot Evaluation',
    personaId: 'per-1',
    personaLabel: '교내장학금 신청을 고민하는 3학년 학생',
    documentId: 'doc-1',
    documentTitle: '2026학년도 교내장학금 안내',
    generatedQuestion: '저소득층 우대 장학금 신청 조건이 어떻게 되나요?',
    ragAnswer: '저소득층 우대 장학금은 가구소득 3분위 이하 학생에게 성적 기준을 완화하여 적용합니다. 평점 3.0 이상이면 신청 가능하며, 건강보험료 납부확인서를 제출해야 합니다.',
    evidenceChunks: [
      {
        chunkId: 'doc1-chunk-24',
        documentTitle: '2026학년도 교내장학금 안내',
        previewText: '저소득층 우대 장학금: 가구소득 3분위 이하 학생은 성적 기준 완화 적용(3.0 이상). 증빙서류로 건강보험료 납부확인서 제출 필요.',
      },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 4, clarity: 5, completeness: 4 },
    totalScore: 23,
    issueSummary: '지원 금액과 신청 방법에 대한 구체적인 안내가 부족합니다.',
    improvementSuggestion: '지원 금액과 신청 방법(포털 링크 등)을 추가하면 완성도가 높아집니다.',
    needsReview: false,
  },
];

// ── Chat workspace mock Q&A ────────────────────────────────────────────────
export interface ChatMessage {
  id: string;
  role: 'persona' | 'searching' | 'found' | 'rag';
  content: string;
  chunks?: EvidenceChunk[];
  scores?: EvalScores;
  totalScore?: number;
  issueSummary?: string;
  improvementSuggestion?: string;
}

export interface WorkspaceQuestion {
  id: string;
  personaId: string;
  questionIndex: number;
  question: string;
  messages: ChatMessage[];
  scores?: EvalScores;
  totalScore?: number;
  issueSummary?: string;
  improvementSuggestion?: string;
}

export const mockWorkspaceQuestions: WorkspaceQuestion[] = [
  {
    id: 'wq-1',
    personaId: 'per-1',
    questionIndex: 1,
    question: '저는 현재 3학년이고 지난 학기 평점이 3.6인데, 교내 장학금에 신청할 수 있나요?',
    messages: [
      {
        id: 'msg-1',
        role: 'persona',
        content: '저는 현재 3학년이고 지난 학기 평점이 3.6인데, 교내 장학금에 신청할 수 있나요?',
      },
      {
        id: 'msg-2',
        role: 'searching',
        content: '업로드된 문서에서 관련 정보를 검색하는 중...',
      },
      {
        id: 'msg-3',
        role: 'found',
        content: '관련 문서 섹션 2개를 찾았습니다.',
        chunks: [
          {
            chunkId: 'doc1-chunk-12',
            documentTitle: '2026학년도 교내장학금 안내',
            previewText: '성적 기준 장학금: 직전 학기 평점평균이 3.5 이상인 재학생을 대상으로 하며, 해당 학기 12학점 이상 이수자에 한합니다. 신청 기간은 2026년 9월 14일부터 9월 25일까지입니다.',
          },
          {
            chunkId: 'doc1-chunk-18',
            documentTitle: '2026학년도 교내장학금 안내',
            previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털(portal.university.ac.kr)에서 온라인으로 제출하며 방문 접수는 불가합니다.',
          },
        ],
      },
      {
        id: 'msg-4',
        role: 'rag',
        content: '직전 학기 평점평균이 3.5 이상이므로 성적 기준은 충족합니다. 다만 해당 장학금은 재학생을 대상으로 하며 신청 기간과 제출 서류를 추가로 확인해야 합니다.',
        chunks: [
          {
            chunkId: 'doc1-chunk-12',
            documentTitle: '2026학년도 교내장학금 안내',
            previewText: '성적 기준 장학금: 직전 학기 평점평균이 3.5 이상인 재학생을 대상으로 하며, 해당 학기 12학점 이상 이수자에 한합니다. 신청 기간은 2026년 9월 14일부터 9월 25일까지입니다.',
          },
          {
            chunkId: 'doc1-chunk-18',
            documentTitle: '2026학년도 교내장학금 안내',
            previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털(portal.university.ac.kr)에서 온라인으로 제출하며 방문 접수는 불가합니다.',
          },
        ],
        scores: { accuracy: 5, groundedness: 5, personaReflection: 4, clarity: 5, completeness: 3 },
        totalScore: 22,
        issueSummary: '신청 기간과 필수 제출 서류가 답변에서 누락됨.',
        improvementSuggestion: '신청 가능 여부뿐 아니라 신청 기간과 제출 서류까지 함께 안내하도록 답변을 보완해야 함.',
      },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 4, clarity: 5, completeness: 3 },
    totalScore: 22,
    issueSummary: '신청 기간과 필수 제출 서류가 답변에서 누락됨.',
    improvementSuggestion: '신청 가능 여부뿐 아니라 신청 기간과 제출 서류까지 함께 안내하도록 답변을 보완해야 함.',
  },
  {
    id: 'wq-2',
    personaId: 'per-1',
    questionIndex: 2,
    question: '교내장학금 신청에 필요한 서류는 무엇인가요?',
    messages: [
      { id: 'msg-5', role: 'persona', content: '교내장학금 신청에 필요한 서류는 무엇인가요?' },
      { id: 'msg-6', role: 'searching', content: '업로드된 문서에서 관련 정보를 검색하는 중...' },
      { id: 'msg-7', role: 'found', content: '관련 문서 섹션 1개를 찾았습니다.', chunks: [{ chunkId: 'doc1-chunk-18', documentTitle: '2026학년도 교내장학금 안내', previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털에서 온라인으로 제출하며 방문 접수는 불가합니다.' }] },
      { id: 'msg-8', role: 'rag', content: '교내장학금 신청에 필요한 서류는 장학금 신청서, 재학증명서, 성적증명서입니다. 모든 서류는 학생포털(portal.university.ac.kr)에서 온라인으로 제출합니다. 방문 접수는 받지 않으므로 주의하세요.', chunks: [{ chunkId: 'doc1-chunk-18', documentTitle: '2026학년도 교내장학금 안내', previewText: '제출 서류: 장학금 신청서, 재학증명서, 성적증명서. 신청은 학생포털에서 온라인으로 제출하며 방문 접수는 불가합니다.' }], scores: { accuracy: 5, groundedness: 5, personaReflection: 5, clarity: 5, completeness: 5 }, totalScore: 25, issueSummary: '', improvementSuggestion: '완성도 높은 답변입니다. 포털 링크를 직접 제공하면 더욱 유용합니다.' },
    ],
    scores: { accuracy: 5, groundedness: 5, personaReflection: 5, clarity: 5, completeness: 5 },
    totalScore: 25,
    issueSummary: '',
    improvementSuggestion: '완성도 높은 답변입니다. 포털 링크를 직접 제공하면 더욱 유용합니다.',
  },
  {
    id: 'wq-3',
    personaId: 'per-2',
    questionIndex: 1,
    question: '휴학 중에도 국가장학금을 받을 수 있나요?',
    messages: [
      { id: 'msg-9', role: 'persona', content: '저는 현재 휴학 중인데 국가장학금을 받을 수 있나요?' },
      { id: 'msg-10', role: 'searching', content: '업로드된 문서에서 관련 정보를 검색하는 중...' },
      { id: 'msg-11', role: 'found', content: '관련 문서 섹션 1개를 찾았습니다.', chunks: [{ chunkId: 'doc5-chunk-8', documentTitle: '국가장학금 신청 안내', previewText: '휴학생은 원칙적으로 국가장학금 수혜 대상이 아닙니다. 단, 질병 휴학, 임신·출산 휴학의 경우 예외 적용 가능...' }] },
      { id: 'msg-12', role: 'rag', content: '장학금 수혜는 가능합니다. 자세한 사항은 담당 부서에 문의하시기 바랍니다.', chunks: [{ chunkId: 'doc5-chunk-8', documentTitle: '국가장학금 신청 안내', previewText: '휴학생은 원칙적으로 국가장학금 수혜 대상이 아닙니다. 단, 질병 휴학, 임신·출산 휴학의 경우 예외 적용 가능...' }], scores: { accuracy: 2, groundedness: 1, personaReflection: 2, clarity: 3, completeness: 1 }, totalScore: 9, issueSummary: '답변이 문서 내용과 상충됩니다. 실제로 휴학생은 원칙적으로 국가장학금 수혜 불가이나, 답변은 "가능하다"고 잘못 기술했습니다.', improvementSuggestion: '원칙적으로 수혜 불가임을 명시하고, 질병·임신·출산 휴학 등 예외 조건을 문서 기반으로 명확히 안내해야 합니다.' },
    ],
    scores: { accuracy: 2, groundedness: 1, personaReflection: 2, clarity: 3, completeness: 1 },
    totalScore: 9,
    issueSummary: '답변이 문서 내용과 상충됩니다. 실제로 휴학생은 원칙적으로 국가장학금 수혜 불가이나, 답변은 "가능하다"고 잘못 기술했습니다.',
    improvementSuggestion: '원칙적으로 수혜 불가임을 명시하고, 질병·임신·출산 휴학 등 예외 조건을 문서 기반으로 명확히 안내해야 합니다.',
  },
];
