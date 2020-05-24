import http from 'http';

export interface IResponse {
    data: any;
    headers: http.IncomingHttpHeaders;
}
