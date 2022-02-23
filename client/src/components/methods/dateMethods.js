// Date time for period
const bufferDays = 5;
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
// Build Period Object after new Post create months and years with a day buffer of experience
// Ex 27 days ===  1 month
export const setPeriodProps = (period) => {
  let newTotalYears =
    new Date(period.endDate).getFullYear() -
    new Date(period.startDate).getFullYear();
  let newTotalMonths =
    new Date(period.endDate).getMonth() - new Date(period.startDate).getMonth();
  let newTotalDays =
    new Date(period.endDate).getDate() - new Date(period.startDate).getDate();
  if (newTotalDays < 0 && Math.abs(newTotalDays) < bufferDays) {
    newTotalDays += daysPerMonth(new Date(period.endDate));
    newTotalMonths -= 1;
  }
  if (newTotalMonths < 0 && newTotalYears > 0) {
    if (newTotalYears > 0) {
      newTotalYears -= 1;
    }
    newTotalMonths += 12;
  }
  period.totalMonths = newTotalMonths;
  period.totalYears = newTotalYears;
  return period;
};

// Date View Set for Profiles Experience Views
export const setDateView = (period) => {
  if (period.startDate && period.endDate) {
    const startDateParsed = new Date(period.startDate);
    const endDateParsed = new Date(period.endDate);
    const startDate =
      month[startDateParsed.getMonth()] + " " + startDateParsed.getFullYear();
    const endDate =
      month[endDateParsed.getMonth()] + " " + endDateParsed.getFullYear();
    return startDate + " - " + endDate;
  } else {
    return null;
  }
};

const daysPerMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};
