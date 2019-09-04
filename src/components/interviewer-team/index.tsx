import React from 'react';
import {
    interviewerCommentChange,
    interviewerNameChange,
    addInterviewerClick,
    handleModalToggle,
    removeInterviewer,
} from './actions';

import {
    InputGroup, Button, TextInput,
    Modal,
    ButtonVariant,
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';
import { IInterviewer, IInterviewerTeamState } from './types';
import { propTypes } from '@patternfly/react-icons/dist/js/common';

interface IInterviewerTeamModalProps {
    addInterviewerClick: typeof addInterviewerClick,
    removeInterviewer: typeof removeInterviewer,
    handleModalToggle: typeof handleModalToggle,
    interviewerCommentChange: typeof interviewerCommentChange,
    interviewerNameChange: typeof interviewerNameChange,
    onOkClick: any,
    interviewerTeamState: IInterviewerTeamState,
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

    return (<Modal
        width={'50%'}
        title="Define Interviewer Team"
        isOpen={props.interviewerTeamState.modalVisible}
        onClose={props.handleModalToggle}>
        <InputGroup>
            <TextInput
                id="textInputInterviewer"
                aria-label="Interviewer"
                placeholder="Name"
                onChange={props.interviewerNameChange}
                value={props.interviewerTeamState.interviewerName} />
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
            <TableBody rowKey='rowId' />
        </Table>
        <Button id="OkButton" isActive={props.interviewerTeamState.interviewers.length >= 1} onClick={props.onOkClick}>OK</Button>
    </Modal>)
}


