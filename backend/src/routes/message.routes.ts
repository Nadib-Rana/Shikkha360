import express from 'express';
import { sendMessage, getMessagesForUser } from '../controllers/message.controller';

const router = express.Router();

router.post('/', sendMessage);
router.get('/user/:userId', getMessagesForUser);

export default router;