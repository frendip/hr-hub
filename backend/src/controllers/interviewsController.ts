import type {NextFunction, Response, Request} from 'express';
import Connection from '../db/connection.js';
import ApiError from '../error/ApiError.js';
import {IInterview, IInterviewRaw} from '../types/IInterview.js';

class InterviewsController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const interviews = await Connection.getInterviews();

            res.status(200).json({interviews, message: 'Interviews get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const interview = await Connection.getInterviews(id);

            if (interview === undefined) {
                return next(ApiError.badRequest('Non-existent interview id'));
            }

            res.status(200).json({interview, message: 'Interview get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const interviewData: IInterviewRaw = req.body;
            const newInterview = await Connection.insertInterview(interviewData);

            res.status(200).json({interview: newInterview, message: 'Interview inserted successfully'});
        } catch (error) {
            console.error('Error creating interview,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newInterviewData: IInterview = req.body;
            const interview = await Connection.updateInterview(newInterviewData);

            res.status(200).json({interview, message: 'Interview updated successfully'});
        } catch (error) {
            console.error('Error updating interview,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCount = await Connection.deleteInterviews();

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'All interviews have been deleted successfully'});
        } catch (error) {
            console.error('Error deleting interviews,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;

            const deleteCount = await Connection.deleteInterviews(id);

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'Interview was successfully deleted'});
        } catch (error) {
            console.error('Error deleting interview,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

export default new InterviewsController();
