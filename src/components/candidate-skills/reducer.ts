import {
    ICandidateSkillsModalState,
    CandidateSkillModalActionTypes,
    CANDIDATE_SKILL_NAME_CHANGE,
    CANDIDATE_SKILL_KNOWLEDGE_TOGGLE,
    CANDIDATE_SKILL_KNOWLEDGE_SELECT,
    CANDIDATE_SKILL_KNOWLEDGE_CLEAR,
    CANDIDATE_SKILL_MODAL_TOGGLE,
} from './types';

const initialState: ICandidateSkillsModalState = {
    candidateSkillsModalVisible: true,
    error_message: '',
    levelOfKnowledge: '',
    loading: false,
    selectKnowledgeExpanded: false,
    skillName: '',
    skills: [],
    taskId: 0,
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
        default: return state;
    }
}