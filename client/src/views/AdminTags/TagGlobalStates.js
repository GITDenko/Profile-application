import { createGlobalState as createTagGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createTagGlobalState({
  tagName: '',
  tagId: '',
  showTagDelete: false,
  showTagEdit: false,
  showTagPost: false,
});
export {
  useGlobalState as useTagGlobalState,
  setGlobalState as setTagGlobalState,
};

/// CLOSE TAG MODAL
const handleClose = (show) => {
  switch (show) {
    case 'showTagEdit':
      setGlobalState('showTagEdit', false);
      break;
    case 'showTagDelete':
      setGlobalState('showTagDelete', false);
      break;
    case 'showTagPost':
      setGlobalState('showTagPost', false);
      break;
    default:
      break;
  }
};

/// OPEN TAG MODAL
const handleShow = (show, tagName, tagId) => {
  if (tagName) {
    setGlobalState('tagName', tagName);
  }
  if (tagId) {
    setGlobalState('tagId', tagId);
  }
  switch (show) {
    case 'showTagEdit':
      setGlobalState('showTagEdit', true);
      break;
    case 'showTagDelete':
      setGlobalState('showTagDelete', true);
      break;
    case 'showTagPost':
      setGlobalState('showTagPost', true);
      break;
    default:
      break;
  }
};

export { handleClose as handleTagClose, handleShow as handleTagShow };
