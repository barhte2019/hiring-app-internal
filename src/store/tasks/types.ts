import { ITaskSummary, ITask } from "src/common/types";

export interface ITaskState {
    potentialTasks: ITask[],
    ownedTasks: ITask[],
    selectedTaskId: number,
    loading: boolean,
    error_message: string,
    activeTabKey?: number,
    selectedTaskOutput?: any
}

// Describe actions
export const TOGGLE_ACTIVE_TAB = 'TOGGLE_ACTIVE_TAB';

export const POT_TASK_LIST_FETCHING = 'POT_TASK_LIST_FETCHING';
export const POT_TASK_LIST_SUCCESS = 'POT_TASK_LIST_SUCCESS';
export const POT_TASK_LIST_ERROR = 'POT_TASK_LIST_ERROR';

export const OWNED_TASK_LIST_FETCHING = 'OWNED_TASK_LIST_FETCHING';
export const OWNED_TASK_LIST_SUCCESS = 'OWNED_TASK_LIST_SUCCESS';
export const OWNED_TASK_LIST_ERROR = 'OWNED_TASK_LIST_ERROR';

export const POT_TASK_CLAIMING = 'POT_TASK_CLAIMING';
export const POT_TASK_CLAIM_SUCCESS = 'POT_TASK_CLAIM_SUCCESS';
export const POT_TASK_CLAIM_FAILED = 'POT_TASK_CLAIM_FAILED';

export const OWNED_TASK_RELEASING = 'OWNED_TASK_RELEASING';
export const OWNED_TASK_RELEASE_SUCCESS = 'OWNED_TASK_RELEASE_SUCCESS';
export const OWNED_TASK_RELEASE_FAILED = 'OWNED_TASK_RELEASE_FAILED';

export const TASK_COMPLETING = 'TASK_COMPLETING';
export const TASK_COMPLETED_SUCCESS = 'TASK_COMPLETE_SUCCESS';
export const TASK_COMPLETED_FAILED = 'TASK_COMPLETE_FAILED';

export const TASK_DETAIL_FETCHING = 'TASK_DETAIL_FETCHING';
export const TASK_DETAIL_FETCH_SUCCESS = 'TASK_DETAIL_FETCH_SUCCESS';
export const TASK_DETAIL_FECH_FAILED = 'TASK_DETAIL_FETCH_FAILED';

interface IToggleActiveTabAction {
    type: typeof TOGGLE_ACTIVE_TAB,
    tabIndex: number
}

interface IPotTaskListFetchingAction { type: typeof POT_TASK_LIST_FETCHING, page: number, pageSize: number }
interface IPotTaskListFetchSuccessAction { type: typeof POT_TASK_LIST_SUCCESS, list: ITask[] }
interface IPotTaskListFetchErrorAction { type: typeof POT_TASK_LIST_ERROR, serverErrors: any }

interface IOwnedTaskListFechingAction { type: typeof OWNED_TASK_LIST_FETCHING, page: number, pageSize: number }
interface IOwnedTaskListFetchSuccessAction { type: typeof OWNED_TASK_LIST_SUCCESS, list: ITask[] }
interface IOwnedTaskListFetchErrorAction { type: typeof OWNED_TASK_LIST_ERROR, serverErrors: any }

interface IPotTaskClaimingAction { type: typeof POT_TASK_CLAIMING }
interface IPotTaskClaimSuccessAction { type: typeof POT_TASK_CLAIM_SUCCESS }
interface IPotTaskClaimFailedAction { type: typeof POT_TASK_CLAIM_FAILED, serverErrors: any }

interface IOwnedTaskReleasingAction { type: typeof OWNED_TASK_RELEASING }
interface IOwnedTaskReleaseSuccessAction { type: typeof OWNED_TASK_RELEASE_SUCCESS }
interface IOwnedTaskReleaseFailedAction { type: typeof OWNED_TASK_RELEASE_FAILED, serverErrors: any }

interface ITaskCompletingAction { type: typeof TASK_COMPLETING }
interface ITaskCompleteSuccessAction { type: typeof TASK_COMPLETED_SUCCESS }
interface ITaskCompleteFailAction { type: typeof TASK_COMPLETED_FAILED, serverErrors: any }

interface ITaskDetailFetchingAction { type: typeof TASK_DETAIL_FETCHING }
interface ITaskDetailFetchSuccessAction { type: typeof TASK_DETAIL_FETCH_SUCCESS, output: any, taskId: number }
interface ITaskDetailFetchFailAction { type: typeof TASK_DETAIL_FECH_FAILED, serverErrors: any }

export type TaskActionTypes =
    IToggleActiveTabAction |
    IPotTaskListFetchingAction | IPotTaskListFetchSuccessAction | IPotTaskListFetchErrorAction |
    IOwnedTaskListFechingAction | IOwnedTaskListFetchSuccessAction | IOwnedTaskListFetchErrorAction |
    IPotTaskClaimingAction | IPotTaskClaimSuccessAction | IPotTaskClaimFailedAction |
    IOwnedTaskReleasingAction | IOwnedTaskReleaseSuccessAction | IOwnedTaskReleaseFailedAction |
    ITaskCompletingAction | ITaskCompleteSuccessAction | ITaskCompleteFailAction |
    ITaskDetailFetchingAction | ITaskDetailFetchSuccessAction | ITaskDetailFetchFailAction;
