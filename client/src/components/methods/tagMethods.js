export const populateTagsArray = (tags, tagsArray) => {
  for (var i = 0; i < tags.length; i++) {
    tagsArray.push({
      id: tags[i].id,
      name: tags[i].name,
    });
  }
  return tagsArray;
};

export const filterTagArray = (tagsToFilterOut, tagsArray) => {
  let filteredArray = [];
  for (let i = 0; i < tagsArray.length; i++) {
    let count = 0;
    tagsToFilterOut.forEach((t) => {
      if (tagsArray[i].name === t.name) {
        count = count + 1;
        return;
      }
    });
    if (count === 0) {
      filteredArray.push(tagsArray[i]);
    }
  }
  return filteredArray;
};

export const populateProfileTagArrays = (profile, history) => {
  if (history.skills) {
    profile = populateArray(profile, profile.skills, history.skills);
  }
  if (history.roles) {
    profile = populateArray(profile, profile.roles, history.roles);
  }
  return profile;
};

export const deleteTagFromProfile = (profile, selectedTag, type) => {
  for (let i = 0; i < profile.experiences.length; i++) {
    if (type === 'Skills') {
      for (let j = 0; j < profile.experiences[i].skills.length; j++) {
        if (profile.experiences[i].skills[j].name === selectedTag.name) {
          profile.experiences[i].skills.splice(j, 1);
          break;
        }
      }
    }
    if (type === 'Roles') {
      for (let j = 0; j < profile.experiences[i].roles.length; j++) {
        if (profile.experiences[i].roles[j].name === selectedTag.name) {
          profile.experiences[i].roles.splice(j, 1);
          break;
        }
      }
    }
  }
  // delete from Profile List
  if (type === 'Skills') {
    const index = profile.skills.findIndex((x) => x.id === selectedTag.id);
    profile.skills.splice(index, 1);
  }
  if (type === 'Roles') {
    const index = profile.roles.findIndex((x) => x.id === selectedTag.id);
    profile.roles.splice(index, 1);
  }
  return profile;
};

const populateArray = (profile, profileTags, historyTags) => {
  const tagsToAdd = [];
  profileTags.forEach((s) => tagsToAdd.push(s.name));
  historyTags.forEach((s) => {
    if (!tagsToAdd.includes(s.name)) {
      profileTags.push(s);
    }
  });
  return profile;
};
