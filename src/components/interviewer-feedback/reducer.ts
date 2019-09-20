import {
    InterviewerFeedbackActionTypes,
    IInterviewerFeedbackModalState,
    ADDITIONAL_INTERVIEWER_TOGGLE,
    INTERVIEWER_FEEDBACK_TOGGLE,
    INTERVIEWER_FEEDBACK_SCORE_CHANGE,
    INTERVIEWER_FEEDBACK_COMMENT_CHANGE,
    DYNAMIC_TASK_MESSAGE_CHANGE,
    DYNAMIC_TASK_RECIPIENT_CHANGE
} from './types';

const initialState: IInterviewerFeedbackModalState = {
    additionalVisible: false,
    candidateScore: '',
    comment: '',
    dt_message: '',
    dt_recipient: '',
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
        case ADDITIONAL_INTERVIEWER_TOGGLE: { return { ...state, additionalVisible: !state.additionalVisible } }
        case DYNAMIC_TASK_MESSAGE_CHANGE: { return { ...state, dt_message: action.value } }
        case DYNAMIC_TASK_RECIPIENT_CHANGE: { return { ...state, dt_recipient: action.value } }
        default: return state;
    }
}