import * as dateServices from "./dateMethods";
import * as methodServices from "./index";
import * as tagServices from "./tagMethods";

// Configure properties on history objects
export const setHistoryProps = (data, property, historyObject) => {
  if (property === "period") {
    historyObject[property][data.target.id] = data.target.value;
  } else if (property === "skills" || property === "roles") {
    historyObject[property].push({
      id: data[data.length - 1].id,
      name: data[data.length - 1].name,
    });
  } else {
    historyObject[data.target.id] = data.target.value;
  }
  return historyObject;
};

// Edit Education/ Assignment
export const updateHistoryToProfile = (
  profile,
  oldHistory,
  newHistory,
  type
) => {
  newHistory.id = oldHistory.id;
  newHistory.modifiedDate = new Date();
  if (newHistory.name === "") {
    newHistory.name = oldHistory.name;
  }
  if (newHistory.place === "") {
    newHistory.place = oldHistory.place;
  }
  if (
    (newHistory.period.startDate !== oldHistory.period.startDate &&
      newHistory.period.startDate !== "") ||
    (newHistory.period.endDate !== oldHistory.period.endDate &&
      newHistory.period.endDate !== "")
  ) {
    if (newHistory.period.startDate === "") {
      newHistory.period.startDate =
        oldHistory.period.startDate.split("T00:00:00.000Z")[0];
    }
    if (newHistory.period.endDate === "") {
      newHistory.period.endDate =
        oldHistory.period.endDate.split("T00:00:00.000Z")[0];
    }
    newHistory.period = dateServices.setPeriodProps(newHistory.period);
  }
  if (newHistory.period.endDate === "" && newHistory.period.startDate === "") {
    newHistory.period = oldHistory.period;
  }
  if (type === "experience") {
    const historyIndex = Number(
      profile.experiences?.findIndex((x) => x.id === newHistory.id)
    );
    if (newHistory.content === "") {
      newHistory.content = oldHistory.content;
    }
    if (newHistory.place === "") {
      newHistory.place = oldHistory.place;
    }
    const removedSkills = [];
    oldHistory.skills.forEach((oldSkill) => {
      let count = 0;
      newHistory.skills.forEach((newSkill) => {
        if (oldSkill.name === newSkill.name) {
          count = count + 1;
        }
      });
      if (count === 0) {
        removedSkills.push(oldSkill);
      }
    });
    const removedRoles = [];
    oldHistory.roles.forEach((oldRole) => {
      let count = 0;
      newHistory.roles.forEach((newRole) => {
        if (oldRole.name === newRole.name) {
          count = count + 1;
        }
      });
      if (count === 0) {
        removedRoles.push(oldRole);
      }
    });
    removedSkills.forEach((removedSkill) => {
      let count = 0;
      profile.experiences?.forEach((profileHistory) => {
        profileHistory.skills?.forEach((profileSkill) => {
          if (removedSkill.name === profileSkill.name) {
            count = count + 1;
          }
        });
      });
      if (count === 1) {
        profile.skills?.splice(
          profile.skills?.findIndex((x) => x.name === removedSkill.name),
          1
        );
      }
    });

    removedRoles.forEach((removedRole) => {
      let count = 0;
      profile.experiences?.forEach((profileHistory) => {
        profileHistory.roles?.forEach((profileRole) => {
          if (removedRole.name === profileRole.name) {
            count = count + 1;
          }
        });
      });
      if (count === 1) {
        profile.roles?.splice(
          profile.roles?.findIndex((x) => x.name === removedRole.name),
          1
        );
      }
    });
    profile = tagServices.populateProfileTagArrays(profile, newHistory);
    profile.experiences?.splice(historyIndex, 1, newHistory);
  }
  if (type === "education") {
    const historyIndex = Number(
      profile.educations?.findIndex((x) => x.id === newHistory.id)
    );
    if (newHistory.course === "") {
      newHistory.course = oldHistory.course;
    }
    if (newHistory.program === "") {
      newHistory.program = oldHistory.program;
    }
    profile.educations?.splice(historyIndex, 1, newHistory);
  }
  profile.modifiedDate = new Date();
  return profile;
};

export const addNewHistoryToProfile = (profile, history, type) => {
  if (!profile.educations && type === "education") {
    profile.educations = [];
    history.id = 1;
  }
  if (!profile.experiences && type === "experience") {
    profile.experiences = [];
    history.id = 1;
  }
  if (!profile.skills) {
    profile.skills = [];
  }
  if (!profile.roles) {
    profile.roles = [];
  }
  history.modifiedDate = new Date();
  if (type === "experience") {
    if (!history.id) {
      history.id = generateHistoryId(profile.experiences);
    }
    profile = tagServices.populateProfileTagArrays(profile, history);
    profile.experiences?.push(methodServices.setPeriodProps(history));
  }
  if (type === "education") {
    if (!history.id) {
      history.id = generateHistoryId(profile.educations);
    }
    profile.educations?.push(methodServices.setPeriodProps(history));
  }
  return profile;
};

const generateHistoryId = (profileHistories) => {
  const historyIds = [];
  profileHistories.forEach((h) => {
    historyIds.push(h.id);
  });
  for (var i = 1; i <= profileHistories.length + 1; i++) {
    if (!historyIds.includes(i)) {
      return i;
    }
  }
  return i + 1;
};
