import { Router } from 'express';
import { getCompetencies } from '../controllers/competency';

const router = Router();

router.get("/",getCompetencies);

export default router;