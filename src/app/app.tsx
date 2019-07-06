import React, { Fragment } from 'react';
import { useKeycloak } from 'react-keycloak';

import {
    Avatar,
    Badge,
    Brand,
    Button,
    ButtonVariant,
    Dropdown,
    DropdownToggle,
    DropdownItem,
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
import { ITask } from 'src/common/types';

interface IAppProps {
    isAboutOpen: boolean,
    isDropdownOpen: boolean,
    areTasksOpen: boolean,
    potentialTasks: ITask[],
    onDropdownSelect: (event: any) => void,
    onDropdownToggle: (isDropdownOpen: boolean) => void,
    onTasksDropdownSelect: (event: any) => void,
    onTasksDropdownToggle: (isDropdownOpen: boolean) => void,
    onToggleAbout: () => void
}

export default function App(props: IAppProps) {
    const { keycloak } = useKeycloak();
    const appLogout = () => {
        keycloak.logout();
    }

    const userDropdownItems = [
       <DropdownItem key="separatedLink" onClick={appLogout}>Log out</DropdownItem>
    ];

    // tslint:disable:no-string-literal
    const PageToolbar = (
        <Toolbar>
            <ToolbarGroup>
                <ToolbarItem>
                    <Dropdown
                        onSelect={props.onTasksDropdownSelect}
                        isOpen={props.areTasksOpen}
                        isPlain={true}
                        dropdownItems={TaskDropdownItems(props.potentialTasks)}
                        toggle={
                            <DropdownToggle iconComponent={null} onToggle={props.onTasksDropdownToggle}>
                                <BellIcon />
                                <Badge>{props.potentialTasks.length > 10 ? '+10': props.potentialTasks.length}</Badge>
                            </DropdownToggle>
                        } />
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
                        toggle={<DropdownToggle onToggle={props.onDropdownToggle}>
                            {keycloak.tokenParsed ? keycloak.tokenParsed['preferred_username'] : keycloak.subject}</DropdownToggle>}
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
            <Page header={Header} skipToContent={PageSkipToContent}>
                <AppRouter />
            </Page>
        </Fragment>
    );
}