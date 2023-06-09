import express from 'express'
import dotenv from 'dotenv'
import scheme from './database/scheme.js'
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload'
import routes from "./src/routes.js";
import * as path from "path";
import errorsMiddleware from "./src/errors/errors.middleware.js";
import {ApiErrors} from "./src/errors/errors.api.js";
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({}))
app.use(express.static(path.resolve('images')))
app.use('/api', routes)

app.use(function (req, res, next) {
    throw ApiErrors.notFound('You have accessed an incorrect link.')
})

app.use(errorsMiddleware)

async function startApplication() {
    try {
        await scheme.authenticate()
        await scheme.sync()
        app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

startApplication()

// Sasha 1 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJTYXNoYTEiLCJpYXQiOjE2ODYzMzIyMTUsImV4cCI6MTY4ODkyNDIxNX0.9pcwGxU8tHPlhwj6Pq18aSPUWcM7mvtbUjeMxyPS2qk
// Sasha 2 - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJTYXNoYTIiLCJpYXQiOjE2ODYzMzIyMzYsImV4cCI6MTY4ODkyNDIzNn0.nKzNbi7XJvrBgdaLFW7hEdxUqXqGoxKnk9LiYIRD0sk
