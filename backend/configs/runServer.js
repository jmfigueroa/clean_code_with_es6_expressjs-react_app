import { constants } from './'
import chalk from 'chalk'

export const runServer = app => {
  app.listen(constants.PORT, err => {
    let date = new Date()
    if (err) {
      console.log(chalk.redBright(err))
    }
    console.log(
      chalk.bgBlueBright('Express Server\n') +
        chalk.blueBright(
          'Port: ' + constants.PORT + '\nStarted: ' + date.toLocaleTimeString()
        )
    )
  })
}
