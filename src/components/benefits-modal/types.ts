export interface IBenefitModalState extends IBenefit {
    benefits: IBenefit[],
    loading: boolean,
    error_message?: string,
    benefitsModalVisible: boolean,
    taskId: number
}

export interface IBenefit {
    benefitName: string,
    benefitDescription: string
}

// Describe actions
export const BENEFIT_MODAL_TOGGLE = 'BENEFIT_MODAL_TOGGLE';
export const BENEFIT_NAME_CHANGE = 'BENEFIT_NAME_CHANGE';
export const BENEFIT_DESCRIPTION_CHANGE = 'BENEFIT_DESCRIPTION_CHANGE';
export const BENEFIT_ADD = 'BENEFIT_ADD';

interface IBenefitModalToggleAction { type: typeof BENEFIT_MODAL_TOGGLE }
interface IBenefitNameChangeAction { type: typeof BENEFIT_NAME_CHANGE, value: string }
interface IBenefitDescriptionChangeAction { type: typeof BENEFIT_DESCRIPTION_CHANGE, value: string }
interface IBenefitAddAction { type: typeof BENEFIT_ADD }

export type BenefitModalActionTypes = IBenefitModalToggleAction |
    IBenefitNameChangeAction | IBenefitDescriptionChangeAction |
    IBenefitAddAction;