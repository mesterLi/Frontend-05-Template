const Request = require('./Request');
const parse = require('./parse');

void async function () {
    const req = new Request({
        method: 'POST',
        port: 4396,
        host: '127.0.0.1',
        path: '/',
        headers: {
            'X-Token': 'Bear asasjppojqw1jpoasckjas;',
            'Content-Type': 'application/json'
        },
        body: {
            name: 'thankslyh',
            password: '123456'
        }
    });
    const res = await req.send();
    const dom = parse(res.body);
    console.log('res', dom);
}()