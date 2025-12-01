// server/routes/projectRoutes.js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  updateById,
  removeById,
  removeAll
} from '../controllers/projectController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// 所有人都可以查看项目列表
router.get('/', getAll);
router.get('/:id', getById);

// 只有 Admin 才能增删改
router.post('/', requireAuth, requireAdmin, create);
router.put('/:id', requireAuth, requireAdmin, updateById);
router.delete('/:id', requireAuth, requireAdmin, removeById);
router.delete('/', requireAuth, requireAdmin, removeAll);

export default router;
