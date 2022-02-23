import React, { useCallback } from 'react';
import { Multiselect } from 'multiselect-react-dropdown';
import { Button, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import * as methodServices from '../../../components/methods';
import { handleClose } from './TagModal';

let filteredSkillsArray = [];
let filteredRolesArray = [];
let filteredTagsArray = [];
const PostTag = (props) => {
  // TODO move to tags methods
  if (filteredSkillsArray.length === 0) {
    if (props.type === 'Skills') {
      filteredSkillsArray = methodServices.populateSkillsArray(
        props.tagsArray,
        filteredSkillsArray
      );
      filteredTagsArray = methodServices.filterTagArray(
        props.profile.skills,
        filteredSkillsArray
      );
      filteredRolesArray = [];
    }
  }
  if (filteredRolesArray.length === 0) {
    if (props.type === 'Roles') {
      filteredRolesArray = methodServices.populateRolesArray(
        props.tagsArray,
        filteredRolesArray
      );
      filteredTagsArray = methodServices.filterTagArray(
        props.profile.roles,
        filteredRolesArray
      );
      filteredSkillsArray = [];
    }
  }

  let newTags = [];

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      if (props.type === 'Skills') {
        newTags.forEach((t) => {
          props.profile.skills.push(t);
        });
      }
      if (props.type === 'Roles') {
        newTags.forEach((t) => {
          props.profile.roles.push(t);
        });
      }
      const url = '/api/profile/';
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(props.profile),
      };
      await fetch(url, requestOptions);
      handleClose('showTagAdd');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handle = (e) => {
    newTags = e;
  };

  return (
    <div>
      <Form>
        <Row className="g-2">
          <Col md>
            {props.type}
            <FloatingLabel className="mb-3">
              <Multiselect
                options={filteredTagsArray}
                displayValue="name"
                onSelect={(e) => handle(e)}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="dark" onClick={submit}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PostTag;
