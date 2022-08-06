module.exports = {
  format_date: (date) => {
    let newDate = new DataTransfer(date)
    // Format date as MM/DD/YYYY
    return newDate.toLocaleDateString();
  },
};