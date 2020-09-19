import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

export function setEnvironment(app) {
    console.log('env var:', process.env.NODE_ENV)
    // if (process.env.NODE_ENV !== 'production') {
    //     setDevEnv(app)
    // } else {
        setProdEnv(app)
    // }
}

function setDevEnv(app) {
    process.env.NODE_ENV = 'development'
    process.env.DB_URL = 'mongodb://localhost:27017/vue-db'
    process.env.TOKEN_SECRET = 'my-development-secret'
    app.use(bodyParser.json())
    app.use(morgan('dev'))
    app.use(cors())
}

function setProdEnv(app) {
    process.env.DB_URL = 'mongodb+srv://user:Newgalaxy@cluster0.m4sjn.mongodb.net/Cluster0?retryWrites=true&w=majority'
    process.env.TOKEN_SECRET = 'my-production-secret'
    app.use(bodyParser.json())
    app.use(express.static(`${__dirname}/../../dist`)) //it'll take our build folder(dist), & it'll serve it as static content
}
