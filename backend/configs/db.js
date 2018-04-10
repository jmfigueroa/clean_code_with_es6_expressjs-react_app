import mongoose from 'mongoose'
import { constants } from './'
//
export const configureDb = app => {
  mongoose.connect(constants.DB)
  mongoose.connection.on('connected', err => {
    if (err) {
      console.log(err)
    }
    console.log('MongoDB Connected: ' + constants.DB)
  })
  return app
}
