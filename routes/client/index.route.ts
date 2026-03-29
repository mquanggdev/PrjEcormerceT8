
import { Router } from "express";
import homeRoutes from "./home.route";
import * as categoryMiddleware from "../../middlewares/client/category.middleware";

const router = Router();
router.use(categoryMiddleware.getAllCategory);

router.use('/', homeRoutes);

export default router;