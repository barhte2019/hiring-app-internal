import React, { Component } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    IRow,
} from '@patternfly/react-table';
import { jobListWithDetail } from 'src/store/jobs/actions';
import { IJobState, IJob } from 'src/store/jobs/types';

export interface IJobListProps {
    jobState: IJobState,
    jobListWithDetail: typeof jobListWithDetail,
}

function tableRowFromJob(jobId: string, item: any, milestones: any): IRow {
    const genericLoading: string = 'loading job details ...';
    if (item) {
        const jobTitle = item.hiringPetition ? item.hiringPetition.jobTitle : 'loading title ...';
        const jobDescription = item.hiringPetition ? item.hiringPetition.jobDescription : 'loading description...';
        const jobLocation = item.hiringPetition ? item.hiringPetition.location : 'loading location...';
        const jobStatus = milestones && milestones.milestones.length > 0 ? milestones.milestones[0]['milestone-name'] : 'Created';
        
        return {
            cells: [
                { title: jobId, props: { id: 'job-id-' + jobId } },
                { title: jobTitle, props: { id: 'job-title-' + jobId } },
                { title: jobDescription, props: { id: 'job-description-' + jobId } },
                { title: jobLocation, props: { id: 'job-location-' + jobId } },
                { title: jobStatus, props: { id: 'job-status-' + jobId } },
            ],
            props: { rowId: jobId }
        };
    } else {
        return {
            cells: [
                { title: jobId, props: { id: 'job-id-' + jobId } },
                { title: genericLoading, props: { id: 'job-title-' + jobId } },
                { title: genericLoading, props: { id: 'job-description-' + jobId } },
                { title: genericLoading, props: { id: 'job-location-' + jobId } },
                { title: 'Created', props: { id: 'job-status-' + jobId } },
            ],
            props: { rowId: jobId }
        };
    }
}

export default function ListJobsContainer(props: IJobListProps) {
    const columns = [
        'Id',
        'Title',
        'Description',
        'Location',
        'Status'
    ];
    const rows = props.jobState.jobIds.map<IRow>(item => tableRowFromJob(item, props.jobState.list[item], props.jobState.milestones[item]));
    return (
        <Table
            caption="Jobs List"
            cells={columns}
            rows={rows}
            actions={[
                { title: 'process', onClick: (event, rowId, rowData, extra) => console.log('clicked on picture for row:', rowId) },
                { title: 'release', onClick: (event, rowId, rowData, extra) => console.log('clicked on release for row:', rowId) },
                { isSeparator: true },
                { title: 'modify/complete', onClick: (event, rowId, rowData, extra) => console.log('clicked on more for row:', rowId) }
            ]}>
            <TableHeader />
            <TableBody rowKey='rowId' />
        </Table>
    );
}