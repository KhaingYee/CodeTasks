export const FormatDate = (date) => {
  return date
    ? `${date.toLocaleString("en-US", {
        month: "short",
      })} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      )}`
    : "";
};
