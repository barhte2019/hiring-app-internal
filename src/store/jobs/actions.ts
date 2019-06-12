import { INPUT_CHANGE, JOB_SUBMIT, JOB_CREATED, JOB_CREATED_ERROR, IJob } from './types';
import api from '../api';
import { push } from 'connected-react-router';

export function inputChange(value: string) {
    return {
        type: INPUT_CHANGE,
        value
    }
}

export function createJobFormError(err: any) {
    return {
        err,
        type: JOB_CREATED_ERROR,
    }
}

export function createJobFormSucceed(jobId: string) {
    return {
        jobId,
        type: JOB_CREATED,
    }
}

export function createJob(job: IJob) {
    return dispatch => {
        dispatch({type: JOB_SUBMIT})

        return api.jobs.create(job).then(resp => {
            dispatch(push('/'));
            return dispatch({type: JOB_CREATED, jobId: resp.data});
        }).catch(err => {
            return dispatch({type: JOB_CREATED_ERROR, serverErrors: err})
        });
    }
}