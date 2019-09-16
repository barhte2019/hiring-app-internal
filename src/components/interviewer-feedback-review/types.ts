import { IInterviewerFeedback } from "../interviewer-feedback/types";

export interface IInterviewerFeedbackReviewModalState {
    loading: boolean,
    error_message: string,
    modalVisible: boolean,
    taskId: number,
    interviewerFeedbacks: IInterviewerFeedback[],
}

// Describe actions
export const INTERVIEWER_FEEDBACK_REVIEW_TOGGLE = 'INTERVIEWER_FEEDBACK_REVIEW_TOGGLE';
export const INTERVIEWER_FEEDBACK_LIST_LOADING = 'INTERVIEWER_FEEDBACK_LIST_LOADING';
export const INTERVIEWER_FEEDBACK_LIST_SUCCEED = 'INTERVIEWER_FEEDBACK_LIST_SUCCEED';
export const INTERVIEWER_FEEDBACK_LIST_FAILED = 'INTERVIEWER_FEEDBACK_LIST_FAILED';

interface IInterviewerFeedbackReviewToggleAction { type: typeof INTERVIEWER_FEEDBACK_REVIEW_TOGGLE }
interface IInterviewerFeedbackListLoadingAction { type: typeof INTERVIEWER_FEEDBACK_LIST_LOADING }
interface IInterviewerFeedbackListSuccessAction { type: typeof INTERVIEWER_FEEDBACK_LIST_SUCCEED, feedbacks: IInterviewerFeedback[] }
interface IInterviewerFeedbackListFailedAction { type: typeof INTERVIEWER_FEEDBACK_LIST_FAILED, ServerErrors: any }

export type InterviewerFeedbackReviewActionTypes = IInterviewerFeedbackReviewToggleAction |
    IInterviewerFeedbackListLoadingAction | IInterviewerFeedbackListSuccessAction | IInterviewerFeedbackListFailedAction;