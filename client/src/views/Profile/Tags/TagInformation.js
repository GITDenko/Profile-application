import { Stack, Button, Badge } from "react-bootstrap";
import React, { useState } from "react";
import { Accordion, Collapse } from "react-bootstrap";
import * as methodService from "../../../components/methods";
import {
  setGlobalState,
  handleShow,
  AddTagModal,
  DeleteTagModal,
} from "./TagModal";
import { Icon } from "semantic-ui-react";
import "../Profile.css";
import { useMsal } from "@azure/msal-react";
import { fetchToken } from "../../../components/methods";

const TagInformation = (props) => {
  if (props.type === "Skills") {
    var tags = props.profile.skills;
  }
  if (props.type === "Roles") {
    tags = props.profile.roles;
  }
  const { instance, accounts } = useMsal();
  const token = fetchToken(instance, accounts);
  const skills = methodService.fetchTags("/api/skill/", token);
  const roles = methodService.fetchTags("/api/role/", token);

  const [open, setOpen] = useState(false);

  return (
    <div className="workSection">
      <Stack direction="horizontal" gap={3}>
        <Button
          variant="dark"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          {props.type}
        </Button>
        <Button
          variant="success"
          onClick={() => {
            if (props.type === "Skills") {
              var tagsArray = skills;
            } else {
              tagsArray = roles;
            }
            setGlobalState("tagsArray", tagsArray);
            handleShow("showTagAdd", props.profile, props.type);
          }}
        >
          <Icon size="small" name="add" />
        </Button>
      </Stack>

      <Collapse in={open}>
        <Accordion>
          <br />
          {tags.map((tag, i) => (
            <span key={i}>
              <Badge pill bg="warning" text="dark">
                <p>
                  {" "}
                  {tag.name}{" "}
                  <Icon
                    name="close"
                    size="small"
                    color="black"
                    className="tagDeleteIcon"
                    onClick={() => {
                      setGlobalState("selectedTag", tag);
                      handleShow("showTagDel", props.profile, props.type);
                    }}
                  />{" "}
                </p>
              </Badge>
              {"  "}
            </span>
          ))}
        </Accordion>
      </Collapse>
      <AddTagModal />
      <DeleteTagModal />
    </div>
  );
};

export default TagInformation;
