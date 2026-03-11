
import { Router } from "express";
import * as articleController from "../../controllers/admin/article.controller";
import multer from "multer";
import * as articleValidate from "../../validates/admin/article.validate";

const router = Router();

const upload = multer();

router.get('/category', articleController.category);
router.get('/category/trash', articleController.trashCategory);

router.get('/category/create', articleController.createCategory);

router.post(
  '/category/create', 
  upload.none(), 
  articleValidate.createCategoryPost, 
  articleController.createCategoryPost
);


router.get('/category/edit/:id', articleController.editCategory);

router.patch(
  '/category/edit/:id', 
  upload.none(), 
  articleValidate.createCategoryPost, 
  articleController.editCategoryPatch
);
router.patch('/category/delete/:id', articleController.deleteCategoryPatch);

router.patch('/category/undo/:id', articleController.undoCategoryPatch);

router.delete('/category/destroy/:id', articleController.destroyCategoryDelete);



export default router;