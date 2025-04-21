import {Router} from 'express';
import { addUser } from '../controllers/user.controller';
import validate from '../middlewares/validate.middlewware';
import { userValidation } from '../validators';

const router = Router();


router.post('/',validate(userValidation),addUser)

export default router;