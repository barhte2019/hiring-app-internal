import React, { Component, Fragment } from 'react';
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
import { IJobState, IJob } from 'src/store/jobs/types';
import { AppState } from 'src/store';
import { connect } from 'react-redux';
import { Button } from '@patternfly/react-core';

import ProcessImageModal from 'src/components/process-image-modal';
import { IProcessModalState } from 'src/components/process-image-modal/types';
import { handleProcessModalToggle, changeProcessId } from 'src/components/process-image-modal/actions';
import { IProcessInstance } from 'src/common/process-instance-types';

export interface IJobListProps {
    jobState: IJobState,
    jobListWithDetail: typeof jobListWithDetail,
    jobViewDetail: typeof jobViewDetail,
    processImageModalState: IProcessModalState,
    handleProcessModalToggle: typeof handleProcessModalToggle,
    changeProcessId: typeof changeProcessId,
}

export class ListJobsContainer extends Component<IJobListProps> {
    public render() {

        const showProcessModal = (processInstance: IProcessInstance) => {
            this.props.changeProcessId(Number(processInstance["process-instance-id"]));
            this.props.handleProcessModalToggle();
        }

        const tableRowFromJob = (jobId: string, item: any, milestones: any, processInstance: IProcessInstance): IRow => {
            const genericLoading: string = 'loading job details ...';

            if (item) {
                const job: IJob = item.hiringPetition['com.myspace.hr_hiring.HiringPetition'];
                const jobTitle = job.jobTitle ? job.jobTitle : 'loading title ...';
                const jobDescription = job.jobDescription ? job.jobDescription : 'loading description...';
                const jobLocation = job.location ? job.location : 'loading location...';
                const jobStatus = milestones && milestones.milestones.length > 0 ? milestones.milestones[0]['milestone-name'] : 'Created';

                const jobStatusLink = <Button variant="link" 
                    // tslint:disable-next-line:jsx-no-lambda
                    onClick={() => { showProcessModal(processInstance); }}>{jobStatus}</Button>

                return {
                    cells: [
                        { title: jobId, props: { id: 'job-id-' + jobId } },
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
                        { title: jobId, props: { id: 'job-id-' + jobId } },
                        { title: genericLoading, props: { id: 'job-title-' + jobId } },
                        { title: genericLoading, props: { id: 'job-description-' + jobId } },
                        { title: genericLoading, props: { id: 'job-location-' + jobId } },
                        { title: 'Created', props: { id: 'job-status-' + jobId } },
                    ],
                    props: { id: jobId }
                };
            }
        }


        const columns = [
            'Id',
            'Title',
            'Description',
            'Location',
            'Status'
        ];
        const rows = this.props.jobState.jobIds.map<IRow>(item => tableRowFromJob(item, this.props.jobState.list[item], this.props.jobState.milestones[item], this.props.jobState.processInstances[item]));
        return (
            <Fragment>
                <Table
                    caption="Jobs List"
                    cells={columns}
                    rows={rows}>
                    <TableHeader />
                    <TableBody rowKey='rowId' />
                </Table>
                <ProcessImageModal
                    processId={this.props.processImageModalState.processId}
                    modalVisible={this.props.processImageModalState.modalVisible}
                    handleProcessModalToggle={this.props.handleProcessModalToggle} />
            </Fragment>
        );
    }


}

// Connect data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs,
    processImageModalState: state.processImageModalState,
})

const mapDispatchToProps: any = ({
    changeProcessId,
    handleProcessModalToggle,
    jobViewDetail,
})

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ListJobsContainer)