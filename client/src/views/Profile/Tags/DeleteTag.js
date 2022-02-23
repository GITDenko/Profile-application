import React, { useCallback } from "react";
import { Button, Row, Col, Form, FloatingLabel } from "react-bootstrap";
import { handleClose } from "./TagModal";
import * as services from "../../../components/methods/index";
import { Icon } from "semantic-ui-react";

const DeleteTag = (props) => {
  const confirmDelete = useCallback(
    async (e) => {
      e.preventDefault();
      services.deleteTagFromProfile(
        props.profile,
        props.selectedTag,
        props.type
      );
      const url = "/api/profile/";
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props.profile),
      };
      await fetch(url, requestOptions);
      handleClose("showTagDel");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <div>
      <Form>
        <Row className="g-2">
          <Col md>
            Are you sure you want to delete the following{" "}
            {props.type.substring(0, props.type.length - 1).toLowerCase()}:{" "}
            {props.selectedTag.name}
            <FloatingLabel className="mb-3"></FloatingLabel>
          </Col>
        </Row>
        <Row className="deleteTagButtons">
          <Col>
            <Button variant="danger" onClick={confirmDelete}>
              <Icon name="trash" />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DeleteTag;
