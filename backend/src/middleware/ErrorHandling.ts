import type {Request, Response, NextFunction} from 'express';
import ApiError from '../error/ApiError.js';

function errorHandling(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: 'Unexpected error'});
}

export default errorHandling;
