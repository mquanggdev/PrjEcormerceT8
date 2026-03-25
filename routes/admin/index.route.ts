
import { Router } from "express";
import dashboardRoutes from "./dashboard.route";
import articleRoutes from "./article.route";
import helperRoutes from "./helper.route";
import fileManagerRoutes from "./file-manager.route";
import roleRoutes from "./role.route";
import accountAdminRoutes from "./account-admin.route";
import accountRoutes from "./account.route";


import * as authMiddleware from "../../middlewares/admin/auth.middleware";
const router = Router();

router.use('/dashboard',authMiddleware.verifyToken, dashboardRoutes);
router.use('/article',authMiddleware.verifyToken, articleRoutes);
router.use('/helper',authMiddleware.verifyToken, helperRoutes);
router.use('/file-manager',authMiddleware.verifyToken, fileManagerRoutes);
router.use('/role',authMiddleware.verifyToken, roleRoutes);
router.use('/account-admin',authMiddleware.verifyToken, accountAdminRoutes);
router.use('/account', accountRoutes);

export default router;