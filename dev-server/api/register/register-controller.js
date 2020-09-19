// import { StringUtil } from '../../utilities/string-util'
const StringUtil = require('../../utilities/string-util')
import User from '../../model/user-model'

function index(req, res) {
    const validation = validateIndex(req.body)
    if (!validation.isValid) {
        return res.status(400).json({ message: validation.message})
    }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        first: req.body.first,
        last: req.body.last
    })

    // check to see if the error code matches 11000, So in Mongoose, 11000 validation error basically means that the user name was taken
    user.save(error => {
        if (error) {
            if (error.code === 11000) {
                return res.status(403).json({ message: 'Username is already taken!' })
            }
            console.log('error:', error)
            return res.status(500).json()
        }
        return res.status(201).json()
    })
}

function validateIndex(body) {
    let errors = ''
    if (StringUtil.isEmpty(body.username)) {
        errors += 'Username is required. '
    }
    if (StringUtil.isEmpty(body.password)) {
        errors += 'Password is required. '
    }
    if (StringUtil.isEmpty(body.first)) {
        errors += 'First name is required. '
    }
    if (StringUtil.isEmpty(body.last)) {
        errors += 'Last name is required. '
    }

    return {
        isValid: StringUtil.isEmpty(errors),
        message: errors
    }
}

module.exports = index