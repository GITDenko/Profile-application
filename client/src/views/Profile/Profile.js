import Education from './History/Education';
import './Profile.css';
import '../../index.css';
import Assignment from './History/Assignment';
import Skill from './Tags/Skill';
import Role from './Tags/Role';
import Header from './Header/Header';
import Print from './Print';
import { useLocation } from 'react-router-dom';

const Profile = () => {
  const profile = useLocation().state.selectedProfile;
  
  return (
    <div className="HomeContainer">
      <div className="ProfileContent">
        <Header profile={profile} />
        <Assignment profile={profile} />
        <Education profile={profile} />
        <Skill profile={profile} type={'Skills'} />
        <Role profile={profile} type={'Roles'} />
        <Print profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
