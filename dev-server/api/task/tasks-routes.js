import express from 'express'
import * as controller from './tasks-controller'
import * as auth from '../../services/auth-service'

const router = express.Router()

router.post('/task', auth.requireLogin, controller.create)
router.get('/task', auth.requireLogin, controller.index)
router.get('/task/:id', auth.requireLogin, controller.show)
router.put('/task', auth.requireLogin, controller.update)
router.delete('/task/:id', auth.requireLogin, controller.remove)

export default router

// middleware: auth.requireLogin
// every time a user tries to access any of these end points, it'll run this
// middleware, check for the token and make sure that users logged in and if they are, it'll return it.