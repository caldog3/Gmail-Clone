import moment from 'moment';
import base64js from 'base64-js';
import store from '../store';
import { markAsRead, markAsUnread } from './../store-utility-files/gmail-api-calls';

const Base64Decode = (str, encoding = "utf-8") => {
    let bytes = base64js.toByteArray(str);
    return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
}

//FIXME? -  below code from stack overflow to fix base64 encoding byte string problems
// private function base64url_encode($mime) {
//   return rtrim(strtr(base64_encode($mime), '+/', '-_'), '=');
// }
// const Base64Encode = (str, encoding = 'utf-8') => {
//   let bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str); 
//   let value = base64js.fromByteArray(bytes);
//   return value.replace('+/', '-_').trimRight('=');
// }

//REAL ORIGINAL
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
  const attachmentId = payload.body.attachmentId;
  let body;

  if (bodyData !== undefined) {
    body = Base64Decode(bodyData);
  }
  // Capturing attachment data of mimeType text/plain and text/html.
  // The array, attachmenIds, stores the data, but its data isn't used 
  // anywhere. 
  return {
    body,
    attachmentIds: [{
      mimeType: payload.mimeType,
      filename: payload.filename,
      attachmentId: attachmentId
    }]
  };
}

const getMultipartAlternativeBody = (payload) => {
  // console.log("Payload checking parts[1].body", payload);
  let tempBodyData;
  if (payload.parts[1] == undefined) {
    tempBodyData = payload.parts[0].body.data;
  }
  else {
    tempBodyData = payload.parts[1].body.data;
  }
  const bodyData = tempBodyData;
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
        filename: part.filename
      });
    }
  }
  
  if(body !== undefined) {
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

  if (payload.mimeType === 'multipart/alternative'){
    bodyData = getMultipartAlternativeBody(payload);
  } else if (payload.mimeType === 'multipart/mixed') {
    bodyData = getMultipartMixedData(payload);
  } else if (payload.mimeType === 'multipart/related') {
    bodyData = getMultipartRelatedBody(payload);
  } else if (payload.mimeType.includes('text')) {
    bodyData =  getTextBody(payload);
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
  // console.log("IS THIS THE PAYLOAD: ", payload);
  const { from, to, conciseTo, cc, subject, detailedFrom, allParticipants } = getEmailInfo(payload.result.payload.headers);
  const { time, unixTime } = getTimeFormat(payload.result.internalDate);
  const { unread, starred, labelIds } = resolveLabels(payload.result.labelIds);
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
        filename: attachment.filename
      });
    }
  } else {
    if(bodyAndAttachments !== undefined){
      body = bodyAndAttachments.body;
      attachmentIds = bodyAndAttachments.attachmentIds;
    } else {
      attachmentIds = undefined;
    }
  }
  
  const message = {
    threadId: payload.threadId,
    labelId: payload.result.labelIds,
    messageId,
    from,
    detailedFrom,
    allParticipants,
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
  // console.log("THE MAIN MESSAGE: ", message);
  return message;
}

const getParsedMessageAndBody = (result) => {
  const { payload } = result;
  let parsedMessage, bodyAndAttachments;
  
  if (payload.body.attachmentId !== undefined && payload.body.data === undefined) {
    console.log("In getMessageContent().\nUnfixable email edge-case:----", result);
  }
  if (payload.mimeType.includes('text')){
    try {
      bodyAndAttachments = getBody(payload);
    } catch (exception) {
      console.log("Result:- ", result)
      console.log("getMessageContent Exception:- ")
      console.log(exception)
    }
  }
  else{
    try {
      parse(result, (err, data) => {
        if (err) {
          throw (err);
        } else {
          parsedMessage = data;
          if (parsedMessage.message === undefined) {
            bodyAndAttachments = getBody(payload);
          }
        }
      })
    } catch (exception) {
      // console.log("CALLBACK ERROR", exception);
      bodyAndAttachments = getBody(payload);
    }
  }

  return {
    parsedMessage,
    bodyAndAttachments
  }
}

const getEmailInfo = (headers) => {
  let from, to, conciseTo, cc = null, subject, detailedFrom, allParticipants = null;
  for (let i = 0; i < headers.length; i++) {

    if (headers[i].name === "From") {
      detailedFrom = headers[i].value;
      // console.log(detailedFrom);
      // console.log("Emergency headers");
      

      from = detailedFrom.substr(0, detailedFrom.indexOf('<') - 1);
      if (from === "") {
        from = detailedFrom;
      }
      // SO I'M NOT ALLOWED TO ACCESS THE STORE FROM THIS FILE? LAME!
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
      if(conciseTo.startsWith("<")) {
        conciseTo = conciseTo.substring(1);
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
  let p = to + ", " + detailedFrom;
  allParticipants = p.split(", ");
  // console.log("Subject: ", subject);
  // console.log("AllPeople: ", allParticipants);

  return {
    from,
    to,
    conciseTo,
    cc,
    subject,
    detailedFrom,
    allParticipants,
  };
}

const setupEmailBody = (Subject, To, Message, Sender) => {
  console.log("In the setup: ", To);
  var boundChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var boundLength = 16;
  var randBoundary = "000000000000";
  randBoundary += Array(boundLength).fill(boundChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
  const headers = {
    'MIME-Version': '1.0',
    //Modify the subject depending on replies/forwards
    'Subject': Subject,
    'From': Sender,
    'To': To,
    'Content-type': 'multipart/alternative; ' + 'boundary="' + randBoundary + '"',
  }
  let body = "--" + randBoundary + "\n";
  body += 'Content-type: text/html; charset="UTF-8"\n';
  body += 'Content-Transfer-Encoding: quoted-printable\n\n';
  body += Message + "\n\n";
  // the double -- at the end only happens if there is no attachment
  if (true) { //hardcoded test values
    body += setupAttachmentBody("BulletKin.png", randBoundary, "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");
  }
  else {
    body += "--" + randBoundary + "--";
  }


  return {
    headers,
    body,
  }
}

// If we need a separate function for setting up an attachment's format
const setupAttachmentBody = (fileName, randBoundary, pngData) => { //not entirely sure what we're gonna need here

  // Have to format the png Data in base64;

  let attachBody = "--" + randBoundary + "\n";
  attachBody += "Content-type: image/png\r\n";
  attachBody += "MIME-Version: 1.0\r\n";
  attachBody += "Content-Transfer-Encoding: base64\r\n";
  attachBody += 'Content-Disposition: attachment; filename = "' + fileName + '"\r\n\r\n';

  attachBody += pngData + "\r\n\r\n";

  attachBody += "--" + randBoundary + "--";

  return attachBody;

}
// End of attachemnt setup

const markEmailAsUnread = (threadId) => {
  store.commit('markThreadUnread', threadId);
  markAsUnread(threadId);
}

const markEmailAsRead = (threadId) => {
  store.commit('markThreadRead', threadId);
  markAsRead(threadId);
}

export {
  getTimeFormat,
  getMessage,
  Base64Encode,
  setupEmailBody,
  getParsedMessageAndBody,
  markEmailAsRead,
  markEmailAsUnread
};