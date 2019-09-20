export interface IInterviewerFeedbackModalState {
    additionalVisible: boolean,
    candidateScore: string,
    comment: string,
    dt_message: string,
    dt_recipient: string,
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
export const DYNAMIC_TASK_MESSAGE_CHANGE = 'DYNAMIC_TASK_MESSAGE_CHANGE';
export const DYNAMIC_TASK_RECIPIENT_CHANGE = 'DYNAMIC_TASK_RECIPIENT_CHANGE';

interface IInterviewerFeedbackToggleAction { type: typeof INTERVIEWER_FEEDBACK_TOGGLE }
interface IInterviewerFeedbackScoreChangeAction { type: typeof INTERVIEWER_FEEDBACK_SCORE_CHANGE, value: string }
interface IInterviewerFeedbackCommentChangeAction { type: typeof INTERVIEWER_FEEDBACK_COMMENT_CHANGE, value: string }
interface IAdditionalInterviewerToggleAction { type: typeof ADDITIONAL_INTERVIEWER_TOGGLE }
interface IDynamicTaskMessageChangeAction { type: typeof DYNAMIC_TASK_MESSAGE_CHANGE, value: string }
interface IDynamicTaskRecipientChangeAction { type: typeof DYNAMIC_TASK_RECIPIENT_CHANGE, value: string }

export type InterviewerFeedbackActionTypes = IInterviewerFeedbackToggleAction |
    IInterviewerFeedbackScoreChangeAction | IInterviewerFeedbackCommentChangeAction
    | IAdditionalInterviewerToggleAction | IDynamicTaskMessageChangeAction | IDynamicTaskRecipientChangeAction;