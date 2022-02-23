import * as dateServices from "./dateMethods.js";
import * as serverServices from "./serverMethods";
import * as tagServices from "./tagMethods";
import * as historyServices from "./historyMethods";
import * as filterServices from "./filterMethods";

// Date Method Calls
export const setPeriodProps = (objectToParse) => {
  objectToParse.period = dateServices.setPeriodProps(objectToParse.period);
  return objectToParse;
};

export const setDateView = (period) => {
  return dateServices.setDateView(period);
};

// TAG method Calls
export const fetchTags = (url, options) => {
  return serverServices.useFetch(url, options);
};

export const postTag = (url, data) => {
  return serverServices.usePostOrPut(url, data, "POST");
};

export const putTag = (url, data) => {
  return serverServices.usePostOrPut(url, data, "PUT");
};

export const deleteTag = (url) => {
  return serverServices.useDelete(url);
};

export const populateSkillsArray = (skills, skillsArray) => {
  return tagServices.populateTagsArray(skills, skillsArray);
};

export const populateRolesArray = (roles, rolesArray) => {
  return tagServices.populateTagsArray(roles, rolesArray);
};

export const filterTagArray = (tagsToFilterOut, tagsArray) => {
  return tagServices.filterTagArray(tagsToFilterOut, tagsArray);
};

export const deleteTagFromProfile = (profile, selectedTag, type) => {
  return tagServices.deleteTagFromProfile(profile, selectedTag, type);
};
// Profile Method Calls

export const fetchProfiles = (url, options) => {
  return serverServices.useFetch(url, options);
};

export const fetchImageById = (url) => {
  return serverServices.useFetchImage(url);
};

// History Methods
export const setEducationProps = (e, property, newEducation) => {
  return historyServices.setHistoryProps(e, property, newEducation);
};

export const setExperienceProps = (e, property, newExperience) => {
  return historyServices.setHistoryProps(e, property, newExperience);
};

export const addNewEducationToProfile = (profile, newEducation) => {
  return historyServices.addNewHistoryToProfile(
    profile,
    newEducation,
    "education"
  );
};

export const addNewExperienceToProfile = (profile, newExperience) => {
  return historyServices.addNewHistoryToProfile(
    profile,
    newExperience,
    "experience"
  );
};

export const updateEducationToProfile = (
  profile,
  oldEducation,
  newEducation
) => {
  return historyServices.updateHistoryToProfile(
    profile,
    oldEducation,
    newEducation,
    "education"
  );
};

export const updateAssignmentToProfile = (
  profile,
  oldExperience,
  newExperience
) => {
  return historyServices.updateHistoryToProfile(
    profile,
    oldExperience,
    newExperience,
    "experience"
  );
};

// Filter Methods
export const filterSkills = (profile, type, filterQuery) => {
  return filterServices.filterProfile(profile, type, filterQuery);
};
export const filterRoles = (profile, type, filterQuery) => {
  return filterServices.filterProfile(profile, type, filterQuery);
};
export const filterName = (profile, type, filterQuery) => {
  return filterServices.filterProfile(profile, type, filterQuery);
};
export const filterAssignment = (profile, type, filterQuery) => {
  return filterServices.filterProfile(profile, type, filterQuery);
};

// Auth Methods
export const fetchToken = (instance, accounts) => {
  return serverServices.FetchToken(instance, accounts);
};