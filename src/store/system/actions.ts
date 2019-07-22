import {
    SELECT_DROPDOWN,
    TOGGLE_DROPDOWN,
    SELECT_TASKS,
    TOGGLE_TASKS,
    TOGGLE_ABOUT, UPDATE_TOKEN
} from './types';

export function selectDropdown() {
    return {
        type: SELECT_DROPDOWN
    }
}

export function toggleDropdown(isDropdownOpen: boolean) {
    return {
        isDropdownOpen,
        type: TOGGLE_DROPDOWN
    }
}

export function selectTasks() {
    return {
        type: SELECT_TASKS
    }
}

export function toggleTasks(isDropdownOpen: boolean) {
    return {
        isDropdownOpen,
        type: TOGGLE_TASKS
    }
}

export function toggleAbout() {
    return {
        type: TOGGLE_ABOUT
    }
}

export function updateToken(token: string) {
    return {
        token,
        type: UPDATE_TOKEN,
    }
}