const frisby = require('frisby');
const host = 'http://localhost:8481';
const Base64 = require('js-base64').Base64;
let authdata = Base64.btoa('admin' + ':' + 'admin666');
let token = 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOjEsImlzcyI6IkJlYXV0eVNhbG9uIiwia2lkIjoiMTMwMTIyIiwiaWF0IjoxNTgwNDcxODYxLCJleHAiOjE2MTIwOTQyNjF9.CrJDr3SWv_JTnJLc8kpakFzh0KqKPJjNaKML4qfx2_f1rwaKVpV31d1muo0MlUwZm9r64vwWWgYFDdwOu1jfwA'

it('should be a main page', function () {
    return frisby.get( host + '/main' )
        .expect('status', 200);
});

it('should be a logged in as admin', function () {
    return frisby.post( host + '/v1/login' , {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${authdata}`
        },
    })
        .expect('status', 200);
});

it('should get all pages', function () {
    return frisby.get( host + '/v1/pages' , {
        headers: {
            'Authorization': token,
        },
    })
        .expect('status', 200);
});

it('should get all orders', function () {
    return frisby.get( host + '/v1/orders' , {
        headers: {
            'Authorization': token,
        },
    })
        .expect('status', 200);
});
