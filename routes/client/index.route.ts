
import { Router } from "express";
import homeRoutes from "./home.route";
import articleRoutes from "./article.route";
import * as categoryMiddleware from "../../middlewares/client/category.middleware";
import productRoutes from "./product.route";

const router = Router();
router.use(categoryMiddleware.getAllCategory);

router.use('/', homeRoutes);
router.use('/article', articleRoutes);
router.use('/product', productRoutes);

export default router;