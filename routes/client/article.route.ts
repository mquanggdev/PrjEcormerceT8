
import { Router } from "express";
import * as articleController from "../../controllers/client/article.controller";
import { getPopularBlog } from "../../middlewares/client/article.middleware";

const router = Router();


router.get(
  '/category/:slug', 
  getPopularBlog,
  articleController.articleByCategory
);

export default router;