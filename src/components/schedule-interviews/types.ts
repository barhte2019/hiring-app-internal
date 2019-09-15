export interface IScheduleInterviewsModalState {
    appointments: {},
    interviewers: IInterviewerSchedule[],
    loading: boolean,
    error_message?: string,
    modalVisible: boolean,
    taskId: number,
}

export interface IInterviewerSchedule {
    interviewer: string,
    interviewee: string,
    comment: string,
    interviewerDurationMinutes: number,
    interviewStarts: string,
}

// Describe actions
export const HANDLE_SCHEDULE_MODAL_TOGGLE = 'HANDLE_SCHEDULE_MODAL_TOGGLE';
export const SCHEDULE_LIST_LOADING = 'SCHEDULE_LIST_LOADING';
export const SCHEDULE_LIST_SUCCEED = 'SCHEDULE_LIST_SUCCEED';
export const SCHEDULE_LIST_FAILED = 'SCHEDULE_LIST_FAILED';

export const STARTS_AT_CHANGE = 'STARTS_AT_CHANGE';
export const DURATION_CHANGE = 'DURATION_CHANGE';

interface IHandleScueduleModalToggleAction { type: typeof HANDLE_SCHEDULE_MODAL_TOGGLE }
interface IScheduleListLoadingAction { type: typeof SCHEDULE_LIST_LOADING }
interface IScheduleListSuccessAction { type: typeof SCHEDULE_LIST_SUCCEED, schedules: IInterviewerSchedule[] }
interface IScheduleListFailAction { type: typeof SCHEDULE_LIST_FAILED, serverErrors: any }

interface IStartsAtChangeAction { type: typeof STARTS_AT_CHANGE, interviewer: string, value: string }
interface IDurationChangeAction { type: typeof DURATION_CHANGE, interviewer: string, value: string }

export type ScheduleInterviewsActionTypes = IHandleScueduleModalToggleAction |
    IScheduleListLoadingAction | IScheduleListSuccessAction | IScheduleListFailAction |
    IStartsAtChangeAction | IDurationChangeAction;