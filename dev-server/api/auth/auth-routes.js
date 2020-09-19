import express from 'express'
// import * as controller from './auth-controller'
const index = require('./auth-controller')
const router = express.Router()

router.post('/auth', index)

export default router