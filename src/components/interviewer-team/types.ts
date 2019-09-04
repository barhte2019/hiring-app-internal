export interface IInterviewerTeamState {
    interviewerName: string,
    interviewerComment: string,
    interviewers: IInterviewer[],
    loading: boolean,
    error_message?: string,
    modalVisible: boolean,
    taskId: number
}

export interface IInterviewer {
    name: string,
    comment: string,
}

// Describe actions
export const INTERVIEWER_COMMENT_CHANGE = 'INTERVIEWER_COMMENT_CHANGE';
export const INTERVIEWER_NAME_CHANGE = 'INTERVIEWER_NAME_CHANGE';

export const ADD_INTERVIEWER_CLICK = 'ADD_INTERVIEWER_CLICK';
export const REMOVE_INTERVIEWER = 'REMOVE_INTERVIEWER';
export const CLEAR_INTERVIEWERS = 'CLEAR_INTERVIEWERS';

export const HANDLE_MODAL_TOGGLE = 'HANDLE_MODAL_TOGGLE';


interface IInterviewerCommentChangeAction { type: typeof INTERVIEWER_COMMENT_CHANGE, value: string }
interface IInterviewerNameChangeAction { type: typeof INTERVIEWER_NAME_CHANGE, value: string }
interface IAddInterviewerClickAction { type: typeof ADD_INTERVIEWER_CLICK }
interface IRemoveInterviewerAction { type: typeof REMOVE_INTERVIEWER, name: string }
interface IClearInterviewersAction { type: typeof CLEAR_INTERVIEWERS }
interface IHandleModalToggleAction { type: typeof HANDLE_MODAL_TOGGLE }

export type InterviewerTeamActionTypes =
    IInterviewerCommentChangeAction | IInterviewerNameChangeAction |
    IAddInterviewerClickAction | IRemoveInterviewerAction | IClearInterviewersAction |
    IHandleModalToggleAction;