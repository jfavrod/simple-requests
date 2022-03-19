import http, { OutgoingHttpHeaders } from 'http';
import FormData from 'form-data';

export interface IOutgoingHeaders extends OutgoingHttpHeaders {
    [index: string]: any;
}

export interface IResponse {
    data: unknown;
    error?: boolean;
    headers: http.IncomingHttpHeaders;
}

export interface IRequestOptions extends http.RequestOptions {
    data: string | FormData;
    headers: IOutgoingHeaders;
}
