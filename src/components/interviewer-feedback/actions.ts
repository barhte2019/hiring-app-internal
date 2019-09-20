import {
    ADDITIONAL_INTERVIEWER_TOGGLE,
    INTERVIEWER_FEEDBACK_TOGGLE,
    INTERVIEWER_FEEDBACK_SCORE_CHANGE,
    INTERVIEWER_FEEDBACK_COMMENT_CHANGE,
    DYNAMIC_TASK_MESSAGE_CHANGE,
    DYNAMIC_TASK_RECIPIENT_CHANGE
} from './types';

export function interviewerFeedbackToggle() {
    return { type: INTERVIEWER_FEEDBACK_TOGGLE }
}

export function interviewerFeedbackScoreChange(value: string) {
    return { type: INTERVIEWER_FEEDBACK_SCORE_CHANGE, value }
}

export function interviewerFeedbackCommentChange(value: string) {
    return { type: INTERVIEWER_FEEDBACK_COMMENT_CHANGE, value }
}

export function toggleAdditionalInterviewer() {
    return { type: ADDITIONAL_INTERVIEWER_TOGGLE }
}

export function dynamicTaskMessageChange(value: string) {
    return { type: DYNAMIC_TASK_MESSAGE_CHANGE, value }
}

export function dynamicTaskRecipientChange(value: string) {
    return { type: DYNAMIC_TASK_RECIPIENT_CHANGE, value }
}