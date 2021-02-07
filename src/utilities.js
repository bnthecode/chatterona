import $ from "jquery";

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

// var buffer = 20; //scroll bar buffer
// var iframe = document.getElementById("ifm");

// function pageY(elem) {
//   return elem.offsetParent
//     ? elem.offsetTop + pageY(elem.offsetParent)
//     : elem.offsetTop;
// }

// function resizeIframe() {
//   var height = document.documentElement.clientHeight;
//   height -= pageY(document.getElementById("ifm")) + buffer;
//   height = height < 0 ? 0 : height;
//   document.getElementById("ifm").style.height = height + "px";
// }

// // .onload doesn't work with IE8 and older.
// if (iframe) {
//     console.log('found')
//   if (iframe.attachEvent) {
//     iframe.attachEvent("onload", resizeIframe);
//   } else {
//     iframe.onload = resizeIframe;
//   }
// }

// window.onresize = resizeIframe;


export const validateUrl = (textToCheck) => {
    var expression = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
var regex = new RegExp(expression);
var match = ''; var splitText = []; var startIndex = 0;
while ((match = regex.exec(textToCheck)) != null) {
        
   splitText.push({text: textToCheck.substr(startIndex, (match.index - startIndex)), type: 'text'});
               
   var cleanedLink = textToCheck.substr(match.index, (match[0].length));
   cleanedLink = cleanedLink.replace(/^https?:\/\//,'');
   splitText.push({text: cleanedLink, type: 'link'});
                
   startIndex = match.index + (match[0].length);               
}
if (startIndex < textToCheck.length) splitText.push({text: textToCheck.substr(startIndex), type: 'text'});
return splitText;
}





