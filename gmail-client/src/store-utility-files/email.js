import moment from 'moment';
import base64js from 'base64-js';

const getAuthHeader = () => {
  return { 
    headers: { 
      Authorization: `Bearer ${localStorage.getItem("token")}` 
    }
  };
}

const Base64Decode = (str, encoding = "utf-8") => {
    let bytes = base64js.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
}

const Base64Encode = (str, encoding = 'utf-8') => {
  let bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);        
  return base64js.fromByteArray(bytes);
}
  
const getTimeFormat = (internalDate) => {
  let unix = moment.unix(internalDate / 1000);
  let currentUnix = moment().unix();
  currentUnix = moment.unix(currentUnix);
  let time;
  if (currentUnix.format("MMM D") === unix.format("MMM D")) {
    time = unix.format("h:mm a");
  } else if (currentUnix.format("YYYY") === unix.format("YYYY")) {
    time = unix.format("MMM D");
  } else {
    time = unix.format("DD/MM/YY");
  }
  let unixTime = internalDate / 1000;

  return {
    time,
    unixTime
  };
}

const getBody = (payload) => {
  let body;
  let attachmentIds = [];  

  if (payload.parts === undefined) {
    body = Base64Decode(payload.body.data);
  } else {
    let htmlPart = payload.parts[1];
    if (htmlPart !== undefined) {
      let htmlBodyData = htmlPart.body.data;
      if (htmlBodyData !== undefined) {
        body = Base64Decode(htmlBodyData);
      } else {
        if (payload.parts[0].body.data !== undefined){
          body = Base64Decode(payload.parts[0].body.data);
        }
        else if (payload.parts[0].parts[1].body.data !== undefined){
          let multipartMixedAlternativeBody = payload.parts[0].parts[1].body.data;
          body = Base64Decode(multipartMixedAlternativeBody);

          let bodyAndAttachmentArray = payload.parts;
          for (let part of bodyAndAttachmentArray) {
            if (part.mimeType.includes('image')) {
              attachmentIds.push(part.body.attachmentId);
            }
          }
        }
        else{
          let multipartMixedAlternativeBodyEdge = payload.parts[0].parts[0].parts[1].body.data;
          if (multipartMixedAlternativeBodyEdge !== undefined) {
            body = Base64Decode(multipartMixedAlternativeBodyEdge);
            let bodyAndAttachmentObject = payload.parts;
            for (let part of bodyAndAttachmentObject) {
            //  console.log(part);
              if (part.mimeType.includes('application')) {
                attachmentIds.push(part.body.attachmentId);
                console.log(part.body);
              }
              else if (part.mimeType.includes('image')) {
                attachmentIds.push(part.body.attachmentId);
                console.log(part.body);
              }
            }
          }
          //console.log(payload.parts[0].parts[0].parts[1].body.data);
          //console.log(payload.parts[0].parts[1].body.attachmentId) // chipmunk
        }
      }
    } else {
      let multipartAlternativeBody = payload.parts[0].body.data;
      if (multipartAlternativeBody !== undefined) {
        body = Base64Decode(multipartAlternativeBody);
      } else {
        let multipartMixedRelatedBody = payload.parts[0].parts[0].body.data;
        if (multipartMixedRelatedBody !== undefined) {
          body = Base64Decode(multipartMixedRelatedBody);
        } else {
          let multipartMixedRelatedAlternativeBody = payload.parts[0].parts[0].parts[1].body.data;
          if (multipartMixedRelatedAlternativeBody !== undefined) {
            body = Base64Decode(multipartMixedRelatedAlternativeBody);
          }
        }
      }
    }
  }
  return {
    body,
    attachmentIds
  };
}

const resolveLabels = (tempLabelIds) => {
  let labelIds = tempLabelIds;
  // console.log('the resolvelabel ids:' + labelIds);
  // if (labelIds.includes("INBOX") && !labelIds.includes("CATEGORY_SOCIAL") && !labelIds.includes("CATEGORY_PROMOTIONS")) {
  //   labelIds.push("CATEGORY_PRIMARY");
  // }

  let unread = true;
  if (labelIds.includes("UNREAD")) {
    unread = false;
  }
  return {
    labelIds,
    unread
  };
}

const getEmailInfo = (headers) => {
  let from, to, cc = null, subject, detailedFrom;
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].name === "From") {
      detailedFrom = headers[i].value;
      // console.log(detailedFrom);
      // console.log("Emergency headers");
      // console.log(headers);

      from = detailedFrom.substr(0, detailedFrom.indexOf('<') - 1);
      if (from === "") {
        from = detailedFrom;
      }
      if (from.charAt(0) == "\"" || from.charAt(0) == "<") {

        from = from.substring(1, from.length - 1);
      }
    } else if (headers[i].name === "Delivered-To" || headers[i].name === "To") {
      // console.log(headers[i].value);
      // console.log("SPACE");
      // console.log(headers);

      to = headers[i].value;
    } else if (headers[i].name === "Subject") {
      subject = headers[i].value;
      // console.log(subject);
    } else if (headers[i].name === "Cc") {
      cc = headers[i].value;
    }

  }
  return {
    from,
    to,
    cc,
    subject,
    detailedFrom
  };
}

export {
  getAuthHeader,
  getTimeFormat,
  getBody,
  resolveLabels,
  getEmailInfo,
  Base64Encode
};