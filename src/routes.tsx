import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardContainer from './dashboard';
import JobsContainer from './jobs';
import TasksContainer from './tasks';
import NotFound from './notFound';
import AddJobContainer from './jobs/add-job';

export default function AppRouter() {
    return (
        <Switch>
            <Route path="/" exact={true} component={DashboardContainer} />
            <Route path="/jobs" exact={true} component={JobsContainer} />
            <Route path="/jobs-add" exact={true} component={AddJobContainer} />
            <Route path="/tasks" exact={true} component={TasksContainer} />
            <Route component={NotFound} />
        </Switch>
    );
}