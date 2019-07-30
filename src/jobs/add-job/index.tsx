import React, { Component } from 'react';
import { AppState } from 'src/store';
import { connect } from 'react-redux';

import {
    ActionGroup,
    Button,
    FormGroup,
    TextInput,
    PageSection,
    PageSectionVariants
} from '@patternfly/react-core';
import { IJobState } from 'src/store/jobs/types';

import { jobTitleChange, createJob, jobDescriptionChange, jobLocationChange } from 'src/store/jobs/actions';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IJobFormProps extends RouteComponentProps<any> {
    jobState: IJobState,
    onJobTitleChange: typeof jobTitleChange
    onJobDescriptionChange: typeof jobDescriptionChange
    onJobLocationChange: typeof jobLocationChange
    onCreateJob: typeof createJob
}

class AddJobForm extends Component<IJobFormProps> {

    constructor(props: IJobFormProps) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    public render() {
        return (<PageSection variant={PageSectionVariants.light}>
            <form onSubmit={this.submit}>
            <FormGroup label="required"
                    isRequired={true}
                    fieldId="job-post-title"
                    helperText="Title"
                >
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-title"
                        name="job-post-title"
                        aria-describedby="job-post-title-helper"
                        onChange={this.props.onJobTitleChange}
                    />
                </FormGroup>
                <FormGroup label="required"
                    isRequired={true}
                    fieldId="job-post-description"
                    helperText="Description"
                >
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-description"
                        name="job-post-description"
                        aria-describedby="job-post-description-helper"
                        onChange={this.props.onJobDescriptionChange}
                    />
                </FormGroup>
                <FormGroup label="required"
                    isRequired={true}
                    fieldId="job-post-location"
                    helperText="Location"
                >
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-location"
                        name="job-post-location"
                        aria-describedby="job-post-location-helper"
                        onChange={this.props.onJobLocationChange}
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Submit form</Button>
                </ActionGroup>
            </form>
        </PageSection>)
    }

    private submit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.onCreateJob(this.props.jobState.newJob);
    }
}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs
});

const formWithRouter = withRouter<IJobFormProps, any>(AddJobForm);

// TODO: Map on submit fail
export default connect<{}, {}>(
    mapStateToProps,
    {
        onCreateJob: createJob,
        onJobDescriptionChange: jobDescriptionChange,
        onJobLocationChange: jobLocationChange,
        onJobTitleChange: jobTitleChange,
    }
)(formWithRouter);
