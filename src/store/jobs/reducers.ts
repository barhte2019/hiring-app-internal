import { toast } from "react-toastify";
import {
    IJobState,
    JobActionTypes,
    JOB_DESCRIPTION_CHANGE, JOB_LOCATION_CHANGE, JOB_TITLE_CHANGE,
    JOB_LIST_FECTHING, JOB_LIST_FETCH_SUCCESS, JOB_LIST_FETCH_ERROR, JOB_DETAIL_RECEIVED,
    JOB_DETAIL_FETCHING, JOB_DETAIL_FETCH_SUCCESS, JOB_DETAIL_FETCH_ERROR,
    JOB_SUBMIT, JOB_CREATED_ERROR, JOB_CREATED, JOB_MILESTONES_RECEIVED, JOB_PROCESS_INSTANCE_RECEIVED, SALARY_MIN_CHANGE, SALARY_MAX_CHANGE, JOB_TYPE_SELECT_TOGGLE, JOB_TYPE_SELECT_CHANGE, JOB_TYPE_SELECT_CLEAR, JOB_CATEGORY_SELECT_TOGGLE, JOB_CATEGORY_SELECT_CHANGE, JOB_CATEGORY_SELECT_CLEAR,
} from './types';

const initialState: IJobState = {
    jobCategorySelectExpanded: false,
    jobIds: [],
    jobTypeSelectExpanded: false,
    list: {},
    loading: false,
    milestones: {},
    newJob: {
        jobDescription: '',
        jobTitle: '',
        location: ''
    },
    processInstances: {},
    selectedJob: {
        jobDescription: '',
        jobTitle: '',
        location: ''
    },

}

export function jobsReducer(
    state = initialState,
    action: JobActionTypes
): IJobState {
    switch (action.type) {
        case JOB_DESCRIPTION_CHANGE: { return { ...state, newJob: { ...state.newJob, jobDescription: action.value } } }
        case JOB_LOCATION_CHANGE: { return { ...state, newJob: { ...state.newJob, location: action.value } } }
        case JOB_TITLE_CHANGE: { return { ...state, newJob: { ...state.newJob, jobTitle: action.value } } }
        case SALARY_MIN_CHANGE: { return { ...state, newJob: { ...state.newJob, salaryMin: Number(action.value) } } }
        case SALARY_MAX_CHANGE: { return { ...state, newJob: { ...state.newJob, salaryMax: Number(action.value) } } }

        case JOB_TYPE_SELECT_TOGGLE: { return { ...state, jobTypeSelectExpanded: action.expanded } }
        case JOB_TYPE_SELECT_CHANGE: { return { ...state, jobTypeSelectExpanded: false, newJob: { ...state.newJob, jobType: action.selection } } }
        case JOB_TYPE_SELECT_CLEAR: { return { ...state, jobTypeSelectExpanded: false, newJob: { ...state.newJob, jobType: '' } } }

        case JOB_CATEGORY_SELECT_TOGGLE: { return { ...state, jobCategorySelectExpanded: action.expanded } }
        case JOB_CATEGORY_SELECT_CHANGE: { return { ...state, jobCategorySelectExpanded: false, newJob: { ...state.newJob, jobCategory: action.selection } } }
        case JOB_CATEGORY_SELECT_CLEAR: { return { ...state, jobCategorySelectExpanded: false, newJob: { ...state.newJob, jobCategory: '' } } }

        case JOB_DETAIL_FETCHING: {
            return {
                ...state,
                loading: true
            }
        }
        case JOB_DETAIL_FETCH_SUCCESS: {
            const resultState = {
                ...state,
                loading: false,
                selectedJob: action.data
            }
            return resultState;
        }
        case JOB_DETAIL_FETCH_ERROR: {
            const resultState = {
                ...state,
                error_message: action.serverErrors ? action.serverErrors.message : 'Unexpected Error while retrieving the jobs list :(',
                loading: false
            };
            toast.error(resultState.error_message);
            return resultState;
        }
        case JOB_LIST_FECTHING: {
            return {
                ...state,
                loading: true
            }
        }
        case JOB_LIST_FETCH_SUCCESS: {
            return {
                ...state,
                jobIds: action.list.instances.map<string>(item => item["case-id"]),
                loading: false,
            }
        }
        case JOB_LIST_FETCH_ERROR: {
            const resultState = {
                ...state,
                error_message: action.serverErrors ? action.serverErrors.message : 'Unexpected Error while retrieving the jobs list :(',
                loading: false
            };
            toast.error(resultState.error_message);
            return resultState;
        }
        case JOB_DETAIL_RECEIVED: {
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.jobId]: { ...action.hiringPetition }
                }
            }
        }
        case JOB_MILESTONES_RECEIVED: {
            return {
                ...state,
                milestones: {
                    ...state.milestones,
                    [action.jobId]: { ...action.milestones },
                }
            }
        }

        case JOB_PROCESS_INSTANCE_RECEIVED: {
            return {
                ...state,
                processInstances: {
                    ...state.processInstances,
                    [action.jobId]: { ...action.processInstance },
                }
            }
        }

        case JOB_SUBMIT: {
            return {
                ...state,
                loading: true
            }
        }
        case JOB_CREATED_ERROR: {
            const resultState = {
                ...state,
                error_message: action.serverErrors ? action.serverErrors.message : 'Unexpected Error! :(',
                loading: false
            };
            toast.error(resultState.error_message);
            return resultState;
        }
        case JOB_CREATED: {
            const createJobSuccessState = {
                ...state,
                loading: false,
                newJob: {
                    jobDescription: '',
                    jobTitle: '',
                    location: ''
                },
            };
            toast.success('Job Post created with id: ' + action.jobId);
            return createJobSuccessState;
        }
        default: return state;
    }
}