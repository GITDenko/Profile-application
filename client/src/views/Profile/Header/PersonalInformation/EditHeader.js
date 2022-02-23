import { useCallback, useState } from "react";
import { handleHeaderClose } from "../HeaderGlobalStates";
import { Modal, Row, Col, Form } from "react-bootstrap";
import { Input, Button } from "semantic-ui-react";
import axios from "axios";

const modalStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

///EDIT MODAL
const EditHeader = (props) => {
  const [data, setData] = useState({
    image: null,
    personalSummary: "",
    contactNumber: "",
    headerRoleName: "",
  });
  let newHeader = { ...data };

  const putRequest = useCallback(
    async (e) => {
      e.preventDefault();
      for (var obj in newHeader) {
        if (newHeader[obj] !== "" && obj !== "headerRoleName") {
          props.profile[obj] = newHeader[obj];
        }
        if (obj === "headerRoleName") {
          const roleName = newHeader[obj];
          const role = props.profile.roles.find((x) => x.name === roleName); // OUTPUT: Role object
          const index = props.profile.roles.findIndex(
            (x) => x.name === roleName
          ); // OUTPUT: Index in Profile Role Array
          if (index > -1) {
            props.profile.roles.splice(index, 1);
            props.profile.roles.unshift(role);
          }
        }
        if (obj === "image" && newHeader[obj] !== "") {
          props.profile.imageUrl = `${props.profile.firstName.toLowerCase()}_${props.profile.lastName.toLowerCase()}`;
          const url = `/api/image/${props.profile.imageUrl}`;
          const imageBody = newHeader.image;
          await axios.post(url, { imageBody });
        }
      }
      axios.put("/api/profile/", props.profile);
      handleHeaderClose("showHeaderEdit");
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [newHeader]
  );

  const handle = (e, property) => {
    if (property === "image" && e.target.files[0]) {
      newHeader.image = e.target.files[0];
    } else {
      newHeader[e.target.id] = e.target.value;
    }
    setData(newHeader);
  };
  return (
    <div style={modalStyle}>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              {/* Image */}
              Profile Image
              <Row>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => handle(e, "image")}
                />
                {/* Summary */}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              Profile Summary
              <textarea
                id="personalSummary"
                className="textarea"
                defaultValue={props.profile.personalSummary}
                onChange={(e) => handle(e)}
              />
            </Col>
          </Row>
          {/* Header Role */}
          <Row>
            <Col>
              Header Role
              <Form.Select
                id="headerRoleName"
                placeholder="Select..."
                onChange={(e) => handle(e)}
              >
                {props.profile.roles.map((r, i) => (
                  <option key={i}>{r.name}</option>
                ))}
              </Form.Select>
              {/* Phone Number */}
            </Col>
            <Col>
              Contact number
              <Input
                id="contactNumber"
                type="text"
                defaultValue={props.profile.contactNumber}
                onChange={(e) => handle(e)}
              />
            </Col>
          </Row>
          <Button
            className="button buttonOG buttonSpacing"
            onClick={putRequest}
          >
            Edit
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
};

export default EditHeader;
