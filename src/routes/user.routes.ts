import { Request, Response, NextFunction, Router } from 'express';
import { getUsers } from '../controllers/user.controllers'

const router = Router();

router.get('/', getUsers)
//router.post('/', createUser)

/*
router.get('/:id', getUser)


router.put('/:id', modifyUser)

router.delete('/:id', deleteUser)

router.post('/find', findUser)
*/

export default router