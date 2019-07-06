import api from '../api';
import { push } from 'connected-react-router';

import {
    JOB_DESCRIPTION_CHANGE, JOB_LOCATION_CHANGE, JOB_TITLE_CHANGE,
    JOB_LIST_FECTHING, JOB_LIST_FETCH_SUCCESS, JOB_LIST_FETCH_ERROR, JOB_DETAIL_RECEIVED,
    JOB_DETAIL_FETCHING, JOB_DETAIL_FETCH_SUCCESS, JOB_DETAIL_FETCH_ERROR,
    JOB_SUBMIT, JOB_CREATED, JOB_CREATED_ERROR,
    IJob,
    JOB_MILESTONES_RECEIVED
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

export function jobListFecth(page: number, pageSize: number) {
    return dispatch => {
        dispatch({ type: JOB_LIST_FECTHING });

        return api.jobs.list(page, pageSize)
            .then(resp => {
                return dispatch({ type: JOB_LIST_FETCH_SUCCESS, list: resp.data })
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
            return dispatch({type: JOB_DETAIL_RECEIVED, jobId, hiringPetition: resp.data});
        }).catch(err => {
            return dispatch({type: JOB_DETAIL_FETCH_ERROR, serverErrors: err})
        })
    }
}

export function jobMilestonesReceived(jobId: string) {
    return dispatch => {
        return api.jobs.milestones(jobId).then(response => {
            return dispatch({type: JOB_MILESTONES_RECEIVED, jobId, milestones: response.data});
        }).catch(err => {
            return dispatch({type: JOB_DETAIL_FETCH_ERROR, serverErrors: err})
        })
    }
}

export function jobListWithDetail(page: number, pageSize: number) {
    return (dispatch, getState) => {
        dispatch(jobListFecth(page, pageSize)).then(() => {
            getState().jobs.jobIds.forEach(jobId => {dispatch(jobDetailReceived(jobId))});
        }).then(() => {
            getState().jobs.jobIds.forEach(jobId => {dispatch(jobMilestonesReceived(jobId))});
        }).catch(e => {
            dispatch({type: JOB_DETAIL_FETCH_ERROR, serverErrors: e})
        });
    }
}

export function jobDetailFetch(jobId: string) {
    return dispatch => {
        dispatch({type: JOB_DETAIL_FETCHING});
        return api.jobs.detail(jobId).then(resp => {
            return dispatch({type: JOB_DETAIL_FETCH_SUCCESS, job: resp.data});
        }).catch(err => {
            return dispatch({type: JOB_DETAIL_FETCH_ERROR, serverErrors: err});
        });
    }
}

export function createJobFormError(err: any) {
    return { err, type: JOB_CREATED_ERROR }
}

export function createJobFormSucceed(jobId: string) {
    return { jobId, type: JOB_CREATED }
}

export function createJob(job: IJob) {
    return dispatch => {
        dispatch({ type: JOB_SUBMIT });

        return api.jobs.create(job).then(resp => {
            dispatch(push('/'));
            return dispatch({ type: JOB_CREATED, jobId: resp.data });
        }).catch(err => {
            return dispatch({ type: JOB_CREATED_ERROR, serverErrors: err })
        });
    }
}