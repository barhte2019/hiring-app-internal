import api from '../api';
import { push } from 'connected-react-router';

import {
    JOB_DESCRIPTION_CHANGE, JOB_LOCATION_CHANGE, JOB_TITLE_CHANGE,
    JOB_LIST_FECTHING, JOB_LIST_FETCH_SUCCESS, JOB_LIST_FETCH_ERROR, JOB_DETAIL_RECEIVED,
    JOB_DETAIL_FETCHING, JOB_DETAIL_FETCH_SUCCESS, JOB_DETAIL_FETCH_ERROR, JOB_PROCESS_INSTANCE_RECEIVED,
    JOB_SUBMIT, JOB_CREATED, JOB_CREATED_ERROR,
    IJob,
    JOB_MILESTONES_RECEIVED,
    SALARY_MIN_CHANGE,
    SALARY_MAX_CHANGE,
    JOB_TYPE_SELECT_TOGGLE,
    JOB_TYPE_SELECT_CHANGE,
    JOB_TYPE_SELECT_CLEAR,
    JOB_CATEGORY_SELECT_TOGGLE,
    JOB_CATEGORY_SELECT_CHANGE,
    JOB_CATEGORY_SELECT_CLEAR
} from './types';

export function jobDescriptionChange(value: string) {
    return { type: JOB_DESCRIPTION_CHANGE, value }
}

export function jobLocationChange(value: string) {
    return { type: JOB_LOCATION_CHANGE, value }
}

export function jobTitleChange(value: string) {
    return { type: JOB_TITLE_CHANGE, value }
}

export function jobSalaryMinChange(value: string) {
    return { type: SALARY_MIN_CHANGE, value }
}

export function jobSalaryMaxChange(value: string) {
    return { type: SALARY_MAX_CHANGE, value }
}

export function jobTypeSelectToggle(expanded: boolean) {
    return { type: JOB_TYPE_SELECT_TOGGLE, expanded }
}

export function jobTypeSelectChange(selection: string) {
    return { type: JOB_TYPE_SELECT_CHANGE, selection }
}

export function jobTypeSelectClear() {
    return { type: JOB_TYPE_SELECT_CLEAR }
}

export function jobCategorySelectToggle(expanded: boolean) {
    return { type: JOB_CATEGORY_SELECT_TOGGLE, expanded }
}

export function jobCategorySelectChange(selection: string) {
    return { type: JOB_CATEGORY_SELECT_CHANGE, selection }
}

export function jobCategorySelectClear() {
    return { type: JOB_CATEGORY_SELECT_CLEAR }
}

export function jobListFecth(page: number, pageSize: number) {
    return dispatch => {
        dispatch({ type: JOB_LIST_FECTHING });

        return api.jobs.list(page, pageSize)
            .then(resp => {
                return dispatch({ type: JOB_LIST_FETCH_SUCCESS, list: resp.data });
            })
            .catch(err => {
                return dispatch({ type: JOB_LIST_FETCH_ERROR, serverErrors: err })
            }
            );
    }
}

export function jobDetailReceived(jobId: string) {
    return dispatch => {
        return api.jobs.detail(jobId).then(resp => {
            return dispatch({ type: JOB_DETAIL_RECEIVED, jobId, hiringPetition: resp.data });
        }).catch(err => {
            return dispatch({ type: JOB_DETAIL_FETCH_ERROR, serverErrors: err })
        })
    }
}

export function jobMilestonesReceived(jobId: string) {
    return dispatch => {
        return api.jobs.milestones(jobId).then(response => {
            return dispatch({ type: JOB_MILESTONES_RECEIVED, jobId, milestones: response.data });
        }).catch(err => {
            return dispatch({ type: JOB_DETAIL_FETCH_ERROR, serverErrors: err })
        })
    }
}

export function jobProcessInstanceReceived(jobId: string) {
    return dispatch => {
        api.process.byCorrelationKey(jobId).then(response => {
            return dispatch({ type: JOB_PROCESS_INSTANCE_RECEIVED, jobId, processInstance: response.data })
        }).catch(err => {
            return dispatch({ type: JOB_DETAIL_FETCH_ERROR, serverErrors: err })
        })
    }
}

export function jobListWithDetail(page: number, pageSize: number) {
    return (dispatch, getState) => {
        dispatch(jobListFecth(page, pageSize)).then(() => {
            getState().jobs.jobIds.forEach(jobId => {
                dispatch(jobDetailReceived(jobId));
                dispatch(jobProcessInstanceReceived(jobId));
            });
        }).then(() => {
            getState().jobs.jobIds.forEach(jobId => {
                dispatch(jobMilestonesReceived(jobId));
                dispatch(jobProcessInstanceReceived(jobId));
            });
        }).catch(e => {
            dispatch({ type: JOB_DETAIL_FETCH_ERROR, serverErrors: e })
        });
    }
}

export function jobDetailFetch(jobId: string) {
    return dispatch => {
        dispatch({ type: JOB_DETAIL_FETCHING });
        return api.jobs.detail(jobId).then(resp => {
            return dispatch({ type: JOB_DETAIL_FETCH_SUCCESS, job: resp.data });
        }).catch(err => {
            return dispatch({ type: JOB_DETAIL_FETCH_ERROR, serverErrors: err });
        });
    }
}

export function createJobFormError(err: any) {
    return { err, type: JOB_CREATED_ERROR }
}

export function createJobFormSucceed(jobId: string) {
    return { jobId, type: JOB_CREATED }
}

export function createJob(job: IJob, owner: string) {
    return dispatch => {
        dispatch({ type: JOB_SUBMIT });
        return api.jobs.create(job, owner).then(resp => {
            dispatch(push('/'));
            return dispatch({ type: JOB_CREATED, jobId: resp.data });
        }).catch(err => {
            return dispatch({ type: JOB_CREATED_ERROR, serverErrors: err })
        });
    }
}

export function jobViewDetail(jobId: string) {
    return dispatch => {
        return dispatch(push('/jobs/' + jobId));
    }
}