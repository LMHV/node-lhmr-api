import { Request, Response, NextFunction, Router } from 'express';
import { getUsers, createUser/*, getUser, modifyUser, deleteUser, findUser*/ } from '../controllers/user.controllers'
import bodyParser from 'body-parser'

const router = Router();

router.get('/', getUsers)
//router.post('/', createUser)
router.post('/webhook', bodyParser.raw({ type: 'application/json' }), createUser)

/*
router.get('/:id', getUser)


router.put('/:id', modifyUser)

router.delete('/:id', deleteUser)

router.post('/find', findUser)
*/

export default router