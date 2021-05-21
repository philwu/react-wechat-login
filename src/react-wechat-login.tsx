import * as React from "react";

const WechatLogin = ({
  appid,
  redirect_uri,
  state,
  style,
  css,
  onSuccess,
}: {
  appid: string;
  redirect_uri: string;
  state?: string;
  style?: {};
  css?: string;
  height?: string;
  width?: string;
  onSuccess: (v: string) => void;
}) => {
  let sent = false;
  const url = new URL(redirect_uri);
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
  appid = `appid=${appid}`;
  redirect_uri = `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  const scope = `&scope=snsapi_login`;
  state = state ? `&state=${state}` : ``;
  style = style
    ? { height: "200px", width: "200px", ...style }
    : { height: "200px", width: "200px" };
  css = css ? `&href=${css}` : ``;
  const src =
    `https://open.weixin.qq.com/connect/qrconnect?self_redirect=true&` +
    appid +
    redirect_uri +
    scope +
    state +
    css;
  return (
    <iframe
      id="frame_wechatlogin"
      title="WechatLogin"
      src={src}
      frameBorder={"0"}
      style={{ ...style }}
    ></iframe>
  );
};

export default WechatLogin;
