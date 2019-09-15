import {
    IScheduleInterviewsModalState, ScheduleInterviewsActionTypes,
    HANDLE_SCHEDULE_MODAL_TOGGLE,
    SCHEDULE_LIST_LOADING,
    SCHEDULE_LIST_SUCCEED,
    SCHEDULE_LIST_FAILED,
    STARTS_AT_CHANGE,
    DURATION_CHANGE,
} from './types';

const initialState: IScheduleInterviewsModalState = {
    appointments: {},
    error_message: '',
    interviewers: [],
    loading: false,
    modalVisible: false,
    taskId: 0,
}

export function scheduleInterviewsModalReducer(
    state = initialState,
    action: ScheduleInterviewsActionTypes
): IScheduleInterviewsModalState {
    switch (action.type) {
        case HANDLE_SCHEDULE_MODAL_TOGGLE: { return { ...state, modalVisible: !state.modalVisible } }
        case SCHEDULE_LIST_LOADING: { return { ...state, loading: true } }
        case SCHEDULE_LIST_SUCCEED: { return { ...state, loading: false, interviewers: action.schedules } }
        case SCHEDULE_LIST_FAILED: { return { ...state, loading: false, error_message: action.serverErrors } }
        case STARTS_AT_CHANGE: { return { ...state, appointments: { ...state.appointments, [action.interviewer]: { ...state.appointments[action.interviewer], startsAt: action.value } } } }
        case DURATION_CHANGE: { return { ...state, appointments: { ...state.appointments, [action.interviewer]: { ...state.appointments[action.interviewer], duration: action.value } } } }
        default: return state;
    }
}