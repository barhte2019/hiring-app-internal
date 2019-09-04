import React, { Fragment } from 'react';
import { Modal, InputGroup, TextInput, Button, Select, SelectVariant, SelectOption, ButtonVariant } from '@patternfly/react-core';
import { IBenefitModalState, IBenefit } from './types';
import {
    benefitAdd,
    benefitRemove,
    benefitNameChange,
    benefitDescriptionChange,
    benefitModalToggle,
    benefitManagerClear,
    benefitManagerSelect,
    benefitManagerSelectToggle,
} from './actions';
import { IRow, Table, TableHeader, TableBody } from '@patternfly/react-table';

interface IBenefitsModalProps {
    state: IBenefitModalState,
    benefitAdd: typeof benefitAdd,
    benefitRemove: typeof benefitRemove,
    benefitNameChange: typeof benefitNameChange,
    benefitDescriptionChange: typeof benefitDescriptionChange,
    benefitModalToggle: typeof benefitModalToggle,
    benefitManagerClear: typeof benefitManagerClear,
    benefitManagerSelect: typeof benefitManagerSelect,
    benefitManagerToggle: typeof benefitManagerSelectToggle,
    okClickHandler: any,
    loggedInUser: string
}

export default function BenefitsModal(props: IBenefitsModalProps) {

    const tableRowFromBenefit = (benefit: IBenefit): IRow => {
        return {
            cells: [
                { title: benefit.benefitName },
                { title: benefit.benefitDescription },
                // tslint:disable-next-line:jsx-no-lambda
                { title: <Button variant={ButtonVariant.link} onClick={() => { props.benefitRemove(benefit.benefitName) }}>X</Button> }
            ]
        }
    }

    // Do not duplicate benefits (based on name)
    const benefitAddValidator = () => {
        if (!props.state.benefits.find(benefit => props.state.benefitName === benefit.benefitName)) {
            props.benefitAdd();
        }
    }

    const managerSelectWrapper = (event, value: string, isPlaceholder?: boolean | undefined) => {
        if (!isPlaceholder) {
            props.benefitManagerSelect(value);
        } else {
            props.benefitManagerClear();
        }
    }

    const managers = ['tina', 'tom', 'eve', 'ann', 'bob'];

    const managerOptions =
        (<Fragment>
            {managers
                .filter(m => m !== props.loggedInUser)
                .map((manager, index) => (<SelectOption key={`manager-${index}`} value={manager} />))
            }
        </Fragment>)

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
        <InputGroup>
            <Select
                id="selectKnowledge"
                variant={SelectVariant.single}
                aria-label="Select Level of Knowledge"
                onToggle={props.benefitManagerToggle}
                onSelect={managerSelectWrapper}
                isExpanded={props.state.selectManagerExpanded}
                selections={props.state.manager}>
                <SelectOption value="Choose manager" isPlaceholder={true} />
                {managerOptions}
            </Select>
        </InputGroup>
        <Table
            caption="Suggested Benefits Offer"
            cells={['Name', 'Description', 'Remove']}
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