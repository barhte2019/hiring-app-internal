import { IInterviewerFeedbackReviewModalState, InterviewerFeedbackReviewActionTypes, INTERVIEWER_FEEDBACK_REVIEW_TOGGLE, INTERVIEWER_FEEDBACK_LIST_LOADING, INTERVIEWER_FEEDBACK_LIST_SUCCEED, INTERVIEWER_FEEDBACK_LIST_FAILED } from "./types";

const initialState: IInterviewerFeedbackReviewModalState = {
    error_message: '',
    interviewerFeedbacks: [],
    loading: false,
    modalVisible: false,
    taskId: 0
}

export function interviewerFeedbackReviewModalReducer(
    state = initialState,
    action: InterviewerFeedbackReviewActionTypes
): IInterviewerFeedbackReviewModalState {
    switch (action.type) {
        case INTERVIEWER_FEEDBACK_REVIEW_TOGGLE: { return { ...state, modalVisible: !state.modalVisible } }
        case INTERVIEWER_FEEDBACK_LIST_LOADING: { return { ...state, loading: true } }
        case INTERVIEWER_FEEDBACK_LIST_SUCCEED: { return { ...state, loading: false, interviewerFeedbacks: action.feedbacks } }
        case INTERVIEWER_FEEDBACK_LIST_FAILED: { return { ...state, loading: false, error_message: action.ServerErrors } }
        default: return state;
    }
}