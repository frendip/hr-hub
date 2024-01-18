import Router from 'express';
import specialistsRouter from './specialistsRouter.js';
import skillsRouter from './skillsRouter.js';
import interviewsRouter from './interviewsRouter.js';

const router = Router();

router.use('/specialists', specialistsRouter);
router.use('/skills', skillsRouter);
router.use('/interviews', interviewsRouter);

export default router;
