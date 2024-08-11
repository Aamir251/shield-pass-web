export const getFieldsThatHaveChanged = <T extends object>(
  objectOne: T,
  objectTwo: T
): (keyof T)[] => {
  let changedFields: (keyof T)[] = [];

  (Object.keys(objectOne) as (keyof T)[]).forEach((key) => {
    if (objectOne[key] !== objectTwo[key]) {
      changedFields.push(key);
    }
  });

  return changedFields;
};

export const extractProperties = <T extends object, K extends keyof T>(
  obj: T,
  keysArray: K[]
): Partial<T> => {
  return keysArray.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
};

export const haveSameStringElements = <T extends string[]>(
  arrOne: T,
  arrTwo: T
) => {
  function sortedStringify(arr: T): string {
    return arr.slice().sort().join(",");
  }

  return sortedStringify(arrOne) === sortedStringify(arrTwo);
};
