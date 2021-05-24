import WechatLogin from "react-wechat-login";
import "./App.css";

const APPID = "YOUR_APP_ID";

function App() {
    const loginWechatRes = (res) => {
        console.log(res);
    };
    return (
        <div className="App">
            <div className="left">
                <WechatLogin
                    // 默认样式
                    appid={APPID}
                    redirectUri="http://localhost:4000/api/wechatlogin"
                    onSuccess={loginWechatRes}
                />
            </div>
            <div className="right">
                <WechatLogin
                    // 自定义样式
                    appid={APPID}
                    redirectUri="http://localhost:4000/api/wechatlogin"
                    onSuccess={loginWechatRes}
                    style={{ width: "200px", height: "200px" }}
                    css="http://localhost:3000/wechatlogin.css"
                />
            </div>
        </div>
    );
}

export default App;
