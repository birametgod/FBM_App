import { Router } from 'express';
import * as competency from '../controllers/competency';
import * as authorize from '../middleware/check-auth';

const router = Router();

router.get("/",competency.getCompetencies);
router.post("/", authorize.checkAuth('Admin'),competency.createCompetencies); //only admin

export default router;