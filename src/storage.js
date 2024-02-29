export const storeInLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocal = (key) => {
  localStorage.getItem(key);
};
