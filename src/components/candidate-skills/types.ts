export interface ICandidateSkillsModalState {
    skillName: string,
    skills: ICandidateSkill[],
    loading: boolean,
    error_message?: string,
    candidateSkillsModalVisible: boolean,
    taskId: number,
    selectKnowledgeExpanded: boolean,
    levelOfKnowledge: string,
}

export interface ICandidateSkill {
    skillName: string,
    levelOfKnowledge: string,
    yearsOfExperience: number,
}

// Describe actions
export const CANDIDATE_SKILL_MODAL_TOGGLE = 'CANDIDATE_SKILL_MODAL_TOGGLE';
export const CANDIDATE_SKILL_NAME_CHANGE = 'CANDIDATE_SKILL_NAME_CHANGE';
export const CANDIDATE_SKILL_KNOWLEDGE_TOGGLE = 'CANDIDATE_SKILL_KNOWLEDGE_TOGGLE';
export const CANDIDATE_SKILL_KNOWLEDGE_SELECT = 'CANDIDATE_SKILL_KNOWLEDGE_SELECT';
export const CANDIDATE_SKILL_KNOWLEDGE_CLEAR = 'CANDIDATE_SKILL_KNOWLEDGE_CLEAR';

interface ICandidateSkillModalToggleAction { type: typeof CANDIDATE_SKILL_MODAL_TOGGLE }
interface ICandidateSkillNameChangeAction { type: typeof CANDIDATE_SKILL_NAME_CHANGE, value: string }
interface ICandidateSkillKnowledgeToggleAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_TOGGLE, expanded: boolean }
interface ICandidateSkillKnowledgeSelectAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_SELECT, selection: string }
interface ICandidateSkillKnowledgeClearAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_CLEAR }

export type CandidateSkillModalActionTypes = ICandidateSkillModalToggleAction |
    ICandidateSkillNameChangeAction |
    ICandidateSkillKnowledgeToggleAction | ICandidateSkillKnowledgeSelectAction | ICandidateSkillKnowledgeClearAction;