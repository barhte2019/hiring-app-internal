import React from 'react';
import { Modal, InputGroup, TextInput, Button } from '@patternfly/react-core';
import { IBenefitModalState, IBenefit } from './types';
import {
    benefitAdd,
    benefitNameChange,
    benefitDescriptionChange,
    benefitModalToggle
} from './actions';
import { IRow, Table, TableHeader, TableBody } from '@patternfly/react-table';
import { propTypes } from '@patternfly/react-icons/dist/js/common';

interface IBenefitsModalProps {
    state: IBenefitModalState,
    benefitAdd: typeof benefitAdd,
    benefitNameChange: typeof benefitNameChange,
    benefitDescriptionChange: typeof benefitDescriptionChange,
    benefitModalToggle: typeof benefitModalToggle,
    okClickHandler: any
}

export default function BenefitsModal(props: IBenefitsModalProps) {

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
            props.benefitAdd();
        }
    }

    return (<Modal
        width={'50%'}
        title="Benefits and Compensation"
        isOpen={props.state.benefitsModalVisible}
        onClose={props.benefitModalToggle}>
        <InputGroup>
            <TextInput
                id="textInputBenefitName"
                aria-label="Benefit Name"
                placeholder="Benefit Name"
                onChange={props.benefitNameChange}
                value={props.state.benefitName}
                isValid={props.state.benefits.find(b => props.state.benefitName === b.benefitName) === undefined} />
            <TextInput
                id="textInputBenefitDescription"
                aria-label="Benefit Description"
                placeholder="Benefit Description"
                onChange={props.benefitDescriptionChange}
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