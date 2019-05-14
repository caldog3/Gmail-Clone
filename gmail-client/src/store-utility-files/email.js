import moment from 'moment';
import base64js from 'base64-js';
import store from '../store';
import { markAsRead, markAsUnread } from './gmail-api-calls';
import { fireMarkAsRead, fireMarkAsUnread } from '../firebase/firebase';


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
  const { from, to, conciseTo, cc, subject, detailedFrom, allParticipants } = getEmailInfo(payload.result.payload.headers);
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
    labelId: payload.labelId,
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
  body += "--" + randBoundary + "--";

  console.log("BODY:", body);
  return {
    headers,
    body,
  }
}

const markEmailAsUnread = (threadId) => {
  store.commit('markThreadAsUnread', threadId);
  let thread = store.state.threadMessages[threadId];
  let message = thread[thread.length - 1];
  if(message.isFireMessage){
    fireMarkAsUnread(message);
  }
  else{
    markAsUnread(threadId);
  }
}

const markEmailAsRead = (threadId) => {
  store.commit('markThreadAsRead', threadId);
  let thread = store.state.threadMessages[threadId];
  let message = thread[thread.length - 1];
  if(message.isFireMessage){
    fireMarkAsRead(message);
  }
  else{
    markAsRead(threadId);
  }
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