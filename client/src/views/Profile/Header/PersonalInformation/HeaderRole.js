const HeaderRole = (props) => {
  return (
    <div className="HeaderSection">
      <div className="HeaderProfileContent">
        <h4>
          {(() => {
            try {
              return props.profile.roles[0].name;
            } catch (e) {}
          })()}
        </h4>
      </div>
    </div>
  );
};

export default HeaderRole;
