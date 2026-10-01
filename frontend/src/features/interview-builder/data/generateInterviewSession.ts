import type { Topic } from '../../main/model/types'
import type { ComplexityCounts } from '../model/types'
import { INTERVIEW_COMPLEXITY_KEYS } from '../model/types'

function shuffle<T>(items: T[], random: () => number): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function countAvailableByComplexity(topics: Topic[]): ComplexityCounts {
  const counts: ComplexityCounts = { Easy: 0, Medium: 0, Hard: 0 }
  for (const topic of topics) {
    if (topic.complexity === 'Easy' || topic.complexity === 'Medium' || topic.complexity === 'Hard') {
      counts[topic.complexity] += 1
    }
  }
  return counts
}

// Picks up to `counts[complexity]` random topics per complexity bucket, then
// shuffles the combined pick so the session doesn't read as strictly
// Easy -> Medium -> Hard. `random` is injectable for deterministic tests.
export function generateInterviewSession(
  topics: Topic[],
  counts: ComplexityCounts,
  random: () => number = Math.random,
): Topic[] {
  const picked: Topic[] = []

  for (const complexity of INTERVIEW_COMPLEXITY_KEYS) {
    const requested = counts[complexity]
    if (requested <= 0) {
      continue
    }
    const bucket = topics.filter((topic) => topic.complexity === complexity)
    picked.push(...shuffle(bucket, random).slice(0, requested))
  }

  return shuffle(picked, random)
}
