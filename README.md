simple-requests
===============
A package for making simple HTTP requests (GET, POST, PUT, DELETE).

Installation
------------
```
npm install simple-requests
```

Use
---
### GET Request

**JavaScript**
```javascript
const { get } = require('simple-requests');

get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
.then((res) => console.log(res));
```

**TypeScript**
```typescript
import { get } from 'simple-requests';

(async () => {
    const res = await get('https://postman-echo.com/get?foo1=bar1&foo2=bar2')
    console.log(res);
})();
```

### Responses
`get` requests returns objects with the `IResponse` interface:

```typescript
interface IResponse {
    data: any;
    headers: http.IncomingHttpHeaders;
}
```

**Example Response**
```javascript
{
  headers: {
    date: 'Thu, 28 May 2020 04:20:44 GMT',
    'content-type': 'application/json; charset=utf-8',
    'content-length': '247',
    connection: 'close',
    etag: 'W/"f7-wONllpKRvpcZ0DGneUbLd5irmW0"',
    vary: 'Accept-Encoding',
    'set-cookie': [
      'sails.sid=s%3Ab_94okJLKIMCu8R20ZCVCvl1nZkXXc40.SqaDcfefqu6ZSDm%2FVuJ%2BZPsrjmXN1GHy%2FrzUyIpFxC0; Path=/; HttpOnly'
    ]
  },
  data: {
    args: { foo1: 'bar1', foo2: 'bar2' },
    headers: {
      'x-forwarded-proto': 'https',
      'x-forwarded-port': '443',
      host: 'postman-echo.com',
      'x-amzn-trace-id': 'Root=1-5ecf3c1c-400b4810d8ccc7b015b0dc88'
    },
    url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2'
  }
}
```
