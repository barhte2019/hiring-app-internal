import {
    IInterviewerTeamState, InterviewerTeamActionTypes,
    INTERVIEWER_COMMENT_CHANGE,
    INTERVIEWER_NAME_CHANGE,
    ADD_INTERVIEWER_CLICK,
    HANDLE_MODAL_TOGGLE
} from './types'

const initialState: IInterviewerTeamState = {
    error_message: '',
    interviewerComment: '',
    interviewerName: '',
    interviewers: [],
    loading: false,
    modalVisible: false,
    taskId: 0,
}

export function interviewerTeamModalReducer(
    state = initialState,
    action: InterviewerTeamActionTypes
): IInterviewerTeamState {
    switch (action.type) {
        case INTERVIEWER_COMMENT_CHANGE: {
            return {
                ...state,
                interviewerComment: action.value
            }
        }
        case INTERVIEWER_NAME_CHANGE: {
            return {
                ...state,
                interviewerName: action.value
            }
        }
        case ADD_INTERVIEWER_CLICK: {
            return {
                ...state,
                interviewerComment: '',
                interviewerName: '',
                interviewers: state.interviewers.concat([
                    { name: state.interviewerName, comment: state.interviewerComment }
                ]),
            }
        }
        case HANDLE_MODAL_TOGGLE: {
            return {
                ...state,
                modalVisible: !state.modalVisible,
            }
        }
        default: return state;
    }
}