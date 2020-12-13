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
                <meta charset="UTF-8"/>
                <title>Title</title>
            </head>
            <style>
                #container {
                    width: 200px;
                    height: 200px;
                    display: flex;
                    flex-wrap: wrap;
                    background-color: rgb(255, 255, 255);
                }
                .red {
                	width: 100px;
                	height: 100px;
                	background-color: rgb(255, 0, 0);
                }
                .green {
                	width: 100px;
                	height: 100px;
                	background-color: rgb(0, 255, 0);
                }
                .black {
                	width: 100px;
                	height: 100px;
                	background-color: rgb(0, 0, 0);
                }
            </style>
            <body>
                <div id="container">
                	<div class="red"/>
                	<div class="green"/>
                	<div class="black"/>
								</div>
            </body>
            </html>`);
        });
    });
    server.listen(4396);
}

main();
