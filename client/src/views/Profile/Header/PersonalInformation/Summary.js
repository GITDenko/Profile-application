const Summary = (props) => {
  return (
    <div className="HeaderSection">
      <p>{props.profile.personalSummary}</p>
    </div>
  );
};

export default Summary;
