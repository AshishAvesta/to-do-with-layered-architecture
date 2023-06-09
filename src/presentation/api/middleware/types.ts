// types.ts
import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user?: any;  // or the type of your user if you have one
    }
}
