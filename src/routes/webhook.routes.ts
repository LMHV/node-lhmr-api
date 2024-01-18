import { Request, Response, NextFunction, Router } from 'express';
import WebhookController from '../controllers/webhook.controllers';

const router = Router();

router.post('/', WebhookController.handleWebhook)

export default router

