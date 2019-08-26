import { CANDIDATE_SKILL_NAME_CHANGE } from './types'

export function candidateSkillNameChange(value: string) {
    return { type: CANDIDATE_SKILL_NAME_CHANGE, value }
}