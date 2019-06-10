import React, { Component } from 'react';
import { AppState } from '../store';
import {connect} from 'react-redux';

import App from './app';
import { ISystemState } from 'src/store/system/types';

import { 
  selectDropdown, 
  toggleDropdown, 
  selectTasks, 
  toggleTasks,
  toggleAbout
} from '../store/system/actions';

interface IAppProps {
  system: ISystemState,
  selectDropdown: typeof selectDropdown,
  toggleDropdown: typeof toggleDropdown,
  selectTasks: typeof selectTasks,
  toggleTasks: typeof toggleTasks,
  toggleAbout: typeof toggleAbout
}

export class AppContainer extends Component<IAppProps> {

  public render() {
    return (
      <App
        key="AppKey" 
        isDropdownOpen={this.props.system.isDropdownOpen} 
        areTasksOpen={this.props.system.areTasksOpen}
        onDropdownSelect={this.props.selectDropdown}
        onDropdownToggle={this.props.toggleDropdown}
        onTasksDropdownSelect={this.props.selectTasks}
        onTasksDropdownToggle={this.props.toggleTasks}
        onToggleAbout={this.props.toggleAbout}
        isAboutOpen={this.props.system.isAboutOpen} />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  system: state.system
});

export default connect(
  mapStateToProps, 
  {
    selectDropdown, 
    selectTasks,
    toggleAbout,
    toggleDropdown,
    toggleTasks,
  }
)(AppContainer);
