import { WidgetModel, getAllWidgets, postWidget } from '../database'

export const publicRoutes = app => {
  app.get('/', getAllWidgets)
  app.post('/', postWidget)
}
