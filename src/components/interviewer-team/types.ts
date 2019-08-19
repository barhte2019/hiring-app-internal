export interface IInterviewerTeamState {
    interviewerName: string,
    interviewerComment: string,
    interviewers: IInterviewer[],
    loading: boolean,
    error_message?: string,
    modalVisible: boolean,
}

export interface IInterviewer {
    name: string,
    comment: string,
}

// Describe actions
export const INTERVIEWER_COMMENT_CHANGE = 'INTERVIEWER_COMMENT_CHANGE';
export const INTERVIEWER_NAME_CHANGE = 'INTERVIEWER_NAME_CHANGE';

export const ADD_INTERVIEWER_CLICK = 'ADD_INTERVIEWER_CLICK';

export const HANDLE_MODAL_TOGGLE = 'HANDLE_MODAL_TOGGLE';


interface IInterviewerCommentChangeAction { type: typeof INTERVIEWER_COMMENT_CHANGE, value: string }
interface IInterviewerNameChangeAction { type: typeof INTERVIEWER_NAME_CHANGE, value: string }
interface IAddInterviewerClickAction { type: typeof ADD_INTERVIEWER_CLICK }
interface IHandleModalToggleAction { type: typeof HANDLE_MODAL_TOGGLE }

export type InterviewerTeamActionTypes =
    IInterviewerCommentChangeAction | IInterviewerNameChangeAction |
    IAddInterviewerClickAction | IHandleModalToggleAction;