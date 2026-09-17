# 세종대학교 공식 문서 기반 2026-1 RAG 데이터 준비 보고서

- 프로젝트: personaAI
- 평가 기준 시점: **2026학년도 1학기** (`academic_year=2026`, `semester=1`, `as_of_date=2026-03-01`)
- 점검일: 2026-09-17 (Asia/Seoul)
- 범위: 세종대학교 공식 문서 수집 결과의 품질 점검, 검색용 구조화·Chunk 구성, Persona 평가셋 작성 및 무결성 검증

## 1. 프로젝트 개요

이 작업의 목표는 학생이 “내 학점과 소득구간이면 장학금을 받을 수 있는가?”, “내 입학연도에 영어졸업인증 기준은 얼마인가?”와 같이 질문했을 때, 답변이 일반적인 대학 규정이나 모델의 기억이 아니라 세종대학교 공식 문서의 해당 조항과 표를 근거로 하도록 준비하는 것이다. 장학금, 수강, 휴학·복학, 졸업인증, 등록금 자료는 학생의 학년·입학연도·성적·이수학점·소득구간·재학 상태에 따라 답이 달라지는 대표적인 영역이다.

이번 단계는 RAG(Retrieval-Augmented Generation, 검색 증강 생성) 시스템 전체 구현이 아니다. 공식 게시글과 첨부 원본을 보존하고, 의미 단위 검색 문서와 메타데이터, Persona 평가 질문을 준비한 단계다. Embedding, Vector DB, 검색기, LLM 답변 생성, 자동 평가 Agent는 아직 구현하지 않았다.

## 2. 일반 LLM과 RAG의 차이

일반 LLM은 학습 때 얻은 지식과 현재 프롬프트를 바탕으로 답한다. 특정 학교의 특정 학기 공지, 첨부표, 신청 마감처럼 범위가 좁고 시간이 지나면 바뀌는 정보는 모델이 알지 못하거나 다른 대학·다른 학기의 규정을 섞어 답할 수 있다.

RAG는 질문을 받으면 먼저 관련 문서를 검색하고, 검색된 본문을 답변 모델에 함께 전달한다. 따라서 답변에 공식 URL과 페이지/원문 위치를 붙이고, 적용 학기와 마감 상태를 구분하며, 표의 수치와 예외 조건을 문서에서 직접 확인할 수 있다. Persona 기반 RAG는 학생의 구조화된 조건을 문서의 자격 조건과 비교한다. 예를 들어 “2024학번·영어데이터융합전공·TOEIC 850점”을 2026-1 편람의 전공별 기준과 대조하고, 누락된 인증 상태는 추정하지 않는다.

| 질문 | 일반 LLM의 위험 | 이번 RAG 준비 데이터의 사용 방식 |
|---|---|---|
| “2026-1 수강 가능 학점은?” | 다른 학기 규정 또는 기억한 일반 규정 혼합 | `applicable_year=2026`, `semester=1`, 수강편람 p.6 Chunk 인용 |
| “내 성적이면 21학점인가?” | B0와 B+ 조건을 혼동 | Persona의 직전학점·성적을 Chunk의 조건식과 비교 |
| “신청할 수 있나?” | 마감 여부를 현재 날짜로 추측 | 평가 시점 `as_of_date=2026-03-01`을 사용하고 문서 상태와 분리 |
| “정확한 환불액은?” | 개인 납부내역을 임의 생성 | 필요한 개인 정보가 없으면 답변 불가와 확인 항목 제시 |

## 3. 수집 대상과 선정 기준

기존 인벤토리는 세종대학교 공식 홈페이지 게시글과 첨부파일만 대상으로 했다. 2026년에 게시된 자료를 우선했고, 적용 학기가 2027인 자료는 포함하지 않았다. 평가셋에서는 2026-1 자료만 참조하도록 다시 정렬했다.

| 영역 | 수집·평가 목적 | Persona 조건 예시 |
|---|---|---|
| 장학금 | 소득·성적·이수학점·예외 조건 확인 | 소득구간, 학사경고, 장애·보훈, 수혜 이력 |
| 수강 | 학점 상한·재수강·복수전공·수강 제한 | 학년, 직전학점, 성적, 선수과목, 복수전공 |
| 학사 | 휴학·복학과 학적 상태 판단 | 신입생, 편입생, 복학생, 대출 여부 |
| 졸업 | 입학연도·전공별 인증 조건 확인 | 입학연도, 전공, TOEIC, 고전독서·코딩 인증 |
| 학생지원 | 등록·0원 등록·분납·환불 규정 확인 | 전액 장학, 재입학생, 휴학일, 납부내역 |

실제 보존 원본은 PDF 8개, DOCX 1개, XLSX 1개, HWP 5개로 총 15개다. 공식 게시글을 문서 레코드로 묶은 수는 10건이다. 원본 목록과 게시일·적용연도·조건은 `docs/source-documents/DOCUMENT_INVENTORY.md`와 `docs/source-documents/records/`에서 확인할 수 있다.

## 4. 원본 열람과 품질 점검

### 4.1 형식별 처리

| 형식 | 확인된 처리 | 한계 |
|---|---|---|
| PDF | PDF 페이지와 텍스트 레이어를 읽고 페이지별 본문·표를 추출했다. 표가 있는 페이지는 `structured_tables`로 셀 순서를 보존했다. | 회전 텍스트와 병합 셀은 추출 순서가 달라질 수 있어 핵심 페이지를 렌더링해 대조했다. |
| XLSX | `개설강좌` 시트의 헤더와 각 강좌 행을 읽어 행 단위 Chunk로 보존했다. | 첨부 시점 이후 시간·강의실 변경 여부는 파일만으로 확정할 수 없다. |
| DOCX | 본문 단락은 읽혔지만 표 객체는 없고 화면 캡처가 이미지로 삽입돼 있었다. | 이미지 OCR에서 2010~2013년 절차와 IE10 안내가 확인되어 현행 절차 근거로 사용하지 않았다. |
| HWP | pyhwp 계열 텍스트 추출 및 변환본 열람을 시도했다. | 표·그림이 `<표>`, `<그림>`으로 남아 셀 구조와 화면 위치가 보존되지 않았다. 서식·예시 파일은 `reference_only`다. |

### 4.2 자동 추출과 사람이 확인한 부분

품질 보고서에 기록된 실행 결과에 따르면 PDF는 `pdfplumber`/`pypdf`, DOCX는 `python-docx`, XLSX는 `openpyxl` 계열로 형식별 추출을 수행했다. HWP는 `hwp5txt`/`hwp5odt` 변환 결과를 확인했다. 다만 이 작업을 수행한 일회성 추출·생성 스크립트는 저장소에 체크인되어 있지 않으며, 함수명과 전체 실행 순서는 Git 기록으로 확인되지 않는다. 따라서 함수명을 임의로 만들지 않는다. 현재 저장소에서 확인 가능한 Python 코드는 학습보고서용 `build_form.py`이며 RAG 추출 코드가 아니고, `ai-server/app/main.py`도 `/health`만 제공한다.

사람이 원본 렌더와 대조한 범위는 다음과 같다.

- 수강편람 PDF p.6: 6~18학점, 최종학기 최소 3학점, 특정 입학연도 20학점, 직전 16학점+B+(3.5) 시 21학점
- 푸른등대 1쪽 요약표: 유형·선발 인원·학기당 금액·심사 열 정렬
- 등록금 한국어 PDF p.2: 2026-1 정규 등록 일정과 0원 등록 관련 표
- 휴학 HWP 첫 페이지: 구형 Windows/Internet Explorer 화면
- 특기장학금 예시 HWP: 표 레이아웃 손실과 2025-09-01 예시 날짜

국가장학금 홈페이지·모바일 PDF와 영어졸업인증 PDF는 이미지 중심이라 OCR을 보조적으로 수행했지만, OCR 텍스트를 정답 검색 근거로 사용하지 않았다. 103쪽 푸른등대 계획서의 모든 수치 표를 페이지별로 기계 추출했으나 모든 셀을 사람이 전수 대조한 것은 아니다.

## 5. 정제 문서와 Chunk 구성

`docs/rag-prep/chunks.jsonl`은 한 줄에 하나의 의미 단위가 있는 JSONL(JSON Lines) 파일이다. 단순한 고정 글자 수 절단 대신 다음 단위를 우선했다.

1. 공식 웹 게시글은 제목·본문 구간 단위로 분리
2. PDF는 페이지·절·표 단위로 분리
3. 표는 제목과 행을 함께 두고 `structured_tables`에 셀 순서 저장
4. XLSX는 헤더와 강좌 한 행을 묶어 과목명·시간·강의실을 함께 저장
5. 조건·예외·신청 기간은 서로 다른 규정과 섞이지 않도록 별도 Chunk로 유지

모든 Chunk에는 `chunk_id`, `document_id`, 문서명·Chunk 제목, 분류, 게시일, 적용연도·학기, 대상, 기간, 상태, 원본 파일명, 공식 URL, 원문 위치, 본문, 표 구조, 검색 허용 플래그가 있다. 상세 정의와 검색 규칙은 `SCHEMA.md`에 기록했다.

이번 평가의 상태 의미는 다음과 같다.

- `current`: 실제 현재 기준으로 유효한 안내
- `expired`: 신청 기간 또는 해당 학기가 종료된 자료. **2026-1 고정 평가에서는 검색에서 제외하지 않는다.**
- `reference_only`: OCR 신뢰가 낮거나, 구식 화면·2025 예시·빈 서식처럼 정답 근거로 부적합한 자료

## 6. Persona 평가 질문셋

`evaluation-questions.jsonl`에 30개 문항을 저장했다. 모든 문항은 `academic_year=2026`, `semester=1`, `as_of_date=2026-03-01`을 갖고 질문 문장에도 2026학년도 1학기 맥락을 명시한다. Persona에는 질문에 필요한 필드만 넣었다.

| 유형 | 수 | 평가 내용 |
|---|---:|---|
| 직접 사실 | 5 | 학점 상한, 휴학 기간, TOEIC 기준, 0원 등록 등 |
| Persona 조건 판단 | 5 | B0/직전학점, 학사경고, 신입생 휴학, 전공별 점수 |
| 표·예외 조항 | 5 | 초과학기, 재수강 F 예외, 예체능 인증, 분납 제한 |
| 복수 Chunk·문서 결합 | 5 | 복학+등록, 선수과목+시간 중복, 인증 기준 조합 |
| 답변 불가·추가 확인 | 5 | 개인 환불액, 지정 이수과목, 승인 상태 등 |
| 시점·일정 판별 | 5 | 1학기 신청·등록·인증 기간의 당시 상태 |

각 문항에는 기대 답변, 판단 조건, 지원 Chunk ID, 실제 원문 인용, 공식 URL·위치, 답변 가능 여부, 추가 확인 정보, 평가 기준(정확성·근거성·상황반영·설명 용이성·누락/오류)이 들어 있다. 개인별 납부내역이나 학사시스템 반영 여부처럼 문서에 없는 값은 `unanswerable` 또는 `partially_answerable`로 남겼다.

## 7. 검증 방법과 결과

검증은 다음 명령으로 수행했다.

```bash
python3 - <<'PY'
import json, collections
chunks=[json.loads(x) for x in open('docs/rag-prep/chunks.jsonl')]
questions=[json.loads(x) for x in open('docs/rag-prep/evaluation-questions.jsonl')]
by_id={x['chunk_id']: x for x in chunks}
assert len(chunks)==2968 and len(questions)==30
assert len({x['chunk_id'] for x in chunks})==len(chunks)
assert not any(not x['chunk_body'].strip() for x in chunks)
assert len({x['chunk_body'] for x in chunks})==len(chunks)
for q in questions:
    assert q['academic_year']==2026 and q['semester']==1
    for e in q['source_evidence']:
        assert e['chunk_id'] in by_id
        assert e['quote'] in by_id[e['chunk_id']]['chunk_body']
        assert e['source_url'].startswith('https://www.sejong.ac.kr/')
print(collections.Counter(q['question_type'] for q in questions))
PY
```

검증 결과:

| 항목 | 결과 |
|---|---:|
| 공식 게시글 문서 레코드 | 10건 |
| 첨부 원본 | 15건 |
| 전체 Chunk | 2,968개 |
| 2026-1 기본 검색 Chunk | 2,785개 |
| 상태별 Chunk | expired 2,891 / current 2 / reference_only 75 |
| 빈 Chunk | 0개 |
| 80자 미만 Chunk | 1개(수강편람 표지) |
| 완전 동일 본문 중복 | 0건 |
| 평가 문항 | 30건 |
| 지원 Chunk ID 존재 | 전건 통과 |
| 공식 URL 연결 | 전건 통과 |
| 원문 인용문–Chunk 본문 일치 | 전건 통과 |
| 2026-1 문서 참조 여부 | 전건 통과 |

반복 머리글·바닥글처럼 보이는 짧은 페이지 제목은 원문 위치를 보존하기 위해 삭제하지 않았다. 표 제목과 행은 같은 페이지 Chunk 및 `structured_tables`에 함께 남아 있다. 80자 미만 Chunk 하나는 의미 없는 빈 데이터라서 삭제하지 않은 표지 페이지다.

## 8. 결과 위치와 확인 방법

| 파일 | 역할 | 주요 필드 | 확인할 내용 |
|---|---|---|---|
| `docs/source-documents/DOCUMENT_INVENTORY.md` | 공식 문서 인벤토리 | title, category, source URL, 조건 요약 | 수집 대상·선정 이유 |
| `docs/source-documents/records/` | 문서별 원문 메타데이터와 기존 Persona 질문 | 문서 ID, 게시일, 적용연도 | 기존 수집 기록 |
| `docs/source-documents/{academic,courses,graduation,scholarships,student-support}/` | 공식 첨부 원본 | PDF/DOCX/XLSX/HWP | 원본 페이지·표·화면 |
| `docs/rag-prep/README.md` | 데이터셋 안내 | 파일 역할, 상태 규칙 | 전체 구성 |
| `docs/rag-prep/documents.jsonl` | 문서 수준 레지스트리 | document_id, publication_date, chunk_count | 문서별 Chunk 수·검색 상태 |
| `docs/rag-prep/chunks.jsonl` | 검색 단위 | chunk_id, body, table, source_location | 실제 검색 본문·출처 |
| `docs/rag-prep/evaluation-questions.jsonl` | Persona 평가셋 | persona, expected_answer, evidence | 질문–근거–평가 기준 |
| `docs/rag-prep/SCHEMA.md` | 메타데이터 스키마 | 상태·필드 정의 | 검색 필터·인용 규칙 |
| `docs/rag-prep/QUALITY-REPORT.md` | 원본 품질표 | 열람·OCR·표 상태 | 전처리 한계 |
| `docs/rag-prep/VALIDATION-REPORT.md` | 검증 보고서 | 수치·문제·검증 결과 | 시점 정합성과 미해결 문제 |

JSONL은 JSON 객체를 한 줄씩 저장하는 형식이므로 전체 파일을 메모리에 올리지 않고도 행 단위로 읽을 수 있다. 예시는 다음과 같다.

```bash
cd /Users/youbin/Desktop/personaAI
head -n 1 docs/rag-prep/chunks.jsonl
wc -l docs/rag-prep/chunks.jsonl docs/rag-prep/evaluation-questions.jsonl
python3 - <<'PY'
import json
for line in open('docs/rag-prep/evaluation-questions.jsonl'):
    x=json.loads(line)
    if x['question_id']=='Q009':
        print(json.dumps(x, ensure_ascii=False, indent=2)); break
PY
```

## 9. 완료 범위와 남은 작업

### 완료

- 세종대학교 공식 문서 15개 보존 및 인벤토리 확인
- PDF·DOCX·XLSX·HWP 열람 가능 여부와 표·이미지·OCR 품질 점검
- 문서 메타데이터 및 2,968개 의미 단위 Chunk 구성
- 2026학년도 1학기 평가 시점 메타데이터 고정
- `expired`와 `reference_only` 구분
- Persona 평가 질문 30개와 원문 인용 연결
- 빈 데이터·중복·필수 필드·공식 URL·인용 일치 검증

### 미구현

- Embedding 생성
- ChromaDB 또는 Vector DB 적재
- Keyword/BM25, Vector Search, Hybrid Search
- Reranking
- 검색 근거 기반 LLM 답변 생성
- Evaluator Agent 및 웹 대시보드 연동
- Recall@1/5/10, MRR 등 검색 성능 측정

다음 개발 단계는 먼저 2026-1 Chunk에 대해 RAG 검색기를 구현하고, 평가셋의 `support_chunk_ids`를 정답으로 사용해 Recall@1, Recall@5, Recall@10, MRR을 측정하는 것이다. 현재 보고서의 수치는 검색 성능이 아니라 데이터 무결성 수치다.

## 10. 한계와 주의점

- 교내 보훈·장애인 2026-2 공고의 지급시기 문구가 신청 시기와 충돌하지만, 이번 2026-1 평가 질문의 근거로 사용하지 않았다.
- OCR 자료와 구형 화면은 보존하되 `reference_only`로 검색에서 제외했다.
- 푸른등대 상세 계획서의 표는 기계 추출·페이지 보존 상태이며 전 페이지 수치의 시각 전수 검수는 남아 있다.
- `expired`는 2026-09-17 현재 상태 표시다. 이번 평가의 검색 기준은 2026-1 고정이므로 2026-1 자료를 `expired`라는 이유로 제외하지 않는다.
- 질문–근거 연결은 존재·문자열 일치까지 검증했지만, 실제 임베딩 검색의 순위나 답변 품질은 아직 측정하지 않았다.

## 11. 결론

이번 작업은 학교 공지를 단순 텍스트 모음으로 두지 않고, 학기·기간·대상·예외·페이지 위치와 함께 검색 가능한 데이터로 바꾼 단계다. 일반 LLM이 과거 공지나 일반 대학 규정을 추측할 수 있는 지점을, 공식 URL과 원문 Chunk 인용으로 확인할 수 있게 했다. 또한 2026-1이라는 평가 시점을 고정하고 Persona 조건을 구조화해, 같은 질문에 학생별로 다른 결론을 내리는지와 정보가 부족할 때 답변을 보류하는지를 측정할 기반을 마련했다. 다음 단계에서 검색기와 답변 생성기를 연결하면 이 데이터셋을 사용해 근거성·최신성·개인화 성능을 객관적으로 평가할 수 있다.
