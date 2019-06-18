import React, { Component } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
} from '@patternfly/react-table';
import { jobListFecth } from 'src/store/jobs/actions';
import { IJobState } from 'src/store/jobs/types';

export interface IJobListProps {
    jobState: IJobState,
    fetchJobs: typeof jobListFecth
}

export default function ListJobsContainer(props: IJobListProps) {
    const columns = [
        'Title',
        'Description',
        'Location'
    ];
    const rows = props.jobState.list ? props.jobState.list.map((item) => [item.jobTitle, item.jobDescription, item.location]) : [];
    return (
        <Table caption="Jobs List" cells={columns} rows={rows}>
            <TableHeader />
            <TableBody />
        </Table>
    );
}