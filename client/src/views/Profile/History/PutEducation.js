import React, { useState, useCallback } from "react";
import { Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import * as methodService from "../../../components/methods";
import { handleClose } from "./HistoryModals";

const PutEducation = (prop) => {
  const [data, setData] = useState({
    name: "",
    place: "",
    period: {
      startDate: "",
      endDate: "",
      totalYears: "",
      totalMonths: "",
    },
    program: "",
    course: "",
  });
  let updatedEducation = { ...data };
  const edit = useCallback(
    async (e) => {
      e.preventDefault();
      methodService.updateEducationToProfile(
        prop.profile,
        prop.history,
        updatedEducation
      );
      const url = "/api/profile/";
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prop.profile),
      };
      await fetch(url, requestOptions);
      handleClose("showEducationEdit");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const handle = (e, property) => {
    updatedEducation = methodService.setEducationProps(
      e,
      property,
      updatedEducation
    );
    setData(updatedEducation);
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
                defaultValue={prop.history.name}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="place" label="City" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                defaultValue={prop.history.place}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* Subject/Course taken */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="program" label="Program" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                defaultValue={prop.history.program}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="course" label="Course" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                defaultValue={prop.history.course}
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
                onChange={(e) => handle(e, "period")}
                defaultValue={
                  prop.history.period.startDate.split("T00:00:00.000Z")[0]
                }
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
                onChange={(e) => handle(e, "period")}
                defaultValue={
                  prop.history.period.endDate.split("T00:00:00.000Z")[0]
                }
                placeholder="date"
                type="date"
              />
            </FloatingLabel>
          </Col>
        </Row>
        {/* SKILLS */}
        <Row>
          <Col>
            <Button variant="dark" onClick={edit}>
              Edit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PutEducation;
