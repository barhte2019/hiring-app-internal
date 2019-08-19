import React from 'react';
import {
    interviewerCommentChange,
    interviewerNameChange,
    addInterviewerClick,
    handleModalToggle,
} from './actions';

import {
    InputGroup, Button, TextInput,
    Modal,
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';
import { IInterviewer } from './types';

interface IInterviewerTeamModalProps {
    addInterviewerClick: typeof addInterviewerClick,
    handleModalToggle: typeof handleModalToggle,
    interviewerCommentChange: typeof interviewerCommentChange,
    interviewerNameChange: typeof interviewerNameChange,
    modalVisible: boolean,
    interviewerName: string,
    interviewerComment: string,
    interviewers: IInterviewer[],
}

function tableRowFromInterviewer(interviewer: IInterviewer): IRow {
    return {
        cells:[{title:interviewer.name}, {title:interviewer.comment}]
    }
}

export default function InterviewerTeamModal(props: IInterviewerTeamModalProps) {
    return (<Modal
        width={'50%'}
        title="Define Interviewer Team"
        isOpen={props.modalVisible}
        onClose={props.handleModalToggle}>
        <InputGroup>
            <TextInput
                id="textInputInterviewer"
                aria-label="Interviewer"
                placeholder="Name"
                onChange={props.interviewerNameChange}
                value={props.interviewerName} />
            <TextInput
                id="textInputComment"
                aria-label="Comment"
                placeholder="Comment"
                onChange={props.interviewerCommentChange}
                value={props.interviewerComment} />
            <Button
                id="AddInterviewerButton"
                onClick={props.addInterviewerClick}>Add</Button>
        </InputGroup>
        <Table
            caption="Interviewer Team"
            cells={['Name', 'Comment']}
            rows={props.interviewers.map<IRow>(interviewer => tableRowFromInterviewer(interviewer))}
        >
            <TableHeader />
            <TableBody rowKey='rowId' />
        </Table>
        <Button id="OkButton">OK</Button>
    </Modal>)
}


