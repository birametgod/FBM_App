import { Router } from 'express';
import { getCities } from '../controllers/city';

const router = Router();

router.get("/",getCities);

export default router;