import axios from 'axios';
import { Row, Col, Form } from 'react-bootstrap';
import { handleClose } from './HistoryModals';
import React, { useCallback } from 'react';

const DeleteHistory = (props) => {
  const confirmDelete = useCallback(
    async (e) => {
      e.preventDefault();
      let historyType = '';
      if (props.history.roles) {
        historyType = 'Assignment';
      } else {
        historyType = 'Education';
      }

      if (historyType === 'Education') {
        const educationId = props.profile.educations?.findIndex(
          (element) => element.id === props.history.id
        );
        props.profile.educations.splice(educationId, 1);
        await axios.put('/api/profile/', props.profile);
        handleClose('showHistoryDel');
      }
      if (historyType === 'Assignment') {
        const experienceId = props.profile.experiences?.findIndex(
          (element) => element.id === props.history.id
        );
        props.profile.experiences.splice(experienceId, 1);
        await axios.put('/api/profile/', props.profile);
        handleClose('showHistoryDel');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div>
      <Form>
        <Row className="g-2">
          <Col md>Are you sure you want to delete?</Col>
        </Row>
        <Row className="deleteTagButtons">
          <Col>
            <button className="button buttonClose" onClick={confirmDelete}>
              Delete
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default DeleteHistory;
