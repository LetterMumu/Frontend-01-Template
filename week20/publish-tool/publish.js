const http = require('http');
const querystring = require('querystring')
const fs = require('fs');
var archiver = require('archiver');
const child_process = require('child_process');

const redirect_uri = encodeURIComponent('http://localhost:8081/auth');
child_process.exec(
  `start https://github.com/login/oauth/authorize?client_id=Iv1.d3b16fc78dce20f6&redirect_uri=${redirect_uri}&state=78377`,
);

const postData = querystring.stringify({
    'msg': 'Hello World!'
});
let packname = "./package"
const options = {
    host: 'localhost',
    port: 30000,
    path: '/?filename=package.zip',
    method: 'POST',
    headers: {
        "Content-Type": "application/octet-stream",
    }
};

var archive = archiver('zip', {
    zlib: {
        level: 9
    }
});

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});
archive.directory(packname, false);
archive.pipe(req);
archive.finalize();
archive.on("end", () => {
    
});

// let readStream = fs.createReadStream("./cat.jpg")
// readStream.pipe(req)
// readStream.on('end', () => {
//     req.end
// })
// req.write(postData);
// req.end