import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'

export const configureServer = app => {
  app.use(helmet())
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: 'true' }))
  app.use(bodyParser.json())
  app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
  app.use(morgan('dev'))
  app.use(cors())
  return app
}
