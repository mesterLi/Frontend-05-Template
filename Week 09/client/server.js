const http = require('http');

function main() {
    let body = [];
    const server = http.createServer((request, response) => {
        request.on('error', err => console.log('err', err));
        request.on('data', data => body.push(data.toString()));
        request.on('end', () => {
            console.log('request params', body);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(`<html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Title</title>
            </head>
            <style>
                #red {
                    width: 100px;
                    height: 100px;
                    background: red;
                }
            </style>
            <body>
                <div id="red" data-test="12333"></div>
                <img/>
            </body>
            </html>
            `);
        });
    });
    server.listen(4396);
}

main();