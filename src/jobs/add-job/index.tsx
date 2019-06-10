import React, { Component } from 'react';
import { AppState } from 'src/store';
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps, FormErrors} from 'redux-form';

import {
    ActionGroup,
    Button,
    FormGroup,
    TextInput,
    PageSection,
    PageSectionVariants
} from '@patternfly/react-core';
import { IJobState, IJob } from 'src/store/jobs/types';

import { inputChange, createJob } from 'src/store/jobs/actions';

interface IJobFormProps {
    jobState: IJobState,
    onInputChange: typeof inputChange
    onCreateJob: typeof createJob
}

class AddJobForm extends Component<IJobFormProps & InjectedFormProps<{}, IJobFormProps>, {}> {
    public render() {
        return (<PageSection variant={PageSectionVariants.light}>
            <form onSubmit={this.props.handleSubmit}>
                <FormGroup label="required"
                    isRequired={true}
                    fieldId="job-post-title"
                    helperText="Job post title"
                >
                    <TextInput
                        isRequired={true}
                        type="text"
                        id="job-post-title"
                        name="job-post-title"
                        aria-describedby="job-post-title-helper"
                        onChange={this.props.onInputChange}
                    />
                </FormGroup>
                <ActionGroup>
                    <Button variant="primary" type="submit">Submit form</Button>
                </ActionGroup>
            </form>
        </PageSection>)
    }
}

const formName = 'createJobForm';

const decoratedForm = reduxForm<{}, IJobFormProps>({
    form: formName
})(AddJobForm)

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs
});

// TODO: Map on submit fail
// TODO: Retrieve env configuration for KIE-SERVER ENDPOINT
// TODO: Send CASE CREATION REST API (KIE-SERVER ENDPOINT)
export default connect<{},{}>(
    mapStateToProps,
    {
        onInputChange: inputChange,
        onSubmit: createJob
    }
)(decoratedForm);
