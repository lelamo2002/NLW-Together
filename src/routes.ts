import { Router } from 'express'
import { CreateUserController } from './controllers/CreateUserController'
import { CreateTagController } from './controllers/CreateTagController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { ensureAthenticated } from './middlewares/ensureAuthenticated'
import { ListUserReceivedComplimentsController } from './controllers/ListUserReceivedComplimentsController'
import { ListUserSentComplimentsController } from './controllers/ListUserSentComplimentsController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUsersController } from './controllers/ListUsersController'
const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController()
const listUserSentComplimentsController = new ListUserSentComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post('/tags', ensureAthenticated, ensureAdmin, createTagController.handle)
router.get('/tags', ensureAthenticated, listTagsController.handle)

router.post('/users', createUserController.handle)
router.get('/users', ensureAthenticated, listUsersController.handle)

router.post('/login', authenticateUserController.handle)
router.post('/compliments', ensureAthenticated, createComplimentController.handle)

router.get('/users/compliments/received', ensureAthenticated, listUserReceivedComplimentsController.handle)
router.get('/users/compliments/sent', ensureAthenticated, listUserSentComplimentsController.handle)

export { router }
