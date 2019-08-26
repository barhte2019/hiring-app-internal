import React from 'react';
import {
    InputGroup, Button, TextInput,
    Select, SelectOption, SelectVariant,
    Modal,
} from '@patternfly/react-core';
import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';

import {
    candidateSkillNameChange,
    candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear,
    candidateSkillModalToggle,
} from './actions';
import { ICandidateSkill, ICandidateSkillsModalState } from './types';

interface ICandidateSkillsModalProps {
    candidateSkillModalToggle: typeof candidateSkillModalToggle,
    candidateSkillNameChange: typeof candidateSkillNameChange,
    candidateSkillKnowledgeToggle: typeof candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect: typeof candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear: typeof candidateSkillKnowledgeClear,
    state: ICandidateSkillsModalState,
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

    const candidateSkillSelectWrapper = (event, value: string, isPlaceholder?: boolean|undefined) => {
        if (!isPlaceholder) {
            props.candidateSkillKnowledgeSelect(value);
        } else {
            props.candidateSkillKnowledgeClear();
        }
    }

    return (<Modal
        width={'50%'}
        title="Define Candidate Skills"
        isOpen={props.state.candidateSkillsModalVisible}
        onClose={props.candidateSkillModalToggle}>
        <InputGroup>
            <TextInput
                id="textInputSkill"
                aria-label="Skill"
                placeholder="Skill name"
                onChange={props.candidateSkillNameChange}
                value={props.state.skillName} />
            <TextInput
                id="textInputExperience"
                aria-label="Years of Experience"
                placeholder="Years of experience"
                type="number" />
        </InputGroup>
        <InputGroup>
            <Select
                id="selectKnowledge"
                variant={SelectVariant.single}
                aria-label="Select Level of Knowledge"
                onToggle={props.candidateSkillKnowledgeToggle}
                onSelect={candidateSkillSelectWrapper}
                isExpanded={props.state.selectKnowledgeExpanded}
                selections={props.state.levelOfKnowledge}>
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
            rows={props.state.skills.map<IRow>(skillItem => tableRowFromSkill(skillItem))}
        >
            <TableHeader />
            <TableBody rowKey='rowId' />
        </Table>
        <Button id="OkButton" isActive={props.state.skills.length >= 1}>OK</Button>
    </Modal>)
}