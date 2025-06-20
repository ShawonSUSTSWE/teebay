export const getClassNames = (module) => {
  return (...classnames) => {
    let className = "";
    classnames.forEach((classname) => {
      if (!classname || typeof className != "string") {
        return;
      }
      if (!module[classname]) {
        className += ` ${classname}`;
        return;
      }
      className += ` ${module[classname]}`;
    });
    return className;
  };
};

export const formatDateToLocaleString = (date) => {
  date = new Date(date);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const getOrdinal = (n) => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinal(day)} ${month} ${year}`;
};

export const isNull = (obj) => {
  return (
    obj === null || obj === undefined || obj === "null" || obj === "undefined"
  );
};

export const isEmptyString = (str) => {
  return isNull(str) || str.length === 0;
};

export const isEmptyArray = (arr) => {
  return !arr || arr.length === 0;
};

export const punctualizeString = (string = "", separator = "_") => {
  const words = string.split(separator);
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  const capitalizedString = capitalizedWords.join(" ");
  return capitalizedString;
};

export const extractFieldFromObjectArray = (data, fieldName) => {
  return data.map((item) => item[fieldName]);
};

export const isNumeric = (value) => /^\d*\.?\d*$/.test(value);
