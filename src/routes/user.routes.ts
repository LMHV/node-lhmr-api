import { Request, Response, NextFunction, Router } from 'express';
import { createUser, getUsers } from '../controllers/user.controllers'

const router = Router();

router.get('/', getUsers)

export default router