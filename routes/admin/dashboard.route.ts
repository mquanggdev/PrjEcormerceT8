
import { Router } from "express";
import * as dashboardController from "../../controllers/admin/dashboard.controller";
import { checkPermission } from "../../middlewares/admin/auth.middleware";

const router = Router();

router.get('/',checkPermission("dashboard"), dashboardController.dashboard);

export default router;