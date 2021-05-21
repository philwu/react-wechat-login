# react-wechat-login

React component for website login by Wechat

## Installation

```bash
$ npm install react-wechat-login
```

## Usage

```js
import WechatLogin from "react-wechat-login";

const loginWechatRes = (res) => {
  console.log(res);
}

...
<WechatLogin
  appid={YOUR_APP_ID}
  redirect_uri="http:localhost:4000/api/wechatlogin"
  onSuccess={loginWechatRes}
/>
...

```
