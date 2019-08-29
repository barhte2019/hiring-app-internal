import { IBenefit } from "../benefits-modal/types";

export interface IBenefitsApprovalModalState extends IBenefit {
    benefits: IBenefit[],
    loading: boolean,
    error_message?: string,
    benefitsApprovalModalVisible: boolean
}

// Describe actions
export const BENEFIT_APPROVAL_MODAL_TOGGLE = 'BENEFIT_APPROVAL_MODAL_TOGGLE';
export const BENEFIT_APPROVAL_NAME_CHANGE = 'BENEFIT_APPROVAL_NAME_CHANGE';
export const BENEFIT_APPROVAL_DESCRIPTION_CHANGE = 'BENEFIT_APPROVAL_DESCRIPTION_CHANGE';
export const BENEFIT_APPROVAL_ADD = 'BENEFIT_APPROVAL_ADD';
export const BENEFIT_APPROVAL_OPEN = 'BENEFIT_APPROVAL_OPEN';
export const BENEFIT_LIST_LOADING = 'BENEFIT_LIST_LOADING';
export const BENEFITS_SUCCESS = 'BENEFITS_SUCCESS';
export const BENEFITS_FAILED='BENEFITS_FAILED';

interface IBenefitModalToggleAction { type: typeof BENEFIT_APPROVAL_MODAL_TOGGLE }
interface IBenefitNameChangeAction { type: typeof BENEFIT_APPROVAL_NAME_CHANGE, value: string }
interface IBenefitDescriptionChangeAction { type: typeof BENEFIT_APPROVAL_DESCRIPTION_CHANGE, value: string }
interface IBenefitAddAction { type: typeof BENEFIT_APPROVAL_ADD }
interface IBenefitApprovalOpenAction { type: typeof BENEFIT_APPROVAL_OPEN, benefits: IBenefit[] }
interface IBenefitLoadingAction {type: typeof BENEFIT_LIST_LOADING}
interface IBenefitsSuccessAction {type: typeof BENEFITS_SUCCESS, benefits: IBenefit[]}
interface IBenefitsFailAction {type: typeof BENEFITS_FAILED, serverErrors: any}

export type BenefitApprovalModalActionTypes = IBenefitModalToggleAction | IBenefitApprovalOpenAction |
    IBenefitNameChangeAction | IBenefitDescriptionChangeAction |
    IBenefitAddAction |
    IBenefitLoadingAction | IBenefitsSuccessAction | IBenefitsFailAction;