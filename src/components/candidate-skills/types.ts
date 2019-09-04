export interface ICandidateSkillsModalState extends ICandidateSkill {
    skills: ICandidateSkill[],
    loading: boolean,
    error_message?: string,
    candidateSkillsModalVisible: boolean,
    taskId: number,
    selectKnowledgeExpanded: boolean,
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
export const CANDIDATE_SKILL_EXPERIENCE_CHANGE = 'CANDIDATE_SKILL_EXPERIENCE_CHANGE';
export const CANDIDATE_SKILL_ADD = 'CANDIDATE_SKILL_ADD';
export const CANDIDATE_SKILL_REMOVE = 'CANDIDATE_SKILL_REMOVE';
export const CANDIDATE_SKILL_CLEAR = 'CANDIDATE_SKILL_CLEAR';

interface ICandidateSkillModalToggleAction { type: typeof CANDIDATE_SKILL_MODAL_TOGGLE }
interface ICandidateSkillNameChangeAction { type: typeof CANDIDATE_SKILL_NAME_CHANGE, value: string }
interface ICandidateSkillKnowledgeToggleAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_TOGGLE, expanded: boolean }
interface ICandidateSkillKnowledgeSelectAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_SELECT, selection: string }
interface ICandidateSkillKnowledgeClearAction { type: typeof CANDIDATE_SKILL_KNOWLEDGE_CLEAR }
interface ICandidateSkillExperienceChangeAction { type: typeof CANDIDATE_SKILL_EXPERIENCE_CHANGE, value: number }

interface ICandidateSkillAddAction { type: typeof CANDIDATE_SKILL_ADD }
interface ICandidateSkillRemoveAction { type: typeof CANDIDATE_SKILL_REMOVE, name: string }
interface ICandidateSkillClearAction { type: typeof CANDIDATE_SKILL_CLEAR }

export type CandidateSkillModalActionTypes = ICandidateSkillModalToggleAction |
    ICandidateSkillNameChangeAction | ICandidateSkillExperienceChangeAction |
    ICandidateSkillKnowledgeToggleAction | ICandidateSkillKnowledgeSelectAction | ICandidateSkillKnowledgeClearAction |
    ICandidateSkillAddAction | ICandidateSkillRemoveAction | ICandidateSkillClearAction;