import {
    ICandidateSkillsModalState,
    CandidateSkillModalActionTypes,
    CANDIDATE_SKILL_NAME_CHANGE
} from './types';

const initialState: ICandidateSkillsModalState = {
    candidateSkillsModalVisible: true,
    error_message: '',
    loading: false,
    skillName: '',
    skills: [],
    taskId: 0,
}

export function candidateSkillModalReducer(
    state = initialState,
    action: CandidateSkillModalActionTypes
): ICandidateSkillsModalState {
    switch (action.type) {
        case CANDIDATE_SKILL_NAME_CHANGE: {
            return {
                ...state,
                skillName: action.value
            }
        }
        default: return state;
    }
}