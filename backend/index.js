// IMPORTS
import express from 'express'
import { configureServer, configureDb, runServer } from './configs'
import { configureRoutes } from './routes'
// INITALIZE APP
const app = express()
// CONFIGS
configureServer(app)
configureDb(app)
// ROUTES
configureRoutes(app)
// RUN
runServer(app)
