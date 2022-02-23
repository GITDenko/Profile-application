import { Modal } from "react-bootstrap";
import EditHeader from "./PersonalInformation/EditHeader";
import { handleHeaderClose, useHeaderGlobalState } from "./HeaderGlobalStates";

export const EditHeaderModal = (props) => {
  const [showHeaderEdit] = useHeaderGlobalState(props.showHeaderEdit);
  const [profile] = useHeaderGlobalState("profile");

  return (
    <Modal
      show={showHeaderEdit}
      onHide={() => handleHeaderClose(props.showHeaderEdit)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Header</Modal.Title>
      </Modal.Header>
      <EditHeader profile={profile} />
    </Modal>
  );
};
