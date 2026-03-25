
import { Router } from "express";
import dashboardRoutes from "./dashboard.route";
import articleRoutes from "./article.route";
import helperRoutes from "./helper.route";
import fileManagerRoutes from "./file-manager.route";
import roleRoutes from "./role.route";
import accountAdminRoutes from "./account-admin.route";
import accountRoutes from "./account.route";
const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/article', articleRoutes);
router.use('/helper', helperRoutes);
router.use('/file-manager', fileManagerRoutes);
router.use('/role', roleRoutes);
router.use('/account-admin', accountAdminRoutes);
router.use('/account', accountRoutes);

export default router;