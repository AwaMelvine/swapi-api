export const getParamValueFromUrl = (url: string, param: string) => {
const urlObj = new URL(url);
const c = urlObj.searchParams.get(param);
return c;
};