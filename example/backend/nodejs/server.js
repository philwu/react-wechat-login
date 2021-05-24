const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const template = fs.readFileSync(path.join(__dirname, '/template.html'), 'utf8');

const APPID = "YOUR_APP_ID";
const APPSECRECT = "YOUR_APP_SECRECT";

const app = express();

const getAccessToken = (code, callback) => {
    https.get(
        `https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code`
        + `&appid=${APPID}`
        + `&secret=${APPSECRECT}`
        + `&code=${code}`,
        (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                callback(JSON.parse(data));
                console.log(JSON.parse(data));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
}

const getUserInfo = (access_token, openid, callback) => {
    https.get(
        `https://api.weixin.qq.com/sns/userinfo`
        + `?access_token=${access_token}`
        + `&openid=${openid}`,
        (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                callback(JSON.parse(data));
                console.log(JSON.parse(data));
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
}

router.route('/api/wechatlogin')
    .get(function (req, res) {
        getAccessToken(req.query.code, (access) => {
            getUserInfo(access.access_token, access.openid, (user) => {
                res.set('Content-Type', 'text/html')
                res.send(template.replace(/WECHAT_LOGIN_REPLACE_ME/, JSON.stringify(user)));
            });
        });
    });
app.use('/', router);
app.listen(4000);

console.log('Server running at http://localhost:4000/');