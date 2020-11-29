const http = require('http');

function main() {
    let body = [];
    const server = http.createServer((request, response) => {
        request.on('error', err => console.log('err', err));
        request.on('data', data => body.push(data.toString()));
        request.on('end', () => {
            console.log('request params', body);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end('Hello word!');
        });
    });
    server.listen(4396);
}

main();