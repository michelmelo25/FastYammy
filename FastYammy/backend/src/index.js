const express = require('express');
var firebase = require('firebase');
const cors = require('cors');

// "https://www.gstatic.com/firebasejs/5.5.8/firebase.js"
var config = {
    apiKey: "AIzaSyCgRKEDsoPVL8tPV7PIGRis5rwa57q9aE0",
    authDomain: "fastyumi-513da.firebaseapp.com",
    databaseURL: "https://fastyumi-513da.firebaseio.com",
    projectId: "fastyumi-513da",
    storageBucket: "fastyumi-513da.appspot.com",
    messagingSenderId: "207769752851"
  };

const app = express();
firebase.initializeApp(config);

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use((req, res, next) => {
  req.io = io;

  return next(); 
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port 3000');
});