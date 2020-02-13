import { Router } from 'express';
import { getUser, loginUser, signUp } from '../controllers/user';

const router = Router();

router.post("/login", loginUser);
router.post("/signUp", signUp);
router.get("/",getUser);

export default router;