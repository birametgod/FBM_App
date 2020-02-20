import { Router } from 'express';
import * as userController from '../controllers/user';
import * as authorize from '../middleware/check-auth';


const router = Router();

router.post("/login",userController.loginUser);
router.post("/signUp", userController.signUp);
router.get("/",userController.getUserBySimpleUser);
router.get("/admin",authorize.checkAuth('Admin'), userController.getUser);


export default router;