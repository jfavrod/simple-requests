import http from 'http';
import FormData from 'form-data';

export interface IResponse {
    data: any;
    headers: http.IncomingHttpHeaders;
}

export interface IRequestOptions extends http.RequestOptions {
    data: string | FormData;
}
