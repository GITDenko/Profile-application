import HistoryInformation from './HistoryInformation';

const Assignment = (props) => {
  return (
    <HistoryInformation
      historyType={'Assignment'} // string "Assignment"
      histories={props.profile.experiences} // Assignments
      showAdd={'showAssignmentAdd'} // Show Add Assignments
      showEdit={'showAssignmentEdit'} // Show EditAssignment
      profile={props.profile} // Profile
    />
  );
};
export default Assignment;
