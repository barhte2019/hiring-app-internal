import api from '../api';
import { push } from 'connected-react-router';

import {
    JOB_DESCRIPTION_CHANGE, JOB_LOCATION_CHANGE, JOB_TITLE_CHANGE,
    JOB_SUBMIT,
    JOB_CREATED,
    JOB_CREATED_ERROR,
    IJob
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

export function createJobFormError(err: any) {
    return { err, type: JOB_CREATED_ERROR }
}

export function createJobFormSucceed(jobId: string) {
    return { jobId, type: JOB_CREATED }
}

export function createJob(job: IJob) {
    return dispatch => {
        dispatch({ type: JOB_SUBMIT })

        return api.jobs.create(job).then(resp => {
            dispatch(push('/'));
            return dispatch({ type: JOB_CREATED, jobId: resp.data });
        }).catch(err => {
            return dispatch({ type: JOB_CREATED_ERROR, serverErrors: err })
        });
    }
}