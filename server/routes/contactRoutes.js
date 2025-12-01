// server/routes/contactRoutes.js
import { Router } from 'express';
import {
  getAll,
  getById,
  create,
  updateById,
  removeById,
  removeAll
} from '../controllers/contactController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';

const router = Router();

// Admin：查看所有 Contact
router.get('/', requireAuth, requireAdmin, getAll);
router.get('/:id', requireAuth, requireAdmin, getById);

// 普通访客也可以提交联系表单（Create）
router.post('/', create);

// Admin：更新 / 删除
router.put('/:id', requireAuth, requireAdmin, updateById);
router.delete('/:id', requireAuth, requireAdmin, removeById);
router.delete('/', requireAuth, requireAdmin, removeAll);

export default router;
