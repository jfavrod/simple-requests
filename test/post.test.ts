import assert from 'assert'
import querystring from 'querystring';
import { post } from '../src';
import { isIResponse } from '../src/typegaurds';

describe('post JSON https', () => {
    it('Should return an IResponse with data', async () => {
        const res = await post('https://postman-echo.com/post', {
            data: JSON.stringify({
                hello: "world",
            }),
            headers: {
                'Content-type': 'application/json'
            },
        });

        assert.strictEqual(isIResponse(res), true);
        assert.strictEqual(typeof(res.data), 'object');
    });
});

describe('post URL encoded form data', () => {
    const form = querystring.encode({
        firstname: 'jason',
        lastname: 'favrod',
    });

    it('Should return an IResponse with string data', async () => {
        const res = await post('https://postman-echo.com/post', {
            data: form,
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
        });

        assert.strictEqual(isIResponse(res), true);
        assert.strictEqual(typeof(res.data), 'object');
    });
});
