import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardHeader,
    Gallery,
    GalleryItem,
    Grid,
    GridItem,
    PageSection,
    PageSectionVariants,
    Tooltip
} from '@patternfly/react-core';

import {
    AddCircleOIcon,
    ThumbTackIcon,
    UsersIcon,
    HomeIcon,
    GlobeIcon,
    TrendUpIcon,
    ErrorCircleOIcon,
    ClockIcon,
    OkIcon
} from '@patternfly/react-icons';

import {
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis,
    Tooltip as RTooltip,
    CartesianGrid,
    Line
} from 'recharts';

import './dashboard.css';

const data = [
    { duration: 7, date: '2018-Jun', goal: 10 },
    { duration: 8, date: '2018-Jul', goal: 10 },
    { duration: 4, date: '2018-Ago', goal: 10 },
    { duration: 6, date: '2018-Sep', goal: 10 },
    { duration: 9, date: '2018-Oct', goal: 10 },
    { duration: 15, date: '2018-Nov', goal: 10 },
    { duration: 9, date: '2018-Dec', goal: 10 },
    { duration: 3, date: '2019-Feb', goal: 10 },
    { duration: 4, date: '2019-Mar', goal: 10 },
    { duration: 2, date: '2019-Apr', goal: 10 },
    { duration: 9, date: '2019-May', goal: 10 },
    { duration: 3, date: '2019-Jun', goal: 10 },
];

const iprData = [
    { ipr: 45, date: '2018-Jun', lsl: 30 },
    { ipr: 20, date: '2018-Jul', lsl: 30 },
    { ipr: 25, date: '2018-Ago', lsl: 30 },
    { ipr: 30, date: '2018-Sep', lsl: 30 },
    { ipr: 40, date: '2018-Oct', lsl: 30 },
    { ipr: 35, date: '2018-Nov', lsl: 30 },
    { ipr: 55, date: '2018-Dec', lsl: 30 },
    { ipr: 65, date: '2019-Feb', lsl: 30 },
    { ipr: 30, date: '2019-Mar', lsl: 30 },
    { ipr: 20, date: '2019-Apr', lsl: 30 },
    { ipr: 90, date: '2019-May', lsl: 30 },
    { ipr: 30, date: '2019-Jun', lsl: 30 },
];

export default function DashboardContainer() {
    return (<Fragment>
        <PageSection variant={PageSectionVariants.light}>
            <Gallery gutter="lg">
                <GalleryItem>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <ThumbTackIcon /> 0 Jobs
                        </CardHeader>
                        <CardBody className="dashboard-card-body">
                            <Link aria-label="add jobs" to="/jobs-add"><AddCircleOIcon className="dashboard-card-icon add-icon" /></Link>
                        </CardBody>
                    </Card>
                </GalleryItem>
                <GalleryItem>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <UsersIcon /> 0 Candidates
                        </CardHeader>
                        <CardBody className="combined-status dashboard-card-body">
                            <Tooltip position="top" content={<div>Internal</div>}>
                                <span>
                                    <HomeIcon className="dashboard-card-icon" /> 0
                                </span>
                            </Tooltip>
                            <Tooltip position="top" content={<div>External</div>}>
                                <span>
                                    <GlobeIcon className="dashboard-card-icon" /> 0
                            </span>
                            </Tooltip>
                        </CardBody>
                    </Card>
                </GalleryItem>
                <GalleryItem>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <TrendUpIcon /> 0% Int. Prom. Rate
                        </CardHeader>
                        <CardBody className="dashboard-card-body">
                            <ErrorCircleOIcon className="dashboard-card-icon status-bad" />
                        </CardBody>
                    </Card>
                </GalleryItem>
                <GalleryItem>
                    <Card className="dashboard-card">
                        <CardHeader>
                            <ClockIcon /> 0 Avg days for Hiring
                        </CardHeader>
                        <CardBody className="dashboard-card-body">
                            <OkIcon className="dashboard-card-icon status-fine" />
                        </CardBody>
                    </Card>
                </GalleryItem>
            </Gallery>
        </PageSection>
        <PageSection>
            <Grid gutter="md">
                <GridItem span={6}>
                    <Card>
                        <CardHeader>Average Hiring Time in Days</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="90%" height={300}>
                                <LineChart data={data}>
                                    <XAxis dataKey="date" />
                                    <YAxis />
                                    <RTooltip />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                                    <Line type="monotone" dataKey="duration" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="goal" stroke="red" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem span={6}>
                    <Card>
                        <CardHeader>Monthly Internal Promotion Rate %</CardHeader>
                        <CardBody>
                            <ResponsiveContainer width="90%" height={300}>
                                <ResponsiveContainer width="90%" height={300}>
                                    <LineChart data={iprData}>
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <RTooltip />
                                        <CartesianGrid stroke="#ccc" strokeDasharray="2 2" />
                                        <Line type="monotone" dataKey="ipr" stroke="#8884d8" />
                                        <Line type="monotone" dataKey="lsl" stroke="red" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ResponsiveContainer>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </PageSection>
    </Fragment>);
}