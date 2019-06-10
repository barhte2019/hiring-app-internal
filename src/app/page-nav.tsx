import React from 'react';
import {NavLink} from 'react-router-dom';
import { Nav, NavList, NavVariants, NavItem } from '@patternfly/react-core';

export default function PageNav() {
    return (
        <Nav aria-label="Nav">
            <NavList variant={NavVariants.horizontal}>
                <NavItem>
                    <NavLink to="/">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/tasks">Tasks</NavLink>
                </NavItem>
            </NavList>
        </Nav>
    );
}