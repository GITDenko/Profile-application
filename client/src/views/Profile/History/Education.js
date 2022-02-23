import HistoryInformation from './HistoryInformation';

const Education = (props) => {
  return (
    <HistoryInformation
      historyType={'Education'} // string "Education"
      histories={props.profile.educations} // Educations
      showAdd={'showEducationAdd'} // Show Add Educations
      showEdit={'showEducationEdit'} // Show EditEducations
      profile={props.profile} // Profile
    />
  );
};
export default Education;
