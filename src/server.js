// Imports

let MongoClient = require('mongodb').MongoClient;


// Hex encription
function sha1(msg) {
    function rotl(n, s) { return n << s | n >>> 32 - s; };
    function tohex(i) { for (let h = "", s = 28; ; s -= 4) { h += (i >>> s & 0xf).toString(16); if (!s) return h; } };
    let H0 = 0x67452301, H1 = 0xEFCDAB89, H2 = 0x98BADCFE, H3 = 0x10325476, H4 = 0xC3D2E1F0, M = 0x0ffffffff;
    let i, t, W = new Array(80), ml = msg.length, wa = new Array();
    msg += String.fromCharCode(0x80);
    while (msg.length % 4) msg += String.fromCharCode(0);
    for (i = 0; i < msg.length; i += 4) wa.push(msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3));
    while (wa.length % 16 != 14) wa.push(0);
    wa.push(ml >>> 29), wa.push((ml << 3) & M);
    for (let bo = 0; bo < wa.length; bo += 16) {
        for (i = 0; i < 16; i++) W[i] = wa[bo + i];
        for (i = 16; i <= 79; i++) W[i] = rotl(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        let A = H0, B = H1, C = H2, D = H3, E = H4;
        for (i = 0; i <= 19; i++) t = (rotl(A, 5) + (B & C | ~B & D) + E + W[i] + 0x5A827999) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 20; i <= 39; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 40; i <= 59; i++) t = (rotl(A, 5) + (B & C | B & D | C & D) + E + W[i] + 0x8F1BBCDC) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        for (i = 60; i <= 79; i++) t = (rotl(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & M, E = D, D = C, C = rotl(B, 30), B = A, A = t;
        H0 = H0 + A & M; H1 = H1 + B & M; H2 = H2 + C & M; H3 = H3 + D & M; H4 = H4 + E & M;
    }
    return tohex(H0) + tohex(H1) + tohex(H2) + tohex(H3) + tohex(H4);
}


// mLab connection

let cloud = true;

let mongodbHost = '127.0.0.1';
let mongodbPort = '27017';

let authenticate = '';
//cloud
if (cloud) {
    mongodbHost = 'ds127781.mlab.com';
    mongodbPort = '27781';
    authenticate = 'dev:password123@'
}

let mongodbDatabase = 'hill-climber';


let url = 'mongodb://' + authenticate + mongodbHost + ':' + mongodbPort + '/' + mongodbDatabase;


// Login functions

function createUsers(username, password) {


    MongoClient.connect(url)
        .then(function (db) {
            console.log("Connection to database is open");
            db.collection('users').find().toArray(function (err, results) {
                console.log(results)
                let dupe = false;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].username === username) {
                        console.log('Duplicate user')
                        dupe = true;
                    }
                }
                console.log(dupe)
                if (dupe) {
                    console.log('This username is taken, please select a new one.')
                    db.close();
                    console.log("Connection to database is closed.");

                }
                if (!dupe) {
                    db.collection('users').insertOne({
                        username: username,
                        password: sha1(password),
                    }, function (err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('User is signed up.')
                            db.close();
                            console.log("Connection to database is closed.");
                        }

                    })
                }
            })



        })

        .catch(function (err) { console.log(err) })
}

function deleteUsers(username) {


    MongoClient.connect(url)
        .then(function (db) {
            console.log("Connection to database is open");
            db.collection('users').remove({ username: username }, function () {
                db.collection('users').find().toArray(function (err, results) {
                    console.log(results)
                    db.close();
                    console.log("Connection to database is closed.");
                })
            })
        })
        .catch(function (err) { console.log(err) })
}

let test = 1
export { test }

