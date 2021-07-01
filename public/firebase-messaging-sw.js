// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "REDACTED",
    authDomain: "ghostchef-945d8.firebaseapp.com",
    projectId: "ghostchef-945d8",
    storageBucket: "ghostchef-945d8.appspot.com",
    messagingSenderId: "243392672629",
    appId: "1:243392672629:web:cbca7fb218852de903d93c",
    measurementId: "G-WF9WFNXJFX"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});