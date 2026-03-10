
import { Router } from "express";
import * as articleController from "../../controllers/admin/article.controller";
import multer from "multer";
import * as articleValidate from "../../validates/admin/article.validate";

const router = Router();

const upload = multer();

router.get('/category', articleController.category);

router.get('/category/create', articleController.createCategory);

router.post(
  '/category/create', 
  upload.none(), 
  articleValidate.createCategoryPost, 
  articleController.createCategoryPost
);

export default router;