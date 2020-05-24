import { IResponse } from './interfaces';

export function isIResponse(obj: any): obj is IResponse {
    return (
        'data' in obj
        && 'headers' in obj
    );
}
