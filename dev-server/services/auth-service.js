import jwt from 'jsonwebtoken'

export function generateJWT(user) {
    const tokendata = { username: user.username, id: user._id }
    // every token you create is going to be signed with this secret. And so you'll need this secret in order to decrypt that token.
    return jwt.sign({ user: tokendata }, process.env.TOKEN_SECRET)
}

// this will basically be attached to any routes that we want the user to be logged in for in order to access
export function requireLogin(req, res, next) {
    const token = decodeToken(req)
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in!'})
    }
    next()
}

// a method to access the session.
// create a method that can decode the token.
export function decodeToken(req) {
    const token = req.headers.authorization || req.headers['authorization']

    if (!token) {
        return null
    }

    try {
        return jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(error) {
        return null
    }
}

export function getUsername(req) {
    const token = decodeToken(req)
    if(!token) {
        return null
    }
    return token.user.username
}

export function getUserId(req) {
    const token = decodeToken(req)
    if(!token) {
        return null
    }
    return token.user.id
}