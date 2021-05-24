/// <reference types="react" />
declare const WechatLogin: ({ appid, redirectUri, state, style, css, onSuccess, }: {
    appid: string;
    redirectUri: string;
    state?: string | undefined;
    style?: {} | undefined;
    css?: string | undefined;
    onSuccess: (v: string) => void;
}) => JSX.Element;
export default WechatLogin;
