import {
    CANDIDATE_SKILL_MODAL_TOGGLE,
    CANDIDATE_SKILL_NAME_CHANGE,
    CANDIDATE_SKILL_KNOWLEDGE_TOGGLE,
    CANDIDATE_SKILL_KNOWLEDGE_SELECT,
    CANDIDATE_SKILL_KNOWLEDGE_CLEAR,
    CANDIDATE_SKILL_EXPERIENCE_CHANGE,
    CANDIDATE_SKILL_ADD,
} from './types'

export function candidateSkillModalToggle() {
    return { type: CANDIDATE_SKILL_MODAL_TOGGLE }
}

export function candidateSkillNameChange(value: string) {
    return { type: CANDIDATE_SKILL_NAME_CHANGE, value }
}

export function candidateSkillKnowledgeToggle(expanded: boolean) {
    return { type: CANDIDATE_SKILL_KNOWLEDGE_TOGGLE, expanded }
}

export function candidateSkillKnowledgeSelect(selection: string) {
    return { type: CANDIDATE_SKILL_KNOWLEDGE_SELECT, selection }
}

export function candidateSkillKnowledgeClear() {
    return { type: CANDIDATE_SKILL_KNOWLEDGE_CLEAR }
}

export function candidateSkillExperienceChange(value: string) {
    return { type: CANDIDATE_SKILL_EXPERIENCE_CHANGE, value }
}

export function candidateSkillAdd() {
    return { type: CANDIDATE_SKILL_ADD }
}