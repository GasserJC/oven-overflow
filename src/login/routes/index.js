const express = require('express');
const bodyParser = require('body-parser');
const Credentials = require('./credentials.js')
const router = express.Router();
router.use(bodyParser.json());

router.get('/x812nka8hjsa10/login/:usr/:pwd', async (req, res) => {
    console.log(`received request: ${req.params} ${req.url}`)
    username = req.params["usr"]
    password = req.params["pwd"]
    try {
        if(Credentials.CheckUsr(username)){
            if(Credentials.Validate(username, password)){
                const cookie = await Credentials.GetCookie(username, password)
                res.status(200).send(cookie)
            }
        }else{
            res.status(500).send('{"message":"Invalid Credentials"}')
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/newLogin/:usr/:pwd/:email', async (req, res) => {
    console.log(`received request: ${req.params} ${req.url}`)
    username = req.params["usr"]
    password = req.params["pwd"]
    email = req.params["email"]
    try {
        if(Credentials.CheckUsr(username)){
            if(Credentials.Create(username, password, email)){
                res.status(200).send('{"message":"Account Successfully Created"}')
            }
        }else{
            res.status(500).send('{"message":"Username Already Exists"}')
        }
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/ValidateKey/:key/:usr', async (req, res) => {
    console.log(`received request: ${req.params} ${req.url}`)
    key = req.params["key"]
    username = req.params["usr"]
    try {
        if(await Credentials.Decrypt(key, username)){
            res.status(200).send('{"message":"true"}')
        }else{
            res.status(200).send('{"message":"false"}')
        }
    } catch (error) {
        res.status(200).send('{"message":"false"}')
    }
});

router.get('/*', (req, res) => {
    res.status(200).send('{}')
});

module.exports = router;
