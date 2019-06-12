import { toast } from "react-toastify";
import {
    IJobState,
    JobActionTypes,
    INPUT_CHANGE,
    JOB_CREATED_ERROR,
    JOB_CREATED
} from './types';

const initialState: IJobState = {
    newJob: { jobPostTitle: '' }
}

export function jobsReducer(
    state = initialState,
    action: JobActionTypes
): IJobState {
    switch (action.type) {
        case INPUT_CHANGE: {
            return {
                ...state,
                newJob: { jobPostTitle: action.value }
            }
        }
        case JOB_CREATED_ERROR: {
            const resultState = {
                ...state,
                error_message: action.serverErrors?action.serverErrors.message:'Unexpected Error! :('
            };
            toast.error(resultState.error_message);
            return resultState;
        }
        case JOB_CREATED: {
            const createJobSuccessState = {
                ...state,
                newJob: {jobId: action.jobId, jobPostTitle: ''}
            };
            toast.success('Job Post created with id: ' + createJobSuccessState.newJob.jobId);
            return createJobSuccessState;
        }
        default: return state;
    }
}