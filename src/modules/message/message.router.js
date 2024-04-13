import { Router } from "express";
import * as MessageController from './message.controller.js';
import { asyncHandler } from './../../utils/errorHandling.js';
import auth from './../../middleware/auth.middleware.js';
const router =Router();
router.get('/',auth,asyncHandler(MessageController.getMessages));
router.post('/:receiverId',MessageController.sendMessage);


export default router;