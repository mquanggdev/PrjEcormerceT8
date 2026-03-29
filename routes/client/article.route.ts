
import { Router } from "express";
import * as articleController from "../../controllers/client/article.controller";

const router = Router();

router.get('/category/:slug', articleController.articleByCategory);

export default router;