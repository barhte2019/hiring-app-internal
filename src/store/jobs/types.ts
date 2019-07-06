import { ICaseInstances, IHiringPetition } from "src/common/types";
import { ICaseMilestones } from "../api";

export interface IJobState {
    jobIds: string[],
    newJob: IJob,
    list: any,
    milestones: any,
    error_message?: string,
    loading: boolean,
    selectedJob: IJob,
}

export interface IJob {
    jobId?: string,
    jobTitle?: string,
    jobDescription?: string,
    location?: string
}

// Describe actions
export const JOB_DESCRIPTION_CHANGE = 'JOB_DESCRIPTION_CHANGE';
export const JOB_LOCATION_CHANGE = 'JOB_LOCATION_CHANGE';
export const JOB_TITLE_CHANGE = 'JOB_TITLE_CHANGE';

export const JOB_LIST_FECTHING = 'JOB_LIST_FETCHING';
export const JOB_LIST_FETCH_SUCCESS = 'JOB_LIST_FETCH_SUCCESS';
export const JOB_LIST_FETCH_ERROR = 'JOB_LIST_FETCH_ERROR';
export const JOB_DETAIL_RECEIVED = 'JOB_DETAIL_RECEIVED';
export const JOB_MILESTONES_RECEIVED = 'JOB_MILESTONES_RECEIVED';

export const JOB_DETAIL_FETCHING = 'JOB_DETAIL_FETCHING';
export const JOB_DETAIL_FETCH_SUCCESS = 'JOB_DETAIL_FETCH_SUCCESS';
export const JOB_DETAIL_FETCH_ERROR = 'JOB_DETAIL_FETCH_ERROR';

export const JOB_SUBMIT = 'JOB_SUBMIT';
export const JOB_CREATED = 'JOB_CREATED';
export const JOB_CREATED_ERROR = 'JOB_CREATED_ERROR';

interface IJobDescriptionChangeAction { type: typeof JOB_DESCRIPTION_CHANGE, value: string }

interface IJobLocationChangeAction {type: typeof JOB_LOCATION_CHANGE, value: string}

interface IJobTitleChangeAction { type: typeof JOB_TITLE_CHANGE, value: string }

interface IJobListFetchingAction { type: typeof JOB_LIST_FECTHING, page: number, pageSize: number }

interface IJobListFetchSuccessAction {type: typeof JOB_LIST_FETCH_SUCCESS, list: ICaseInstances}

interface IJobListFetchErrorAction {type: typeof JOB_LIST_FETCH_ERROR, serverErrors: any}

interface IJobDetailReceivedAction {type: typeof JOB_DETAIL_RECEIVED, jobId: string,  hiringPetition: IHiringPetition}

interface IJobMilestonesReceivedAction {type: typeof JOB_MILESTONES_RECEIVED, jobId: string, milestones: ICaseMilestones }

interface IJobDetailFetchingAction { type: typeof JOB_DETAIL_FETCHING, jobId: string }

interface IJobDetailFetchSuccessAction { type: typeof JOB_DETAIL_FETCH_SUCCESS, data: IJob }

interface IJobDetailFetchErrorAction { type: typeof JOB_DETAIL_FETCH_ERROR, serverErrors: any }

interface IJobSubmitAction { type: typeof JOB_SUBMIT }

interface IJobCreatedAction { type: typeof JOB_CREATED, jobId: string }

interface IJobCreatedErrorAction { type: typeof JOB_CREATED_ERROR, serverErrors: any}

export type JobActionTypes = 
    IJobDescriptionChangeAction | IJobLocationChangeAction | IJobTitleChangeAction
    | IJobListFetchingAction | IJobListFetchSuccessAction | IJobListFetchErrorAction 
    | IJobDetailReceivedAction | IJobMilestonesReceivedAction
    | IJobDetailFetchingAction | IJobDetailFetchSuccessAction | IJobDetailFetchErrorAction
    | IJobSubmitAction | IJobCreatedAction | IJobCreatedErrorAction;