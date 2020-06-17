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
  }
}
```

### POST Requests
`post` requests are similar to `get` requests, with the addition of a
`data` property to the `options` parameter.

__Note: more about `data` parameter, including examples, will be added.__

#### URL Encoded Form Data
Sending URL encoded form data.

```typescript
// Requesting an OAuth 2 bearer token.
  const data = querystring.stringify({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials'
  });

  // Make sure to set the correct Content-Type.
  tmp = await post(this.oauthUrl, {
      data,
      headers: {
          'Content-length': data.length,
          'Content-type': 'application/x-www-form-urlencoded',
      }
  });

  console.log('token', tmp.data);
```

**Output**
```sh
# OAuth 2 bearer token.
zgBUCUQneGqAwz44ghwXe82i54CI
```
