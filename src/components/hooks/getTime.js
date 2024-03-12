// to get human readable timestamp
function formatDateWithTime(date) {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1; // Months are zero-based, so we add 1
  const day = formattedDate.getDate();
  const hours = formattedDate.getHours();
  let minutes = formattedDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  // Convert hours from 24-hour format to 12-hour format
  const displayHours = hours % 12 || 12;
  // Ensure minutes are displayed with leading zero if less than 10
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${year}/${month}/${day} , ${displayHours}:${minutes} ${ampm}`;
}

export function timeAgo(timestamp) {
  const currentTime = Date.now();
  const createdAtTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - createdAtTime;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  } else if (hours < 24) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else if (days === 1) {
    return "1 day ago";
  } else {
    // For a timestamp older than 1 day, show the time and date in a specific format
    const formattedDate = formatDateWithTime(timestamp);
    return `${formattedDate}`;
  }
}
