from fastapi import FastAPI


app = FastAPI(title="personaAI AI Server")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
