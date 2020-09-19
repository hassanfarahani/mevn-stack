import mongoose from 'mongoose'
import { StringUtil } from '../utilities/string-util'
import bcrypt from 'bcrypt-nodejs'

const userSchema = new mongoose.Schema({
    username: String,
    first: String,
    last: String,
    password: String
})
userSchema.set('timestamps', true)

userSchema.virtual('fullName').get(() => {
    const first = StringUtil.capitalize(this.first.toLowerCase())
    const last = StringUtil.capitalize(this.last.toLowerCase())
    return `${first} ${last}`
})
// statics: methods that you want to use in your user schema and you can use it anywhere throughout your application.
userSchema.statics.passwordMatches = function(password, hash) { // password: user provide, hash: the encrypted one
    return bcrypt.compareSync(password, hash) // it will compare the password from the user to the one in the database and return whether or not it's actually valid.
}

// presave method: this will run before you ever save a user into the database
userSchema.pre('save', function (next) {
    this.username = this.username.toLowerCase()
    this.first = this.first.toLowerCase()
    this.last = this.last.toLowerCase()
    const unsafePassword = this.password
    this.password = bcrypt.hashSync(unsafePassword) // this will return a hash password (an encrypted password)
    next()
})

export default mongoose.model('user', userSchema)