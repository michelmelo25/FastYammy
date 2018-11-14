const firebase = require('firebase');

module.exports = {
    async postLogin(req, res){
       var email = req.body.email;
       var password = req.body.password;
        var user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return res.json(errorMessage);
        });
        // var user = {
        //     email: email,
        //     password: password
        // }
        return res.json(user);
    },

    async getUser(req, res){
        var us = firebase.auth().currentUser;
        console.log(us.user);
        var user = await firebase.database().ref().child('usuarios/'+us.uid).once('value');
        return res.json({"uid": us.uid, user});
    },

    async postLogout(req, res){
        await firebase.auth().signOut().then(function() {
            return res.json('Deslogado');
          }).catch(function(error) {
            return res.json(error);
          });
    },

    async postSignIn(req, res){
        var user = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email,
            restricoes: req.body.restricoes
        }

        await firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            return res.json(errorMessage);
        });
        var us = firebase.auth().currentUser;

        if (us) { 
        console.log(us.uid);
        } else {
        // No user is signed in.
        }

        await firebase.database().ref().child('usuarios/'+us.uid).set({user});
        return res.json(user);
    },

    getLoginGoogle(req, res){
        var provider = new firebase.auth.GoogleAuthProvider();
        // console.log('111111');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // console.log('222222');
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log(token);
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
            return res.json(user);
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log('erro');
            return res.json({errorMessage, email});
          });
    }
}