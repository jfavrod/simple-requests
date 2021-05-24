import { IResponse } from './interfaces';

const rejectMessage = 'Unclassified error.'

export default class RejectResponse implements IResponse {
    public data = rejectMessage;
    public error = true;

    public headers = {
        date: new Date().toUTCString(),
        'content-type': 'text/plain; charset=utf-8',
        'content-length': String(rejectMessage.length)
    };

    public constructor(error?: Error) {
        if (error) {
            this.data = error.message;
            this.headers['content-length'] = String(error.message.length);
        }
    }
}
