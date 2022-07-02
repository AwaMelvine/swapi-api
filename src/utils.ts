export const getParamValueFromUrl = (url: string, param: string) => {
const urlObj = new URL(url);
const value = urlObj.searchParams.get(param);
return value;
};