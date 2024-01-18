import Router from 'express';
import specialistsController from '../controllers/specialistsController.js';
import specialistTimeCheck from '../middleware/SpecialistTimeCheck.js';

const router = Router();

router.get('/', specialistsController.getAll);
router.get('/:id', specialistsController.getById);
router.post('/', specialistTimeCheck, specialistsController.create);
router.put('/', specialistTimeCheck, specialistsController.update);
router.delete('/', specialistsController.deleteAll);
router.delete('/:id', specialistsController.deleteById);

export default router;
