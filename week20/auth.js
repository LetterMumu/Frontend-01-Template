// 1. 浏览器发起登录
// https://github.com/login/oauth/authorize?client_id=Iv1.d3b16fc78dce20f6&redirect_uri=http%3A%2F%2Flocalhost%3A8080&state=78377

// 2. 服务端获取token，publish-server
let code = '7c40df08243768d2495f';
let state = '78377';
let client_secret = 'eb46f92b963c94a37d5a6901be99c8fbb97feb22';
let client_id = 'Iv1.d3b16fc78dce20f6';
let redirect_uri = encodeURIComponent('http://localhost:8080');

let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;

let xhr = new XMLHttpRequest();

xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true);
xhr.send(null);

xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
        console.log(event.responseText);
    }
});

// 3. 客户端/服务端调接口，publish-tool/publish-server
let xhr = new XMLHttpRequest();

xhr.open('GET', `https://api.github.com/user`, true);
xhr.setRequestHeader('Authorization', `token dbedfb6e4e4bf5aa6f6ade7628f43651db849efb`);
xhr.send(null);

xhr.addEventListener('readystatechange', function (event) {
    if (xhr.readyState === 4) {
        console.log(event.responseText);
    }
});