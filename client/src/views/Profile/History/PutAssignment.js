import React, { useState, useCallback } from 'react';
import { Button, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import * as methodService from '../../../components/methods';
import { handleClose } from './HistoryModals';

let preSelectedRoles = [];
let preSelectedSkills = [];

const PutAssignment = (prop) => {
  let skillsArray = [];
  let rolesArray = [];
  const skills = methodService.fetchTags('/api/skill/');
  const roles = methodService.fetchTags('/api/role/');

  const populateSkillsArray = (skills, skillsArray) => {
    skillsArray = methodService.populateSkillsArray(skills, skillsArray);
  };
  const populateRolesArray = (roles, rolesArray) => {
    rolesArray = methodService.populateRolesArray(roles, rolesArray);
  };

  populateSkillsArray(skills, skillsArray);
  populateRolesArray(roles, rolesArray);

  const [data, setData] = useState({
    name: '',
    place: '',
    content: '',
    period: {
      startDate: '',
      endDate: '',
      totalYears: '',
      totalMonths: '',
    },
    roles: [],
    skills: [],
  });
  let updatedAssignment = { ...data };
  const edit = useCallback(
    async (e) => {
      e.preventDefault();
      preSelectedRoles.forEach((r) => updatedAssignment.roles.push(r));
      preSelectedSkills.forEach((s) => updatedAssignment.skills.push(s));
      methodService.updateAssignmentToProfile(
        prop.profile,
        prop.history,
        updatedAssignment
      );
      const url = '/api/profile/';
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prop.profile),
      };
      await fetch(url, requestOptions);
      handleClose('showAssignmentEdit');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const handle = (selectedList, selectedItem, property) => {
    if (property === 'skills' || property === 'roles') {
      switch (property) {
        case 'skills':
          preSelectedSkills.push(selectedItem);
          break;
        case 'roles':
          preSelectedRoles.push(selectedItem);
          break;
        default:
          break;
      }
    } else {
      updatedAssignment = methodService.setExperienceProps(
        selectedList,
        property,
        updatedAssignment
      );
    }
    setData(updatedAssignment);
  };

  const handleRemove = (preSelectedTags, removedTag, property) => {
    switch (property) {
      case 'skills':
        var tagIndex = preSelectedSkills.findIndex(
          (s) => s.name === removedTag.name
        );
        preSelectedSkills.splice(tagIndex, 1);
        break;
      case 'roles':
        tagIndex = preSelectedRoles.findIndex(
          (s) => s.name === removedTag.name
        );
        preSelectedRoles.splice(tagIndex, 1);
        break;
      default:
        break;
    }
  };

  const populatePreselectedSkills = (skills, preSelectedSkills) => {
    if (preSelectedSkills?.length === 0) {
      preSelectedSkills = methodService.populateSkillsArray(
        skills,
        preSelectedSkills
      );
    }
  };
  const populatePreselectedRoles = (roles, preSelectedRoles) => {
    if (preSelectedRoles?.length === 0) {
      preSelectedRoles = methodService.populateSkillsArray(
        roles,
        preSelectedRoles
      );
    }
  };

  if (prop.history.skills && prop.history.roles) {
    populatePreselectedSkills(prop.history.skills, preSelectedSkills);
    populatePreselectedRoles(prop.history.roles, preSelectedRoles);
  }



  return (
    <div>
      <Form>
        {/* COMPANY AND PLACE */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="name" label="Company" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                defaultValue={prop.history.name}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="place" label="City" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                defaultValue={prop.history.place}
                placeholder="City"
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* DATES */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel
              controlId="startDate"
              label="Start Date"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => handle(e, 'period')}
                defaultValue={prop.history.period.startDate.split('T00:00:00.000Z')[0]}
                placeholder="date"
                type="date"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel
              controlId="endDate"
              label="End Date"
              className="mb-3"
            >
              <Form.Control
                onChange={(e) => handle(e, 'period')}
                defaultValue={prop.history.period.endDate.split('T00:00:00.000Z')[0]}
                placeholder="date"
                type="date"
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* CONTENT */}
        <FloatingLabel controlId="content" label="Content" className="mb-3">
          <Form.Control
            onChange={(e) => handle(e)}
            defaultValue={prop.history.content}
            as="textarea"
            placeholder="Leave a summary here"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        {/* ROLES AND SKILLS */}
        <Row className="g-2">
          <Col md>
            Roles
            <FloatingLabel className="mb-3">
              <Multiselect
                options={rolesArray}
                selectedValues={preSelectedRoles}
                displayValue="name"
                onSelect={(selectedList, selectedItem) =>
                  handle(selectedList, selectedItem, 'roles')
                }
                onRemove={(preSelectedRoles, removed) =>
                  handleRemove(preSelectedRoles, removed, 'roles')
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2">
          <Col md>
            Skills
            <FloatingLabel className="mb-3">
              <Multiselect
                options={skillsArray}
                selectedValues={preSelectedSkills}
                displayValue="name"
                onSelect={(selectedList, selectedItem) =>
                  handle(selectedList, selectedItem, 'skills')
                }
                onRemove={(preSelectedSkills, removed) =>
                  handleRemove(preSelectedSkills, removed, 'skills')
                }
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="dark" onClick={edit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PutAssignment;
