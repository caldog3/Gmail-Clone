import base64url from 'base64url';
import * as firebase from "firebase/app";
import store from '../store';
import eventBus from './../event_bus.js';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
var config = {
  apiKey: "AIzaSyDrpz2BFRzaIWpqYXn5eUviFi6NZRkqv50",
  authDomain: "byu--clone.firebaseapp.com",
  databaseURL: "https://byu--clone.firebaseio.com",
  projectId: "byu-gmail-clone",
  storageBucket: "byu-gmail-clone.appspot.com",
  messagingSenderId: "68568085108"
};
firebase.initializeApp(config);

let fireRef = firebase.database().ref()
const users = 'USERS';
const threads = 'THREADS';
const messages = 'MESSAGES';
const drafts = 'DRAFTS';
const sent = 'SENT';
const primary = 'PRIMARY';
const received = 'RECEIVED';

const message1 = {
    threadId: 'A Thread IDs are cool',
    labelId: 'So are label IDs!',
    messageId: 'messageId',
    from: 'My Friend',
    detailedFrom: 'My Friend <myfriend@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: 'Hey there sweet thang!',
    snippet: 'what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: 'what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1557345000',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

const message2 = {
    threadId: 'B Thread IDs are cool',
    labelId: '2 So are label IDs!',
    messageId: '2 messageId',
    from: '2 My Friend',
    detailedFrom: 'myfriend@gmail.com',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com, yomama@gmail.com, fred@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: '2 Hey there sweet thang!',
    snippet: '2 what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: '2 what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1557342606',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

const message3 = {
    threadId: 'C Thread IDs are cool',
    labelId: '3 So are label IDs!',
    messageId: '3 messageId',
    from: '3 My Friend',
    detailedFrom: '3 My Friend <yomama@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com, fred@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: '3 Hey there sweet thang!',
    snippet: '3 what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: '3 what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1557342600',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

const responseMessage1 = {
    threadId: 'chainEmail',
    labelId: primary,
    messageId: 'chainEmail 1',
    from: 'My Friend',
    detailedFrom: 'My Friend <myfriend@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: 'Hey there sweet thang!',
    snippet: 'what is up my best friend in the whole wide world!? I hope you are doing well in school.',
    body: 'what is up my best friend in the whole wide world!? I hope you are doing well in school. So I have a surprise for you. I am engaged!',
    unixTime: '1557346000',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

const responseMessage2 = {
    threadId: 'chainEmail',
    labelId: primary,
    messageId: 'chainEmail 2',
    from: 'Devon Howard',
    detailedFrom: 'Devon Howard <how.d.65@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'myfriend@gmail.com',
    conciseTo: 'My Friend',
    cc: 'cc',
    subject: 'Hey there sweet thang!',
    snippet: 'Dude! That is so awesome! I am so exited for you! What is her name?',
    body: 'Dude! That is so awesome! I am so exited for you! What is her name? When do I get to meet this girl?',
    unixTime: '1557347000',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

const responseMessage3 = {
    threadId: 'chainEmail',
    labelId: primary,
    messageId: 'chainEmail 3',
    from: 'My Friend',
    detailedFrom: 'My Friend <myfriend@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: 'Hey there sweet thang!',
    snippet: 'How about next week sometime? we could meet up and have lunch over at ',
    body: 'How about next week sometime? we could meet up and have lunch over at Rumbi\'s Island grill. we went there last saturday and it was amazing!',
    unixTime: '1557348000',
    time: '',
    unread: false,
    starred: false,
    attachmentIds: []
};

//within "message" object, format the "to" field as follows: "email@gmail.com, otheremail@gmail.com, anotheremail@gmail.com"
const fireSendMessage = (message) => {
    fireRef.child(messages).child(message.threadId).child(message.messageId).set(message);
    let sender = base64url(getSenderAddress(message.detailedFrom));
    //fireRef.child(users).child(sender).child(drafts).child(message.threadId).remove();
    fireRef.child(users).child(sender).child(message.threadId).child(sent).set(true);

    let recipients = message.to.split(', ');
    recipients.forEach(recipient => {
        fireRef.child(users).child(base64url(recipient)).child(message.threadId).child(primary).set(true);
    });
}

//One-time call. This function will notify you when you receive a new email.
const fireRetrieveMessages = (currentUserEmail) => {
    let currentUser = base64url(currentUserEmail);
    fireRef.child(users).child(currentUser).once('value').then((userShot) => {
        if(!userShot.exists()){
            return fireRef.child(users).child(currentUser).child('Welcome!').set(true);
        }
    }).then(() => {
        fireRef.child(users).child(currentUser).on("child_added", function(threadShot){
            let labelIds = threadShot.val();
            var threadId = threadShot.key;
            fireRef.child(users).child(currentUser).child(threadId).on("child_added", function(labelShot){
                let labelId = labelShot.key;
                store.commit('addThreadId', {threadId, labelId});
                store.commit('initializeThreadTime', {threadId});
            })
            fireRef.child(messages).child(threadId).on("child_added", function(messageShot){
                let messageId = messageShot.key;
                let newMessage = messageShot.val();
                threadId = newMessage.threadId;
                let unixTime = newMessage.unixTime;
                store.commit('setThreadTime', {threadId, unixTime});
                store.commit('addMessage', newMessage);
            })
        })
    })
}



const getSenderAddress = (detailedFrom) =>{
    let email = detailedFrom.split('<');
    if (email.length > 1){
        email = email[1].split('>');
    }
    return email[0];
}

const testFirebase = () =>{
    fireRetrieveMessages('how.d.65@gmail.com');
    fireSendMessage(responseMessage1);
    fireSendMessage(responseMessage2);
}

const testTwoFirebase = () =>{
    fireSendMessage(message1);
    fireSendMessage(message2);
    fireSendMessage(message3);
    fireSendMessage(responseMessage3);
}

export{
    fireSendMessage,
    fireRetrieveMessages,
    testFirebase,
    testTwoFirebase
};