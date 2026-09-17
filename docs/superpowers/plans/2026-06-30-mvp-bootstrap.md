# MVP Bootstrap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a runnable MVP project skeleton with Spring Boot, FastAPI, React + Vite, MySQL, and ChromaDB, limited to health check endpoints and local run documentation.

**Architecture:** The repository will use a top-level multi-service layout with `backend`, `ai-server`, and `frontend` directories. Application services run locally in their native runtimes, while `docker-compose.yml` provisions only MySQL and ChromaDB for the development baseline.

**Tech Stack:** Java 17 + Spring Boot, Python 3 + FastAPI, React + Vite, MySQL, ChromaDB, Docker Compose

---

### Task 1: Repository Skeleton

**Files:**
- Create: `backend/`
- Create: `ai-server/`
- Create: `frontend/`
- Modify: `README.md`

- [ ] Step 1: Create top-level service directories
- [ ] Step 2: Confirm naming and port conventions for each service
- [ ] Step 3: Update README scope to reflect bootstrap-only implementation

### Task 2: Spring Boot Health Check

**Files:**
- Create: `backend/pom.xml`
- Create: `backend/src/main/java/com/personaai/backend/BackendApplication.java`
- Create: `backend/src/main/java/com/personaai/backend/health/HealthController.java`
- Create: `backend/src/test/java/com/personaai/backend/health/HealthControllerTest.java`

- [ ] Step 1: Write failing Spring MVC test for `GET /api/health`
- [ ] Step 2: Run backend tests and confirm failure
- [ ] Step 3: Implement minimal Spring Boot app and controller
- [ ] Step 4: Re-run backend tests and confirm pass

### Task 3: FastAPI Health Check

**Files:**
- Create: `ai-server/requirements.txt`
- Create: `ai-server/app/main.py`
- Create: `ai-server/tests/test_health.py`

- [ ] Step 1: Write failing FastAPI test for `GET /health`
- [ ] Step 2: Run pytest and confirm failure
- [ ] Step 3: Implement minimal FastAPI app and endpoint
- [ ] Step 4: Re-run pytest and confirm pass

### Task 4: React + Vite Frontend Bootstrap

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/index.html`
- Create: `frontend/src/main.jsx`
- Create: `frontend/src/App.jsx`
- Create: `frontend/src/styles.css`

- [ ] Step 1: Create frontend package and entry files
- [ ] Step 2: Implement minimal page showing stack and health endpoint info
- [ ] Step 3: Run production build to verify scaffold integrity

### Task 5: Docker Compose Baseline

**Files:**
- Create: `docker-compose.yml`
- Create: `.env.example`

- [ ] Step 1: Define MySQL service with default database and exposed port
- [ ] Step 2: Define ChromaDB service with exposed port and persistent volume
- [ ] Step 3: Verify compose configuration parses successfully

### Task 6: Local Run Documentation

**Files:**
- Modify: `README.md`

- [ ] Step 1: Document prerequisites and per-service start commands
- [ ] Step 2: Document docker compose startup and health check URLs
- [ ] Step 3: Document current non-goals for this phase
