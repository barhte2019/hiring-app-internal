import React, { Component } from 'react';
import { AppState } from 'src/store';
import { connect } from 'react-redux';

import {
    ActionGroup,
    Button,
    Form,
    FormGroup,
    Select, SelectOption, SelectVariant,
    TextInput,
    PageSection,
    PageSectionVariants
} from '@patternfly/react-core';
import { IJobState } from 'src/store/jobs/types';
import { ISystemState } from 'src/store/system/types';

import {
    jobTitleChange,
    createJob,
    jobDescriptionChange,
    jobLocationChange,
    jobSalaryMinChange,
    jobSalaryMaxChange,
    jobTypeSelectToggle,
    jobTypeSelectChange,
    jobTypeSelectClear,
    jobCategorySelectToggle,
    jobCategorySelectChange,
    jobCategorySelectClear,
} from 'src/store/jobs/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IJobFormProps extends RouteComponentProps<any> {
    sysState: ISystemState,
    jobState: IJobState,
    onJobTitleChange: typeof jobTitleChange,
    onJobDescriptionChange: typeof jobDescriptionChange,
    onJobLocationChange: typeof jobLocationChange,
    jobSalaryMinChange: typeof jobSalaryMinChange,
    jobSalaryMaxChange: typeof jobSalaryMaxChange,

    jobTypeSelectToggle: typeof jobTypeSelectToggle,
    jobTypeSelectChange: typeof jobTypeSelectChange,
    jobTypeSelectClear: typeof jobTypeSelectClear,
    jobCategorySelectToggle: typeof jobCategorySelectToggle,
    jobCategorySelectChange: typeof jobCategorySelectChange,
    jobCategorySelectClear: typeof jobCategorySelectClear,

    onCreateJob: typeof createJob,
}

class AddJobForm extends Component<IJobFormProps> {

    constructor(props: IJobFormProps) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    public render() {

        const jobTypeSelectWrapper = (event, value: string, isPlaceholder?: boolean | undefined) => {
            if (!isPlaceholder) {
                this.props.jobTypeSelectChange(value);
            } else {
                this.props.jobTypeSelectClear();
            }
        }

        const jobCategorySelectWrapper = (event, value: string, isPlaceholder?: boolean | undefined) => {
            if (!isPlaceholder) {
                this.props.jobCategorySelectChange(value);
            } else {
                this.props.jobCategorySelectClear();
            }
        }

        return (<PageSection variant={PageSectionVariants.light}>
            <Form isHorizontal={true} onSubmit={this.submit} style={{ marginTop: 50, marginRight: 30, marginLeft: 20 }}>
                <FormGroup label="Job Title"
                    isRequired={true}
                    fieldId="job-post-title"
                    helperText="Please provide the job title or possition">
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-title"
                        name="job-post-title"
                        aria-describedby="job-post-title-helper"
                        onChange={this.props.onJobTitleChange} />
                </FormGroup>
                <FormGroup label="Description"
                    isRequired={true}
                    fieldId="job-post-description"
                    helperText="Please provide a detailed job description">
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-description"
                        name="job-post-description"
                        aria-describedby="job-post-description-helper"
                        onChange={this.props.onJobDescriptionChange} />
                </FormGroup>
                <FormGroup label="Location"
                    isRequired={true}
                    fieldId="job-post-location"
                    helperText="Please specify the job location (Remote, office name)">
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-location"
                        name="job-post-location"
                        aria-describedby="job-post-location-helper"
                        onChange={this.props.onJobLocationChange}
                    />
                </FormGroup>
                <FormGroup label="Salary (Min)"
                    isRequired={true}
                    fieldId="job-min-salary"
                    helperText="Enter the minimum salary to offer">
                    <TextInput
                        isRequired={true}
                        type="number"
                        id="job-min-salary"
                        name="job-min-salary"
                        aria-describedby="job-min-salary-helper"
                        onChange={this.props.jobSalaryMinChange} />
                </FormGroup>
                <FormGroup label="Salary (Max)"
                    isRequired={true}
                    fieldId="job-max-salary"
                    helperText="Enter the maximum salary to offer">
                    <TextInput
                        isRequired={true}
                        type="number"
                        id="job-max-salary"
                        name="job-max-salary"
                        aria-describedby="job-max-salary-helper"
                        onChange={this.props.jobSalaryMaxChange} />
                </FormGroup>
                <FormGroup
                    isRequired={true}
                    label="Job Type"
                    fieldId="job-type"
                    helperText="Select job type">
                    <Select
                        id="job-category"
                        variant={SelectVariant.single}
                        aria-label="Select Job Type"
                        isExpanded={this.props.jobState.jobTypeSelectExpanded}
                        onToggle={this.props.jobTypeSelectToggle}
                        onSelect={jobTypeSelectWrapper}
                        selections={this.props.jobState.newJob.jobType}>
                        <SelectOption value="Choose Job Type" isPlaceholder={true} />
                        <SelectOption value="Full Time" />
                        <SelectOption value="Part Time" />
                        <SelectOption value="Freelance" />
                        <SelectOption value="Internship" />
                        <SelectOption value="Temporary" />
                    </Select>
                </FormGroup>
                <FormGroup
                    isRequired={true}
                    label="Job Category"
                    fieldId="job-category"
                    helperText="Select job category">
                    <Select
                        id="job-category"
                        variant={SelectVariant.single}
                        aria-label="Select Job Category"
                        isExpanded={this.props.jobState.jobCategorySelectExpanded}
                        onToggle={this.props.jobCategorySelectToggle}
                        onSelect={jobCategorySelectWrapper}
                        selections={this.props.jobState.newJob.jobCategory}>
                        <SelectOption value="Choose Job Category" isPlaceholder={true} />
                        <SelectOption value="Accounting / Finance" />
                        <SelectOption value="Construction / Facilities" />
                        <SelectOption value="Desig, Art & Multimedia" />
                        <SelectOption value="Healthcare" />
                        <SelectOption value="Human Resources" />
                        <SelectOption value="Operations" />
                        <SelectOption value="Project Manager" />
                        <SelectOption value="Team Manager" />
                        <SelectOption value="Telecomunications" />
                        <SelectOption value="Transportation & Logistics" />
                    </Select>
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Submit form</Button>
                </ActionGroup>
            </Form>
        </PageSection>)
    }

    private submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onCreateJob(this.props.jobState.newJob, this.props.sysState.loggedUser);
    }
}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs,
    sysState: state.system
});

const formWithRouter = withRouter<IJobFormProps, any>(AddJobForm);

// TODO: Map on submit fail
export default connect<{}, {}>(
    mapStateToProps,
    {
        jobCategorySelectChange,
        jobCategorySelectClear,
        jobCategorySelectToggle,
        jobSalaryMaxChange,
        jobSalaryMinChange,
        jobTypeSelectChange,
        jobTypeSelectClear,
        jobTypeSelectToggle,
        onCreateJob: createJob,
        onJobDescriptionChange: jobDescriptionChange,
        onJobLocationChange: jobLocationChange,
        onJobTitleChange: jobTitleChange,
    }
)(formWithRouter);
