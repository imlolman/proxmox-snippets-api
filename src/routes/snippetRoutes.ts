import { Router } from 'express';
import { saveSnippet } from '../controllers/snippetController';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();

router.post('/snippet', validateRequest, saveSnippet);

export default router; 