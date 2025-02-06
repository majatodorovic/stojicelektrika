/* eslint-disable no-plusplus */
/* eslint-disable no-unreachable-loop */
export const isValidEmail = (value) => {
  const currentEmails = value.split(",").filter((e) => e && e.trim());
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i;
  for (let i = 0; i < currentEmails.length; i++) {
    if (!regex.test(currentEmails[i].replace(/\s/g, ""))) {
      return false;
    }
    return true;
  }
};

export const validEmailLength = (value) => {
  const currentEmails = value.split(",").filter((e) => e && e.trim());
  if (currentEmails.length > 0 && currentEmails[0].length > 10) {
    return true;
  }
};
