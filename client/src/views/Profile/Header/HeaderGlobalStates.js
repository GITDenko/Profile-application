import { createGlobalState as createHeaderGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createHeaderGlobalState({
  showHeaderRoleEdit: false,
  showHeaderEdit: false,

  profile: '',
});
export {
  useGlobalState as useHeaderGlobalState,
  setGlobalState as setHeaderGlobalState,
};

/// CLOSE MODAL
const handleClose = (show) => {
  switch (show) {
    case 'showHeaderEdit':
      setGlobalState('showHeaderEdit', false);
      break;
    case 'showHeaderRoleEdit':
      setGlobalState('showHeaderRoleEdit', false);
      break;
    default:
      break;
  }
};

/// OPEN MODAL
const handleShow = (show, profile) => {
  if (profile) {
    setGlobalState('profile', profile);
  }
  switch (show) {
    case 'showHeaderEdit':
      setGlobalState('showHeaderEdit', true);
      break;
    case 'showHeaderRoleEdit':
      setGlobalState('showHeaderRoleEdit', true);
      break;
    default:
      break;
  }
};

export { handleClose as handleHeaderClose, handleShow as handleHeaderShow };
