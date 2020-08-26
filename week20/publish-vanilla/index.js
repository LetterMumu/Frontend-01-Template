const http = require('http');
const https = require('https');
const fs = require('fs');
const unzip = require('unzipper');

// Create an HTTP server
const server = http.createServer((req, res) => {

    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }
    if (req.url.match(/^\/favicon.ico/)) {
        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });
        res.end('not-found');
        return;
    }

    const options = {
        hostname: 'api.github.com',
        port: 443,
        path: `/user`,
        method: 'GET',
        headers: {
            Authorization: 'token ' + req.headers.token,
            'User-Agent': 'toy-publish',
        },
    };

    const request = https.request(options, (response) => {
        let body = '';
        response.on('data', (d) => {
            if (d) {
                body += d.toString();
            }
        });
        response.on('end', () => {
            let user = JSON.parse(body);
            let writeStream = unzip.Extract({
                path: '../server/public'
            });
            req.pipe(writeStream);
            req.on('end', () => {
                console.log('writeStream end');
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('okay');
            });
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
});

function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];

    let code = '7c40df08243768d2495f';
    let state = '78377';
    let client_secret = 'eb46f92b963c94a37d5a6901be99c8fbb97feb22';
    let client_id = 'Iv1.d3b16fc78dce20f6';
    let redirect_uri = encodeURIComponent('http://localhost:8080');

    let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`;
    let url = `https://github.com/login/oauth/access_token?${params}`;

    const options = {
        hostname: 'github.com',
        port: 443,
        path: `/login/oauth/access_token?${params}`,
        method: 'POST',
    };

    const request = https.request(options, (response) => {

        response.on('data', (d) => {
            let result = d.toString().match(/access_token=([^&]+)/);

            if (result) {
                let token = result[1];
                console.log('token', token);

                res.writeHead(200, {
                    'Set-Cookie': token,
                    access_token: token,
                    'Content-Type': 'text/html',
                });
                res.end(
                    `<a href="http://localhost:8080/publish?token=${token}">publish</a>`,
                );
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/plain',
                });
                res.end('error');
            }
        });
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.end();
}


server.listen(8081);