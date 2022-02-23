import React, { useState, useCallback } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import * as methodServices from "../../../components/methods";
import { handleClose } from "./HistoryModals";
import { useMsal } from "@azure/msal-react";
import { fetchToken } from "../../../components/methods";

const PostHistory = (property) => {
  let skillsArray = [];
  let rolesArray = [];
  const { instance, accounts } = useMsal();
  const token = fetchToken(instance, accounts);
  const skills = methodServices.fetchTags("/api/skill/", token);
  const roles = methodServices.fetchTags("/api/role/", token);
  const populateSkillsArray = (skills, skillsArray) => {
    skillsArray = methodServices.populateSkillsArray(skills, skillsArray);
  };
  const populateRolesArray = (roles, rolesArray) => {
    rolesArray = methodServices.populateRolesArray(roles, rolesArray);
  };
  populateSkillsArray(skills, skillsArray);
  populateRolesArray(roles, rolesArray);

  const [data, setData] = useState({
    name: "",
    place: "",
    content: "",
    period: {
      startDate: "",
      endDate: "",
      totalYears: "",
      totalMonths: "",
    },
    roles: [],
    skills: [],
  });
  let newExperience = { ...data };

  const submit = useCallback(
    async (e) => {
      e.preventDefault();
      methodServices.addNewExperienceToProfile(property.profile, newExperience);
      const url = "/api/profile/";
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(property.profile),
      };
      await fetch(url, requestOptions);
      handleClose("showAssignmentAdd");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const handle = (e, property) => {
    newExperience = methodServices.setExperienceProps(
      e,
      property,
      newExperience
    );
    setData(newExperience);
  };

  return (
    <div>
      <Form>
        {/* COMPANY AND PLACE */}
        <Row className="g-2">
          <Col md>
            <FloatingLabel controlId="name" label="Company" className="mb-3">
              <Form.Control
                onChange={(e) => handle(e)}
                value={data.name}
                placeholder="Company"
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
                onChange={(e) => handle(e, "period")}
                value={data.period.endDate}
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
            value={data.content}
            as="textarea"
            placeholder="Leave a summary here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        {/* ROLES AND SKILLS */}
        <Row className="g-2">
          <Col md>
            Roles
            <FloatingLabel className="mb-3">
              <Multiselect
                options={rolesArray}
                displayValue="name"
                onSelect={(e) => handle(e, "roles")}
              />
            </FloatingLabel>
          </Col>
          <Col md>
            Skills
            <FloatingLabel className="mb-3">
              <Multiselect
                options={skillsArray}
                displayValue="name"
                onSelect={(e) => handle(e, "skills")}
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

export default PostHistory;
