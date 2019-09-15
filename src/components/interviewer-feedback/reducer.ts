import {
    InterviewerFeedbackActionTypes,
    IInterviewerFeedbackModalState,
    INTERVIEWER_FEEDBACK_TOGGLE,
    INTERVIEWER_FEEDBACK_SCORE_CHANGE,
    INTERVIEWER_FEEDBACK_COMMENT_CHANGE
} from './types';

const initialState: IInterviewerFeedbackModalState = {
    candidateScore: '',
    comment: '',
    error_message: '',
    loading: false,
    modalVisible: false,
    taskId: 0,
}

export function interviewerFeedbackModalReducer(
    state = initialState,
    action: InterviewerFeedbackActionTypes
): IInterviewerFeedbackModalState {
    switch (action.type) {
        case INTERVIEWER_FEEDBACK_TOGGLE: { return { ...state, modalVisible: !state.modalVisible } }
        case INTERVIEWER_FEEDBACK_SCORE_CHANGE: { return { ...state, candidateScore: action.value } }
        case INTERVIEWER_FEEDBACK_COMMENT_CHANGE: { return { ...state, comment: action.value } }
        default: return state;
    }
}