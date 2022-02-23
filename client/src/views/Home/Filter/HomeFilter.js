import { handleFilter } from './FilterGlobalStates';
import { Input } from 'semantic-ui-react';

const HomeFilter = (props) => {
  return (
    <div>
      <div className="searchBoxStyle">
        Skills
        <br />
        <Input
          id="skillFilter"
          name="skillFilter"
          type="text"
          placeholder="Search"
          value={props.skillFilter}
          onChange={(input) => handleFilter(input.target.value, 'skillFilter')}
          icon={'search'}
        />
      </div>
      <div className="searchBoxStyle">
        Roles
        <br />
        <Input
          id="roleFilter"
          name="roleFilter"
          type="text"
          placeholder="Search"
          value={props.roleFilter}
          onChange={(input) => handleFilter(input.target.value, 'roleFilter')}
          icon={'search'}
        />
      </div>
      <div className="searchBoxStyle">
        Name
        <br />
        <Input
          id="nameFilter"
          name="nameFilter"
          type="text"
          placeholder="Search"
          value={props.nameFilter}
          onChange={(input) => handleFilter(input.target.value, 'nameFilter')}
          icon={'search'}
        />
      </div>
      <div className="searchBoxStyle">
        Assignment
        <br />
        <Input
          id="assignmentFilter"
          name="assignmentFilter"
          type="text"
          placeholder="Search"
          value={props.assignmentFilter}
          onChange={(input) =>
            handleFilter(input.target.value, 'assignmentFilter')
          }
          icon={'search'}
        />
      </div>
      <div className="searchBoxStyle"></div>
    </div>
  );
};

export default HomeFilter;
