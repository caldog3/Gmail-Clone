import store from '../store';
import { fireUpdateMessage } from '../firebase/firebase';

const extractSnippet = (composeMessage) => {
    let snippet = '';
    let tags = composeMessage.split('<');
    tags.forEach(tag => {
      let tagExtract = tag.split('>');
      if(tagExtract.length > 1){
        snippet += tagExtract[1];
      }
      else{
        snippet += tagExtract[0];
      }
    });
    return snippet;
  }
  
const extractConciseTo = (firstParticipant) => {
    firstParticipant = firstParticipant.split('@');
    firstParticipant = firstParticipant[0].split(' ');
    return firstParticipant[0];
  }

const fireSetupEmailMessage = (composeSubject, composeTo, composeMessage, threadId) => {
    //conciseTo for group emails only requires one name
    composeTo = composeTo.toLowerCase();
    const uuidv1 = require('uuid/v1');
    let allParticipants = [];
    let sender = store.state.currentUser.w3.U3;
    let senderName = store.state.currentUser.w3.ig;
    let detailedFrom = senderName + ' <' + sender + '>';
    let recipients = composeTo.split(', ');
  
    recipients.forEach(recipient => {
      allParticipants.push(recipient);
    });
    allParticipants.push(detailedFrom);
    if(allParticipants.length < 2){return null;}
  
    if (threadId === undefined){
      threadId = uuidv1();
    }
  
    const message = {
      threadId,
      labelId: 'PRIMARY',
      messageId: uuidv1(),
      from: senderName,
      detailedFrom,
      allParticipants,
      to: composeTo,
      conciseTo: extractConciseTo(allParticipants[0]),
      cc: null,
      subject: composeSubject,
      snippet: extractSnippet(composeMessage),
      body: composeMessage,
      unixTime: Math.floor(Date.now() / 1000),
      time: '',
      unread: false,
      starred: false,
      attachmentIds: [],
      isFireMessage: true
    };
  
    return message;
  }  

  export {
    fireSetupEmailMessage,
  };