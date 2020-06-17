import http, { IncomingMessage } from 'http';
import https from 'https';
import FormData from 'form-data';
import { IRequestOptions, IResponse } from './interfaces';
import { URL } from 'url';

// tslint:disable-next-line: max-line-length
const endMethod = (incoming: http.IncomingMessage, data: string, response: IResponse, resolve: (response: IResponse) => any): void => {
    response.headers = incoming.headers;

    if (data) {
        // Convert response data to JSON if incoming content-type is JSON.
        // tslint:disable-next-line: max-line-length
        if (incoming.headers["content-type"] && new RegExp(/application\/json/i).test(incoming.headers["content-type"])) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                response.data = JSON.parse(data);
            }
            catch (err) {
                if (err instanceof SyntaxError) {
                    response.data = data;
                }
            }
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
    let data = '';
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

export function post(url: string, options?: IRequestOptions): Promise<IResponse> {
    const response = {} as IResponse;

    let data = '';
    let module: any; // either http or https.
    let parsedUrl: URL;
    let promise: Promise<IResponse>;

    options = options ? options : {} as IRequestOptions;

    parsedUrl = new URL(url);
    options = Object.assign(
        {
            host: parsedUrl.hostname,
            method: 'POST',
            path: parsedUrl.pathname,
            port: parsedUrl.protocol === 'https:' ? 443 : 80,
        },
        options,
    );

    if (options!.port === 443) {
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
