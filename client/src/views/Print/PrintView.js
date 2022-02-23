import React from 'react';
import { useLocation } from 'react-router-dom';
import { Badge, Button } from 'react-bootstrap';
import './printView.css';
import { fetchImageById } from '../../components/methods';
import * as services from '../../components/methods';

const PrintView = () => {
  const { selectedProfile } = useLocation().state;
  const profile = selectedProfile;
  const profileImage = fetchImageById(`/api/image/${profile.imageUrl}`);

  ////BASE COMPONENT
  return (
    <div className="PrintContainer">
      <div className="headerContainer">
        <img src={profileImage} alt="" className="imgProfile" />
        <h1 className="profileName">
          {profile.firstName} {profile.lastName}
        </h1>
        <h2 className="profileRole">
          {(() => {
            try {
              return profile.roles[0].name;
            } catch (e) {}
          })()}
        </h2>
        <Button className='printButton' variant='light' onClick={() => window.print()}>Print</Button>
      </div>

      <div className="bigContainer">
        <div className="Section">
          <div className="generalCard">
            <div className="about">
              <p className="historyHeading inline">About me</p>
              <p className="historySummary">{profile.personalSummary}</p>
            </div>

            <div className="about">
              <p className="historyHeading inline">Contact Information</p>
              <div className="basicInfoTable">
                <div className="InfoRow">
                  <p>Email</p>
                </div>
                <div className="InfoCell">
                  <p>{profile.id}</p>
                </div>
              </div>
              <div className="basicInfoTable">
                <div className="InfoRow">
                  <p>Phonenumber</p>
                </div>
                <div className="InfoCell">
                  <p>{profile.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="generalCard">
            <div className="about">
              <p className="historyHeading">Roles</p>
              {profile.roles.map((x, i) => (
                <div className="Tags">
                  <Badge pill bg="warning" text="dark">
                    {x.name}
                  </Badge>{' '}
                </div>
              ))}
            </div>
            <div className="about">
              <p className="historyHeading">Skills</p>
              {profile.skills.map((x, i) => (
                <div className="Tags">
                  <Badge pill bg="warning" text="dark">
                    <p>{x.name}</p>
                  </Badge>{' '}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Section">
          <h1 className="sectionHeader">Assignments</h1>
          {profile.experiences.map((assignment, i) => (
            <div className="generalCard paddingLeft" key={i}>
              <div className="historyCardHeader">
                <h2 className="historyPlace">{assignment.name}</h2>
                <p className="historyPeriod">
                  {(() => {
                    return services.setDateView(assignment.period);
                  })()}
                </p>
              </div>
              <div className="historyContent">
                <p className="historyHeading inline">
                  {assignment.roles.map((x, i) => x.name)},{' '}
                </p>
                <p className="historyCity">{assignment.place}</p>
                <p className="historySummary">{assignment.content}</p>

                {/* SKILLS */}
                {assignment.skills.map((x, i) => (
                  <div className="Tags" key={i}>
                    <Badge pill bg="warning" text="dark" key={i}>
                      {x.name}
                    </Badge>{' '}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="Section">
          <h1 className="sectionHeader">Educations</h1>
          {profile.educations.map((education, i) => (
            <div className="generalCard paddingLeft">
              <div className="historyCardHeader">
                <h2 className="historyPlace">{education.name}</h2>
                <p className="historyPeriod">
                  {(() => {
                    return services.setDateView(education.period);
                  })()}
                </p>
              </div>
              <div className="historyContent">
                <p className="historyHeading inline">
                  {education.course} {education.program},{' '}
                </p>
                <p className="historyCity">{education.place}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintView;
