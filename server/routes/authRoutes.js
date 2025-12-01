// server/routes/authRoutes.js
import { Router } from 'express';
import { register, login, me, logout } from '../controllers/authController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();

// 注册 / 登录
router.post('/register', register);
router.post('/login', login);

// 当前登录用户信息
router.get('/me', requireAuth, me);

// 登出
router.post('/logout', requireAuth, logout);

export default router;
