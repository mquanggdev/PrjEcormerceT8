
import { Router } from "express";
import homeRoutes from "./home.route";
import articleRoutes from "./article.route";
import * as categoryMiddleware from "../../middlewares/client/category.middleware";
import * as attributeMiddleware from "../../middlewares/client/attribute.middleware";
import productRoutes from "./product.route";
import compareRoutes from "./compare.route";
import cartRoutes from "./cart.route";
import wishlistRoutes from "./wishlist.route";
import authRoutes from "./auth.route";
import dashboardRoutes from "./dashboard.route";
import * as authMiddleware from "../../middlewares/client/auth.middleware";
import couponRoutes from "./coupon.route";

const router = Router();
router.use(categoryMiddleware.getAllCategory);
router.use(attributeMiddleware.getAttributeProduct);
router.use(authMiddleware.verifyToken);

router.use('/', homeRoutes);
router.use('/article', articleRoutes);
router.use('/product', productRoutes);
router.use('/cart', cartRoutes);
router.use('/compare', compareRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/auth', authRoutes);
router.use('/dashboard', authMiddleware.loggedIn, dashboardRoutes);
router.use('/coupon', couponRoutes);
export default router;