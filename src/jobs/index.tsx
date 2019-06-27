import React, {Component} from 'react'
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import ListJobsContainer, { IJobListProps } from './list-jobs';
import { connect } from 'react-redux';
import { AppState } from 'src/store';
import { jobListWithDetail } from 'src/store/jobs/actions';

export class JobsContainer extends Component<IJobListProps> {

    public componentDidMount() {
        this.props.jobListWithDetail();
    }

    public render() {
        return (<PageSection variant={PageSectionVariants.light}>
            <ListJobsContainer {...this.props} />
        </PageSection>);
    }
}

// Connect to the data store
const mapStateToProps: any = (state: AppState) => ({
    jobState: state.jobs,
    system: state.system
});

const mapDispatchToProps: any = ({
    jobListWithDetail
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(JobsContainer);