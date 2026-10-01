import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { CandidateInfo, CandidateInfoContextValue, CandidateInfoState } from '../model/types'
import { readCandidateInfoState, writeCandidateInfoState } from '../data/candidateInfoStorage'

export const CandidateInfoContext = createContext<CandidateInfoContextValue | undefined>(undefined)

const EMPTY_CANDIDATE_INFO: CandidateInfo = { name: '', yearsOfExperience: '', skills: '', notes: '' }

interface CandidateInfoProviderProps {
  children: ReactNode
}

export default function CandidateInfoProvider({ children }: CandidateInfoProviderProps) {
  const [state, setState] = useState<CandidateInfoState>(readCandidateInfoState)

  const getCandidateInfo = useCallback(
    (runId: string) => state[runId] ?? EMPTY_CANDIDATE_INFO,
    [state],
  )

  const updateCandidateInfo = useCallback((runId: string, patch: Partial<CandidateInfo>) => {
    setState((previous) => {
      const current = previous[runId] ?? EMPTY_CANDIDATE_INFO
      const next = { ...previous, [runId]: { ...current, ...patch } }
      writeCandidateInfoState(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ getCandidateInfo, updateCandidateInfo }),
    [getCandidateInfo, updateCandidateInfo],
  )

  return <CandidateInfoContext.Provider value={value}>{children}</CandidateInfoContext.Provider>
}
