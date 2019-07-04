import api from '../api';

import { 
    TOGGLE_ACTIVE_TAB,
    POT_TASK_LIST_FETCHING, POT_TASK_LIST_SUCCESS, POT_TASK_LIST_ERROR,
} from './types';

export function toggleActiveTab(tabIndex: number) {
    return {
        tabIndex,
        type: TOGGLE_ACTIVE_TAB,
    }
}

export function potentialTaskListFetch(page: number, pageSize: number) {
    return dispatch => {
        dispatch({type: POT_TASK_LIST_FETCHING});

        return api.tasks.listPot(page, pageSize)
        .then(response => {
            return dispatch({type: POT_TASK_LIST_SUCCESS, list: response.data["task-summary"]})
        })
        .catch(err => {
            return dispatch({type: POT_TASK_LIST_ERROR, serverErrors: err});
        });
    }
}