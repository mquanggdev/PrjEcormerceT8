
import { Router } from "express";
import * as accountController from "../../controllers/admin/account.controller";
import multer from "multer";
import * as accountValidate from "../../validates/admin/account.validate";

const router = Router();

const upload = multer();

router.get('/login', accountController.login);

router.post(
  '/login', 
  upload.none(),
  accountValidate.loginPost,
  accountController.loginPost
);

router.get('/logout', accountController.logout);

export default router;