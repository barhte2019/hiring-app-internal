import React from 'react';
import { IBenefitsApprovalModalState } from './types';
import { IBenefit } from '../benefits-modal/types';
import { IRow, Table, TableHeader, TableBody } from '@patternfly/react-table';
import { Modal, InputGroup, TextInput, Button } from '@patternfly/react-core';

import {
    benefitApprovalAdd,
    benefitApprovalDescriptionChange,
    benefitApprovalModalToggle,
    benefitApprovalNameChange,
} from './actions';

export interface IBenefitsApprovalModalProps {
    benefitApprovalAdd: typeof benefitApprovalAdd,
    benefitApprovalDescriptionChange: typeof benefitApprovalDescriptionChange,
    benefitApprovalModalToggle: typeof benefitApprovalModalToggle,
    benefitApprovalNameChange: typeof benefitApprovalNameChange,
    state: IBenefitsApprovalModalState,
    okClickHandler: any,
}

export default function BenefitsApprovalModal(props: IBenefitsApprovalModalProps) {
    const tableRowFromBenefit = (benefit: IBenefit): IRow => {
        return {
            cells: [
                { title: benefit.benefitName },
                { title: benefit.benefitDescription }
            ]
        }
    }

    // Do not duplicate benefits (based on name)
    const benefitAddValidator = () => {
        if (!props.state.benefits.find(benefit => props.state.benefitName === benefit.benefitName)) {
            props.benefitApprovalAdd();
        }
    }

    return (<Modal
        width={'50%'}
        title="Benefits and Compensation"
        isOpen={props.state.benefitsApprovalModalVisible}
        onClose={props.benefitApprovalModalToggle}>
        <InputGroup>
            <TextInput
                id="textInputBenefitName"
                aria-label="Benefit Name"
                placeholder="Benefit Name"
                onChange={props.benefitApprovalNameChange}
                value={props.state.benefitName}
                isValid={props.state.benefits.find(b => props.state.benefitName === b.benefitName) === undefined} />
            <TextInput
                id="textInputBenefitDescription"
                aria-label="Benefit Description"
                placeholder="Benefit Description"
                onChange={props.benefitApprovalDescriptionChange}
                value={props.state.benefitDescription} />
            <Button
                id="AddBenefitButton"
                onClick={benefitAddValidator} >Add</Button>
        </InputGroup>
        <Table
            caption="Suggested Benefits Offer"
            cells={['Name', 'Description']}
            rows={props.state.benefits.map<IRow>(b => tableRowFromBenefit(b))} >
            <TableHeader />
            <TableBody rowKey="rowId" />
        </Table>
        <Button
            id="OkButton"
            isActive={props.state.benefits.length >= 1}
            onClick={props.okClickHandler}>OK</Button>
    </Modal>)
}