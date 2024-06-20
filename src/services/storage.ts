import { Conversion } from "../types";

export const getConversions = (): Conversion[] => {
  const conversions = localStorage.getItem("conversions");
  return conversions ? JSON.parse(conversions) : [];
};

export const saveConversion = (newConversion: Conversion): void => {
  const conversions = getConversions();
  conversions.push(newConversion);
  localStorage.setItem("conversions", JSON.stringify(conversions));
};
