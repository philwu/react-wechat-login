# react-wechat-login

[English](https://github.com/philwu/react-wechat-login/blob/main/README.md) | 中文

React 网站应用微信登录组件

## 安装

```bash
$ npm install react-wechat-login
```

## 用法

### 前端

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

### 后端

**\*\* 注意: \*\***

为了跨域传输登录成功数据，后台返回的 html 中必须运行 `parent.postMessage()` 方法。 请参考提供的 [示例](https://github.com/philwu/react-wechat-login/tree/main/example)

## 自定义二维码样式

根据微信开放平台的 [文档](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)，我们可以自定义二维码的样式。只需在 `public` 文件夹中建立一个 css 文件，然后把 URI 地址输入到组件的 `css` 属性中即可。

以下是一个 css 样式文件的示例：

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

## 属性列表

| props       | require | type          | description                                                    |
| ----------- | ------- | ------------- | -------------------------------------------------------------- |
| appid       | YES     | string        | 网站应用的 appid                                               |
| redirectUri | YES     | string        | 回调地址。域名必须与你在微信开放平台中设置的“授权回调域”相同。 |
| onSuccess   | YES     | function      | 登录成功后的回调函数                                           |
| state       |         | string        | 传给后台的 state                                               |
| style       |         | CSSProperties | iframe 的样式                                                  |
| css         |         | string        | 自定义二维码样式文件                                           |
