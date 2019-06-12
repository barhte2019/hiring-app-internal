export interface IJobState {
    newJob: IJob,
    error_message?: string
}

export interface IJob {
    jobId?: string,
    jobPostTitle: string,
}

// Describe actions
export const INPUT_CHANGE = 'INPUT_CHANGE';
export const JOB_SUBMIT = 'JOB_SUBMIT';
export const JOB_CREATED = 'JOB_CREATED';
export const JOB_CREATED_ERROR = 'JOB_CREATED_ERROR';

interface IInputChangeAction {
    type: typeof INPUT_CHANGE,
    value: string
}

interface IJobSubmitAction {
    type: typeof JOB_SUBMIT
}

interface IJobCreatedAction {
    type: typeof JOB_CREATED,
    jobId: string
}

interface IJobCreatedErrorAction {
    type: typeof JOB_CREATED_ERROR,
    serverErrors: any
}

export type JobActionTypes = IInputChangeAction 
    | IJobSubmitAction | IJobCreatedAction | IJobCreatedErrorAction;