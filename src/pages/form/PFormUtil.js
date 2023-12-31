export const getCurrentDate = () => {
  const createdDate = new Date();
  const createdDateString =
    createdDate.getFullYear() +
    "-" +
    createdDate.getMonth() +
    "-" +
    createdDate.getDate() +
    " " +
    ("0" + createdDate.getHours()).slice(-2) +
    ":" +
    ("0" + createdDate.getMinutes()).slice(-2) +
    ":" +
    ("0" + createdDate.getSeconds()).slice(-2);

  return createdDateString;
};
