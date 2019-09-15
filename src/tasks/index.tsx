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
    clearInterviewers,
    removeInterviewer,
    handleModalToggle,
    interviewerSelectChange,
    interviewerSelectClear,
    interviewerSelectToggle,
} from 'src/components/interviewer-team/actions';

import { handleProcessModalToggle, changeProcessId } from 'src/components/process-image-modal/actions';

import { ITaskState } from 'src/store/tasks/types';
import { ISystemState } from 'src/store/system/types';
import { ITask } from 'src/common/types';
import {
    toggleActiveTab,
    potentialTaskListFetch,
    ownedTaskListFetch,
    claimTask, releaseTask, completeTask, taskDetail
} from 'src/store/tasks/actions';
import ProcessImageModal from 'src/components/process-image-modal';
import { IProcessModalState } from 'src/components/process-image-modal/types';

import { ICandidateSkillsModalState, ICandidateSkill } from 'src/components/candidate-skills/types';
import {
    candidateSkillNameChange,
    candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear,
    candidateSkillExperienceChange,
    candidateSkillModalToggle,
    candidateSkillAdd,
    candidateSkillRemove,
    candidateSkillClear,
} from 'src/components/candidate-skills/actions';
import CandidateSkillsModal from 'src/components/candidate-skills';

import { IBenefitModalState, IBenefit } from 'src/components/benefits-modal/types';
import {
    benefitAdd,
    benefitDescriptionChange,
    benefitModalToggle,
    benefitNameChange,
    benefitManagerClear,
    benefitManagerSelect,
    benefitManagerSelectToggle,
    benefitRemove,
    benefitClear
} from 'src/components/benefits-modal/actions';
import BenefitsModal from 'src/components/benefits-modal';

import { IBenefitsApprovalModalState } from 'src/components/benefits-approval-modal/types';
import {
    benefitApprovalAdd,
    benefitApprovalClear,
    benefitApprovalDescriptionChange,
    benefitApprovalModalToggle,
    benefitApprovalNameChange,
    benefitApprovalOpen,
    benefitApprovalRemove,
} from 'src/components/benefits-approval-modal/actions';
import BenefitsApprovalModal from 'src/components/benefits-approval-modal';

import { IScheduleInterviewsModalState } from 'src/components/schedule-interviews/types';
import {
    handleScheduleInterviewModalToggle,
    scheduleInterviewModalOpen,
    startsAtChange,
    durationChange
} from 'src/components/schedule-interviews/actions';
import ScheduleInterviewsModal from 'src/components/schedule-interviews';


interface ITaskProps {
    claimTask: typeof claimTask,
    releaseTask: typeof releaseTask,
    potentialTaskListFetch: typeof potentialTaskListFetch,
    ownedTaskListFetch: typeof ownedTaskListFetch,
    completeTask: typeof completeTask,
    taskDetail: typeof taskDetail,

    sysState: ISystemState,
    taskState: ITaskState,
    interviewerModalState: IInterviewerTeamState,
    processImageModalState: IProcessModalState,
    candidateSkillModalState: ICandidateSkillsModalState,
    benefitsModalState: IBenefitModalState,
    benefitsApprovalModalState: IBenefitsApprovalModalState,
    scheduleInterviewsModalState: IScheduleInterviewsModalState,

    toggleActiveTab: typeof toggleActiveTab,
    interviewerCommentChange: typeof interviewerCommentChange,
    interviewerNameChange: typeof interviewerNameChange,
    addInterviewerClick: typeof addInterviewerClick,
    removeInterviewer: typeof removeInterviewer,
    clearInterviewers: typeof clearInterviewers,
    interviewerSelectChange: typeof interviewerSelectChange,
    interviewerSelectClear: typeof interviewerSelectClear,
    interviewerSelectToggle: typeof interviewerSelectToggle,

    handleModalToggle: typeof handleModalToggle,

    handleProcessModalToggle: typeof handleProcessModalToggle,
    changeProcessId: typeof changeProcessId,

    candidateSkillNameChange: typeof candidateSkillNameChange,
    candidateSkillKnowledgeToggle: typeof candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect: typeof candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear: typeof candidateSkillKnowledgeClear,
    candidateSkillExperienceChange: typeof candidateSkillExperienceChange,
    candidateSkillModalToggle: typeof candidateSkillModalToggle,
    candidateSkillAdd: typeof candidateSkillAdd,
    candidateSkillRemove: typeof candidateSkillRemove,
    candidateSkillClear: typeof candidateSkillClear,

    benefitNameChange: typeof benefitNameChange,
    benefitDescriptionChange: typeof benefitDescriptionChange,
    benefitModalToggle: typeof benefitModalToggle,
    benefitAdd: typeof benefitAdd,
    benefitRemove: typeof benefitRemove,
    benefitClear: typeof benefitClear,
    benefitManagerClear: typeof benefitManagerClear,
    benefitManagerSelect: typeof benefitManagerSelect,
    benefitManagerSelectToggle: typeof benefitManagerSelectToggle,

    benefitApprovalAdd: typeof benefitApprovalAdd,
    benefitApprovalRemove: typeof benefitApprovalRemove,
    benefitApprovalClear: typeof benefitApprovalClear,
    benefitApprovalDescriptionChange: typeof benefitApprovalDescriptionChange,
    benefitApprovalModalToggle: typeof benefitApprovalModalToggle,
    benefitApprovalNameChange: typeof benefitApprovalNameChange,
    benefitApprovalOpen: typeof benefitApprovalOpen,

    handleScheduleInterviewModalToggle: typeof handleScheduleInterviewModalToggle,
    scheduleInterviewModalOpen: typeof scheduleInterviewModalOpen,
    startsAtChange: typeof startsAtChange,
    durationChange: typeof durationChange,
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
            this.props.ownedTaskListFetch(0, 10);
            this.props.potentialTaskListFetch(0, 10);
            this.props.toggleActiveTab(eventKey);
        }

        const showTaskForm = (id: number, taskName: string) => {
            if (taskName.startsWith('Define')) {
                this.props.candidateSkillClear();
                this.props.taskDetail(id);
                this.props.candidateSkillModalToggle();
            }

            if (taskName.startsWith('Interviewer')) {
                this.props.clearInterviewers();
                this.props.taskDetail(id);
                this.props.handleModalToggle();
            }

            if (taskName.startsWith('Benefit') && taskName.endsWith('compensation')) {
                this.props.benefitClear();
                this.props.taskDetail(id);
                this.props.benefitModalToggle();
            }

            if (taskName.startsWith('Benefit') && taskName.endsWith('Approval')) {
                this.props.benefitApprovalClear();
                this.props.taskDetail(id);
                this.props.benefitApprovalOpen(id);
            }

            if (taskName.startsWith('Schedule')) {
                this.props.taskDetail(id);
                this.props.scheduleInterviewModalOpen(id);
            }
        }

        const showProcessImage = (id: number) => {
            this.props.changeProcessId(id);
            this.props.handleProcessModalToggle();
        }

        const interviewerTeamOk = () => {
            if (this.props.interviewerModalState.interviewers.length >= 1) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "interviewerAssignments": this.props.interviewerModalState.interviewers
                        .map(i => ({ "com.myspace.hr_hiring.InterviewerAssignment": { "interviewerName": i.name, "comment": i.comment } })),
                    "interviewerTeamDefined": true
                });
                this.props.handleModalToggle();
            }
        }

        const candidateSkillsOk = () => {
            if (this.props.candidateSkillModalState.skills.length >= 1) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "requestedSkills": this.props.candidateSkillModalState.skills
                        .map(s => (
                            {
                                "com.myspace.hr_hiring.CandidateSkill":
                                {
                                    "levelOfKnowledge": s.levelOfKnowledge,
                                    "skillName": s.skillName,
                                    "yearsOfExperience": s.yearsOfExperience
                                }
                            })),
                    "skillsDefined": true
                });
                this.props.candidateSkillModalToggle();
            }
        }

        const benefitsOk = () => {
            if (this.props.benefitsModalState.benefits.length >= 1) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "manager": this.props.benefitsModalState.manager,
                    "offeredBenefits": this.props.benefitsModalState.benefits
                        .map(b => (
                            {
                                "com.myspace.hr_hiring.JobRoleBenefit":
                                {
                                    "benefitDescription": b.benefitDescription,
                                    "benefitName": b.benefitName
                                }
                            })),

                });
            }
            this.props.benefitModalToggle();
        }

        const benefitsApprovalOk = () => {
            if (this.props.benefitsApprovalModalState.benefits.length >= 1) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "benefitsDefined": true,
                    "offeredBenefits": this.props.benefitsApprovalModalState.benefits
                        .map(b => (
                            {
                                "com.myspace.hr_hiring.JobRoleBenefit":
                                {
                                    "benefitDescription": b.benefitDescription,
                                    "benefitName": b.benefitName
                                }
                            })),
                })
            }
            this.props.benefitApprovalModalToggle();
        }

        const scheduleSubmit = () => {
            // validate appoinments
            const keys: string[] = Object.keys(this.props.scheduleInterviewsModalState.appointments);
            if (keys && keys.length > 0) {
                this.props.completeTask(this.props.taskState.selectedTaskId, {
                    "interviewerAppointments": this.props.scheduleInterviewsModalState.interviewers
                        .map(i => ({
                            "com.myspace.hr_hiring.InterviewAppointment": {
                                comment: i.comment,
                                interviewDurationMinutes: Number(this.props.scheduleInterviewsModalState.appointments[i.interviewer].duration),
                                interviewStarts: this.props.scheduleInterviewsModalState.appointments[i.interviewer].startsAt,
                                interviewee: i.interviewee,
                                interviewer: i.interviewer
                            }
                        }))
                });
                this.props.handleScheduleInterviewModalToggle();
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
                                { title: 'modify/complete', onClick: (event, rowId, rowData, extra) => showTaskForm(rowData['props'].rowId, rowData['task-name'].title) }
                            ]}>
                            <TableHeader />
                            <TableBody rowKey='rowId' />
                        </Table></Tab>
                </Tabs>
                <InterviewerTeamModal
                    interviewerTeamState={this.props.interviewerModalState}
                    interviewerCommentChange={this.props.interviewerCommentChange}
                    interviewerNameChange={this.props.interviewerNameChange}
                    addInterviewerClick={this.props.addInterviewerClick}
                    removeInterviewer={this.props.removeInterviewer}
                    handleModalToggle={this.props.handleModalToggle}
                    interviewerSelectChange={this.props.interviewerSelectChange}
                    interviewerSelectClear={this.props.interviewerSelectClear}
                    interviewerSelectToggle={this.props.interviewerSelectToggle}
                    onOkClick={interviewerTeamOk} />
                <ProcessImageModal
                    state={this.props.processImageModalState}
                    handleProcessModalToggle={this.props.handleProcessModalToggle} />
                <CandidateSkillsModal
                    state={this.props.candidateSkillModalState}
                    candidateSkillNameChange={this.props.candidateSkillNameChange}
                    candidateSkillKnowledgeToggle={this.props.candidateSkillKnowledgeToggle}
                    candidateSkillKnowledgeSelect={this.props.candidateSkillKnowledgeSelect}
                    candidateSkillKnowledgeClear={this.props.candidateSkillKnowledgeClear}
                    candidateSkillExperienceChange={this.props.candidateSkillExperienceChange}
                    candidateSkillModalToggle={this.props.candidateSkillModalToggle}
                    candidateSkillAdd={this.props.candidateSkillAdd}
                    candidateSkillRemove={this.props.candidateSkillRemove}
                    okClickHandler={candidateSkillsOk}
                />
                <BenefitsModal
                    state={this.props.benefitsModalState}
                    benefitAdd={this.props.benefitAdd}
                    benefitRemove={this.props.benefitRemove}
                    benefitDescriptionChange={this.props.benefitDescriptionChange}
                    benefitNameChange={this.props.benefitNameChange}
                    benefitManagerClear={this.props.benefitManagerClear}
                    benefitManagerSelect={this.props.benefitManagerSelect}
                    benefitManagerToggle={this.props.benefitManagerSelectToggle}
                    benefitModalToggle={this.props.benefitModalToggle}
                    okClickHandler={benefitsOk}
                    loggedInUser={this.props.sysState.loggedUser} />
                <BenefitsApprovalModal
                    state={this.props.benefitsApprovalModalState}
                    benefitApprovalAdd={this.props.benefitApprovalAdd}
                    benefitApprovalRemove={this.props.benefitApprovalRemove}
                    benefitApprovalDescriptionChange={this.props.benefitApprovalDescriptionChange}
                    benefitApprovalModalToggle={this.props.benefitApprovalModalToggle}
                    benefitApprovalNameChange={this.props.benefitApprovalNameChange}
                    okClickHandler={benefitsApprovalOk} />
                <ScheduleInterviewsModal
                    scheduleInterviewsModalState={this.props.scheduleInterviewsModalState}
                    handleModalToggle={this.props.handleScheduleInterviewModalToggle}
                    startsAtChange={this.props.startsAtChange}
                    durationChange={this.props.durationChange}
                    scheduleSubmit={scheduleSubmit} />
            </PageSection>);
    }

}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    benefitsApprovalModalState: state.benefitsApprovalModalState,
    benefitsModalState: state.benefitsModalState,
    candidateSkillModalState: state.candidateSkillModalState,
    interviewerModalState: state.interviewerModalState,
    processImageModalState: state.processImageModalState,
    scheduleInterviewsModalState: state.scheduleInterviewsState,
    sysState: state.system,
    taskState: state.task,
})

const mapDispatchToProps: any = ({
    addInterviewerClick,
    benefitAdd,
    benefitApprovalAdd,
    benefitApprovalClear,
    benefitApprovalDescriptionChange,
    benefitApprovalModalToggle,
    benefitApprovalNameChange,
    benefitApprovalOpen,
    benefitApprovalRemove,
    benefitClear,
    benefitDescriptionChange,
    benefitManagerClear,
    benefitManagerSelect,
    benefitManagerSelectToggle,
    benefitModalToggle,
    benefitNameChange,
    benefitRemove,
    candidateSkillAdd,
    candidateSkillClear,
    candidateSkillExperienceChange,
    candidateSkillKnowledgeClear,
    candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeToggle,
    candidateSkillModalToggle,
    candidateSkillNameChange,
    candidateSkillRemove,
    changeProcessId,
    claimTask,
    clearInterviewers,
    completeTask,
    durationChange,
    handleModalToggle,
    handleProcessModalToggle,
    handleScheduleInterviewModalToggle,
    interviewerCommentChange,
    interviewerNameChange,
    interviewerSelectChange,
    interviewerSelectClear,
    interviewerSelectToggle,
    ownedTaskListFetch,
    potentialTaskListFetch,
    releaseTask,
    removeInterviewer,
    scheduleInterviewModalOpen,
    startsAtChange,
    taskDetail,
    toggleActiveTab,
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
