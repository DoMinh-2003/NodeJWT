
const admin = require('firebase-admin');
const keyAdmin = require('../firebase-admin.json'); 

admin.initializeApp({
    credential: admin.credential.cert(keyAdmin)
});

module.exports = admin;
