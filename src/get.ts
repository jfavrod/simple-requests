import http from 'http';
import https, { RequestOptions } from 'https';

import endMethod from './endMethod';
import { IResponse } from './interfaces';
import RejectResponse from './RejectResponse';

export const get = (url: string, options?: RequestOptions): Promise<IResponse> => {
    const response = {} as IResponse;
    let data = '';
    let promise: Promise<IResponse>;

    options = options || [] as RequestOptions;

    if (url.slice(0, 5).toLowerCase() === 'https') {
        promise = new Promise<IResponse>((resolve) => {
            try {
                https.get(url, options as RequestOptions, (res) => {
                    res.setEncoding('utf-8');

                    res.on('data', (chunk: any) => {
                        data += chunk;
                    });

                    res.on('error', () => resolve(new RejectResponse()));
                    res.on('end', () => endMethod(res, data, response, resolve));
                })
                .on('abort', () => resolve(new RejectResponse()))
                .on('error', () => resolve(new RejectResponse()));
            }
            catch (err) {
                const rr = new RejectResponse(err);
                resolve(rr);
            }
        });
    }
    else {
        promise = new Promise<IResponse>((resolve) => {
            try {
                http.get(url, options as RequestOptions, (res) => {
                    res.setEncoding('utf-8');

                    res.on('data', (chunk: any) => {
                        data += chunk;
                    });

                    res.on('error', () => resolve( { headers: { "content-length": "0"}, data: {} } ));
                    res.on('end', () => endMethod(res, data, response, resolve));
                })
                .on('abort', () => resolve(new RejectResponse()))
                .on('error', () => resolve(new RejectResponse()));
            }
            catch (err) {
                const rr = new RejectResponse(err);
                resolve(rr);
            }
        });
    }

    return promise;
}

export default get;
