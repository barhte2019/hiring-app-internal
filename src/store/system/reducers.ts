import { 
    ISystemState, 
    SystemActionTypes,
    SELECT_DROPDOWN, 
    TOGGLE_DROPDOWN,
    SELECT_TASKS,
    TOGGLE_TASKS,
    TOGGLE_ABOUT,
    UPDATE_TOKEN
} from './types';
const initialState: ISystemState = {
    areTasksOpen: false,
    isAboutOpen: false,
    isDropdownOpen: false,
    loggedUser: '',
    token: '',
}

export function systemReducer(
    state = initialState,
    action: SystemActionTypes
): ISystemState {
    switch (action.type) {
        case SELECT_DROPDOWN: { 
            return {
                ...state,
                isDropdownOpen: !state.isDropdownOpen
            }
        }
        case TOGGLE_DROPDOWN: {
            return {
                ...state,
                isDropdownOpen: action.isDropdownOpen
            }
        }
        case SELECT_TASKS: {
            return {
                ...state,
                areTasksOpen: !state.areTasksOpen
            }
        }
        case TOGGLE_TASKS: {
            return {
                ...state,
                areTasksOpen: action.isDropdownOpen
            }
        }
        case TOGGLE_ABOUT: {
            return {
                ...state,
                isAboutOpen: !state.isAboutOpen
            }
        }
        case UPDATE_TOKEN: {
            return {
                ...state,
                loggedUser: action.loggedUser,
                token: action.token
            }
        }
        default: return state;
    }
}