importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'apiKey': "AIzaSyBdO7h3Nkq1tTQIm_UPlUgEhBrlUFevoRE",
  'authDomain': "purplepoint-f2abf.firebaseapp.com",
  'databaseURL': "https://purplepoint-f2abf.firebaseio.com/",
  'projectId': "purplepoint-f2abf",
  'storageBucket': "purplepoint-f2abf.appspot.com",
  'messagingSenderId': "481123101410",
  'appId': "1:481123101410:web:c23c57ebc69927c0b68cbb",
  'messagingSenderId': '481123101410'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();