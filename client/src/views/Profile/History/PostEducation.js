import React, { useState, useCallback } from 'react';
import { Button, Row, Col, Form, FloatingLabel } from 'react-bootstrap';
import * as methodServices from '../../../components/methods';
import { handleClose } from './HistoryModals';

const PostEducation = (property) => {
  const [data, setData] = useState({
    name: '',
    place: '',
    period: {
      startDate: '',
      endDate: '',
      totalYears: '',
      totalMonths: '',
    },
    program: '',
    course: '',
  });
  let newEducation = { ...data };

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      methodServices.addNewEducationToProfile(property.profile, newEducation);
      property.profile.modifiedDate = new Date();
      const url = '/api/profile/';
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property.profile),
      };
      await fetch(url, requestOptions);
      handleClose('showEducationAdd');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const handle = (e, property) => {
    newEducation = methodServices.setEducationProps(e, property, newEducation);
    setData(newEducation);
  };
  return (
    <div>
      <Form id="educationForm">
        {/* School and Place */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="name" label="School" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                value={data.name}
                placeholder="School"
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="place" label="City" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                value={data.place}
                placeholder="City"
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Subject/Course taken */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="course" label="Course" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                value={data.course}
                placeholder="Course"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="program" label="Program" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                value={data.program}
                placeholder="Program"
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
                value={data.period.startDate}
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
                value={data.period.endDate}
                placeholder="date"
                type="date"
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

export default PostEducation;
