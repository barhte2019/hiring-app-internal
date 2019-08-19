import { HANDLE_PROCESS_MODAL_TOGGLE, CHANGE_PROCESS_ID } from './types';

export function handleProcessModalToggle() {
    return { type: HANDLE_PROCESS_MODAL_TOGGLE }
}

export function changeProcessId(id: number) {
    return { type: CHANGE_PROCESS_ID, value: id }
}