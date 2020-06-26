import assert from 'assert'
import { post } from '../src';
import { isIResponse } from '../src/typegaurds';

describe('post JSON https', () => {
    it('Should return an IResponse with string data', async () => {
        const res = await post('https://postman-echo.com/post', {
            data: JSON.stringify({
                hello: "world",
            })
        });
        assert.strictEqual(isIResponse(res), true);
        assert.strictEqual(typeof(res.data), 'object');
    });
});
