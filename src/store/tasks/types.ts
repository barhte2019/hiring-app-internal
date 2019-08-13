import { ITaskSummary, ITask } from "src/common/types";

export interface ITaskState {
    potentialTasks: ITask[],
    ownedTasks: ITask[],
    selectedTask: ITask|any,
    loading: boolean,
    error_message: string,
    activeTabKey?: number,
}

// Describe actions
export const TOGGLE_ACTIVE_TAB = 'TOGGLE_ACTIVE_TAB';

export const POT_TASK_LIST_FETCHING = 'POT_TASK_LIST_FETCHING';
export const POT_TASK_LIST_SUCCESS = 'POT_TASK_LIST_SUCCESS';
export const POT_TASK_LIST_ERROR = 'POT_TASK_LIST_ERROR';

export const POT_TASK_CLAIMING = 'POT_TASK_CLAIMING';
export const POT_TASK_CLAIM_SUCCESS = 'POT_TASK_CLAIM_SUCCESS';
export const POT_TASK_CLAIM_FAILED = 'POT_TASK_CLAIM_FAILED';

interface IToggleActiveTabAction {
    type: typeof TOGGLE_ACTIVE_TAB,
    tabIndex: number
}

interface IPotTaskListFetchingAction { type: typeof POT_TASK_LIST_FETCHING, page: number, pageSize: number }
interface IPotTaskListFetchSuccessAction { type: typeof POT_TASK_LIST_SUCCESS, list: ITask[] }
interface IPotTaskListFetchErrorAction { type: typeof POT_TASK_LIST_ERROR, serverErrors: any }

interface IPotTaskClaimingAction {type: typeof POT_TASK_CLAIMING}
interface IPotTaskClaimSuccessAction {type: typeof POT_TASK_CLAIM_SUCCESS}
interface IPotTaskClaimFailedAction{type: typeof POT_TASK_CLAIM_FAILED, serverErrors: any}

export type TaskActionTypes =
    IToggleActiveTabAction |
    IPotTaskListFetchingAction | IPotTaskListFetchSuccessAction | IPotTaskListFetchErrorAction |
    IPotTaskClaimingAction | IPotTaskClaimSuccessAction | IPotTaskClaimFailedAction ;