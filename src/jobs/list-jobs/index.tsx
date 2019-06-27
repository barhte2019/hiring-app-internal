import React, { Component } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
} from '@patternfly/react-table';
import { jobListWithDetail } from 'src/store/jobs/actions';
import { IJobState } from 'src/store/jobs/types';

export interface IJobListProps {
    jobState: IJobState,
    jobListWithDetail: typeof jobListWithDetail,
}

export default function ListJobsContainer(props: IJobListProps) {
    const columns = [
        'Id',
        'Title',
        'Description',
        'Location'
    ];
    const rows = props.jobState.jobIds.map<string[]>(item => {
        const jobTitle = props.jobState.list[item] ? props.jobState.list[item].hiringPetition.jobTitle : 'loading title ...';
        const jobDescription = props.jobState.list[item] ? props.jobState.list[item].hiringPetition.jobDescription : 'loading description...';
        const jobLocation = props.jobState.list[item] ? props.jobState.list[item].hiringPetition.location : 'loading location...';
        return [item, jobTitle, jobDescription, jobLocation]
    });
    return (
        <Table caption="Jobs List" cells={columns} rows={rows}>
            <TableHeader />
            <TableBody />
        </Table>
    );
}

/*export class ListJobsContainer extends Component <IJobListProps> {
    public componentDidMount() {
        this.props.jobListWithDetail();
    }

    public render() {
        const columns = [
            'Id',
            'Title',
            'Description',
            'Location'
        ];
        const rows = this.props.jobState.jobIds.map<string[]>(item => [item, 'Loading title ...', 'loading description..', 'loading location']);
        return (
            <Table caption="Jobs List" cells={columns} rows={rows}>
                <TableHeader />
                <TableBody />
            </Table>
        );
    }
}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs
});

export default connect<{}, {}, IJobListProps>(
    mapStateToProps, {
        jobListWithDetail,
    }
)(ListJobsContainer)*/