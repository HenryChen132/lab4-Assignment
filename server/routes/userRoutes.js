// server/routes/userRoutes.js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  updateById,
  removeById,
  removeAll
} from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// 用户管理只给 Admin 用
router.get('/', requireAuth, requireAdmin, getAll);
router.get('/:id', requireAuth, requireAdmin, getById);
router.post('/', requireAuth, requireAdmin, create);
router.put('/:id', requireAuth, requireAdmin, updateById);
router.delete('/:id', requireAuth, requireAdmin, removeById);
router.delete('/', requireAuth, requireAdmin, removeAll);

export default router;
