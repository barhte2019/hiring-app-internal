import {
    IProcessModalState,
    ProcessModalActionTypes,
    HANDLE_PROCESS_MODAL_TOGGLE,
    CHANGE_PROCESS_ID,
} from './types'

const initialState: IProcessModalState = {
    error_message: '',
    loading: false,
    modalVisible: true,
    processId: 1
}

export function processImageModalReducer(
    state = initialState,
    action: ProcessModalActionTypes
): IProcessModalState {
    switch (action.type) {
        case HANDLE_PROCESS_MODAL_TOGGLE: {
            return {
                ...state,
                modalVisible: !state.modalVisible
            }
        }
        case CHANGE_PROCESS_ID: {
            return {
                ...state,
                processId: action.value
            }
        }
        default: return state;
    }
}