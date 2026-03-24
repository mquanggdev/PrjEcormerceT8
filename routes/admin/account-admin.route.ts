
import { Router } from "express";
import * as accountAdminController from "../../controllers/admin/account-admin.controller";
import multer from "multer";
import * as accountAdminValidate from "../../validates/admin/account-admin.validate";

const router = Router();

const upload = multer();

router.get('/create', accountAdminController.create);

router.post(
  '/create', 
  upload.none(), 
  accountAdminValidate.createPost,
  accountAdminController.createPost
);

export default router;