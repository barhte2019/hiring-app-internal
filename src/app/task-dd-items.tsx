import React, { ReactNode } from 'react';
import { ITask } from 'src/store/tasks/types';
import { DropdownItem } from '@patternfly/react-core';

export default function TaskDropdownItems(tasks: ITask[]): ReactNode[] {
    return (
        tasks.map((task, index) => TaskDropdownItem(task, 'ddtask-' + index))
    );
}

export function TaskDropdownItem(task: ITask, key: string) {
    return (
        <DropdownItem key={key}><b>{task.title}</b> since <i>{task.on}</i></DropdownItem>
    )
}