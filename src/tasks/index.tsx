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
import { toggleActiveTab, potentialTaskListFetch } from 'src/store/tasks/actions';
import { ITaskState } from 'src/store/tasks/types';
import { ITask } from 'src/common/types';

interface ITaskProps {
    potentialTaskListFetch: typeof potentialTaskListFetch,
    taskState: ITaskState,
    toggleActiveTab: typeof toggleActiveTab
}

function tableRowFromTask(task: ITask): IRow {
    const taskId: string = task["task-id"] ? String(task["task-id"]) : '';
    const jobTitle: string = task["task-subject"] ? task["task-subject"] : '';
    const taskName: string = task["task-name"] ? task["task-name"] : '';
    const taskDescription: string = task["task-description"] ? task["task-description"] : '';

    return {
        cells: [
            {title: taskId, props:{id:'task-id-' + taskId}},
            {title: jobTitle, props:{id:'job-title-' + taskId}},
            {title: taskName, props:{id:'task-name-' + taskId}},
            {title: taskDescription, props:{id:'task-description-' + taskId}},
        ],
        props:{rowId: taskId}
    };
}

export class TaskContainer extends Component<ITaskProps> {

    public componentDidMount() {
        this.props.potentialTaskListFetch(0, 10);
    }

    public render() {

        const tabSelectWrapper = (event: any, eventKey: number) => {
            this.props.toggleActiveTab(eventKey);
        }

        return (
            <PageSection variant={PageSectionVariants.light}>
                <Tabs activeKey={this.props.taskState.activeTabKey} onSelect={tabSelectWrapper}>
                    <Tab eventKey={0} title="Group Tasks">
                        <Table
                            caption="Potential Tasks"
                            cells={['Id', 'Job Title', 'Task Name', 'Task Description']}
                            rows={this.props.taskState.potentialTasks.map<IRow>(item => tableRowFromTask(item))}
                            actions={[
                                { title: 'process', onClick: (event, rowId, rowData, extra) => console.log('clicked on picture for row:', rowId) },
                                { title: 'claim', onClick: (event, rowId, rowData, extra) => console.log('clicked on claim for row:', rowId) },
                                { isSeparator: true },
                                { title: 'more', onClick: (event, rowId, rowData, extra) => console.log('clicked on more for row:', rowId) }
                            ]}>
                            <TableHeader  />
                            <TableBody rowKey='rowId' />
                        </Table>
                    </Tab>
                    <Tab eventKey={1} title="User Tasks">
                        <Table
                            caption="My Tasks"
                            cells={['Id', 'Job Title', 'Task Name', 'Task Description']}
                            rows={this.props.taskState.ownedTasks.map<IRow>(item => tableRowFromTask(item))}
                            actions={[
                                { title: 'process', onClick: (event, rowId, rowData, extra) => console.log('clicked on picture for row:', rowId) },
                                { title: 'release', onClick: (event, rowId, rowData, extra) => console.log('clicked on release for row:', rowId) },
                                { isSeparator: true },
                                { title: 'modify/complete', onClick: (event, rowId, rowData, extra) => console.log('clicked on more for row:', rowId) }
                            ]}>
                            <TableHeader />
                            <TableBody rowKey='rowId' />
                        </Table></Tab>
                </Tabs>
            </PageSection>);
    }

    // private tabSelectWrapper = 

}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    taskState: state.task
})

const mapDispatchToProps: any = ({
    potentialTaskListFetch,
    toggleActiveTab
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
