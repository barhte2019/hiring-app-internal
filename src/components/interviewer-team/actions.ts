import {
    INTERVIEWER_COMMENT_CHANGE,
    INTERVIEWER_NAME_CHANGE,
    ADD_INTERVIEWER_CLICK,
    REMOVE_INTERVIEWER,
    CLEAR_INTERVIEWERS,
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

export function removeInterviewer(name: string) {
    return { type: REMOVE_INTERVIEWER, name }
}

export function clearInterviewers() {
    return { type: CLEAR_INTERVIEWERS }
}

export function handleModalToggle() {
    return { type: HANDLE_MODAL_TOGGLE }
}