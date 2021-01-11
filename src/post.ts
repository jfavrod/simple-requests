import http, { IncomingMessage } from 'http';
import https from 'https';
import FormData from 'form-data';
import { URL } from 'url';

import { IRequestOptions, IResponse } from './interfaces';
import endMethod from './endMethod';
import setOptions from './setOptions';

export function post(url: string, options?: IRequestOptions): Promise<IResponse> {
    const response = {} as IResponse;

    let data = '';
    let module: any; // either http or https.
    let parsedUrl: URL;
    let promise: Promise<IResponse>;

    options = options ? options : {} as IRequestOptions;
    parsedUrl = new URL(url);
    setOptions('POST', parsedUrl, options);

    if (options!.protocol === 'https:') {
        module = https;
    }
    else {
        module = http;
    }

    promise = new Promise<IResponse>((resolve) => {
        const req = module.request(options, (res: IncomingMessage) => {
            res.setEncoding('utf-8');

            res.on('data', (chunk: any) => {
                data += chunk;
            });

            res.on('end', () => endMethod(res, data, response, resolve));
        });

        if (options?.data) {
            if (options.data instanceof FormData) {
                options.data.pipe(req);
            }
            else {
                req.write(options.data);
            }
            req.end();
        }
    });

    return promise;
}

export default post;
