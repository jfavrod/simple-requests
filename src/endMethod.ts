import http from 'http';
import { IResponse } from './interfaces';

// eslint-disable-next-line max-len
const endMethod = (incoming: http.IncomingMessage, data: string, response: IResponse, resolve: (response: IResponse) => any): void => {
    response.headers = incoming.headers;

    if (data) {
        // Convert response data to JSON if incoming content-type is JSON.
        // eslint-disable-next-line max-len
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

export default endMethod;
