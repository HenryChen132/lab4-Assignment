// server/routes/qualificationRoutes.js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  updateById,
  removeById,
  removeAll
} from '../controllers/qualificationController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// 所有人可以查看 education / qualification
router.get('/', getAll);
router.get('/:id', getById);

// 只有 Admin 可以增删改
router.post('/', requireAuth, requireAdmin, create);
router.put('/:id', requireAuth, requireAdmin, updateById);
router.delete('/:id', requireAuth, requireAdmin, removeById);
router.delete('/', requireAuth, requireAdmin, removeAll);

export default router;
