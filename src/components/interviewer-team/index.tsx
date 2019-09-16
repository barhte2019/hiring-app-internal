import React, { Fragment } from 'react';
import {
    interviewerCommentChange,
    interviewerNameChange,
    interviewerSelectChange,
    interviewerSelectClear,
    interviewerSelectToggle,
    addInterviewerClick,
    handleModalToggle,
    removeInterviewer,
} from './actions';

import {
    InputGroup, Button, TextInput,
    Modal,
    ButtonVariant,
    Select, SelectOption, SelectVariant,
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';
import { IInterviewer, IInterviewerTeamState } from './types';

interface IInterviewerTeamModalProps {
    addInterviewerClick: typeof addInterviewerClick,
    removeInterviewer: typeof removeInterviewer,
    handleModalToggle: typeof handleModalToggle,
    interviewerCommentChange: typeof interviewerCommentChange,
    interviewerNameChange: typeof interviewerNameChange,
    onOkClick: any,
    interviewerTeamState: IInterviewerTeamState,
    interviewerSelectChange: typeof interviewerSelectChange,
    interviewerSelectClear: typeof interviewerSelectClear,
    interviewerSelectToggle: typeof interviewerSelectToggle,
}

export default function InterviewerTeamModal(props: IInterviewerTeamModalProps) {

    const tableRowFromInterviewer = (interviewer: IInterviewer): IRow => {
        return {
            cells: [
                { title: interviewer.name },
                { title: interviewer.comment },
                // tslint:disable-next-line:jsx-no-lambda
                { title: <Button onClick={() => { props.removeInterviewer(interviewer.name) }} variant={ButtonVariant.link}>X</Button> }
            ]
        }
    }

    const interviewerSelectWrapper = (event, value: string, isPlaceholder?: boolean | undefined) => {
        if (!isPlaceholder) {
            props.interviewerSelectChange(value);
        } else {
            props.interviewerSelectClear();
        }
    }

    const interviewerUsers = ['ann', 'bob', 'eve', 'tina', 'tom'];
    const interviewerSelectOptions = (
        <Fragment>
            {interviewerUsers.map((interviewer, index) => (<SelectOption key={`interviewer-${index}`} value={interviewer} />))}
        </Fragment>)



    return (<Modal
        width={'50%'}
        title="Define Interviewer Team"
        isOpen={props.interviewerTeamState.modalVisible}
        onClose={props.handleModalToggle}>
        <InputGroup>
            <Select
                id="select-interviewer"
                variant={SelectVariant.single}
                aria-label="Select interviewer"
                onToggle={props.interviewerSelectToggle}
                onSelect={interviewerSelectWrapper}
                isExpanded={props.interviewerTeamState.interviewerSelectExpanded}
                selections={props.interviewerTeamState.interviewerName} >
                <SelectOption value="Choose interviewer" isPlaceholder={true} />
                {interviewerSelectOptions}
            </Select>
        </InputGroup>
        <InputGroup>
            <TextInput
                id="textInputComment"
                aria-label="Comment"
                placeholder="Comment"
                onChange={props.interviewerCommentChange}
                value={props.interviewerTeamState.interviewerComment} />
            <Button
                id="AddInterviewerButton"
                onClick={props.addInterviewerClick}>Add</Button>
        </InputGroup>
        <Table
            caption="Interviewer Team"
            cells={['Name', 'Comment', 'Action']}
            rows={props.interviewerTeamState.interviewers.map<IRow>(interviewer => tableRowFromInterviewer(interviewer))}
        >
            <TableHeader />
            <TableBody rowKey='name' />
        </Table>
        <Button id="OkButton" isActive={props.interviewerTeamState.interviewers.length >= 1} onClick={props.onOkClick}>OK</Button>
    </Modal>)
}


