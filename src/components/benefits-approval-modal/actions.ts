import {
    BENEFIT_APPROVAL_ADD,
    BENEFIT_APPROVAL_DESCRIPTION_CHANGE,
    BENEFIT_APPROVAL_MODAL_TOGGLE,
    BENEFIT_APPROVAL_NAME_CHANGE,
    BENEFIT_LIST_LOADING,
    BENEFITS_SUCCESS,
    BENEFITS_FAILED
} from './types'
import api from 'src/store/api';
import { IBenefit } from '../benefits-modal/types';

export function benefitApprovalModalToggle() {
    return { type: BENEFIT_APPROVAL_MODAL_TOGGLE }
}

export function benefitApprovalNameChange(value: string) {
    return { type: BENEFIT_APPROVAL_NAME_CHANGE, value }
}

export function benefitApprovalDescriptionChange(value: string) {
    return { type: BENEFIT_APPROVAL_DESCRIPTION_CHANGE, value }
}

export function benefitApprovalAdd() {
    return { type: BENEFIT_APPROVAL_ADD }
}

export function benefitApprovalOpen(taskId: number) {
    return dispatch => {
        dispatch({ type: BENEFIT_LIST_LOADING });
        return api.tasks.detail(taskId)
            .then(response => {
                // tslint:disable-next-line:no-string-literal
                const responseBenefits: any[] = response.data['hiringPetition']['com.myspace.hr_hiring.HiringPetition'].benefits;
                // tslint:disable-next-line:no-string-literal
                const benefits: IBenefit[] = responseBenefits.map<IBenefit>(item => ({ ...item['com.myspace.hr_hiring.JobRoleBenefit'] }))
                dispatch(benefitApprovalModalToggle());
                return dispatch({ type: BENEFITS_SUCCESS, benefits });
            })
            .catch(err => {
                return dispatch({ type: BENEFITS_FAILED, serverErrors: err });
            });
    }
}
