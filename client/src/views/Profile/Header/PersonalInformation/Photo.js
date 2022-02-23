import React from "react";
import { fetchImageById } from "../../../../components/methods";

const Photo = (props) => {
  // fetch image, if no image then set Missing Profile Image
  let profileImageUrl = "";
  if (!props.profile.imageUrl === "" || props.profile.imageUrl) {
    profileImageUrl = fetchImageById(`/api/image/${props.profile.imageUrl}`);
  }

  const data = "data:image/png;base64," + profileImageUrl;

  return (
    <div className="HeaderSection">
      <div className="HeaderProfileContent">
        {(() => {
          if (profileImageUrl === "") {
            return (
              <div className="LibraryProfileImg">
                <p className="LibraryProfileText">
                  {props.profile.firstName[0]}
                  {props.profile.lastName[0]}
                </p>
              </div>
            );
          } else {
            return <img src={data} />;
          }
        })()}
      </div>
    </div>
  );
};

export default Photo;
