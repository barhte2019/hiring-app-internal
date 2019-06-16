import { toast } from "react-toastify";
import {
    IJobState,
    JobActionTypes,
    JOB_DESCRIPTION_CHANGE,
    JOB_LOCATION_CHANGE,
    JOB_TITLE_CHANGE,
    JOB_CREATED_ERROR,
    JOB_CREATED
} from './types';

const initialState: IJobState = {
    newJob: {
        jobDescription: '',
        jobTitle: '',
        location: ''
    }
}

export function jobsReducer(
    state = initialState,
    action: JobActionTypes
): IJobState {
    switch (action.type) {
        case JOB_DESCRIPTION_CHANGE: {
            return {
                ...state,
                newJob: {
                    ...state.newJob,
                    jobDescription: action.value
                }
            }
        }
        case JOB_LOCATION_CHANGE: {
            return {
                ...state,
                newJob: {
                    ...state.newJob,
                    location: action.value
                }
            }
        }
        case JOB_TITLE_CHANGE: {
            return {
                ...state,
                newJob: {
                    ...state.newJob,
                    jobTitle: action.value
                }
            }
        }
        case JOB_CREATED_ERROR: {
            const resultState = {
                ...state,
                error_message: action.serverErrors ? action.serverErrors.message : 'Unexpected Error! :('
            };
            toast.error(resultState.error_message);
            return resultState;
        }
        case JOB_CREATED: {
            const createJobSuccessState = {
                ...state,
                newJob: {
                    ...state.newJob,
                    jobId: action.jobId
                }
            };
            toast.success('Job Post created with id: ' + createJobSuccessState.newJob.jobId);
            return createJobSuccessState;
        }
        default: return state;
    }
}