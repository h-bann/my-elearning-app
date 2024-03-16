export const formatValidation = (message) => {
  return message.charAt(1).toUpperCase() + message.slice(2).replace(/"/g, "");
};
