import { WidgetModel as Widget } from './'
import chalk from 'chalk'
//
export const getAllWidgets = (req, res) => {
  Widget.find({}, (err, widgets) => {
    if (err) {
      console.log(chalk.redBright(err))
      res.json({
        status: false,
        error: 'Error!!'
      })
    } else {
      res.json({ status: true, widgets: widgets })
    }
  })
}
//
export const postWidget = (req, res) => {
  let widget = new Widget(req.body)
  widget.save((err, widgets) => {
    if (err) {
      res.json({ status: false, error: 'Something went wrong!' })
    } else {
      res.json({
        status: true,
        message: req.body.message,
        widget: req.body.widget
      })
    }
  })
}
