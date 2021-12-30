const parseJSON = (value) => {
  return value === "undefined" ? undefined : JSON.parse(value ?? "");
};

export default parseJSON;
