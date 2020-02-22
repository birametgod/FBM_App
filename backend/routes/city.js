import { Router } from 'express';
import * as city from '../controllers/city';
import * as authorize from '../middleware/check-auth';

const router = Router();

router.get("/",city.getCities); // all authenticated users
router.post("/", authorize.checkAuth('Admin'), city.createCity) //only admin

export default router;