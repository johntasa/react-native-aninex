export const formatText = (text) => {
  if (!text) return "";
  
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const formatDate = ({ year, month, day }) => {
  if (!year) return "N/A";
  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const monthName = months[month - 1];
  
  if (!day) {
    return `${monthName}, ${year}`;
  }
  
  return `${monthName} ${day}, ${year}`;
};