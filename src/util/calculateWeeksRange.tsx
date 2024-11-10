export const calculateWeeksRange = (
  datesArray: {
    date: string;
    name: string;
    data: string;
    height: number;
    day: string;
  }[]
) => {
  if (Array.isArray(datesArray) && datesArray.length > 0) {
    try {
      const dates = datesArray.map((dateObj) => new Date(dateObj.date));

      const validDates = dates.filter((date) => !isNaN(date.getTime()));

      if (validDates.length > 0) {
        const firstDate = validDates[0];
        const lastDate = validDates[validDates.length - 1];

        const timeDiff = lastDate.getTime() - firstDate.getTime();
        const diffWeeks = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));

        const minWeeks = 1;
        const maxWeeks = Math.max(minWeeks, diffWeeks);
        return `${minWeeks}-${maxWeeks} weeks`;
      }
    } catch (error) {
      console.error("Error calculating weeks range:", error);
    }
  }
  return "No valid dates";
};
