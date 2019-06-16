export interface IJobState {
    newJob: IJob,
    error_message?: string
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
export const JOB_SUBMIT = 'JOB_SUBMIT';
export const JOB_CREATED = 'JOB_CREATED';
export const JOB_CREATED_ERROR = 'JOB_CREATED_ERROR';

interface IJobDescriptionChangeAction { type: typeof JOB_DESCRIPTION_CHANGE, value: string }

interface IJobLocationChangeAction {type: typeof JOB_LOCATION_CHANGE, value: string}

interface IJobTitleChangeAction { type: typeof JOB_TITLE_CHANGE, value: string }

interface IJobSubmitAction { type: typeof JOB_SUBMIT }

interface IJobCreatedAction { type: typeof JOB_CREATED, jobId: string }

interface IJobCreatedErrorAction { type: typeof JOB_CREATED_ERROR, serverErrors: any}

export type JobActionTypes = 
    IJobDescriptionChangeAction | IJobLocationChangeAction | IJobTitleChangeAction
    | IJobSubmitAction | IJobCreatedAction | IJobCreatedErrorAction;