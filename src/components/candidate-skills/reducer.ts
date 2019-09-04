import {
    ICandidateSkillsModalState,
    CandidateSkillModalActionTypes,
    CANDIDATE_SKILL_NAME_CHANGE,
    CANDIDATE_SKILL_KNOWLEDGE_TOGGLE,
    CANDIDATE_SKILL_KNOWLEDGE_SELECT,
    CANDIDATE_SKILL_KNOWLEDGE_CLEAR,
    CANDIDATE_SKILL_MODAL_TOGGLE,
    CANDIDATE_SKILL_EXPERIENCE_CHANGE,
    CANDIDATE_SKILL_ADD,
    CANDIDATE_SKILL_REMOVE,
    CANDIDATE_SKILL_CLEAR,
} from './types';

const initialState: ICandidateSkillsModalState = {
    candidateSkillsModalVisible: false,
    error_message: '',
    levelOfKnowledge: '',
    loading: false,
    selectKnowledgeExpanded: false,
    skillName: '',
    skills: [],
    taskId: 0,
    yearsOfExperience: 0,
}

export function candidateSkillModalReducer(
    state = initialState,
    action: CandidateSkillModalActionTypes
): ICandidateSkillsModalState {
    switch (action.type) {
        case CANDIDATE_SKILL_MODAL_TOGGLE: {
            return { ...state, candidateSkillsModalVisible: !state.candidateSkillsModalVisible }
        }
        case CANDIDATE_SKILL_NAME_CHANGE: {
            return {
                ...state,
                skillName: action.value
            }
        }
        case CANDIDATE_SKILL_KNOWLEDGE_TOGGLE: {
            return {
                ...state,
                selectKnowledgeExpanded: action.expanded,
            }
        }
        case CANDIDATE_SKILL_KNOWLEDGE_SELECT: {
            return {
                ...state,
                levelOfKnowledge: action.selection,
                selectKnowledgeExpanded: false,
            }
        }
        case CANDIDATE_SKILL_KNOWLEDGE_CLEAR: {
            return {
                ...state,
                levelOfKnowledge: '',
                selectKnowledgeExpanded: false,
            }
        }
        case CANDIDATE_SKILL_EXPERIENCE_CHANGE: {
            return {
                ...state,
                yearsOfExperience: Number(action.value)
            }
        }
        case CANDIDATE_SKILL_ADD: {
            return {
                ...state,
                levelOfKnowledge: '',
                skillName: '',
                skills: state.skills.concat([state]),
                yearsOfExperience: 0,
            }
        }
        case CANDIDATE_SKILL_REMOVE: {
            return {
                ...state,
                skills: state.skills.filter(s => s.skillName !== action.name)
            }
        }
        case CANDIDATE_SKILL_CLEAR: {
            return {
                ...state,
                skills: []
            }
        }
        default: return state;
    }
}