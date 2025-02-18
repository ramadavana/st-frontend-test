export const FormatDate = (date: string) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date(date);
  const month = monthNames[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${month} ${day}, ${year}`;
};
