import moment from 'moment';
import base64js from 'base64-js';

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
    time = unix.format("MM/DD/YY");
  }
  let unixTime = internalDate / 1000;

  return {
    time,
    unixTime
  };
}

const getTextBody = (payload) => {
  const bodyData = payload.body.data;
  const body = Base64Decode(bodyData);

  return body;
}

const getMultipartAlternativeBody = (payload) => {
  const bodyData = payload.parts[1].body.data;
  let body;

  if (bodyData !== undefined) {
    body = Base64Decode(bodyData);
  } else {
    let partsArray = payload.parts;

    for (let part of partsArray) {
      if (part.mimeType === 'multipart/related') {
        body = getMultipartRelatedBody(part);
      } else if (part.mimeType.includes('text')) {
        body = getTextBody(part);
      }
    }
    return body;
  }

  return { body };
}

const getMultipartRelatedBody = (payload) => {
  const bodyData = payload.body.data;
  let body;

  if (bodyData !== undefined) {
    body = Base64Decode(bodyData);
  } else {
    let partsArray = payload.parts;

    for (let part of partsArray) {
      if (part.mimeType === 'multipart/alternative') {
        body = getMultipartAlternativeBody(part);
      } else if (part.mimeType.includes('text')) {
        body = getTextBody(part);
      }
    }
    return body;
  }

  return { body };
}

const getMultipartMixedData = (payload) => {
  let bodyAndAttachmentsArray = payload.parts;
  let attachmentIds = [];
  let body;
  
  for (let part of bodyAndAttachmentsArray) {
    if (part.mimeType === 'multipart/alternative') {
      body = getMultipartAlternativeBody(part);
    } else if (part.mimeType === 'multipart/related') {
      body = getMultipartRelatedBody(part);
    } else if (part.mimeType.includes('image') || part.mimeType.includes('application')) {
      attachmentIds.push({
        mimeType: part.mimeType,
        attachmentId: part.body.attachmentId,
      });
    }
  }
  
  if(body !== undefined){
    if (body.body !== undefined) {
      body = body.body;
    }
  }

  return {
    body,
    attachmentIds
  };
}

const getBody = (payload) => {
  let bodyData;
  let attachmentIds = [];

  if (payload.mimeType === 'multipart/alternative'){
    bodyData = getMultipartAlternativeBody(payload);
  } else if (payload.mimeType === 'multipart/mixed') {
    bodyData = getMultipartMixedData(payload);
  } else if (payload.mimeType === 'multipart/related') {
    bodyData = getMultipartRelatedBody(payload);
  } else if (payload.mimeType.includes('text')) {
    bodyData = {
      body: getTextBody(payload),
      attachmentIds
    }
  }

  return bodyData;
}

const resolveLabels = (tempLabelIds) => {
  let labelIds = tempLabelIds;
  
  let unread = true;
  let starred = false;
  if (labelIds.includes("UNREAD")) {
    unread = false;
  }
  if (labelIds.includes("STARRED")) {
    starred = true;
  }
  return {
    labelIds,
    unread,
    starred,
  };
}

const getMessage = (parsedMessage, bodyAndAttachments, payload) => {
  const { from, to, conciseTo, cc, subject, detailedFrom } = getEmailInfo(payload.result.payload.headers);
  const { time, unixTime } = getTimeFormat(payload.result.internalDate);
  const { unread, starred } = resolveLabels(payload.result.labelIds);
  const snippet = payload.result.snippet;
  const messageId = payload.result.id;
  let attachmentIds = [];
  let body;

  if (parsedMessage !== undefined && bodyAndAttachments === undefined) {
    body = parsedMessage.message;
    const parsedAttachments = parsedMessage.attachments;
    
    for (let attachment of parsedAttachments) {
      attachmentIds.push({
        mimeType: attachment.mimetype,
        attachmentId: attachment.id,
      });
    }
  } else {
    body = bodyAndAttachments.body;
    attachmentIds = bodyAndAttachments.attachmentIds;
  }
  
  const message = {
    threadId: payload.threadId,
    labelId: payload.labelId,
    messageId,
    from,
    detailedFrom,
    to,
    conciseTo,
    cc,
    subject,
    snippet,
    body,
    unixTime,
    time,
    unread,
    starred,
    attachmentIds
  };

  return message;
}

const getEmailInfo = (headers) => {
  let from, to, conciseTo, cc = null, subject, detailedFrom;
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
      // SO I"M NOT ALLOWED TO ACCESS THE STORE FROM THIS FILE? LAME!
      // if (from === this.$store.state.currentUserProfile.U3) {
      //   from = "me";
      // }
      if (from.charAt(0) == "\"" || from.charAt(0) == "<") {

        from = from.substring(1, from.length - 1);
      }
      if(from.includes("@")) {
        from = from.substring(0, from.search("@"));
      }
      
      if(from.length >= 20) {
        from = from.substring(0, 19) + ".";
      }
    } else if (headers[i].name === "Delivered-To" || headers[i].name === "To") {
      // console.log(headers[i].value);
      // console.log("SPACE");
      // console.log(headers);
      to = headers[i].value;
      conciseTo = to;
      // Need to break up the to for each comma and shorten each of the senders before piecing back together
      if(conciseTo.length > 20) {
        // console.log(conciseTo);
      }
      if(conciseTo.includes("@")) {
        conciseTo = conciseTo.substring(0, conciseTo.search("@"));
      }
      if(conciseTo.includes(" ")) {
        conciseTo = conciseTo.substring(0, conciseTo.search(" "));
      }
      if(conciseTo.length >= 16) {
        conciseTo = conciseTo.substring(0, 15) + ".";
      }
      // console.log("conciseTo is this:"+ conciseTo)
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
    conciseTo,
    cc,
    subject,
    detailedFrom
  };
}

export {
  getTimeFormat,
  getBody,
  getMessage,
  Base64Encode
};