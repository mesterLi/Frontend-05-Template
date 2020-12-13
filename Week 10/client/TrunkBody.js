class TrunkBody {
    constructor() {
        this.length = 0;
        this.content = [];
        this.state = start;
        this.isFinash = false;
    }
    receive(i) {
        this.state = this.state(this, i);
        // console.log(this.content, this.length);
        if (this.isFinash) {
            return;
        }
    }
}

function start(body, i) {
    if (i === '\n') {
        return start;
    }
    if (i === '\r') {
        return findTrunkBody;
    }
    this.length *= 16;
    this.length += parseInt(i, 16);
    return start;
}

function findTrunkBody(body, i) {
    if (i === '\n' || i === '\r') {
        return findTrunkBody;
    }
    if (body.length === 0) {
        return end;
    }
    body.content.push(i);
    body.length--;
    return findTrunkBody;
}

function end(body, b) {
    body.isFinash = true;
    return end;
}
module.exports = TrunkBody;