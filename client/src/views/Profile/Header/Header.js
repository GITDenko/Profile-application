import Summary from './PersonalInformation/Summary';
import Photo from './PersonalInformation/Photo';
import ContactNumber from './PersonalInformation/PhoneNumber';
import HeaderRole from './PersonalInformation/HeaderRole';
import { Icon } from 'semantic-ui-react';
import { handleHeaderShow } from './HeaderGlobalStates';
import { EditHeaderModal } from './HeaderModals';

const modalStyle = {
  display: 'inline-flex',
  justifyContent: 'space-evenly',
};

const Header = (props) => {
  return (
    <div className="header">
      <div style={modalStyle}>
        <Photo profile={props.profile} />
        <Icon
          name="edit"
          className="iconBtn"
          onClick={() => handleHeaderShow('showHeaderEdit', props.profile)}
        />
      </div>
      <h2 className="HeaderSection">
        {props.profile.firstName} {props.profile.lastName}
      </h2>
      <HeaderRole profile={props.profile} />
      <Summary profile={props.profile} />
      <ContactNumber profile={props.profile} />
      <EditHeaderModal showHeaderEdit={'showHeaderEdit'} />
    </div>
  );
};

export default Header;
