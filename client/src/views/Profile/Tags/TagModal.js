import { createGlobalState } from 'react-hooks-global-state';
import { Modal } from 'react-bootstrap';
import PostTag from './PostTag';
import DeleteTag from './DeleteTag';


//Byt namn på setGlobalState och useGlobalState
const { setGlobalState, useGlobalState } = createGlobalState({
  showTagAdd: false,
  showTagDel: false,

  selectedTag: '',
  tagsArray: '',
  profile: '',
  type: '',
});
export { useGlobalState, setGlobalState };

/// CLOSE MODAL
export const handleClose = (show) => {
  ///ASSIGNMENT
  switch (show) {
    case 'showTagAdd':
      setGlobalState('showTagAdd', false);
      break;
    case 'showTagDel':
      setGlobalState('showTagDel', false);
      break;
    default:
      break;
  }
};

/// OPEN MODAL
export const handleShow = (show, profile, type) => {
  setGlobalState('type', type);
  setGlobalState('profile', profile);
  switch (show) {
    case 'showTagAdd':
      setGlobalState('showTagAdd', true);
      break;
    case 'showTagDel':
      setGlobalState('showTagDel', true);
      break;
    default:
      break;
  }
};

/// POST EXPERIENCE MODAL
export const AddTagModal = () => {
  const [tagsArray] = useGlobalState('tagsArray');
  const [profile] = useGlobalState('profile');
  const [type] = useGlobalState('type');
  const [showAdd] = useGlobalState('showTagAdd');
  return (
    <Modal show={showAdd} onHide={() => handleClose('showTagAdd')}>
      <Modal.Header closeButton>
        <Modal.Title>Add {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PostTag profile={profile} tagsArray={tagsArray} type={type}></PostTag>
      </Modal.Body>
    </Modal>
  );
};
// Edit Education Modal
export const DeleteTagModal = () => {
  const [selectedTag] = useGlobalState('selectedTag');
  const [profile] = useGlobalState('profile');
  const [type] = useGlobalState('type');
  const [showDel] = useGlobalState('showTagDel');
  return (
    <Modal show={showDel} onHide={() => handleClose('showTagDel')}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DeleteTag
          profile={profile}
          selectedTag={selectedTag}
          type={type}
        ></DeleteTag>
      </Modal.Body>
    </Modal>
  );
};
