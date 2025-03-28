/* eslint-disable @typescript-eslint/no-explicit-any */

export const getLocalStorage = (key: string): any => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
  return null;
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const updateLocalStorage = (key: string, newValue: any) => {
  const existingData = getLocalStorage(key);
  const updatedData = existingData ? [...existingData, newValue] : [newValue];
  setLocalStorage(key, updatedData);
};
