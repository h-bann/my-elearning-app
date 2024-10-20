export const storeMultipleInLocal = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const storeArrayInLocal = (dataArray) => {
  localStorage.setItem("basketItems", JSON.stringify(dataArray));
};

export const storeSingleInLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocal = (key) => {
  return localStorage.getItem(key);
};

export const retrieveJSONFromLocal = (key) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

export const clearLocal = () => {
  localStorage.clear();
};
