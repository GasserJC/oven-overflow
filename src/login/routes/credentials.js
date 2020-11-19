const admin = require('firebase-admin');
const serviceAccount = require('./creds.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const Decrypt = async (_key, username) => {
    try{
        const Users = db.collection('login').doc(username);
        const doc = await Users.get();
        if(doc.exists)
        {
            console.log(doc.data().key)
            console.log(_key)
            if(_key == doc.data().key){
                return true;
            } else {
                return false;
            }
        }   
    }catch{
        return false;
    }
}

const CheckUsr = async (username) => {
    try{
    const user = await db.collection('login').doc(username).get();

    if(user.exists){
        console.log("check user " + true)
        return true;
    } else {
        console.log("check user " + false)
        return false;
    }
    }catch (err) {
        console.log("check user " + err)
        return false;
    }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%^&*()_+@!';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
const Create = async (uname, pword, em) => {
    try{
        const _user = await db.collection('login').doc(uname).get();
        if(!_user.exists){
            ukey = Math.floor((Math.random() * 100000000) + 1);
            ukey = String(ukey) + String(makeid(12));
            const data = {
                username: uname,
                password: pword,
                email: em,
                key: ukey
            }
            const res = await db.collection('login').doc(uname).set(data);
            if(res){
                return true
            }
            else{
                return false
            }
    }
    } catch (error) {
        console.log(error)
        return false
    }
}

const Validate = async (username, password) => {
    try{
        const USER = await db.collection('login').doc(username).get();
        if(USER.exists){
            console.log(USER.data().password)
            if(USER.data().password == password){
                console.log("validate " + true)
                return true
            }
        }else{
            console.log("validate " + false)
            return false;
        }
    } catch (err) {
        console.log("validate " + err)
        return false;
    }
    return false
}   

const GetCookie = async (username, password) => {
    try{
        const USER = await db.collection('login').doc(username).get();
        if(USER.exists && USER.data().password == password){
            return `{"key":"${USER.data().key}", "username":"${username}"}`
        }
    } catch (err) {
        console.log(err)
        return `{ ${err} }`
    }
    return `{}`
}

module.exports = {
    Decrypt: Decrypt,
    CheckUsr: CheckUsr,
    Create: Create,
    Validate: Validate,
    GetCookie: GetCookie
}

