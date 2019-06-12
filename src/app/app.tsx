import React, { Fragment } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {
    Avatar,
    Badge,
    Brand,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    ButtonVariant,
    Dropdown,
    DropdownToggle,
    DropdownItem,
    DropdownSeparator,
    Page,
    PageHeader,
    SkipToContent,
    Toolbar,
    ToolbarGroup,
    ToolbarItem
} from '@patternfly/react-core';
// make sure you've installed @patternfly/patternfly
import { BellIcon, QuestionIcon } from '@patternfly/react-icons';
import imgBrand from './hiring-app.png';
import imgAvatar from './imgAvatar.png';
import "react-toastify/dist/ReactToastify.css";

import AppRouter from '../routes';
import AppAbout from './about';
import PageNav from './page-nav';
import TaskDropdownItems from './task-dd-items';
import { ToastContainer } from 'react-toastify';

interface IAppProps {
    isAboutOpen: boolean,
    isDropdownOpen: boolean,
    areTasksOpen: boolean,
    onDropdownSelect: (event: any) => void,
    onDropdownToggle: (isDropdownOpen: boolean) => void,
    onTasksDropdownSelect: (event: any) => void,
    onTasksDropdownToggle: (isDropdownOpen: boolean) => void,
    onToggleAbout: () => void
}

export default function App(props: IAppProps) {
    const userDropdownItems = [
        <DropdownItem key="LinkUserDropdownItem">Profile</DropdownItem>,
        <DropdownItem key="ActionButtonUserUserDropdownItem">Tasks</DropdownItem>,
        <DropdownSeparator key="dropDownSeparator" />,
        <DropdownItem key="separatedLink">Log out</DropdownItem>
    ];

    const tasks = [
        {title: 'task1', on: '20:15'},
        {title: 'task2', on: '20:10'},
        {title: 'task3', on: '20:05'},
        {title: 'task4', on: '20:00'},
        {title: 'task5', on: '19:33'},
        {title: 'task6', on: '19:10'},
        {title: 'task7', on: '19:01'},
    ];

    const PageToolbar = (
        <Toolbar>
            <ToolbarGroup>
                <ToolbarItem>
                    <Dropdown
                        onSelect={props.onTasksDropdownSelect}
                        isOpen={props.areTasksOpen}
                        isPlain={true}
                        dropdownItems={TaskDropdownItems(tasks)}
                        toggle={
                            <DropdownToggle iconComponent={null} onToggle={props.onTasksDropdownToggle}>
                                <BellIcon />
                                <Badge>{tasks.length}</Badge>
                            </DropdownToggle>
                        }/>
                </ToolbarItem>
                <ToolbarItem>
                    <Button id="horizontal-example-uid-02" 
                        aria-label="Settings actions" 
                        variant={ButtonVariant.plain}
                        onClick={props.onToggleAbout}>
                        <QuestionIcon />
                    </Button>
                </ToolbarItem>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarItem>
                    <Dropdown
                        isPlain={true}
                        position="right"
                        onSelect={props.onDropdownSelect}
                        isOpen={props.isDropdownOpen}
                        toggle={<DropdownToggle onToggle={props.onDropdownToggle}>User Name</DropdownToggle>}
                        dropdownItems={userDropdownItems}
                    />
                </ToolbarItem>
            </ToolbarGroup>
        </Toolbar>
    );

    const Header = (
        <PageHeader
            logo={<Brand src={imgBrand} alt="Hiring App" />}
            toolbar={PageToolbar}
            avatar={<Avatar src={imgAvatar} alt="Avatar" />}
            topNav={<PageNav />}
        />
    );

    const PageBreadcrumb = (
        <Breadcrumb>
            <BreadcrumbItem isActive={true}><h1>Dashboard</h1></BreadcrumbItem>
        </Breadcrumb>
    );

    /*const PageBreadcrumb = (
            <Breadcrumb>
              <BreadcrumbItem>Section Home</BreadcrumbItem>
              <BreadcrumbItem to="#">Section Title</BreadcrumbItem>
              <BreadcrumbItem to="#">Section Title</BreadcrumbItem>
              <BreadcrumbItem to="#" isActive={true}>
                Section Landing
              </BreadcrumbItem>
            </Breadcrumb>
          );*/

    const PageSkipToContent = (
        <SkipToContent href="#main-content-page-layout-default-nav">Skip to Content</SkipToContent>
    );

    return (
        <Fragment>
            <ToastContainer autoClose={3000} position="bottom-right" />
            <AppAbout 
                imageBrandSrc={imgBrand} 
                isAboutOpen={props.isAboutOpen}
                onToggleAbout={props.onToggleAbout} />
            <Router>
                <Page header={Header} skipToContent={PageSkipToContent} breadcrumb={PageBreadcrumb}>
                    <AppRouter />
                </Page>
            </Router>
        </Fragment>
    );
}