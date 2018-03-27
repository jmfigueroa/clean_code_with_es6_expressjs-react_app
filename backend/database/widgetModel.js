import mongoose, { Schema } from 'mongoose'
//
const WidgetSchema = Schema({
  status: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: 'empty'
  },
  widget: {
    type: String
  }
})
//
export const WidgetModel = mongoose.model('WidgetModel', WidgetSchema)
