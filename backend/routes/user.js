import { Router } from 'express';
import * as userController from '../controllers/user';
import * as authorize from '../middleware/check-auth';

const router = Router();

router.post("/login",userController.loginUser); //simple Route
router.post("/signUp", userController.signUp);
router.get("/",authorize.checkAuth(['Admin','Freelance']),userController.getUserBySimpleUser);
router.get("/userTag",userController.getUserByTag);
router.get("/admin",authorize.checkAuth('Admin'), userController.getUser); //only Admin

export default router;