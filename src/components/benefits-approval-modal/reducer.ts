import {
    BenefitApprovalModalActionTypes,
    IBenefitsApprovalModalState,
    BENEFIT_APPROVAL_ADD,
    BENEFIT_APPROVAL_DESCRIPTION_CHANGE,
    BENEFIT_APPROVAL_MODAL_TOGGLE,
    BENEFIT_APPROVAL_NAME_CHANGE,
    BENEFIT_LIST_LOADING,
    BENEFITS_SUCCESS,
    BENEFITS_FAILED,
    BENEFIT_APPROVAL_REMOVE,
    BENEFIT_APPROVAL_CLEAR,
} from './types';

const initialState: IBenefitsApprovalModalState = {
    benefitDescription: '',
    benefitName: '',
    benefits: [],
    benefitsApprovalModalVisible: false,
    error_message: '',
    loading: false,
}

export function benefitApprovalModalReducer(
    state = initialState,
    action: BenefitApprovalModalActionTypes
): IBenefitsApprovalModalState {
    switch (action.type) {
        case BENEFIT_APPROVAL_MODAL_TOGGLE: {
            return {
                ...state,
                benefitsApprovalModalVisible: !state.benefitsApprovalModalVisible
            }
        }
        case BENEFIT_LIST_LOADING: {
            return { ...state, loading: true }
        }
        case BENEFITS_SUCCESS: {
            return { ...state, benefits: action.benefits, loading: false }
        }
        case BENEFITS_FAILED: {
            return { ...state, loading: false, error_message: action.serverErrors }
        }
        case BENEFIT_APPROVAL_ADD: {
            return {
                ...state,
                benefitDescription: '',
                benefitName: '',
                benefits: state.benefits.concat([state]),
            }
        }
        case BENEFIT_APPROVAL_REMOVE: {
            return {
                ...state,
                benefits: state.benefits.filter(b => b.benefitName !== action.name)
            }
        }
        case BENEFIT_APPROVAL_CLEAR: { return { ...state, benefits: [] } }
        case BENEFIT_APPROVAL_DESCRIPTION_CHANGE: {
            return {
                ...state,
                benefitDescription: action.value
            }
        }
        case BENEFIT_APPROVAL_NAME_CHANGE: {
            return {
                ...state,
                benefitName: action.value
            }
        }
        default: return state;
    }
}