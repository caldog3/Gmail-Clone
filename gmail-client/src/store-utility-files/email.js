import moment from 'moment';
import base64js from 'base64-js';

const Base64Decode = (str, encoding = "utf-8") => {
    var bytes = base64js.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
  }
  
  const getTimeFormat = (internalDate) => {
      let unix = moment.unix(internalDate / 1000);
      let currentUnix = moment().unix();
      currentUnix = moment.unix(currentUnix);
      let time;
      if (currentUnix.format("MMM D") === unix.format("MMM D")) {
          time = unix.format("h:mm a");
      }
      else if (currentUnix.format("YYYY") === unix.format("YYYY")) {
          time = unix.format("MMM D");
      }
      else {
          time = unix.format("DD/MM/YY");
      }
      let unixTime = internalDate / 1000;
  
      return {time, unixTime};
  }
  
  const getBody = (payload) => {
      let body;
      if (payload.parts === undefined) {
          body = Base64Decode(payload.body.data);
      }
      else {
          let htmlPart = payload.parts[1];
          if (htmlPart !== undefined) {
              let htmlBodyData = htmlPart.body.data;
              if (htmlBodyData !== undefined) {
                  body = Base64Decode(htmlBodyData);
              }
          }
      }
      return body;
  }
  
  const resolveLabels = (tempLabelIds) => {
      let labelIds = tempLabelIds;
  
      if (labelIds.includes("INBOX") && !labelIds.includes("CATEGORY_SOCIAL") && !labelIds.includes("CATEGORY_PROMOTIONS")) {
          labelIds.push("CATEGORY_PRIMARY");
      }
  
      let unread = true;
      if (labelIds.includes("UNREAD")) {
          unread = false;
      }
      return {labelIds, unread};
  }
  
  const getEmailInfo = (headers) => {
      let from, to, subject;
      for (let i = 0; i < headers.length; i++) {
          if (headers[i].name === "From") {
              let tempFrom = headers[i].value;
              
              from = tempFrom.substr(0, tempFrom.indexOf('<'));
              if (from === "") {
                  from = tempFrom;
              }
          }
          else if (headers[i].name === "Delivered-To") {
              to = headers[i].value;
          }
          else if (headers[i].name === "Subject") {
              subject = headers[i].value;
          }
      }
      return {from, to, subject};
  }

  export {
    Base64Decode,
    getTimeFormat,
    getBody, 
    resolveLabels, 
    getEmailInfo
  };