import React from 'react';
import {
    InputGroup, Button, TextInput,
    Select, SelectOption, SelectVariant,
    Modal,
} from '@patternfly/react-core';
import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';

import { candidateSkillNameChange } from './actions';
import { ICandidateSkill } from './types';

interface ICandidateSkillsModalProps {
    candidateSkillsModalVisible: boolean,
    skillName: string
    candidateSkillNameChange: typeof candidateSkillNameChange,
    skills: ICandidateSkill[]
}

export default function CandidateSkillsModal(props: ICandidateSkillsModalProps) {
    const tableRowFromSkill = (skill: ICandidateSkill): IRow => {
        return {
            cells: [
                { title: skill.skillName },
                { title: skill.levelOfKnowledge },
                { title: skill.yearsOfExperience },
            ]
        }
    }

    return (<Modal
        width={'50%'}
        title="Define Candidate Skills"
        isOpen={props.candidateSkillsModalVisible}>
        <InputGroup>
            <TextInput
                id="textInputSkill"
                aria-label="Skill"
                placeholder="Skill name"
                onChange={props.candidateSkillNameChange}
                value={props.skillName} />
            <TextInput
                id="textInputExperience"
                aria-label="Years of Experience"
                placeholder="Years of experience"
                type="number" />
        </InputGroup>
        <InputGroup>
            <Select
                id="select"
                variant={SelectVariant.single}
                aria-label="Select Level of Knowledge"
                // tslint:disable-next-line:jsx-no-lambda
                onToggle={() => { console.log('toggle') }}
            >
                <SelectOption value="Choose knowledge Level" isPlaceholder={true} />
                <SelectOption value="Advanced" />
                <SelectOption value="Experienced" />
                <SelectOption value="Foundational" />
            </Select>
            <Button
                id="AddInterviewerButton">Add</Button>
        </InputGroup>
        <Table
            caption="Suggested Candidate Skills"
            cells={['Name', 'Level', 'Experience']}
            rows={props.skills.map<IRow>(skillItem => tableRowFromSkill(skillItem))}
        >
            <TableHeader />
            <TableBody rowKey='rowId' />
        </Table>
        <Button id="OkButton" isActive={props.skills.length >= 1}>OK</Button>
    </Modal>)
}