# Evaluation Rubric Draft

## 1. Purpose

This rubric defines how the system should evaluate RAG answer quality for persona-based counseling scenarios.

Each answer is scored across five criteria. Every criterion uses a 1 to 5 scale. The evaluator should also produce:

- total score,
- issue summary,
- improvement suggestion.

## 2. Scoring Principles

1. Scores must reflect uploaded-document evidence, not general world knowledge.
2. A fluent answer should not receive a high score if it is not grounded.
3. Persona context must matter; generic answers should be penalized.
4. Missing critical administrative information must reduce the score.
5. The evaluator should explain low scores concretely.

## 3. Criteria

### 3.1 Accuracy

Definition:

- whether the answer matches the content of the uploaded document.

Scoring guide:

- `5`: fully consistent with the document, no factual mismatch.
- `4`: mostly correct, minor imprecision without changing meaning.
- `3`: partially correct, but includes ambiguous or weakly supported claims.
- `2`: major factual mismatch or misleading interpretation.
- `1`: clearly incorrect or contradicts the document.

### 3.2 Groundedness

Definition:

- whether the answer is based on retrieved document evidence.

Scoring guide:

- `5`: clearly based on retrieved evidence and stays within supported scope.
- `4`: mostly evidence-based, with minor unsupported phrasing.
- `3`: mixes grounded content with unsupported additions.
- `2`: limited evidence connection, substantial unsupported content.
- `1`: essentially ungrounded or fabricated.

### 3.3 Persona Context Reflection

Definition:

- whether the answer reflects the persona's situation and question intent.

Scoring guide:

- `5`: directly addresses the persona's circumstances and the actual question intent.
- `4`: addresses the main context but misses a secondary nuance.
- `3`: partially tailored, but still fairly generic.
- `2`: weakly aligned with the persona's situation.
- `1`: ignores the persona context or answers a different problem.

### 3.4 Clarity

Definition:

- whether the answer is easy for a user to understand.

Scoring guide:

- `5`: clear, organized, and easy to follow.
- `4`: understandable with minor wording or structure issues.
- `3`: understandable but somewhat vague or verbose.
- `2`: difficult to follow or poorly structured.
- `1`: confusing, fragmented, or unreadable.

### 3.5 Missing Information

Definition:

- whether the answer omits important information required for a useful counseling response.

Important examples:

- application period,
- eligibility,
- conditions,
- required documents,
- exceptions,
- next steps.

Scoring guide:

- `5`: no important omission for the question context.
- `4`: minor omission that does not significantly reduce usability.
- `3`: one important detail is missing.
- `2`: multiple important details are missing.
- `1`: major required information is absent.

## 4. Total Score

Recommended MVP formula:

- `totalScore = accuracy + groundedness + personaContextReflection + clarity + missingInformation`

Score range:

- minimum `5`
- maximum `25`

## 5. Required Evaluator Output

For each evaluated answer, the evaluator should return:

- `accuracy`
- `groundedness`
- `personaContextReflection`
- `clarity`
- `missingInformation`
- `totalScore`
- `issueSummary`
- `improvementSuggestion`

## 6. Low-Score Guidance

When a criterion is scored `1` or `2`, the evaluator should explicitly state:

- what was wrong,
- which information was unsupported, incorrect, or omitted,
- how the answer could be improved.

## 7. Example Evaluation Template

```json
{
  "accuracy": 4,
  "groundedness": 5,
  "personaContextReflection": 3,
  "clarity": 4,
  "missingInformation": 2,
  "totalScore": 18,
  "issueSummary": "The answer is grounded in the document but does not fully reflect the student's leave-of-absence situation and omits required application documents.",
  "improvementSuggestion": "Add leave-of-absence eligibility guidance and explicitly list the required documents and application period."
}
```

## 8. MVP Evaluation Cautions

- Do not over-score polished but unsupported answers.
- Do not treat broad commonsense assumptions as document evidence.
- Do not ignore persona-specific conditions.
- Do not assume omitted deadlines or eligibility rules are acceptable.
