export function timeAgo(dateString: string) {
  const currentDate = new Date();
  const providedDate = new Date(dateString);

  // Calculate time difference in milliseconds
  const timeDiff = currentDate.getTime() - providedDate.getTime();

  // Convert time difference to years, weeks, months, days, hours, and minutes
  const diffInYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const diffInWeeks = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
  const diffInMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(timeDiff / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(timeDiff / (1000 * 60));

  // Format time difference as a string
  let formattedDiff = "";
  if (diffInYears > 0) {
    formattedDiff += `${diffInYears} year${diffInYears > 1 ? "s" : ""}, `;
  } else if (diffInWeeks > 0) {
    formattedDiff += `${diffInWeeks} week${diffInWeeks > 1 ? "s" : ""}, `;
  } else if (diffInMonths > 0) {
    formattedDiff += `${diffInMonths} month${diffInMonths > 1 ? "s" : ""}, `;
  } else if (diffInDays > 0) {
    formattedDiff += `${diffInDays} day${diffInDays > 1 ? "s" : ""}, `;
  } else if (diffInHours > 0) {
    formattedDiff += `${diffInHours} hour${diffInHours > 1 ? "s" : ""}, `;
  } else if (diffInMinutes > 0) {
    formattedDiff += `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""}`;
  } else {
    formattedDiff = "just now";
  }

  return formattedDiff;
}
