import {
    IBenefitModalState,
    BenefitModalActionTypes,
    BENEFIT_ADD,
    BENEFIT_DESCRIPTION_CHANGE,
    BENEFIT_MODAL_TOGGLE,
    BENEFIT_NAME_CHANGE,
    BENEFIT_MANAGER_SELECT,
    BENEFIT_MANAGER_SELECT_CLEAR,
    BENEFIT_MANAGER_SELECT_TOGGLE,
} from './types';

const initialState: IBenefitModalState = {
    benefitDescription: '',
    benefitName: '',
    benefits: [],
    benefitsModalVisible: false,
    error_message: '',
    loading: false,
    manager: '',
    selectManagerExpanded: false,
    taskId: 0,
}

export function benefitModalReducer(
    state = initialState,
    action: BenefitModalActionTypes
): IBenefitModalState {
    switch (action.type) {
        case BENEFIT_MODAL_TOGGLE: {
            return {
                ...state,
                benefitsModalVisible: !state.benefitsModalVisible
            }
        }
        case BENEFIT_ADD: {
            return {
                ...state,
                benefitDescription: '',
                benefitName: '',
                benefits: state.benefits.concat([state]),
            }
        }
        case BENEFIT_MANAGER_SELECT_TOGGLE: {
            return {
                ...state,
                selectManagerExpanded: action.expanded,
            }
        }
        case BENEFIT_MANAGER_SELECT: {
            return {
                ...state,
                manager: action.selection,
                selectManagerExpanded: false,
            }
        }
        case BENEFIT_MANAGER_SELECT_CLEAR: {
            return {
                ...state,
                manager: '',
                selectManagerExpanded: false,
            }
        }
        case BENEFIT_DESCRIPTION_CHANGE: {
            return {
                ...state,
                benefitDescription: action.value
            }
        }
        case BENEFIT_NAME_CHANGE: {
            return {
                ...state,
                benefitName: action.value
            }
        }
        default: return state;
    }
}