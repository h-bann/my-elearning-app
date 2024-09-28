export const storeMultipleInLocal = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

export const storeManyInLocal = (data) => {
  console.log([data]);
  if (!localStorage.basket) {
    localStorage.setItem("basket", [data]);
  }
  // localStorage.setItem("basket", data);

  // Object.entries(data).forEach(([key, value]) => {
  //   key = value.id;
  //   console.log(key);
  //   localStorage.setItem(key, value);
  // });
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
