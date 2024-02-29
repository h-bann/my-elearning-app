export const storeInLocal = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const getFromLocal = (key) => {
  return localStorage.getItem(key);
};
