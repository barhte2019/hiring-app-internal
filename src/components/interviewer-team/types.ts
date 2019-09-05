export interface IInterviewerTeamState {
    interviewerName: string,
    interviewerComment: string,
    interviewers: IInterviewer[],
    loading: boolean,
    error_message?: string,
    modalVisible: boolean,
    taskId: number,
    interviewerSelectExpanded: boolean,
}

export interface IInterviewer {
    name: string,
    comment: string,
}

// Describe actions
export const INTERVIEWER_COMMENT_CHANGE = 'INTERVIEWER_COMMENT_CHANGE';
export const INTERVIEWER_NAME_CHANGE = 'INTERVIEWER_NAME_CHANGE';

export const INTERVIEWER_SELECT_TOGGLE = 'INTERVIEWER_SELECT_TOGGLE';
export const INTERVIEWER_SELECT_CHANGE = 'INTERVIEWER_SELECT_CHANGE';
export const INTERVIEWER_SELECT_CLEAR = 'INTERVIEWER_SELECT_CLEAR';

export const ADD_INTERVIEWER_CLICK = 'ADD_INTERVIEWER_CLICK';
export const REMOVE_INTERVIEWER = 'REMOVE_INTERVIEWER';
export const CLEAR_INTERVIEWERS = 'CLEAR_INTERVIEWERS';

export const HANDLE_MODAL_TOGGLE = 'HANDLE_MODAL_TOGGLE';


interface IInterviewerCommentChangeAction { type: typeof INTERVIEWER_COMMENT_CHANGE, value: string }
interface IInterviewerNameChangeAction { type: typeof INTERVIEWER_NAME_CHANGE, value: string }

interface IInterviewerSelectToggleAction { type: typeof INTERVIEWER_SELECT_TOGGLE, expanded: boolean }
interface IInterviewerSelectChangeAction { type: typeof INTERVIEWER_SELECT_CHANGE, selection: string }
interface IInterviewerSelectClearAction { type: typeof INTERVIEWER_SELECT_CLEAR }


interface IAddInterviewerClickAction { type: typeof ADD_INTERVIEWER_CLICK }
interface IRemoveInterviewerAction { type: typeof REMOVE_INTERVIEWER, name: string }
interface IClearInterviewersAction { type: typeof CLEAR_INTERVIEWERS }
interface IHandleModalToggleAction { type: typeof HANDLE_MODAL_TOGGLE }

export type InterviewerTeamActionTypes =
    IInterviewerCommentChangeAction | IInterviewerNameChangeAction |
    IInterviewerSelectToggleAction | IInterviewerSelectChangeAction | IInterviewerSelectClearAction |
    IAddInterviewerClickAction | IRemoveInterviewerAction | IClearInterviewersAction |
    IHandleModalToggleAction;