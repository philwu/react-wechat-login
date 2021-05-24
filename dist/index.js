Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var WechatLogin = function (_a) {
    var appid = _a.appid, redirectUri = _a.redirectUri, state = _a.state, style = _a.style, css = _a.css, onSuccess = _a.onSuccess;
    var sent = false;
    var url = new URL(redirectUri);
    window.addEventListener("message", function (event) {
        if (event.origin === url.origin && //确认消息来自于自己的域名 Make sure the message posted from your own origin
            !event.data.source && //过滤掉一些调试组件发来的信息  Filter out some devtools message
            !sent //避免多次运行回调函数  Avoid callback twice
        ) {
            sent = true;
            onSuccess(event.data);
        }
    });
    appid = "appid=" + appid;
    redirectUri = "&redirect_uri=" + encodeURIComponent(redirectUri);
    var scope = "&scope=snsapi_login";
    state = state ? "&state=" + state : "";
    style = style
        ? __assign({ height: "390px", width: "300px" }, style) : { height: "390px", width: "300px" };
    css = css ? "&href=" + css : "";
    var src = "https://open.weixin.qq.com/connect/qrconnect?self_redirect=true&" +
        appid +
        redirectUri +
        scope +
        state +
        css;
    return (React__namespace.createElement("iframe", { 
        // generate a random id for the ifrom in case there are more than one react-wechat-login in one page
        // 随机生成一个iframe的id，以应对同一个页面中有两个登录控件的情况
        id: "f_wechatlogin_" + Math.floor(Math.random() * 1000000), title: "WechatLogin", src: src, frameBorder: "0", style: __assign({}, style) }));
};

exports.default = WechatLogin;
//# sourceMappingURL=index.js.map
