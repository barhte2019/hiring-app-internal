import React, { Component } from 'react'
import {
    PageSection,
    PageSectionVariants,
    Tabs, Tab
} from '@patternfly/react-core';

import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';

import { AppState } from 'src/store';
import { connect } from 'react-redux';

import InterviewerTeamModal from 'src/components/interviewer-team';

import { IInterviewerTeamState } from 'src/components/interviewer-team/types';
import {
    interviewerCommentChange,
    interviewerNameChange,
    addInterviewerClick,
    handleModalToggle,
} from 'src/components/interviewer-team/actions';

import { handleProcessModalToggle, changeProcessId } from 'src/components/process-image-modal/actions';

import { ITaskState } from 'src/store/tasks/types';
import { ITask } from 'src/common/types';
import {
    toggleActiveTab,
    potentialTaskListFetch,
    ownedTaskListFetch,
    claimTask, releaseTask, completeTask, taskDetail
} from 'src/store/tasks/actions';
import ProcessImageModal from 'src/components/process-image-modal';
import { IProcessModalState } from 'src/components/process-image-modal/types';


interface ITaskProps {
    claimTask: typeof claimTask,
    releaseTask: typeof releaseTask,
    potentialTaskListFetch: typeof potentialTaskListFetch,
    ownedTaskListFetch: typeof ownedTaskListFetch,
    completeTask: typeof completeTask,
    taskDetail: typeof taskDetail,

    taskState: ITaskState,
    interviewerModalState: IInterviewerTeamState,
    processImageModalState: IProcessModalState,

    toggleActiveTab: typeof toggleActiveTab,
    interviewerCommentChange: typeof interviewerCommentChange,
    interviewerNameChange: typeof interviewerNameChange,
    addInterviewerClick: typeof addInterviewerClick,
    handleModalToggle: typeof handleModalToggle,

    handleProcessModalToggle: typeof handleProcessModalToggle,
    changeProcessId: typeof changeProcessId,
}


function tableRowFromTask(task: ITask): IRow {
    const taskId: string = task["task-id"] ? String(task["task-id"]) : '';
    const processId: string = task["task-proc-inst-id"] ? String(task["task-proc-inst-id"]) : '';
    const jobTitle: string = task["task-subject"] ? task["task-subject"] : '';
    const taskName: string = task["task-name"] ? task["task-name"] : '';
    const taskDescription: string = task["task-description"] ? task["task-description"] : '';

    return {
        cells: [
            { title: taskId, props: { id: 'task-id-' + taskId } },
            { title: processId, props: { id: 'task-process-id-' + taskId } },
            { title: jobTitle, props: { id: 'job-title-' + taskId } },
            { title: taskName, props: { id: 'task-name-' + taskId } },
            { title: taskDescription, props: { id: 'task-description-' + taskId } },
        ],
        props: { rowId: taskId }
    };
}

export class TaskContainer extends Component<ITaskProps> {

    public componentDidMount() {
        this.props.ownedTaskListFetch(0, 10);
        this.props.potentialTaskListFetch(0, 10);
    }

    public render() {

        const tabSelectWrapper = (event: any, eventKey: number) => {
            this.props.toggleActiveTab(eventKey);
        }

        const showTaskForm = (id: number) => {
            this.props.taskDetail(id);
            this.props.handleModalToggle();
        }

        const showProcessImage = (id: number) => {
            this.props.changeProcessId(id);
            this.props.handleProcessModalToggle();
        }

        const interviewerTeamOk = () => {
            if(this.props.interviewerModalState.interviewers.length >= 1) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "hiringPetition": {
                        "com.myspace.hr_hiring.HiringPetition": {
                            ...this.props.taskState.selectedTaskOutput.hiringPetition,
                            interviewers: this.props.interviewerModalState.interviewers.map<string>(item => item.name)
                        }
                    },
                    "interviewerTeamDefined": true
                });
                this.props.handleModalToggle();
            }
        }

        return (
            <PageSection variant={PageSectionVariants.light}>
                <Tabs activeKey={this.props.taskState.activeTabKey} onSelect={tabSelectWrapper}>
                    <Tab eventKey={0} title="Group Tasks">
                        <Table
                            caption="Potential Tasks"
                            cells={['Id', 'Process', 'Job Title', 'Task Name', 'Task Description']}
                            rows={this.props.taskState.potentialTasks.map<IRow>(item => tableRowFromTask(item))}
                            actions={[
                                // tslint:disable-next-line:no-string-literal
                                { title: 'process', onClick: (event, rowId, rowData, extra) => showProcessImage(rowData['process'].title) },
                                // tslint:disable-next-line:no-string-literal
                                { title: 'claim', onClick: (event, rowId, rowData, extra) => this.props.claimTask(rowData['props'].rowId) },
                            ]}>
                            <TableHeader />
                            <TableBody rowKey='rowId' />
                        </Table>
                    </Tab>
                    <Tab eventKey={1} title="User Tasks">
                        <Table
                            caption="My Tasks"
                            cells={['Id', 'Process', 'Job Title', 'Task Name', 'Task Description']}
                            rows={this.props.taskState.ownedTasks.map<IRow>(item => tableRowFromTask(item))}
                            actions={[
                                // tslint:disable-next-line:no-string-literal
                                { title: 'process', onClick: (event, rowId, rowData, extra) => showProcessImage(rowData['process'].title) },
                                // tslint:disable-next-line:no-string-literal
                                { title: 'release', onClick: (event, rowId, rowData, extra) => this.props.releaseTask(rowData['props'].rowId) },
                                { isSeparator: true },
                                // tslint:disable-next-line:no-string-literal
                                { title: 'modify/complete', onClick: (event, rowId, rowData, extra) => showTaskForm(rowData['props'].rowId) }
                            ]}>
                            <TableHeader />
                            <TableBody rowKey='rowId' />
                        </Table></Tab>
                </Tabs>
                <InterviewerTeamModal
                    modalVisible={this.props.interviewerModalState.modalVisible}
                    interviewerCommentChange={this.props.interviewerCommentChange}
                    interviewerNameChange={this.props.interviewerNameChange}
                    addInterviewerClick={this.props.addInterviewerClick}
                    handleModalToggle={this.props.handleModalToggle}
                    interviewerName={this.props.interviewerModalState.interviewerName}
                    interviewerComment={this.props.interviewerModalState.interviewerComment}
                    interviewers={this.props.interviewerModalState.interviewers}
                    onOkClick={interviewerTeamOk} />
                <ProcessImageModal
                    processId={this.props.processImageModalState.processId}
                    modalVisible={this.props.processImageModalState.modalVisible}
                    handleProcessModalToggle={this.props.handleProcessModalToggle} />
            </PageSection>);
    }

}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    interviewerModalState: state.interviewerModalState,
    processImageModalState: state.processImageModalState,
    taskState: state.task,
})

const mapDispatchToProps: any = ({
    addInterviewerClick,
    changeProcessId,
    claimTask,
    completeTask,
    handleModalToggle,
    handleProcessModalToggle,
    interviewerCommentChange,
    interviewerNameChange,
    ownedTaskListFetch,
    potentialTaskListFetch,
    releaseTask,
    taskDetail,
    toggleActiveTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
