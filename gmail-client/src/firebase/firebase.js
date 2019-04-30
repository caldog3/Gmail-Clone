import base64url from 'base64url';
import * as firebase from "firebase/app";

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
const drafts = 'DRAFTS';
const sent = 'SENT';
const received = 'RECEIVED';

const message1 = {
    threadId: 'A Thread IDs are cool',
    labelId: 'So are label IDs!',
    messageId: 'message IDs, not so much',
    from: 'My Friend',
    detailedFrom: 'My Friend <myfriend@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: 'Hey there sweet thang!',
    snippet: 'what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: 'what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1234567899',
    time: 'Apr 25',
    unread: true,
    starred: false,
    attachmentIds: [base64url('AHHHHHHHHHHHHH'), base64url('HAAAAAAAAAAAA')]
};

const message2 = {
    threadId: 'B Thread IDs are cool',
    labelId: '2 So are label IDs!',
    messageId: '2 message IDs, not so much',
    from: '2 My Friend',
    detailedFrom: 'myfriend@gmail.com',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com, yomama@gmail.com, fred@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: '2 Hey there sweet thang!',
    snippet: '2 what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: '2 what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1234567894',
    time: 'Apr 25',
    unread: true,
    starred: false,
    attachmentIds: [base64url('2 AHHHHHHHHHHHHH'), base64url('2 HAAAAAAAAAAAA')]
};

const message3 = {
    threadId: 'C Thread IDs are cool',
    labelId: '3 So are label IDs!',
    messageId: '3 message IDs, not so much',
    from: '3 My Friend',
    detailedFrom: '3 My Friend <yomama@gmail.com>',
    allParticipants: ['My Friend <myfriend@gmail.com>', 'Devon Howard <how.d.65@gmail.com>'],
    to: 'how.d.65@gmail.com, fred@gmail.com',
    conciseTo: 'Devon Howard',
    cc: 'cc',
    subject: '3 Hey there sweet thang!',
    snippet: '3 what is up my best friend in the whole wide world!? I hope you are blasting off with school.',
    body: '3 what is up my best friend in the whole wide world!? I hope you are blasting off with school. So I have a surprise for you. I am engaged!',
    unixTime: '1334567894',
    time: 'Apr 35',
    unread: true,
    starred: false,
    attachmentIds: [base64url('3 AHHHHHHHHHHHHH'), base64url('3 HAAAAAAAAAAAA')]
};

//within "message" object, format the "to" field as follows: "email@gmail.com, otheremail@gmail.com, anotheremail@gmail.com"
const fireSendMessage = (message) => {
    fireRef.child(threads).child(message.threadId).set(message);
    let sender = base64url(getSenderAddress(message.detailedFrom));
    fireRef.child(users).child(sender).child(drafts).child(message.threadId).remove();
    fireRef.child(users).child(sender).child(sent).child(message.threadId).set(message.unixTime);

    let recipients = message.to.split(', ');
    recipients.forEach(recipient => {
        fireRef.child(users).child(base64url(recipient)).child(received).child(message.threadId).set(message.unixTime);
    });
}

//One-time call. This function will notify you when you receive a new email.
const fireRetrieveMessages = (currentUserEmail) => {
    fireRef.child(users).child(base64url(currentUserEmail)).child(received).orderByValue().on('child_added', function(snapshot, prevChildKey){
            let key = snapshot.key;
            return fireRef.child(threads).child(key).on('value', function(fireThread){
                let message = fireThread.val();
                return message;
        });
    });
}

// detailedFrom must be formated in either of the following two ways:
// "example@gmail.com"  or  "devon howard <example@gmail.com>"
const fireSaveDraft = (message) => {
    let currentUserEmail = getSenderAddress(message.detailedFrom);
    fireRef.child(users).child(base64url(currentUserEmail)).child(drafts).child(message.threadId).set(message.unixTime)
    fireRef.child(threads).child(message.threadId).set(message);
}

//Must be called each time you need drafts. Does not continue to listen for added drafts.
const fireRetrieveDrafts = (currentUserEmail) => {
    fireRef.child(users).child(base64url(currentUserEmail)).child(drafts).orderByValue().once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            fireRef.child(threads).child(childSnapshot.key).on('value', function(fireThread){
                let message = fireThread.val();
                return message;
            });
        });
    });
}

//add messages sent functionality

const testFirebase = () =>{
    fireSaveDraft(message2);
    fireSaveDraft(message1);
    fireSaveDraft(message3);
    fireRetrieveMessages('how.d.65@gmail.com');
}

const testTwoFirebase = () =>{
    fireSendMessage(message1);
    fireSendMessage(message2);
    fireSendMessage(message3);
    fireGetDrafts('myfriend@gmail.com');
}

const getSenderAddress = (detailedFrom) =>{
    let email = detailedFrom.split('<');
    if (email.length > 1){
        email = email[1].split('>');
    }
    return email[0];
}

export{
    fireSendMessage,
    fireRetrieveMessages,
    fireSaveDraft,
    fireGetDrafts,
    testFirebase,
    testTwoFirebase
};