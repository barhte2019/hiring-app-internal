import React, { ReactNode } from 'react';
import { DropdownItem } from '@patternfly/react-core';
import { ITask } from 'src/common/types';

export default function TaskDropdownItems(tasks: ITask[]): ReactNode[] {
    return (
        tasks.map((task, index) => TaskDropdownItem(task, 'ddtask-' + index)).filter((item, index) => index < 10)
    );
}

export function TaskDropdownItem(task: ITask, key: string) {
    return (
        <DropdownItem key={key}><b>{task["task-name"]}</b> <i>({task["task-id"]})</i></DropdownItem>
    )
}