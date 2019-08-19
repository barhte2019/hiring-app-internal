import {
    INTERVIEWER_COMMENT_CHANGE,
    INTERVIEWER_NAME_CHANGE,
    ADD_INTERVIEWER_CLICK,
    HANDLE_MODAL_TOGGLE,
} from './types';

export function interviewerCommentChange(value: string) {
    return { type: INTERVIEWER_COMMENT_CHANGE, value }
}

export function interviewerNameChange(value: string) {
    return { type: INTERVIEWER_NAME_CHANGE, value }
}

export function addInterviewerClick() {
    return { type: ADD_INTERVIEWER_CLICK }
}

export function handleModalToggle() {
    return { type: HANDLE_MODAL_TOGGLE }
}