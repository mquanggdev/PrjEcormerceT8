
import { Router } from "express";
import homeRoutes from "./home.route";
import articleRoutes from "./article.route";
import * as categoryMiddleware from "../../middlewares/client/category.middleware";
import * as attributeMiddleware from "../../middlewares/client/attribute.middleware";
import productRoutes from "./product.route";

const router = Router();
router.use(categoryMiddleware.getAllCategory);
router.use(attributeMiddleware.getAttributeProduct);

router.use('/', homeRoutes);
router.use('/article', articleRoutes);
router.use('/product', productRoutes);

export default router;