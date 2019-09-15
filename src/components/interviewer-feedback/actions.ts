import {
    INTERVIEWER_FEEDBACK_TOGGLE,
    INTERVIEWER_FEEDBACK_SCORE_CHANGE,
    INTERVIEWER_FEEDBACK_COMMENT_CHANGE
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