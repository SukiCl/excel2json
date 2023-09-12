import FileSaver from "file-saver";

const country = "CN";

const flatJson = (arr) => {
  const res = {};
  arr.forEach((item) => {
    res[item.key] = item[country];
  });

  return res;
};

const formatJson = (obj) => {
  const resultObject = {};

  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split(".");
    let currentObject = resultObject;

    keys.forEach((nestedKey, index) => {
      if (!currentObject[nestedKey]) {
        if (index === keys.length - 1) {
          currentObject[nestedKey] = value;
        } else {
          currentObject[nestedKey] = {};
        }
      }
      currentObject = currentObject[nestedKey];
    });
  });

  return resultObject;
};

export const output2Json = (json) => {
  const result = json;
  const flattenJson = flatJson(result);
  const resultObject = formatJson(flattenJson);

  var content = JSON.stringify(resultObject);
  if (content) {
    var blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(blob, "en.json");
  }
};
