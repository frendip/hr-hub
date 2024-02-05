import type {Response, Request, NextFunction} from 'express';
import ApiError from '../error/ApiError.js';
import Connection from '../db/connection.js';
import {ISpecialist, ISpecialistRaw} from '../types/ISpecialist.js';

class SpecialistsController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const specialists = await Connection.getSpecialists();

            res.status(200).json({specialists, message: 'Specialists get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const specialist = await Connection.getSpecialists(id);

            if (specialist === undefined) {
                return next(ApiError.badRequest('Non-existent specialist id'));
            }

            res.status(200).json({specialist, message: 'Specialist get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const specialistData: ISpecialistRaw = req.body;
            const newSpecialist = await Connection.insertSpecialist(specialistData);

            res.status(200).json({specialist: newSpecialist, message: 'Specialist inserted successfully'});
        } catch (error) {
            console.error('Error creating specialist,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newSpecialistData: ISpecialist = req.body;
            const specialist = await Connection.updateSpecialist(newSpecialistData);

            res.status(200).json({specialist, message: 'Specialist updated successfully'});
        } catch (error) {
            console.error('Error updating specialist,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCount = await Connection.deleteSpecialists();

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'All specialists have been deleted successfully'});
        } catch (error) {
            console.error('Error deleting specialists,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;

            const deleteCount = await Connection.deleteSpecialists(id);

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'Specialist was successfully deleted'});
        } catch (error) {
            console.error('Error deleting specialist,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

export default new SpecialistsController();
