
import { Router } from "express";
import * as fileManagerController from "../../controllers/admin/file-manager.controller";
import multer from "multer";
import { checkPermission } from "../../middlewares/admin/auth.middleware";

const router = Router();

const upload = multer();

router.get('/',checkPermission("file-manager"), fileManagerController.fileManager);

router.post('/upload',checkPermission("file-manager"), upload.array('files'), fileManagerController.uploadPost);

router.patch(
  '/change-file-name/:id', 
  upload.none(),
  checkPermission("file-manager"), 
  fileManagerController.changeFileNamePatch
);

router.delete('/delete-file/:id',checkPermission("file-manager"), fileManagerController.deleteFileDel);

router.post(
  '/folder/create', 
  upload.none(),
  checkPermission("file-manager"), 
  fileManagerController.createFolderPost
);


router.delete('/folder/delete',checkPermission("file-manager"), fileManagerController.deleteFolderDel);


router.get('/iframe',checkPermission("file-manager"), fileManagerController.iframe);


export default router;