import { IResponse } from './interfaces';

export const isIResponse = (obj: IResponse): obj is IResponse => (
    'data' in obj
    && 'headers' in obj
);
