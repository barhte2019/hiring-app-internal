export interface ICandidateSkillsModalState {
    skillName: string,
    skills: ICandidateSkill[],
    loading: boolean,
    error_message?: string,
    candidateSkillsModalVisible: boolean,
    taskId: number,
}

export interface ICandidateSkill {
    skillName: string,
    levelOfKnowledge: string,
    yearsOfExperience: number,
}

// Describe actions
export const CANDIDATE_SKILL_NAME_CHANGE = 'CANDIDATE_SKILL_NAME_CHANGE';

interface ICandidateSkillNameChangeAction { type: typeof CANDIDATE_SKILL_NAME_CHANGE, value: string }

export type CandidateSkillModalActionTypes = ICandidateSkillNameChangeAction;