
import { Router } from "express";
import * as roleController from "../../controllers/admin/role.controller";
import multer from "multer";
import * as roleValidate from "../../validates/admin/role.validate";

const router = Router();

const upload = multer();

router.get('/create', roleController.create);

router.post(
  '/create', 
  upload.none(), 
  roleValidate.createPost,
  roleController.createPost
);

router.get('/list', roleController.list);

export default router;