import React, { useState } from "react";
import {
  Stack,
  Button,
  Card,
  Accordion,
  useAccordionButton,
  Collapse,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Profile.css";
import {
  AddEducationModal,
  EditEducationModal,
  AddAssignmentModal,
  EditAssignmentModal,
  DeleteHistoryModal,
  handleShow,
} from "./HistoryModals";
import "../../../index.css";
import * as services from "../../../components/methods";
import { Icon } from "semantic-ui-react";

const ContextAwareToggle = ({ children, eventKey, callback }) => {
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const [openHistory, setOpenHistory] = useState(false);
  return (
    <Button
      variant="dark"
      onClick={() => {
        setOpenHistory(!openHistory);
        decoratedOnClick();
      }}
      aria-expanded={openHistory}
    >
      {children}
    </Button>
  );
};

const HistoryInformation = (props) => {
  const [open, setOpen] = useState(false);
  const showDel = "showHistoryDel";
  return (
    <div className="workSection">
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="dark"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {props.historyType}
        </Button>
        <Button
          variant="success"
          onClick={() => handleShow(props.showAdd, props.profile)}
        >
          <Icon size="small" name="add" />
        </Button>
      </Stack>
      {props.histories.map((history, i) => (
        <Collapse in={open} key={i}>
          <Accordion defaultActiveKey={0}>
            <Card className="historyCard">
              <div className="historyHeader">
                <div className="historyHeaderChild">
                  <ContextAwareToggle eventKey={history.id}>
                    {(() => {
                      if (history.course) {
                        return (
                          <div>
                            {history.name} - {history.course}
                          </div>
                        );
                      }
                      if (history.program) {
                        return (
                          <div>
                            {history.name} - {history.program}
                          </div>
                        );
                      } else {
                        return <div>{history.name}</div>;
                      }
                    })()}
                  </ContextAwareToggle>
                </div>
                <div className="historyHeaderIcon">
                  <Icon
                    name="edit"
                    onClick={() =>
                      handleShow(props.showEdit, props.profile, history)
                    }
                  />
                  <Icon
                    name="trash"
                    onClick={() => handleShow(showDel, props.profile, history)}
                  />
                </div>
              </div>
              <Accordion.Collapse eventKey={history.id}>
                <Card.Body>
                  <div className="experienceSubline">{history.place}</div>
                  <div className="experienceDate">
                    {(() => {
                      return services.setDateView(history.period);
                    })()}
                  </div>
                  <div>
                    {(() => {
                      if (history.content) {
                        return (
                          <div>
                            <br />
                            {history.content}
                          </div>
                        );
                      }
                    })()}
                  </div>
                  <br />
                  {(() => {
                    if (history.roles) {
                      return (
                        <div className="experienceTags">
                          Skills - {history.skills.map((x) => x.name + " ")}
                        </div>
                      );
                    }
                  })()}
                  <br />
                  {(() => {
                    if (history.roles) {
                      return (
                        <div className="experienceTags">
                          Roles - {history.roles.map((x) => x.name + " ")}
                        </div>
                      );
                    }
                  })()}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Collapse>
      ))}
      <AddEducationModal />
      <EditEducationModal />
      <AddAssignmentModal />
      <EditAssignmentModal />
      <DeleteHistoryModal />
    </div>
  );
};

export default HistoryInformation;
