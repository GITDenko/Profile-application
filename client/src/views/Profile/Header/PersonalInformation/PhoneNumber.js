const PhoneNumber = (props) => {
  return (
    <div className="HeaderSection">
      <p>Contact Number: {props.profile.contactNumber}</p>
    </div>
  );
};

export default PhoneNumber;
