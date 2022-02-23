// Filter methods on search bars
export const filterProfile = (profile, type, filterQuery) => {
  switch (type) {
    case "skill":
      return filter(profile, filterQuery, profile.skills);
    case "role":
      return filter(profile, filterQuery, profile.roles);
    case "name":
      return filter(
        profile,
        filterQuery,
        profile.firstName.concat(profile.lastName)
      );
    case "assignment":
      return filter(profile, filterQuery, profile.experiences);
    default:
      break;
  }
};

const filter = (profile, filterQuery, searchArea) => {
  if (
    JSON.stringify(searchArea).toLowerCase().includes(filterQuery.toLowerCase())
  ) {
    return profile;
  }
};
