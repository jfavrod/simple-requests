import http from 'http';
import https from 'https';
import { IResponse } from './interfaces';

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
