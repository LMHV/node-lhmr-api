import { Request, Response, NextFunction, Router } from 'express';
import { getUsers/*, getUser, createUser, modifyUser, deleteUser, findUser*/ } from '../controllers/user.controllers.ts'

const router = Router();

router.get('/', getUsers)
/*
router.get('/:id', getUser)

router.post('/', createUser)

router.put('/:id', modifyUser)

router.delete('/:id', deleteUser)

router.post('/find', findUser)
*/

export default router