import assert from 'assert'
import { get } from '../src';
import { isIResponse } from '../src/typegaurds';

describe('get https, JSON content-type', () => {
    it('Should return an IResponse with string data', async () => {
        const res = await get('https://postman-echo.com/get?foo1=bar1&foo2=bar2');
        assert.strictEqual(isIResponse(res), true);
        assert.strictEqual(typeof(res.data), 'object');
    });
});
