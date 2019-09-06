import React from 'react';
import {
    InputGroup, Button, TextInput,
    Select, SelectOption, SelectVariant,
    Modal,
    ButtonVariant,
} from '@patternfly/react-core';
import {
    Table, TableHeader, TableBody, IRow
} from '@patternfly/react-table';

import {
    candidateSkillAdd,
    candidateSkillNameChange,
    candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear,
    candidateSkillModalToggle,
    candidateSkillExperienceChange,
    candidateSkillRemove,
} from './actions';
import { ICandidateSkill, ICandidateSkillsModalState } from './types';

interface ICandidateSkillsModalProps {
    candidateSkillAdd: typeof candidateSkillAdd,
    candidateSkillModalToggle: typeof candidateSkillModalToggle,
    candidateSkillNameChange: typeof candidateSkillNameChange,
    candidateSkillKnowledgeToggle: typeof candidateSkillKnowledgeToggle,
    candidateSkillKnowledgeSelect: typeof candidateSkillKnowledgeSelect,
    candidateSkillKnowledgeClear: typeof candidateSkillKnowledgeClear,
    candidateSkillExperienceChange: typeof candidateSkillExperienceChange,
    candidateSkillRemove: typeof candidateSkillRemove,
    state: ICandidateSkillsModalState,
    okClickHandler: any,
}

export default function CandidateSkillsModal(props: ICandidateSkillsModalProps) {
    const tableRowFromSkill = (skill: ICandidateSkill): IRow => {
        return {
            cells: [
                { title: skill.skillName },
                { title: skill.levelOfKnowledge },
                { title: skill.yearsOfExperience },

                {
                    title: <Button variant={ButtonVariant.link}
                        // tslint:disable-next-line:jsx-no-lambda
                        onClick={() => { props.candidateSkillRemove(skill.skillName) }}>X</Button>
                }
            ]
        }
    }

    const candidateSkillSelectWrapper = (event, value: string, isPlaceholder?: boolean | undefined) => {
        if (!isPlaceholder) {
            props.candidateSkillKnowledgeSelect(value);
        } else {
            props.candidateSkillKnowledgeClear();
        }
    }

    const candidateSkillValidator = () => {
        if (!props.state.skills.find(skill => props.state.skillName === skill.skillName)) {
            props.candidateSkillAdd();
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
                value={props.state.skillName} isValid={props.state.skills.find(skill => props.state.skillName === skill.skillName) === undefined} />
            <TextInput
                id="textInputExperience"
                aria-label="Years of Experience"
                placeholder="Years of experience"
                type="number"
                onChange={props.candidateSkillExperienceChange}
                value={props.state.yearsOfExperience} />
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
                <SelectOption value="Expert" />
                <SelectOption value="Proficient" />
                <SelectOption value="Basic" />
            </Select>
            <Button
                id="AddInterviewerButton"
                onClick={candidateSkillValidator}>Add</Button>
        </InputGroup>
        <Table
            caption="Suggested Candidate Skills"
            cells={['Name', 'Level', 'Experience', 'Remove']}
            rows={props.state.skills.map<IRow>(skillItem => tableRowFromSkill(skillItem))}>
            <TableHeader />
            <TableBody rowKey='rowId' />
        </Table>
        <Button
            id="OkButton"
            isActive={props.state.skills.length >= 1}
            onClick={props.okClickHandler}>OK</Button>
    </Modal>)
}