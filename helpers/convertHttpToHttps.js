export const convertHttpToHttps = (url) => {
  const isHttp = url?.includes("http:");
  const convertedUrl = isHttp ? url.replace("http", "https") : url;
  return convertedUrl;
};
