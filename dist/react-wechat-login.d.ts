/// <reference types="react" />
declare const WechatLogin: ({ appid, redirect_uri, state, style, css, onSuccess, }: {
    appid: string;
    redirect_uri: string;
    state?: string | undefined;
    style?: {} | undefined;
    css?: string | undefined;
    height?: string | undefined;
    width?: string | undefined;
    onSuccess: (v: string) => void;
}) => JSX.Element;
export default WechatLogin;
