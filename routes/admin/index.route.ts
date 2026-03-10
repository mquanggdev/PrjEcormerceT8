
import { Router } from "express";
import dashboardRoutes from "./dashboard.route";
import articleRoutes from "./article.route";
const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/article', articleRoutes);

export default router;