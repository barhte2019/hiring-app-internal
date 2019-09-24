import api from '../api';

import {
    TOGGLE_ACTIVE_TAB,
    POT_TASK_LIST_FETCHING, POT_TASK_LIST_SUCCESS, POT_TASK_LIST_ERROR,
    OWNED_TASK_LIST_FETCHING, OWNED_TASK_LIST_SUCCESS, OWNED_TASK_LIST_ERROR,
    POT_TASK_CLAIMING, POT_TASK_CLAIM_SUCCESS, POT_TASK_CLAIM_FAILED,
    OWNED_TASK_RELEASING, OWNED_TASK_RELEASE_SUCCESS, OWNED_TASK_RELEASE_FAILED,
    TASK_COMPLETING, TASK_COMPLETED_SUCCESS, TASK_COMPLETED_FAILED,
    TASK_DETAIL_FETCHING, TASK_DETAIL_FETCH_SUCCESS, TASK_DETAIL_FECH_FAILED,
    DYNAMIC_TASK_CREATING, DYNAMIC_TASK_CREATE_SUCCESS, DYNAMIC_TASK_CREATE_FAILED,
} from './types';

export function toggleActiveTab(tabIndex: number) {
    return {
        tabIndex,
        type: TOGGLE_ACTIVE_TAB,
    }
}

export function potentialTaskListFetch(page: number, pageSize: number) {
    return dispatch => {
        dispatch({ type: POT_TASK_LIST_FETCHING });

        return api.tasks.listPot(page, pageSize)
            .then(response => {
                return dispatch({ type: POT_TASK_LIST_SUCCESS, list: response.data["task-summary"].filter(item => !item["task-actual-owner"]) })
            })
            .catch(err => {
                return dispatch({ type: POT_TASK_LIST_ERROR, serverErrors: err });
            });
    }
}

export function ownedTaskListFetch(page: number, pageSize: number) {
    return dispatch => {
        dispatch({ type: OWNED_TASK_LIST_FETCHING });

        return api.tasks.listMine(page, pageSize)
            .then(response => {
                return dispatch({ type: OWNED_TASK_LIST_SUCCESS, list: response.data["task-summary"] })
            })
            .catch(err => {
                return dispatch({ type: OWNED_TASK_LIST_ERROR, serverErrors: err });
            });
    }
}

export function claimTask(taskId: number) {
    return dispatch => {
        dispatch({ type: POT_TASK_CLAIMING });
        return api.tasks.claim(taskId).then(resp => {
            dispatch({ tabIndex: 1, type: TOGGLE_ACTIVE_TAB })
            return dispatch({ type: POT_TASK_CLAIM_SUCCESS })
                .then(dispatch(ownedTaskListFetch(0, 10)))
                .then(dispatch(potentialTaskListFetch(0, 10)))
        }).catch(err => {
            return dispatch({ type: POT_TASK_CLAIM_FAILED, serverErrors: err })
        });
    }
}

export function releaseTask(taskId: number) {
    return dispatch => {
        dispatch({ type: OWNED_TASK_RELEASING });
        return api.tasks.release(taskId).then(resp => {
            return dispatch({ type: OWNED_TASK_RELEASE_SUCCESS })
                .then(dispatch(ownedTaskListFetch(0, 10)))
                .then(dispatch(potentialTaskListFetch(0, 10)))
        }).catch(err => {
            return dispatch({ type: OWNED_TASK_RELEASE_FAILED, serverErrors: err })
        });
    }
}

export function completeTask(taskId: number, output: any) {
    return dispatch => {
        dispatch({ type: TASK_COMPLETING });
        return api.tasks.complete(taskId, output).then(resp => {
            return dispatch({ type: TASK_COMPLETED_SUCCESS })
                .then(dispatch(ownedTaskListFetch(0, 10)))
                .then(dispatch(potentialTaskListFetch(0, 10)))
        }).catch(err => {
            return dispatch({ type: TASK_COMPLETED_FAILED, serverErrors: err })
        });
    }
}

export function taskDetail(taskId: number) {
    return dispatch => {
        dispatch({ type: TASK_DETAIL_FETCHING });
        return api.tasks.detail(taskId).then(resp => {
            return dispatch({ type: TASK_DETAIL_FETCH_SUCCESS, output: resp.data, taskId })
        }).catch(err => {
            return dispatch({ type: TASK_DETAIL_FECH_FAILED, serverErrors: err })
        });
    }
}

export function createDynamic(caseId: string, description: string, actor: string, data: any) {
    return dispatch => {
        dispatch({ type: DYNAMIC_TASK_CREATING });
        // api.tasks.createDynamic(caseId, description, actor, data)
        return api.tasks.createDynamicAtStage(caseId, '_4862F81A-6382-4145-9A82-FDC28A86E8B4', description, actor, data).then(r => {
            return dispatch({ type: DYNAMIC_TASK_CREATE_SUCCESS });
        }).catch(err => {
            return dispatch({ type: DYNAMIC_TASK_CREATE_FAILED, serverErrors: err })
        })
    }
}