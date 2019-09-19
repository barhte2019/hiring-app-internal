import React, { FormEvent, Fragment } from 'react';

import {
    Form,
    Button, TextInput,
    Modal,
} from '@patternfly/react-core';

import {
    IInterviewerFeedbackModalState
} from './types';

import {
    interviewerFeedbackToggle,
    interviewerFeedbackCommentChange,
    interviewerFeedbackScoreChange
} from './actions';

interface IInterviewerFeedbackModalProps {
    interviewerFeedbackModalState: IInterviewerFeedbackModalState,
    interviewerFeedbackToggle: typeof interviewerFeedbackToggle,
    onFeedbackSubmit: any,
    interviewerFeedbackCommentChange: typeof interviewerFeedbackCommentChange,
    interviewerFeedbackScoreChange: typeof interviewerFeedbackScoreChange,
}

export default function InterviewerFeedbackModal(props: IInterviewerFeedbackModalProps) {
    const onInterviewerFeedbackSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.onFeedbackSubmit();
    }

    return (<Modal
        width='50%'
        title="Interviewer feedback for candidate"
        isOpen={props.interviewerFeedbackModalState.modalVisible}
        onClose={props.interviewerFeedbackToggle}  >
        <Form onSubmit={onInterviewerFeedbackSubmit}>
            <TextInput
                id="textInputComment"
                aria-label="Comment"
                placeholder="Comment" onChange={props.interviewerFeedbackCommentChange} />
            <TextInput
                id="textInputScore"
                aria-label="Score" placeholder="Score (0 -10)"
                type="number" min={0} max={10} maxLength={2} required={true} isRequired={true}
                onChange={props.interviewerFeedbackScoreChange} />

            <Button type="submit">Ok</Button>
            <Button 
                onClick={props.toggleAdditionalInterviewer} 
                className="pf-c-button pf-m-inline pf-m-link">
                {props.interviewerFeedbackModalState.additionalVisible?"Show Additional Interviewer":"Hide Additional Interviewer"}
            </Button>
        </Form>
        <div>
            <h2>Additional Interviewer Requested</h2>
            <TextInput
                id="textInputDynamicTo"
                aria-label="Dynamic Task To"
                placeholder="To" />
            <TextInput
                id="textInputDynamicMessage"
                aria-label="Dynamic Task Message"
                placeholder="Message" />
            <Button className='pf-c-button pf-m-secondary'>Send</Button>
        </div>
    </Modal>)
}