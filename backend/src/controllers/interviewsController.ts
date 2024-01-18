import type {Response, Request} from 'express';

class InterviewsController {
  async getAll(req: Request, res: Response) {}
  async getById(req: Request, res: Response) {}
  async create(req: Request, res: Response) {}
  async updateById(req: Request, res: Response) {}
  async deleteAll(req: Request, res: Response) {}
  async deleteById(req: Request, res: Response) {}
}

export default new InterviewsController();
