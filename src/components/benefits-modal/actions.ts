import {
    BENEFIT_ADD,
    BENEFIT_DESCRIPTION_CHANGE,
    BENEFIT_MODAL_TOGGLE,
    BENEFIT_NAME_CHANGE,
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