import api from '../api';
import { push } from 'connected-react-router';

import {
    TOGGLE_ACTIVE_TAB,
    POT_TASK_LIST_FETCHING, POT_TASK_LIST_SUCCESS, POT_TASK_LIST_ERROR,
    OWNED_TASK_LIST_FETCHING, OWNED_TASK_LIST_SUCCESS, OWNED_TASK_LIST_ERROR,
    POT_TASK_CLAIMING, POT_TASK_CLAIM_SUCCESS, POT_TASK_CLAIM_FAILED,
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
            .then(dispatch(ownedTaskListFetch(0,10)))
            .then(dispatch(potentialTaskListFetch(0,10)))
        }).catch(err => {
            return dispatch({ type: POT_TASK_CLAIM_FAILED, serverErrors: err })
        });
    }
}