import {
    BENEFIT_ADD,
    BENEFIT_DESCRIPTION_CHANGE,
    BENEFIT_MODAL_TOGGLE,
    BENEFIT_NAME_CHANGE,
    BENEFIT_MANAGER_SELECT,
    BENEFIT_MANAGER_SELECT_CLEAR,
    BENEFIT_MANAGER_SELECT_TOGGLE,
} from './types'

export function benefitModalToggle() {
    return { type: BENEFIT_MODAL_TOGGLE }
}

export function benefitNameChange(value: string) {
    return { type: BENEFIT_NAME_CHANGE, value }
}

export function benefitDescriptionChange(value: string) {
    return { type: BENEFIT_DESCRIPTION_CHANGE, value }
}

export function benefitAdd() {
    return { type: BENEFIT_ADD }
}

export function benefitManagerSelectToggle(expanded: boolean) {
    return { type: BENEFIT_MANAGER_SELECT_TOGGLE, expanded }
}

export function benefitManagerSelect(selection: string) {
    return { type: BENEFIT_MANAGER_SELECT, selection }
}

export function benefitManagerClear() {
    return { type: BENEFIT_MANAGER_SELECT_CLEAR }
}

