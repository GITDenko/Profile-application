import { createGlobalState } from 'react-hooks-global-state';
import { Modal } from 'react-bootstrap';
import PostHistory from './PostAssignment';
import PostEducation from './PostEducation';
import PutEducation from './PutEducation';
import PutAssignment from './PutAssignment';
import DeleteHistory from './DeleteHistory';

//Byt namn på setGlobalState och useGlobalState
const { setGlobalState, useGlobalState } = createGlobalState({
  showAssignmentAdd: false, //for post ASSIGNMENT
  showAssignmentEdit: false, //for editing ASSIGNMENT

  showEducationAdd: false, //for posting EDUCATION
  showEducationEdit: false, //for editing EDUCATION
  showHistoryDel: false, //confirmation to delete EXPERIENCE

  history: '',
  profile: '',
  historyType: '', //Education or Assignment
});
export { useGlobalState, setGlobalState };

/// CLOSE MODAL
export const handleClose = (show) => {
  ///ASSIGNMENT
  if (show === 'showAssignmentAdd') {
    setGlobalState('showAssignmentAdd', false);
  }
  if (show === 'showAssignmentEdit') {
    setGlobalState('showAssignmentEdit', false);
  }
  ///EDUCATION
  if (show === 'showEducationAdd') {
    setGlobalState('showEducationAdd', false);
  }
  if (show === 'showEducationEdit') {
    setGlobalState('showEducationEdit', false);
  }
  ///DELETE EXPERIENCE
  if (show === 'showHistoryDel') {
    setGlobalState('showHistoryDel', false);
  }
};

/// OPEN MODAL
export const handleShow = (show, profile, history) => {
  if (history) {
    setGlobalState('history', history);
  }
  if (profile) {
    setGlobalState('profile', profile);
  }
  switch (show) {
    case 'showAssignmentAdd':
      setGlobalState('showAssignmentAdd', true);
      break;
    case 'showAssignmentEdit':
      setGlobalState('showAssignmentEdit', true);
      break;
    case 'showEducationAdd':
      setGlobalState('showEducationAdd', true);
      break;
    case 'showEducationEdit':
      setGlobalState('showEducationEdit', true);
      break;
    case 'showHistoryDel':
      setGlobalState('showHistoryDel', true);
      break;
    default:
      break;
  }
};

/// POST EXPERIENCE MODAL
export const AddAssignmentModal = () => {
  const [showAdd] = useGlobalState('showAssignmentAdd');
  const [profile] = useGlobalState('profile');
  return (
    <Modal show={showAdd} onHide={() => handleClose('showAssignmentAdd')}>
      <Modal.Header closeButton>
        <Modal.Title>Add Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostHistory profile={profile} />
      </Modal.Body>
    </Modal>
  );
};
// Edit Education Modal
export const EditAssignmentModal = () => {
  const [history] = useGlobalState('history');
  const [showEdit] = useGlobalState('showAssignmentEdit');
  const [profile] = useGlobalState('profile');
  return (
    <Modal show={showEdit} onHide={() => handleClose('showAssignmentEdit')}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PutAssignment profile={profile} history={history} />
      </Modal.Body>
    </Modal>
  );
};

/// POST EDUCATION MODAL
export const AddEducationModal = () => {
  const [showAdd] = useGlobalState('showEducationAdd');
  const [profile] = useGlobalState('profile');
  return (
    <Modal show={showAdd} onHide={() => handleClose('showEducationAdd')}>
      <Modal.Header closeButton>
        <Modal.Title>Add Education</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostEducation profile={profile} />
      </Modal.Body>
    </Modal>
  );
};

// Edit Education Modal
export const EditEducationModal = () => {
  const [history] = useGlobalState('history');
  const [showEdit] = useGlobalState('showEducationEdit');
  const [profile] = useGlobalState('profile');
  return (
    <Modal show={showEdit} onHide={() => handleClose('showEducationEdit')}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Education</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PutEducation profile={profile} history={history} />
      </Modal.Body>
    </Modal>
  );
};

/////DELETE EXPERIENCE MODAL
export const DeleteHistoryModal = () => {
  const [showDel] = useGlobalState('showHistoryDel');
  const [history] = useGlobalState('history');
  const [profile] = useGlobalState('profile');
  return (
    <Modal show={showDel} onHide={() => handleClose('showHistoryDel')}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DeleteHistory profile={profile} history={history}></DeleteHistory>
      </Modal.Body>
    </Modal>
  );
};
