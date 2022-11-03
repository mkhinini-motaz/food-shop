import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "REDACTED",
    authDomain: "ghostchef-945d8.firebaseapp.com",
    projectId: "ghostchef-945d8",
    storageBucket: "ghostchef-945d8.appspot.com",
    messagingSenderId: "243392672629",
    appId: "1:243392672629:web:cbca7fb218852de903d93c",
    measurementId: "G-WF9WFNXJFX"
};

export const initFirebase = () => {
    firebase.initializeApp(firebaseConfig);
};

const messaging = firebase.messaging();

export const getToken = () => {
    return messaging.getToken({vapidKey: 'REDACTED'})
    .then((currentToken) => {
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            return currentToken;
            // Track the token -> client mapping, by sending to backend server
            // show on the UI that permission is secured
        } else {
            console.log('No registration token available. Request permission to generate one.');
            // shows on the UI that permission is required
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err, { ...err });
        // catch error while creating client token
    });
};

export const onMessageListener = () => {
    return new Promise(() => {
        messaging.onMessage((payload) => {
            console.log('on msg : ', payload);
        });
    });
}
