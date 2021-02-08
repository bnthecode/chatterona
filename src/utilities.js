import axios from "axios";

export const truncateString = (str, num) => {
  return str.length <= num ? str : str.slice(0, num) + "...";
};

export const determineMobile = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

export const validateUrl = (url) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
};


export const checkContentType = (url) => {
 const isUrl = validateUrl(url)
  return { url: isUrl ? url : '', type: isUrl ? 'link' : 'text' };
};


export const checkUrlsContent = async (url) => {

  try { 
  const response = await axios.get(url);
    return response.headers['content-type'] 
  }
  catch {
    return 'link'
  }

 }; 
