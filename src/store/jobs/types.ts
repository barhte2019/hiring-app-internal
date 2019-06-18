import { ICaseInstance } from "src/common/types";

export interface IJobState {
    newJob: IJob,
    list: IJob[],
    error_message?: string,
    loading: boolean
}

export interface IJob {
    jobId?: string,
    jobTitle: string,
    jobDescription: string,
    location: string
}

// Describe actions
export const JOB_DESCRIPTION_CHANGE = 'JOB_DESCRIPTION_CHANGE';
export const JOB_LOCATION_CHANGE = 'JOB_LOCATION_CHANGE';
export const JOB_TITLE_CHANGE = 'JOB_TITLE_CHANGE';

export const JOB_LIST_FECTHING = 'JOB_LIST_FETCHING';
export const JOB_LIST_FETCH_SUCCESS = 'JOB_LIST_FETCH_SUCCESS';
export const JOB_LIST_FETCH_ERROR = 'JOB_LIST_FETCH_ERROR';

export const JOB_SUBMIT = 'JOB_SUBMIT';
export const JOB_CREATED = 'JOB_CREATED';
export const JOB_CREATED_ERROR = 'JOB_CREATED_ERROR';

interface IJobDescriptionChangeAction { type: typeof JOB_DESCRIPTION_CHANGE, value: string }

interface IJobLocationChangeAction {type: typeof JOB_LOCATION_CHANGE, value: string}

interface IJobTitleChangeAction { type: typeof JOB_TITLE_CHANGE, value: string }

interface IJobListFetchingAction { type: typeof JOB_LIST_FECTHING, page: number, pageSize: number }

interface IJobListFetchSuccessAction {type: typeof JOB_LIST_FETCH_SUCCESS, data: ICaseInstance[]}

interface IJobListFetchErrorAction {type: typeof JOB_LIST_FETCH_ERROR, serverErrors: any}

interface IJobSubmitAction { type: typeof JOB_SUBMIT }

interface IJobCreatedAction { type: typeof JOB_CREATED, jobId: string }

interface IJobCreatedErrorAction { type: typeof JOB_CREATED_ERROR, serverErrors: any}

export type JobActionTypes = 
    IJobDescriptionChangeAction | IJobLocationChangeAction | IJobTitleChangeAction
    | IJobListFetchingAction | IJobListFetchSuccessAction | IJobListFetchErrorAction
    | IJobSubmitAction | IJobCreatedAction | IJobCreatedErrorAction;