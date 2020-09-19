import express from 'express'
// import * as controller from './register-controller'
const index = require('./register-controller')
const router = express.Router()

router.post('/register', index)

export default router