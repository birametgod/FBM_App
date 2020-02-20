import { Router } from 'express';
import * as city from '../controllers/city';
import * as authorize from '../middleware/check-auth';


const router = Router();

router.get("/",authorize.checkAuth(),city.getCities);
router.post("/", authorize.checkAuth('Admin'), city.createCity)

export default router;