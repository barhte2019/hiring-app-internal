import React from 'react';

import {
    Form,
    Button, TextInput,
    Modal,
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';

import { IInterviewerFeedbackReviewModalState } from './types';
import { interviewerFeedbackReviewModalToggle } from './actions';
import { IInterviewerFeedback } from '../interviewer-feedback/types';

interface IInterviewerFeedbackReviewModalProps {
    onFeedbackAcceptCandidate: any,
    onFeedbackRejectCandidate: any,
    interviewerFeedbackReviewModalState: IInterviewerFeedbackReviewModalState,
    interviewerFeedbackReviewModalToggle: typeof interviewerFeedbackReviewModalToggle,
}

export default function InterviewerFeedbackReviewModal(props: IInterviewerFeedbackReviewModalProps) {

    const tableRowFromFeedback = (feedback: IInterviewerFeedback) => {
        return {
            cells: [
                { title: feedback.interviewer },
                { title: feedback.comment },
                { title: feedback.candidateScore }
            ]
        }
    }

    return (<Modal
        width='50%'
        title="Take a decision about candidate"
        isOpen={props.interviewerFeedbackReviewModalState.modalVisible}
        onClose={props.interviewerFeedbackReviewModalToggle} >
        <Table
            caption="Interviews feedback"
            cells={['Interviewer', 'Comment', 'Score']}
            rows={props.interviewerFeedbackReviewModalState.interviewerFeedbacks.map<IRow>(feedback => tableRowFromFeedback(feedback))}        >
            <TableHeader />
            <TableBody rowKey='Interviewer' />
        </Table>
        <Button onClick={props.onFeedbackAcceptCandidate}>Accept</Button>
        <Button onClick={props.onFeedbackRejectCandidate} className='pf-c-button pf-m-danger'>Reject</Button>
    </Modal>)
}