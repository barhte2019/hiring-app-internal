import { INPUT_CHANGE, JOB_SUBMIT, JOB_CREATED, JOB_CREATED_ERROR, IJob } from './types';
import api from '../api';

export function inputChange(value: string) {
    return {
        type: INPUT_CHANGE,
        value
    }
}

export function createJob(job: IJob) {
    return dispatch => {
        dispatch({type: JOB_SUBMIT})

        return api.jobs.create(job).then(resp => {
            return dispatch({type: JOB_CREATED, job: resp.data})
        }).catch(errr => {
            return dispatch({type: JOB_CREATED_ERROR, serverErrors: errr.response.data})
        });
    }
}