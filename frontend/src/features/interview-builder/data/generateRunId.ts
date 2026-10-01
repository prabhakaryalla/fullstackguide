let nextRunIdCounter = 0

// Identifies one specific Live Interview occurrence (as opposed to a
// content-based session identity) so per-question ratings/notes never bleed
// between different candidates asked the same question.
export function generateRunId(): string {
  nextRunIdCounter += 1
  return `run-${Date.now()}-${nextRunIdCounter}`
}
