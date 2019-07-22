import React, { Component } from 'react';
import { AppState } from '../store';
import { connect } from 'react-redux';
import { withKeycloak } from 'react-keycloak';

import App from './app';
import RingLoader from 'react-spinners/RingLoader';

import {
  selectDropdown,
  toggleDropdown,
  selectTasks,
  toggleTasks,
  toggleAbout
} from '../store/system/actions';
import LoginPage from 'src/login/login';
import { potentialTaskListFetch } from '../store/tasks/actions';

export class AppContainer extends Component<any> {

  public componentDidMount() {
    if(this.props.system.token !== '') {
      this.props.potentialTaskListFetch(0,11);
    }
  }

  public render() {
    if (!this.props.keycloakInitialized) {
      return (
        <div>
          <RingLoader
            sizeUnit={"px"}
            size={150}
            color={'#123abc'}
          />
        </div>);
    }

    return (
      this.props.keycloakInitialized && this.props.keycloak.authenticated && this.props.system.token !== ''
        ? <App
          key="AppKey"
          isDropdownOpen={this.props.system.isDropdownOpen}
          areTasksOpen={this.props.system.areTasksOpen}
          onDropdownSelect={this.props.selectDropdown}
          onDropdownToggle={this.props.toggleDropdown}
          onTasksDropdownSelect={this.props.selectTasks}
          onTasksDropdownToggle={this.props.toggleTasks}
          onToggleAbout={this.props.toggleAbout}
          isAboutOpen={this.props.system.isAboutOpen}
          potentialTasks={this.props.task.potentialTasks} />
        : <LoginPage />
    );
  }
}

const mapStateToProps:any = (state: AppState) => ({
  jobs: state.jobs,
  system: state.system,
  task: state.task,
});

const wk = withKeycloak(AppContainer);

export default connect<{},{}>(
  mapStateToProps,
  {
    potentialTaskListFetch,
    selectDropdown,
    selectTasks,
    toggleAbout,
    toggleDropdown,
    toggleTasks,
  }
)(wk)

