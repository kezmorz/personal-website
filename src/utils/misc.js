export const parseJSON = (value) => {
  return value === "undefined" ? undefined : JSON.parse(value ?? "");
};

export const pick = (object, keys) => {
  return Object.keys(object)
    .filter((key) => keys.includes(key))
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};
