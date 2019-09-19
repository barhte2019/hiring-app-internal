export interface IInterviewerFeedbackModalState {
    additionalVisible: boolean,
    candidateScore: string,
    comment: string,
    loading: boolean,
    error_message: string,
    modalVisible: boolean,
    taskId: number,
}

export interface IInterviewerFeedback {
    interviewer: string,
    candidateScore: number,
    comment: string,
}

// Describe actions
export const INTERVIEWER_FEEDBACK_TOGGLE = 'INTERVIEWER_FEEDBACK_TOGGLE';
export const INTERVIEWER_FEEDBACK_SCORE_CHANGE = 'INTERVIEWER_FEEDBACK_SCORE_CHANGE';
export const INTERVIEWER_FEEDBACK_COMMENT_CHANGE = 'INTERVIEWER_FEEDBACK_COMMENT_CHANGE';
export const ADDITIONAL_INTERVIEWER_TOGGLE = 'ADDITIONAL_INTERVIEWER_TOGGLE';

interface IInterviewerFeedbackToggleAction { type: typeof INTERVIEWER_FEEDBACK_TOGGLE }
interface IInterviewerFeedbackScoreChangeAction { type: typeof INTERVIEWER_FEEDBACK_SCORE_CHANGE, value: string }
interface IInterviewerFeedbackCommentChangeAction { type: typeof INTERVIEWER_FEEDBACK_COMMENT_CHANGE, value: string }
interface IAdditionalInterviewerToggleAction { type: typeof ADDITIONAL_INTERVIEWER_TOGGLE }

export type InterviewerFeedbackActionTypes = IInterviewerFeedbackToggleAction |
    IInterviewerFeedbackScoreChangeAction | IInterviewerFeedbackCommentChangeAction 
    | IAdditionalInterviewerToggleAction;