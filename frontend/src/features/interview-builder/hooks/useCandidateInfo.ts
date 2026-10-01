import { useContext } from 'react'
import { CandidateInfoContext } from '../context/CandidateInfoContext'
import type { CandidateInfoContextValue } from '../model/types'

export function useCandidateInfo(): CandidateInfoContextValue {
  const context = useContext(CandidateInfoContext)
  if (!context) {
    throw new Error('useCandidateInfo must be used within a CandidateInfoProvider')
  }
  return context
}
