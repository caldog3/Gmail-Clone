import base64url from 'base64url';
import * as firebase from "firebase/app";
import store from '../store';
import eventBus from './../event_bus.js';
import config from './firebase.config';
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/database";
import { networkInterfaces } from 'os';
firebase.initializeApp(config);

let fireRef = firebase.database().ref()
const users = 'USERS';
const threads = 'THREADS';
const messages = 'MESSAGES';
const participants = 'PARTICIPANTS';
const drafts = 'DRAFTS';
const sent = 'SENT';
const primary = 'PRIMARY';
const trash = 'TRASH';
const isRead = 'IS_READ';
const folders = 'FOLDERS';

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
    let sender = base64url(store.state.currentUser.w3.U3);
    //fireRef.child(users).child(sender).child(drafts).child(message.threadId).remove();
    fireRef.child(users).child(sender).child(sent).child(message.threadId).set(true);
    fireRef.child(threads).child(message.threadId).child(participants).child(sender).child(isRead).set(true);
    fireRef.child(threads).child(message.threadId).child(participants).child(sender).child(folders).child(sent).set(true);

    let recipients = message.to.split(', ');
    recipients.forEach(recipient => {
        recipient = base64url(extractEmailFromDetail(recipient));
        fireRef.child(users).child(recipient).child(primary).child(message.threadId).set(true);
        fireRef.child(threads).child(message.threadId).child(participants).child(recipient).child(isRead).set(false);
        fireRef.child(threads).child(message.threadId).child(participants).child(recipient).child(folders).child(primary).set(true);
    });
    //possible race condition here. might need to put into a ".then" statement
    fireRef.child(threads).child(message.threadId).child(messages).child(message.messageId).set(message);
}

const fireSaveDraft = (message) => {
    let sender = base64url(store.state.currentUser.w3.U3);

}

//One-time call. This function will notify you when you receive a new email.
const fireRetrieveMessages = () => {
    let currentUser = base64url(store.state.currentUser.w3.U3);
    fireRef.child(users).child(currentUser).child(primary).once('value').then((userShot) => {
        if(!userShot.exists()){
            return fireRef.child(users).child(currentUser).child(primary).set("Welcome!");//.child('Welcome!').set(true);
        }
    }).then(() => {
        fireRef.child(users).child(currentUser).child(primary).on("child_added", function(threadShot){
            var threadId = threadShot.key;
            store.commit('initializeThreadTime', {threadId});
            store.commit('addThreadId', {threadId, labelId:primary});
            fireRef.child(threads).child(threadId).child(participants).child(currentUser).once("value").then((userInfoShot) => {
                var isEmailRead = userInfoShot.child(isRead).val();
                var newFolderLabels = [];
                userInfoShot.child(folders).forEach((folder) => {
                    newFolderLabels.push(folder.key);
                });
                return {isEmailRead, newFolderLabels};
            }).then(({isEmailRead, newFolderLabels}) => {
                fireRef.child(threads).child(threadId).child(participants).child(currentUser).on("child_changed", function(userInfoUpdate){
                    if(userInfoUpdate.key == isRead){
                        isEmailRead = userInfoUpdate.val();
                    }
                    else{
                        newFolderLabels = [];
                        userInfoUpdate.child(folders).forEach((folder) => {
                            newFolderLabels.push(folder.key);
                        });
                    }
                });
                fireRef.child(threads).child(threadId).child(messages).on("child_added", function(messageShot){
                    let newMessage = messageShot.val();
                    let unixTime = newMessage.unixTime;
                    newMessage.unread = isEmailRead;
                    newMessage.labelId = newFolderLabels;
                    store.commit('setThreadTime', {threadId, unixTime});
                    store.commit('addMessage', newMessage);
                });
            });
        });
    });
} 

const fireGetMessagesByLabel = (labelId) => {
    let currentUser = base64url(store.state.currentUser.w3.U3);
    fireRef.child(users).child(currentUser).child(labelId).once('value').then((labelShot) => {
        labelShot.forEach((threadId) => {
            threadId = threadId.key;
            store.commit('initializeThreadTime', {threadId});
            store.commit('addThreadId', {threadId, labelId});
            fireRef.child(threads).child(threadId).child(participants).child(currentUser).once("value").then((userInfoShot) => {
                return userInfoShot;
            }).then((userInfo) => {
                fireRef.child(threads).child(threadId).child(messages).once("value", function(messagesShot){
                    messagesShot.forEach((newMessage) => {
                        newMessage = newMessage.val();
                        let unixTime = newMessage.unixTime;
                        newMessage.unread = userInfo.child(isRead).val();
                        let newFolderLabels = [];
                        userInfo.child(folders).forEach((folder) => {
                            newFolderLabels.push(folder.key);
                        });
                        newMessage.labelId = newFolderLabels;
                        store.commit('setThreadTime', {threadId, unixTime});
                        store.commit('addMessage', newMessage);
                    });
                });
            })
        });
    });
}

const fireTrashThread = (threadId) => {
    let currentUser = base64url(store.state.currentUser.w3.U3);
    fireRef.child(threads).child(threadId).child(participants).child(currentUser).child(folders).once("value").then((folderShot) => {
        return folderShot.forEach((labelId) => {
            fireRef.child(users).child(currentUser).child(labelId.key).child(threadId).remove();
        });
    }).then(() => {
        fireRef.child(users).child(currentUser).child(trash).child(threadId).set(true);
        fireRef.child(threads).child(threadId).child(participants).child(currentUser).child(folders).child(trash).set(true);
    })
}

const fireUpdateMessage = (message) => {
    fireRef.child(threads).child(message.threadId).child(message.messageId).set(message);
}

const fireMarkAsRead = (message) => {
    let currentUser = base64url(store.state.currentUser.w3.U3);
    fireRef.child(threads).child(message.threadId).child(participants).child(currentUser).child(isRead).set(true);
}

const fireMarkAsUnread = (message) => {
    let currentUser = base64url(store.state.currentUser.w3.U3);
    fireRef.child(threads).child(message.threadId).child(participants).child(currentUser).child(isRead).set(false);
}

const extractEmailFromDetail = (detailedFrom) =>{
    let email = detailedFrom.split('<');
    if (email.length > 1){
        email = email[1].split('>');
    }
    return email[0];
}

const testFirebase = () =>{
    fireRetrieveMessages('how.d.65@gmail.com');
    //fireSendMessage(responseMessage1);
    //fireSendMessage(responseMessage2);
}

const testTwoFirebase = () =>{
    // fireSendMessage(message1);
    // fireSendMessage(message2);
    // fireSendMessage(message3);
    // fireSendMessage(responseMessage3);
}

export{
    fireSendMessage,
    fireRetrieveMessages,
    fireGetMessagesByLabel,
    fireTrashThread,
    fireUpdateMessage,
    fireMarkAsRead,
    fireMarkAsUnread,
    testFirebase,
    testTwoFirebase
};