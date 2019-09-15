import React, { Fragment, FormEvent } from 'react';
import {
    InputGroup, Button, TextInput,
    Modal,
    ButtonVariant,
    Select, SelectOption, SelectVariant, Form,
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';
import { IScheduleInterviewsModalState, IInterviewerSchedule } from './types';
import { handleScheduleInterviewModalToggle, startsAtChange, durationChange } from './actions';

interface IScheduleInterviewsModalProps {
    scheduleInterviewsModalState: IScheduleInterviewsModalState,
    handleModalToggle: typeof handleScheduleInterviewModalToggle,
    startsAtChange: typeof startsAtChange,
    durationChange: typeof durationChange,
    scheduleSubmit: any,
}

export default function ScheduleInterviewsModal(props: IScheduleInterviewsModalProps) {

    const onChangeHelperStartsAt = (value: string, event: FormEvent<HTMLInputElement>) => {
        props.startsAtChange(event.currentTarget.name, event.currentTarget.value);
    }

    const onChangeHelperDuration = (value: string, event: FormEvent<HTMLInputElement>) => {
        props.durationChange(event.currentTarget.name, event.currentTarget.value);
    }

    const tableRowFromInterviewerSchedule = (interviewerSchedule: IInterviewerSchedule): IRow => {
        return {
            cells: [
                { title: interviewerSchedule.interviewer },
                { title: <TextInput aria-label="Meeting starts at" required={true} isRequired={true} onChange={onChangeHelperStartsAt} name={interviewerSchedule.interviewer} /> },
                { title: <TextInput aria-label="Meeting duration" required={true} isRequired={true} onChange={onChangeHelperDuration} name={interviewerSchedule.interviewer} type="number" /> },
            ]
        }
    }

    const submitHelper = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.scheduleSubmit();
    }


    return (<Modal
        width={'50%'}
        title="Define Interview Schedule"
        isOpen={props.scheduleInterviewsModalState.modalVisible}
        onClose={props.handleModalToggle}>
        <Form onSubmit={submitHelper}>
            <Table
                caption="Interviewer Team"
                cells={['Interviewer', 'Starts at', 'Duration']}
                rows={props.scheduleInterviewsModalState.interviewers.map<IRow>(interviewer => tableRowFromInterviewerSchedule(interviewer))}>
                <TableHeader />
                <TableBody rowKey='rowId' />
            </Table>
            <Button
                type="submit"
                id="OkButton">OK</Button>
        </Form>


    </Modal>)

}
