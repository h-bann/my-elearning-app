export const storeMultipleInLocal = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const storeSingleInLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocal = (key) => {
  return localStorage.getItem(key);
};

export const clearLocal = () => {
  localStorage.clear();
};
