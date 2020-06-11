import http, { IncomingMessage } from 'http';
import https from 'https';
import { IResponse } from './interfaces';
import { URL } from 'url';

const endMethod = (incomming: http.IncomingMessage, data: string, response: IResponse, resolve: (response: IResponse) => any): void => {
    response.headers = incomming.headers;

    if (data) {
        // Convert response data to JSON if incoming content-type is JSON.
        if (incomming.headers["content-type"] && new RegExp(/application\/json/i).test(incomming.headers["content-type"])) {
            response.data = JSON.parse(data);
        }
        else {
            response.data = data;
        }
    }
    else {
        response.data = null;
    }

    resolve(response);
};

export function get(url: string, options?: http.RequestOptions): Promise<IResponse> {
    const response = {} as IResponse;
    let data: string = '';
    let promise: Promise<IResponse>;

    options = options || [] as http.RequestOptions;

    if (url.slice(0, 5).toLowerCase() === 'https') {
        promise = new Promise<IResponse>((resolve) => {
            https.get(url, options!, (res) => {
                res.setEncoding('utf-8');

                res.on('data', (chunk: any) => {
                    data += chunk;
                });

                res.on('end', () => endMethod(res, data, response, resolve));
            });
        });
    }
    else {
        promise = new Promise<IResponse>((resolve) => {
            http.get(url, options!, (res) => {
                res.setEncoding('utf-8');

                res.on('data', (chunk: any) => {
                    data += chunk;
                });

                res.on('end', () => endMethod(res, data, response, resolve));
            });
        });
    }

    return promise;
}

export function post(url: string, options?: http.RequestOptions): Promise<IResponse> {
    const response = {} as IResponse;

    let data: string;
    let module: any; // either http or https.
    let parsedUrl: URL;
    let promise: Promise<IResponse>;

    options = options ? options : {};

    parsedUrl = new URL(url);
    console.log('url', url);
    console.log('parsedUrl', parsedUrl);
    options = Object.assign(
        {
            host: parsedUrl.hostname,
            method: 'POST',
            path: parsedUrl.pathname,
            port: parsedUrl.protocol === 'https:' ? 443 : 80,
        },
        options,
    );
    console.log('options', options);

    if (options!.port === 443) {
        module = https;
    }
    else {
        module = http;
    }

    promise = new Promise<IResponse>((resolve) => {
        module.request(options, (res: IncomingMessage) => {
            res.setEncoding('utf-8');

            res.on('data', (chunk: any) => {
                data += chunk;
            });

            res.on('end', () => endMethod(res, data, response, resolve));
        });
    });

    return promise;
}
