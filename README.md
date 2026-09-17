# personaAI

`personaAI` is a web platform for evaluating RAG-based AI counseling answers with Korean personas.

This repository now contains the initial MVP bootstrap only:

- `frontend/`: React + Vite
- `backend/`: Spring Boot
- `ai-server/`: FastAPI
- `docker-compose.yml`: MySQL and ChromaDB baseline services

## Updates

### 20260915

- 화면 정의 기준으로 `frontend` 폴더를 생성함.
- Node.js 환경 Vite + React + TypeScript 코드

### 20260915 · 세종대학교 공식 문서 RAG 데이터 준비

- 공식 문서 10건과 첨부파일 15개를 수집하였다.
- 문서를 전처리하여 검색용 Chunk 2,968개를 생성하였다.
- 2026학년도 1학기 기준으로 검색 가능한 Chunk 2,785개를 정리하였다.
- Persona 조건을 반영한 평가 질문 30개와 정답 근거를 구성하였다.
- 문서 수집과 전처리 목표를 완료하였다.

## Current Scope

This step only establishes a runnable multi-service development structure.

Implemented now:

- Spring Boot app startup
- FastAPI app startup
- React + Vite app startup
- Backend health check API
- AI server health check API
- Local Docker Compose baseline for MySQL and ChromaDB

Not implemented yet:

- document upload
- RAG pipeline
- agent orchestration
- evaluation logic
- DB entities or schema

## Prerequisites

- Java 21
- Python 3.14+
- Node.js 24+
- Docker Desktop with Compose

## Local Run

### 1. Start infrastructure

```bash
cp .env.example .env
docker compose up -d
```

Services:

- MySQL: `localhost:3306`
- ChromaDB: `localhost:8001`

### 2. Start backend

```bash
cd backend
./gradlew bootRun
```

Health check:

```bash
curl http://localhost:8080/api/health
```

Expected response:

```json
{"status":"ok"}
```

### 3. Start AI server

```bash
cd ai-server
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Health check:

```bash
curl http://localhost:8000/health
```

Expected response:

```json
{"status":"ok"}
```

### 4. Start frontend

```bash
cd frontend
npm install
npm run dev
```

Open:

- `http://localhost:5173`

## VS Code Run And Debug

This repository includes VS Code run settings in `.vscode/tasks.json` and `.vscode/launch.json`.

### Before using the buttons

- Open `/Users/youbin/Desktop/personaAI` as the workspace root in VS Code.
- Create `ai-server/.venv` first if it does not exist yet:

```bash
cd ai-server
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
```

- Make sure frontend dependencies are installed:

```bash
cd frontend
npm install
```

- Make sure Docker Desktop is running before using Docker Compose tasks.

### Task buttons

Open `Terminal` -> `Run Task...` and choose one of these:

- `Backend: Spring Boot`
- `AI Server: FastAPI`
- `Frontend: Vite`
- `Docker Compose: Up`
- `Docker Compose: Down`
- `All Services`

`All Services` starts backend, AI server, and frontend in parallel.

### Run and Debug buttons

Open the `Run and Debug` sidebar and choose one of these launch targets:

- `Backend: Spring Boot`
- `AI Server: FastAPI`
- `Frontend: Vite`
- `All App Servers`

`All App Servers` is the compound launch that starts backend, AI server, and frontend together.

## Verification Commands

```bash
cd backend && ./gradlew test
cd ai-server && . .venv/bin/activate && pytest
cd frontend && npm run build
docker compose config
```

## Project Documents

- [PROJECT_GUIDE.md](./PROJECT_GUIDE.md)
- [docs/architecture.md](./docs/architecture.md)
- [docs/api-spec.md](./docs/api-spec.md)
- [docs/evaluation-rubric.md](./docs/evaluation-rubric.md)
- [docs/weekly-plan.md](./docs/weekly-plan.md)
