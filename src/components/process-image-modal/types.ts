export interface IProcessModalState {
    loading: boolean,
    error_message?: string,
    modalVisible: boolean,
    processId: number,
}

// Describe actions
export const HANDLE_PROCESS_MODAL_TOGGLE = 'HANDLE_PROCESS_MODAL_TOGGLE';
export const CHANGE_PROCESS_ID = 'CHANGE_PROCESS_ID';

interface IHandleProcessModalToggleAction { type: typeof HANDLE_PROCESS_MODAL_TOGGLE }
interface IChangeProcessIdAction { type: typeof CHANGE_PROCESS_ID, value: number }

export type ProcessModalActionTypes = IHandleProcessModalToggleAction | IChangeProcessIdAction;