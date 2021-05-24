import assert from 'assert'
import { get } from '../src';
import { isIResponse } from '../src/typegaurds';

describe('get https, JSON content-type', () => {
    it('Should return an IResponse with string data', async () => {
        const res = await get('https://postman-echo.com/get?foo1=bar1&foo2=bar2');
        assert.strictEqual(isIResponse(res), true);
        assert.strictEqual(typeof(res.data), 'object');
    })
    .slow(1234)
    .timeout(2000);

    it('Should error in response on error', async () => {
        const res = await get('https://example.notld');
        assert.strictEqual(isIResponse(res), true);
        assert.ok(res.error, 'Should return an error in response.');
    })
    .slow(1234)
    .timeout(2000);
});
