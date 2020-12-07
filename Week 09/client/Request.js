const net = require('net');

const ResponseParser = require('./ResponseParser');

const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_FORM = 'application/x-www-form-urlencoded';

class Request {
    constructor(opts) {
        const {
            path = '/',
            method = 'GET',
            port = 80,
            host = '',
            headers = {
                'Content-Type': CONTENT_TYPE_JSON,
            },
            body = {}
        } = opts;
        this.path = path;
        this.port = port;
        this.method = method;
        this.host = host;
        this.body = body;
        this.headers = headers;
        if (this.headers['Content-Type'] === CONTENT_TYPE_JSON) {
            this.bodyText = JSON.stringify(body);
        } else if (this.headers['Content-Type'] === CONTENT_TYPE_FORM) {
            this.bodyText = Object.keys(this.body).map(key => `${key}=${this.body[key]}`).join('&');
        }
        this.headers['Content-Length'] = this.bodyText.length;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            let response = new ResponseParser();
            // console.log(this.toString())
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    port: this.port,
                    host: this.host
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('error', err => {
                console.log('err', err);
                reject(err)
            });
            connection.on('data', data => response.receive(data.toString()));
            connection.on('end', () => {
                resolve(response.getResponse());
                connection.end();
            });
        })
    }

    end() {
        return 'end';
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`
    }
}

module.exports = Request;