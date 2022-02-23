import { createGlobalState as createFilterGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createFilterGlobalState({
  skillFilter: '',
  roleFilter: '',
  nameFilter: '',
  assignmentFilter: '',
});
export {
  useGlobalState as useFilterGlobalState,
  setGlobalState as setFilterGlobalState,
};

const handleFilter = (value, filter) => {
  switch (filter) {
    case 'skillFilter':
      setGlobalState('skillFilter', value);
      break;
    case 'roleFilter':
      setGlobalState('roleFilter', value);
      break;
    case 'nameFilter':
      setGlobalState('nameFilter', value);
      break;
    case 'assignmentFilter':
      setGlobalState('assignmentFilter', value);
      break;
    default:
      break;
  }
};
export { handleFilter };
