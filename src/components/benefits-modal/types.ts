export interface IBenefitModalState extends IBenefit {
    benefits: IBenefit[],
    loading: boolean,
    error_message?: string,
    benefitsModalVisible: boolean,
    taskId: number,
    selectManagerExpanded: boolean,
    manager: string
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
export const BENEFIT_REMOVE = 'BENEFIT_REMOVE';
export const BENEFIT_CLEAR = 'BENEFIT_CLEAR';

export const BENEFIT_MANAGER_SELECT_TOGGLE = 'BENEFIT_MANAGER_SELECT_TOGGLE';
export const BENEFIT_MANAGER_SELECT = 'BENEFIT_MANAGER_SELECT';
export const BENEFIT_MANAGER_SELECT_CLEAR = 'BENEFIT_MANAGER_SELECT_CLEAR';

interface IBenefitModalToggleAction { type: typeof BENEFIT_MODAL_TOGGLE }
interface IBenefitNameChangeAction { type: typeof BENEFIT_NAME_CHANGE, value: string }
interface IBenefitDescriptionChangeAction { type: typeof BENEFIT_DESCRIPTION_CHANGE, value: string }
interface IBenefitAddAction { type: typeof BENEFIT_ADD }
interface IBenefitRemoveAction { type: typeof BENEFIT_REMOVE, name: string }
interface IBenefitClearAction { type: typeof BENEFIT_CLEAR }

interface IBenefitManagerSelectToggleAction { type: typeof BENEFIT_MANAGER_SELECT_TOGGLE, expanded: boolean }
interface IBenefitManagerSelectAction { type: typeof BENEFIT_MANAGER_SELECT, selection: string }
interface IBenefitManagerClearAction { type: typeof BENEFIT_MANAGER_SELECT_CLEAR }

export type BenefitModalActionTypes = IBenefitModalToggleAction |
    IBenefitNameChangeAction | IBenefitDescriptionChangeAction |
    IBenefitManagerSelectToggleAction | IBenefitManagerSelectAction | IBenefitManagerClearAction |
    IBenefitAddAction | IBenefitRemoveAction | IBenefitClearAction;