import { Router } from 'express';
import * as competency from '../controllers/competency';
import * as authorize from '../middleware/check-auth';

const router = Router();

router.get("/", authorize.checkAuth(),competency.getCompetencies);
router.post("/", authorize.checkAuth('Admin'),competency.createCompetencies)

export default router;