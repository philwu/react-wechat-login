import * as React from "react";
import QRCode from "qrcode.react";

const WechatLogin = ({
  appid,
  redirectUri,
  state,
  style,
  native = false,
  scope = 'snsapi_userinfo',
  css,
  onSuccess,
}: {
  appid: string;
  redirectUri: string;
  state?: string;
  style?: {};
  native?: boolean;
  scope?: 'snsapi_base' | 'snsapi_userinfo';
  css?: string;
  onSuccess?: (v: string) => void;
}) => {
  let sent = false;
  const url = new URL(redirectUri);
  if (native && onSuccess) {
    window.addEventListener("message", (event) => {
      if (
          event.origin === url.origin && //确认消息来自于自己的域名 Make sure the message posted from your own origin
          !event.data.source && //过滤掉一些调试组件发来的信息  Filter out some devtools message
          !sent //避免多次运行回调函数  Avoid callback twice
      ) {
        sent = true;
        onSuccess(event.data);
      }
    });
  }
  style = style
    ? { height: "390px", width: "300px", ...style }
    : { height: "390px", width: "300px" };
  css = css ? `&href=${css}` : ``;

  const params = {
    appid,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: native ? 'snsapi_login' : scope,
    state: state || '',
    ...(native ? { self_redirect: 'true' } : { css } ),
  };

  const src =
      native ? 'https://open.weixin.qq.com/connect/qrconnect' : 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
      new URLSearchParams(params)

  if (!native) return <QRCode value={src} />

  return (
    <iframe
      // generate a random id for the ifrom in case there are more than one react-wechat-login in one page
      // 随机生成一个iframe的id，以应对同一个页面中有两个登录控件的情况
      id={"f_wechatlogin_" + Math.floor(Math.random() * 1000000)}
      title="WechatLogin"
      src={src}
      frameBorder={"0"}
      style={{ ...style }}
    ></iframe>
  );
};

export default WechatLogin;
