import { publicRoutes } from './public'

export const configureRoutes = app => {
  publicRoutes(app)
  return app
}
