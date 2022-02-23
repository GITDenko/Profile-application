import { Modal } from 'react-bootstrap';
import { useTagGlobalState, handleTagClose } from './TagGlobalStates';
import * as methodService from '../../components/methods/index';
import { useState } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';

const modalStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};
// POST TAG
export const PostModal = (props) => {
  const [tagName] = useTagGlobalState('tagName');
  const [showPost] = useTagGlobalState(props.showPost);

  return (
    <Modal show={showPost} onHide={() => handleTagClose(props.showPost)}>
      <Modal.Header closeButton>
        <Modal.Title>Create</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        Are you sure you want to create {tagName}?
        <Button
          size="small"
          variant="dark"
          onClick={() => {
            methodService.postTag(props.url, JSON.stringify({ name: tagName }));
            handleTagClose(props.showPost);
          }}
        >
          Create
        </Button>
      </Modal.Body>
    </Modal>
  );
};

///EDIT MODAL
export const EditModal = (props) => {
  const [tagName] = useTagGlobalState('tagName');
  const [tagId] = useTagGlobalState('tagId');
  const [showEdit] = useTagGlobalState(props.showEdit);
  const [data, setData] = useState(null);
  const getData = (val) => {
    setData(val.target.value);
  };
  return (
    <Modal show={showEdit} onHide={() => handleTagClose(props.showEdit)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        <Input icon placeholder={tagName} onChange={getData}>
          <input />
          <Button variant="success">
            <Icon
              name="save"
              variant="success"
              onClick={() => {
                methodService.putTag(
                  props.url,
                  JSON.stringify({ id: tagId, name: data })
                );
                handleTagClose(props.showEdit);
              }}
            />
          </Button>
        </Input>
      </Modal.Body>
    </Modal>
  );
};

/////DELETE MODAL
export const DeleteModal = (props) => {
  const [tagId] = useTagGlobalState('tagId');
  const [tagName] = useTagGlobalState('tagName');
  const [showDel] = useTagGlobalState(props.showDel);

  return (
    <Modal show={showDel} onHide={() => handleTagClose(props.showDel)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body style={modalStyle}>
        Are you sure you want to delete: {tagName}?
        <Button variant="danger">
          <Icon
            name="trash alternate"
            onClick={() => {
              methodService.deleteTag(props.url + tagId);
              handleTagClose(props.showDel);
            }}
          />
        </Button>
      </Modal.Body>
    </Modal>
  );
};
