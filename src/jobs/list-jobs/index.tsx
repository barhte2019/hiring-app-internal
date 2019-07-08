import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableHeader,
    TableBody,
    IRow,
    IAction,
    ISeparator,
} from '@patternfly/react-table';
import { jobListWithDetail, jobViewDetail } from 'src/store/jobs/actions';
import { IJobState } from 'src/store/jobs/types';
import { AppState } from 'src/store';
import { connect } from 'react-redux';

export interface IJobListProps {
    jobState: IJobState,
    jobListWithDetail: typeof jobListWithDetail,
    jobViewDetail: typeof jobViewDetail,
}

export class ListJobsContainer extends Component<IJobListProps> {
    public render() {

        const columns = [
            'Id',
            'Title',
            'Description',
            'Location',
            'Status'
        ];
        const rows = this.props.jobState.jobIds.map<IRow>(item => this.tableRowFromJob(item, this.props.jobState.list[item], this.props.jobState.milestones[item]));
        const actions: Array<IAction | ISeparator> = [
            {
                onClick: (event, rowId, rowData: any, extra) => {
                    this.props.jobViewDetail(rowData.id.title);
                }, title: 'View Detail',
            }
        ]
        return (
            <Table
                caption="Jobs List"
                cells={columns}
                rows={rows}
                actions={actions}>
                <TableHeader />
                <TableBody rowKey='rowId' />
            </Table>
        );
    }

    private tableRowFromJob(jobId: string, item: any, milestones: any): IRow {
        const genericLoading: string = 'loading job details ...';
        if (item) {
            const jobTitle = item.hiringPetition ? item.hiringPetition.jobTitle : 'loading title ...';
            const jobDescription = item.hiringPetition ? item.hiringPetition.jobDescription : 'loading description...';
            const jobLocation = item.hiringPetition ? item.hiringPetition.location : 'loading location...';
            const jobStatus = milestones && milestones.milestones.length > 0 ? milestones.milestones[0]['milestone-name'] : 'Created';

            const jobStatusLink = <Link aria-label="add jobs" to={`/jobs/${jobId}`}>{jobStatus}</Link>

            return {
                cells: [
                    jobId,
                    { title: jobTitle, props: { id: 'job-title-' + jobId } },
                    { title: jobDescription, props: { id: 'job-description-' + jobId } },
                    { title: jobLocation, props: { id: 'job-location-' + jobId } },
                    { title: jobStatusLink, props: { id: 'job-location-' + jobId } }
                ],
                props: { id: jobId }
            };
        } else {
            return {
                cells: [
                    jobId,
                    { title: genericLoading, props: { id: 'job-title-' + jobId } },
                    { title: genericLoading, props: { id: 'job-description-' + jobId } },
                    { title: genericLoading, props: { id: 'job-location-' + jobId } },
                    { title: 'Created', props: { id: 'job-status-' + jobId } },
                ],
                props: { id: jobId }
            };
        }
    }
}

// Connect data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs
})

const mapDispatchToProps: any = ({
    jobViewDetail
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ListJobsContainer)