import { toast } from "react-toastify";
import {
    ITaskState, TaskActionTypes,
    POT_TASK_LIST_FETCHING, POT_TASK_LIST_SUCCESS, POT_TASK_LIST_ERROR, TOGGLE_ACTIVE_TAB, POT_TASK_CLAIMING, POT_TASK_CLAIM_SUCCESS, POT_TASK_CLAIM_FAILED, OWNED_TASK_LIST_FETCHING, OWNED_TASK_LIST_SUCCESS, OWNED_TASK_LIST_ERROR,
} from "./types";


const initialState: ITaskState = {
    activeTabKey: 1,
    error_message: '',
    loading: false,
    ownedTasks: [],
    potentialTasks: [],
    selectedTask: {},
}

export function tasksReducer(state = initialState, action: TaskActionTypes): ITaskState {
    switch (action.type) {
        case TOGGLE_ACTIVE_TAB: {
            return {
                ...state,
                activeTabKey: action.tabIndex
            }
        }
        case POT_TASK_LIST_FETCHING: {
            return {
                ...state,
                loading: true
            }
        }
        case POT_TASK_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                potentialTasks: action.list
            }
        }
        case POT_TASK_LIST_ERROR: {
            return {
                ...state,
                error_message: action.serverErrors,
                loading: false,
            }
        }
        case OWNED_TASK_LIST_FETCHING: {
            return {
                ...state,
                loading: true
            }
        }
        case OWNED_TASK_LIST_SUCCESS: {
            return {
                ...state,
                loading: false,
                ownedTasks: action.list
            }
        }

        case OWNED_TASK_LIST_ERROR: {
            return {
                ...state,
                error_message: action.serverErrors,
                loading: false,
            }
        }

        case POT_TASK_CLAIMING: {
            return {
                ...state,
                loading: true,
            }
        }
        case POT_TASK_CLAIM_SUCCESS: {
            return {
                ...state,
                loading: false,
            }
        }
        case POT_TASK_CLAIM_FAILED: {
            return {
                ...state,
                error_message: action.serverErrors,
                loading: false,
            }
        }
        default: return state;
    }
}