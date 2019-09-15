import {
    HANDLE_SCHEDULE_MODAL_TOGGLE,
    SCHEDULE_LIST_LOADING, SCHEDULE_LIST_SUCCEED, SCHEDULE_LIST_FAILED, IInterviewerSchedule,
    STARTS_AT_CHANGE, DURATION_CHANGE,
} from './types';
import api from 'src/store/api';

export function handleScheduleInterviewModalToggle() {
    return { type: HANDLE_SCHEDULE_MODAL_TOGGLE }
}

export function scheduleInterviewModalOpen(taskId: number) {
    return dispatch => {
        dispatch({ type: SCHEDULE_LIST_LOADING });
        return api.tasks.detail(taskId)
            .then(response => {
                // tslint:disable-next-line:no-string-literal
                const responseSchedules: any[] = response.data['interviewerAppointments'];
                const schedules: IInterviewerSchedule[] = responseSchedules.map<IInterviewerSchedule>(item => {
                    if (item['com.myspace.hr_hiring.InterviewAppointment']) {
                        return { ...item['com.myspace.hr_hiring.InterviewAppointment'] }
                    } else {
                        return { ...item }
                    }
                })

                dispatch(handleScheduleInterviewModalToggle());
                return dispatch({ type: SCHEDULE_LIST_SUCCEED, schedules })
            })
            .catch(err => {
                return dispatch({ type: SCHEDULE_LIST_FAILED, serverErrors: err })
            });
    }
}

export function startsAtChange(interviewer: string, value: string) {
    return dispatch => {
        return dispatch({ type: STARTS_AT_CHANGE, interviewer, value })
    }
}

export function durationChange(interviewer: string, value: string) {
    return dispatch => {
        return dispatch({ type: DURATION_CHANGE, interviewer, value });
    }
}