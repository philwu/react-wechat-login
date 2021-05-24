<?php

define("APPID", "YOUR_APP_ID");
define("APPSECRECT", "YOUR_APP_SECRECT");

function get_access_token($code)
{
    $ch = curl_init(
        "https://api.weixin.qq.com/sns/oauth2/access_token?grant_type=authorization_code"
        . "&appid=" . APPID
        . "&secret=" . APPSECRECT
        . "&code=" . $code
    );
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

function get_userinfo($access_token, $openid)
{
    $ch = curl_init("https://api.weixin.qq.com/sns/userinfo?access_token=$access_token&openid=$openid");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

$success = false;

if (!empty($_REQUEST['code'])) {
    $access_token = get_access_token($_REQUEST['code']);
    if ($access_token && empty($access_token['errcode'])) {
        $userinfo = get_userinfo($access_token['access_token'], $access_token['openid']);
        if ($userinfo && empty($userinfo['errcode'])) {
            $success = true;
            // 如需要，可将openid, refresh_token等信息在这里存入数据库
            // save the openid, refresh_token and userinfo to the database if you want.
        } else {
            // Failed to fetch userinfo
            // 获取用户信息失败
            error_log("userinfo数据返回错误  ");
        }
    } else {
        // Failed to get access_token
        // 获取access_token失败
        error_log("access_token数据返回错误  ");
    }
} else {
    // Customer cancel or refuse to login after scanning the QR Code
    // 用户扫描二维码后取消、拒绝登录
    error_log("用户拒绝");
}
if ($success) {
    $data_result = json_encode($userinfo, JSON_UNESCAPED_UNICODE);
} else {
    $data_result = '[]';
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>微信登录成功</title>
  <style>
    html {
      overflow: hidden;
    }

    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 60px;
    }
  </style>
</head>

<body>
  <div class="inner">
    <svg t="1621015490152" style="vertical-align: middle;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1190"
      width="25px" height="25px">
      <path
        d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m236.32 294.144L408.896 633.536 259.84 484.544 192 552.416l216.896 216.928 407.296-407.296-67.872-67.904z"
        p-id="1191" fill="#06d409"></path>
    </svg>
    <span style="vertical-align: middle;">登录成功</span>
  </div>
  <script>
    parent.postMessage(`<?php echo $data_result; ?>`, "*");

    // ***注意****
    // 以上这行代码可以把登录信息传回父窗口。（跨域）
    // 在生产环境中，为了安全，强烈建议把第二个参数 “*” 改为你的前端域名，即
    // parent.postMessage(`.....`, "http://your-domain.com");
    // 具体参见文档：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage

    // ***Notice****
    // The above code will transfer the login info to the parent window ignoring the CORS policy
    // For security reasons, it is strongly recommend to change the second parameter "*" to the domain of your frontend as follow:
    // parent.postMessage(`.....`, "http://your-domain.com");
    // Check the details on: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
  </script>
</body>

</html>