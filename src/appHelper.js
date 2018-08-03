export const formatDate = (date) => {
  const monthNamesEng = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${monthNamesEng[monthIndex]}, ${year}`;
};

export const formatCommentAmount = amount => (amount < 10 ? `0${amount}` : amount);
