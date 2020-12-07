const TrunkBody = require('./TrunkBody');

class ResponseParser {
    constructor() {
        this.str = '';
        this.headers = {};
        this.firstLine = '';
        this.headerkey = '';
        this.headerValue = '';
        this.length = 0;
        this.isFinash = false;
        this.bodyParser = new TrunkBody();
    }
    receive(str) {
        let state = start;
        for (let i of str) {
            state = state(this, i);
        }
        if (this.bodyParser.isFinash) {
            console.log(this.bodyParser);
        }
    }

    getResponse() {
        this.firstLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
}

function start(response, i) {
    if (i === '\r') {
        return findHeaderKey;
    }
    response.firstLine += i;
    return start;
}
function findHeaderKey(response, i) {
    if (i === ':') {
        return findheaderColon;
    }
    if (i === '\r') {
        return findBody;
    }
    if (i === '\n') {
        return findHeaderKey;
    }
    response.headerkey += i;
    return findHeaderKey;
}

function findHeaderValue(response, i) {
    if (i === '\r') {
        response.headers[response.headerkey] = response.headerValue;
        response.headerkey = '';
        response.headerValue = '';
        return findHeaderKey;
    }
    response.headerValue += i;
    return findHeaderValue;
}

function findheaderColon(response, i) {
    if (i === ' ') {
        return findHeaderValue;
    }
    response.isFinash = true;
    return end;
}

function end(response, i) {

    return end;
}
function findBody(response, i) {
    response.bodyParser.receive(i);
    return findBody;
}

module.exports = ResponseParser;