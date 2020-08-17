const http = require('http');
const fs = require('fs');
const proxy = http.createServer((req, res) => {
    // let match = feq.url.match(/filename=([^&]+)/)
    // let filename = (match && match[1])
    // if (!filename)
    //     return
    // const stream = fs.createReadStream(`../server/public${filename}`);
    // res.pipe(stream)
    let writeStream = unzip.Extract({
        path: "../server/public"
    })
    req.pipe(writeStream)
    res.on('end', () => {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('okay');
    })
});

serve.listen(90000)