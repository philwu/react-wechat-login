# react-wechat-login

English | [中文](https://github.com/philwu/react-wechat-login/blob/main/README_zh.md)

React component for website login by Wechat

## Installation

```bash
$ npm install react-wechat-login
```

## Usage

### Frontend

```js
import WechatLogin from "react-wechat-login";

const loginWechatRes = (res) => {
  console.log(res);
}

...
<WechatLogin
  appid={YOUR_APP_ID}
  redirectUri="http://localhost:4000/api/wechatlogin"
  onSuccess={loginWechatRes}
/>
...

```

### Backend

**\*\*Important:\*\***

In order to transfer the response message between iframe and parent page, the returned html from the backend must call the `parent.postMessage()`. Please check this [example](https://github.com/philwu/react-wechat-login/tree/main/example)

## Customize style of QR

Based on the [document on the Wechat Open Platform](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html), you can customize the style of the QR code image by providing the URI of your css file. That means you need to create a css file in the `public` folder and provide the URI to the `css` prop.

An example of css file is following:

```css
.impowerBox .qrcode {
  width: 200px;
}
.impowerBox .title {
  display: none;
}
.impowerBox .info {
  width: 200px;
}
.status_icon {
  display: none;
}
.impowerBox .status {
  text-align: center;
}
```

## Props

| props       | require | type          | description                                                                                  |
| ----------- | ------- | ------------- | -------------------------------------------------------------------------------------------- |
| appid       | YES     | string        | Your appid                                                                                   |
| redirectUri | YES     | string        | Your redirect uri. It must be the same origin of the uri you set in the wechat open platform |
| onSuccess   | YES     | function      | the callback funciton after the login                                                        |
| state       |         | string        | the state sent back to the backend                                                           |
| style       |         | CSSProperties | the style of the iframe element                                                              |
| css         |         | string        | the location of css file for customizing style of QR code                                    |

## Welcome submit issues

[https://github.com/philwu/react-wechat-login/issues](https://github.com/philwu/react-wechat-login/issues)
