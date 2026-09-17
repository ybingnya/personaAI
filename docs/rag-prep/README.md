# Sejong 공식 문서 RAG 준비 데이터

평가 기준: 2026학년도 1학기 (`academic_year=2026`, `semester=1`, `as_of_date=2026-03-01`)

현재 점검일: 2026-09-17 (Asia/Seoul)

- `documents.jsonl`: 10개 공식 게시글의 문서 레지스트리
- `chunks.jsonl`: 15개 첨부와 공식 게시글을 바탕으로 만든 의미 단위 Chunk 2,968개
- `evaluation-questions.jsonl`: Persona 기반 평가 질문 30개
- `SCHEMA.md`: 필드 정의, 상태 규칙, 검색/인용 권고
- `QUALITY-REPORT.md`: 15개 원본 품질 및 추출 점검
- `VALIDATION-REPORT.md`: 검색 품질·무결성 검증 결과와 미해결 문제

원본과 기존 문서 기록은 `docs/source-documents/` 아래에 그대로 둔다. `reference_only` Chunk는 검색 근거로 사용하지 않는다. `expired`는 현재 날짜 상태 표시로만 유지한다. 이번 2026-1 평가에서는 2026-1 Chunk를 검색에서 제외하지 않으며, 답변에는 공식 URL과 Chunk 위치를 반드시 함께 반환한다.
