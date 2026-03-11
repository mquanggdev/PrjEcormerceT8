
import { Router } from "express";
import dashboardRoutes from "./dashboard.route";
import articleRoutes from "./article.route";
import helperRoutes from "./helper.route";
const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/article', articleRoutes);
router.use('/helper', helperRoutes);

export default router;