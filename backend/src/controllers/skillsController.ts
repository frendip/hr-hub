import type {NextFunction, Request, Response} from 'express';
import Connection from '../db/connection.js';
import ApiError from '../error/ApiError.js';
import {ISkill, ISkillRaw} from '../types/ISkill.js';

class SkillsController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const skills = await Connection.getSkills();

            res.status(200).json({skills, message: 'Skills get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;
            const skill = await Connection.getSkills(id);

            if (skill === undefined) {
                return next(ApiError.badRequest('Non-existent skill id'));
            }

            res.status(200).json({skill, message: 'Skill get successfully'});
        } catch (error) {
            console.error('Error executing SELECT query,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const skillData: ISkillRaw = req.body;
            const newSkill = await Connection.insertSkill(skillData);

            res.status(200).json({skill: newSkill, message: 'Skill inserted successfully'});
        } catch (error) {
            console.error('Error creating skill,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const newSkillData: ISkill = req.body;
            const skill = await Connection.updateSkill(newSkillData);

            res.status(200).json({skill, message: 'Skill updated successfully'});
        } catch (error) {
            console.error('Error updating skill,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteAll(req: Request, res: Response, next: NextFunction) {
        try {
            const deleteCount = await Connection.deleteSkills();

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'All skills have been deleted successfully'});
        } catch (error) {
            console.error('Error deleting skill,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }

    async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = +req.params.id;

            const deleteCount = await Connection.deleteSkills(id);

            if (!deleteCount) {
                return next(ApiError.badRequest('Nothing to delete'));
            }

            res.status(200).json({message: 'Skill was successfully deleted'});
        } catch (error) {
            console.error('Error deleting skill,', error);

            return next(ApiError.internal('Internal Server Error'));
        }
    }
}

export default new SkillsController();
