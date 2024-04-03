const time24Totime12Map = new Map();
const formatDateMap = new Map();

export const convertTo12HourFormat = (time24) => {
  if (time24Totime12Map.has(time24)) {
    return time24Totime12Map.get(time24);
  }
  // Split the time into hours, minutes, and seconds
  let [hours, minutes] = time24.split(":").map(Number);

  // Adjust hours for 12-hour format
  let meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  hours = hours === 0 ? 12 : hours;

  // Construct the 12-hour format time string
  let time12 = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${meridiem}`;
  time24Totime12Map.set(time24, time12);
  return time12;
};

export const formatDate = (inputDate) => {
  if (formatDateMap.has(inputDate)) {
    return formatDateMap.get(inputDate);
  }
  // Parse the input date string
  const dateParts = inputDate.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const day = parseInt(dateParts[2]);

  // Create a Date object
  const date = new Date(year, month - 1, day); // month is zero-based in Date constructor

  // Create an array of month names
  const months = [
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

  // Format the date
  const formattedDate = `${day} ${months[date.getMonth()]}, ${year}`;
  formatDateMap.set(inputDate, formattedDate);
  return formattedDate;
};

export const compareTime = (time1, time2) => {
  // Split the time strings into hours, minutes, and seconds
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  // Compare the hours
  if (hours1 < hours2) {
    return -1;
  } else if (hours1 > hours2) {
    return 1;
  } else {
    // If hours are equal, compare the minutes
    if (minutes1 < minutes2) {
      return -1;
    } else if (minutes1 > minutes2) {
      return 1;
    } else {
      // If minutes are equal, compare the seconds
      if (seconds1 < seconds2) {
        return -1;
      } else if (seconds1 > seconds2) {
        return 1;
      } else {
        return 0; // Both times are equal
      }
    }
  }
};
