import { URL } from 'url';
import { IRequestOptions } from './interfaces';

export function setOptions(method: string, parsedUrl: URL, options: IRequestOptions) {
    options.host = parsedUrl.hostname;
    options.method = method;
    options.path = parsedUrl.pathname;
    options.protocol = parsedUrl.protocol;

    if (parsedUrl.port) {
        options.port = parsedUrl.port;
    }
    else if (parsedUrl.protocol === 'https:') {
        options.port = 443;
    }
    else {
        options.port = 80;
    }
};

export default setOptions;
