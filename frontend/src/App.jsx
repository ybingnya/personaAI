import './App.css'

function App() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">personaAI MVP Bootstrap</p>
        <h1>React, Spring Boot, FastAPI baseline</h1>
        <p className="lead">
          This stage only verifies that each server starts and responds to a health check.
        </p>
      </section>

      <section className="card-grid">
        <article className="card">
          <h2>Frontend</h2>
          <p>React + Vite</p>
          <code>http://localhost:5173</code>
        </article>
        <article className="card">
          <h2>Backend</h2>
          <p>Spring Boot</p>
          <code>GET http://localhost:8080/api/health</code>
        </article>
        <article className="card">
          <h2>AI Server</h2>
          <p>FastAPI</p>
          <code>GET http://localhost:8000/health</code>
        </article>
      </section>

      <section className="notes">
        <h2>Current scope</h2>
        <ul>
          <li>Document upload is not implemented yet.</li>
          <li>RAG, agent orchestration, and evaluation are out of scope for this step.</li>
          <li>Database entities and schema are intentionally not created yet.</li>
        </ul>
      </section>
    </main>
  )
}

export default App
