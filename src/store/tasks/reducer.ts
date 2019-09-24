import {
    ITaskState, TaskActionTypes,
    POT_TASK_LIST_FETCHING, POT_TASK_LIST_SUCCESS, POT_TASK_LIST_ERROR,
    TOGGLE_ACTIVE_TAB,
    POT_TASK_CLAIMING, POT_TASK_CLAIM_SUCCESS, POT_TASK_CLAIM_FAILED,
    OWNED_TASK_LIST_FETCHING, OWNED_TASK_LIST_SUCCESS, OWNED_TASK_LIST_ERROR,
    OWNED_TASK_RELEASING, OWNED_TASK_RELEASE_SUCCESS, OWNED_TASK_RELEASE_FAILED, TASK_COMPLETING, TASK_COMPLETED_SUCCESS, TASK_COMPLETED_FAILED, TASK_DETAIL_FETCHING, TASK_DETAIL_FETCH_SUCCESS, TASK_DETAIL_FECH_FAILED, DYNAMIC_TASK_CREATING, DYNAMIC_TASK_CREATE_SUCCESS, DYNAMIC_TASK_CREATE_FAILED,
} from "./types";


const initialState: ITaskState = {
    activeTabKey: 1,
    error_message: '',
    loading: false,
    ownedTasks: [],
    potentialTasks: [],
    selectedTaskId: 0,
    selectedTaskOutput: {},
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
        case OWNED_TASK_RELEASING: { return { ...state, loading: true, } }
        case OWNED_TASK_RELEASE_SUCCESS: { return { ...state, loading: false, } }
        case OWNED_TASK_RELEASE_FAILED: { return { ...state, error_message: action.serverErrors, loading: false, } }

        case TASK_COMPLETING: { return { ...state, loading: true, } }
        case TASK_COMPLETED_SUCCESS: { return { ...state, loading: false, } }
        case TASK_COMPLETED_FAILED: { return { ...state, error_message: action.serverErrors, loading: false, } }

        case TASK_DETAIL_FETCHING: { return { ...state, loading: true } }
        case TASK_DETAIL_FETCH_SUCCESS: { return { ...state, selectedTaskOutput: action.output, selectedTaskId: action.taskId, loading: false } }
        case TASK_DETAIL_FECH_FAILED: { return { ...state, loading: false } }

        case DYNAMIC_TASK_CREATING: { return { ...state, loading: true } }
        case DYNAMIC_TASK_CREATE_SUCCESS: { return { ...state, loading: false } }
        case DYNAMIC_TASK_CREATE_FAILED: { return { ...state, error_message: action.serverErrors, loading: false } }

        default: return state;
    }
}