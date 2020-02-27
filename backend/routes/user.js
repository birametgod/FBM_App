import { Router } from 'express';
import * as userController from '../controllers/user';
import * as authorize from '../middleware/check-auth';
import extractFile from '../middleware/file';


const router = Router();

router.post("/login",userController.loginUser); //simple Route

router.post("/signUp", extractFile, userController.signUp);

router.get("/",authorize.checkAuth(['Admin','Freelance']),userController.getUserBySimpleUser);

router.get("/userTag",userController.getUserByTag);

router.get("/admin",authorize.checkAuth('Admin'), userController.getUser); //only Admin

router.put('/:id', authorize.checkAuth(), extractFile, userController.updateUser);

router.get("/:id",userController.getUserId);

export default router;