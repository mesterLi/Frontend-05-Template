const Request = require('./Request');

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
    console.log('res', res);
}()