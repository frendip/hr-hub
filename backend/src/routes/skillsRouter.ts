import Router from 'express';
import skillsController from '../controllers/skillsController.js';

const router = Router();

router.get('/', skillsController.getAll);
router.get('/:id', skillsController.getById);
router.post('/', skillsController.create);
router.put('/', skillsController.update);
router.delete('/', skillsController.deleteAll);
router.delete('/:id', skillsController.deleteById);

export default router;
