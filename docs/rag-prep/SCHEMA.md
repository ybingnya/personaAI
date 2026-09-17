# RAG 데이터 스키마와 검색 규칙

`chunks.jsonl`은 한 줄에 검색 단위 하나를 저장한다. `documents.jsonl`은 문서 수준 레지스트리이며 문서별 게시일, 적용 학기, 원본 파일 목록, 상태와 Chunk 수를 담는다. `evaluation-questions.jsonl`은 각 질문을 검색·답변 평가 기준에 연결한다.

## Chunk 필드

| 필드 | 의미 |
|---|---|
| `chunk_id` | 데이터셋 안에서 유일한 Chunk ID |
| `document_id` | 문서 레지스트리 및 기존 기록의 문서 ID |
| `document_title`, `chunk_title`, `section` | 문서명과 검색할 의미 단위의 제목·절 |
| `category` | 장학금·수강·학사·졸업·학생지원 중 하나 |
| `publication_date` | 공식 게시일. 불명확하면 `null` |
| `applicable_year`, `applicable_semester` | 자료 적용 연도·학기. 원문에 없는 부분은 `null` |
| `target_population` | 명시된 대상. 범위를 보충 추측하지 않음 |
| `validity_period`, `application_period` | 적용/신청 기간의 정규화 값. 확인할 수 없으면 `null` |
| `status`, `status_reason` | 기준일 현재 유효성 및 판정 근거 |
| `original_filename`, `file_type` | 원본 파일과 형식. 웹 게시글은 파일명 `null`, `HTML` |
| `source_url` | 세종대학교 공식 게시물 URL |
| `source_location`, `page_number` | 원문 게시글/페이지/시트·행 위치 |
| `chunk_body` | 검색 가능한 본문. 원문 표는 아래 `structured_tables`와 함께 유지 |
| `structured_tables` | 표 행/셀 구조. 빈 셀은 `null` |
| `retrieval_allowed` | 추출 품질상 검색 가능한지. OCR 오류·구식 예시·빈 양식은 `false` |
| `default_searchable` | 고정 평가 시점의 검색 대상인지. 이번 데이터셋은 2026-1 평가이므로 `retrieval_allowed=true`인 2026-1 Chunk를 `true`로 설정 (`expired`도 과거 평가에서 포함) |
| `quality_flags` | OCR·표 추출·날짜 충돌 등 사용 전 점검 사항 |

## 상태와 값 규칙

- `current`: 실제 현재 기준일에 신청/안내가 유효함.
- `expired`: 신청 마감 또는 해당 학기 종료. 이번 고정 평가에서는 2026-1 문서라면 검색에서 제외하지 않는다. 실제 운영 RAG에서 현재성 질의에 노출할지는 별도의 현재 기준일 필터로 결정한다.
- `reference_only`: 구식 UI 캡처, 과거 날짜 예시, 제출용 빈 양식, 판독 신뢰가 낮은 OCR 등. `retrieval_allowed=false`이므로 정답 근거로 검색하지 않는다.
- `null`은 원문에 값이 없거나 변환 중 검증되지 않았음을 뜻한다. `unknown`은 질의 평가에서 현재 문서 집합으로 확인할 수 없음을 뜻한다. 둘 다 0/없음으로 해석하지 않는다.
- 날짜 충돌이 발견되면 관련 사실을 임의로 정정하지 않는다. Chunk의 `quality_flags`를 보고, 질문 평가에서는 충돌 사실을 설명하고 담당 부서 확인을 요구한다.

## 검색·인용 권장 순서

1. `retrieval_allowed=true` 필터를 적용한다.
2. 이번 평가는 `academic_year=2026`, `semester=1`, `as_of_date=2026-03-01`을 고정하고 `default_searchable=true`인 2026-1 Chunk를 우선한다.
3. Chunk의 `expired` 표시는 현재(2026-09-17) 상태일 뿐, 고정된 2026-1 평가 검색을 차단하지 않는다. 실제 현재 일정 답변에서는 별도 최신성 필터를 적용한다.
4. 답변에 사용한 각 사실은 `chunk_id`, `source_url`, `source_location`(페이지 포함)을 출처로 제시한다. 표 값은 같은 표/Chunk를 함께 인용한다.
5. Persona에 제공되지 않은 필드는 추정하지 않는다. 결정 조건이 빠졌으면 가능한 판단 범위와 추가 확인 항목을 함께 답한다.
6. OCR `reference_only` 파일은 OCR 원문을 보존하더라도 검색 정답 근거로 사용하지 않는다. 공식 HTML 본문 또는 텍스트가 보존된 원본을 우선한다.
