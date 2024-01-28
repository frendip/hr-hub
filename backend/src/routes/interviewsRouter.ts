import Router from 'express';
import interviewsController from '../controllers/interviewsController.js';

const router = Router();

router.get('/', interviewsController.getAll);
router.get('/:id', interviewsController.getById);
router.post('/', interviewsController.create);
router.put('/', interviewsController.update);
router.delete('/', interviewsController.deleteAll);
router.delete('/:id', interviewsController.deleteById);

export default router;
