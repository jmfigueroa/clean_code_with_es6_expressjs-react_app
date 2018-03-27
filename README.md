# Clean Code with ES6: ExpressJS + ReactJS

The purpose of this short series of articles is to show some of the ways I have found to set up and organize a React/Express app with ES6+. They are by no means a "best practices" manifesto. In fact, if you have any suggestions on how to improve, let me know. I'm always on the lookout for new ways to make my code better (and help others along the way).

This series will be broken up into several parts:

1. Setting Up ExpressJS to use ES6+ Syntax
2. Creating an Express Server with Redux-Style Organization
3. Creating a Clean Code Frontend with ReactJS
4. Adding Redux to your Frontend
5. Wrapping Up Your Clean Code App: Deployment

==== 

## Part 1: Creating a Clean Code Server with ExpressJS and ES6+

ES6+ on the backend? Sure! The newest Javascript syntax really goes a long way in making code clean and readable. After all, code is for humans not machines.

(Not an ES6+ afficionado? You might want to brush up on the syntax. I won't do much explaining here.)

Keep in mind that we are _not_ going to develop our application using testing. This is purely for simplicity's sake during this tutorial. Writing _"à la TDD"_ is the first step to writing solid code. 

## Backend Directory Layout

```
📁backend
	📂configs/
	📂database/
	📂routes/
	📂testing/  (not covered in this tutorial)
	📄index.js

```

## Installing Prequisites

### Yarn

We'll be using **yarn** instead of **npm** to install and run our packages. Let's initialize our project. In the root directory (`backend/`), type:

`yarn init -y`

This will create a very simple `package.json` file with the following contents:

_package.json:_

~~~javascript
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
~~~

### ExpressJS

We'll be using ExpressJS to create a server. It's a fantastic, minimalist NodeJS framework which is both powerful and flexible. Nodemon is a great development tool which watches our directory for changes and reloads the node server.

`yarn add express nodemon -S`

### Babel

Since we're using ES6+ syntax with ExpressJS over NodeJS, we need to make sure to transpile it down to ES5. There are several step involved.

#### __1. Install Babel Packages__

We'll use Babel to transpile our packages to ES5. Here we install the Babel CLI and the "ENV", which ["automatically determines the Babel plugins you need based on your supported environments."](https://babeljs.io/docs/plugins/preset-env/). 

`yarn add babel-cli babel-preset-env`

#### __2. Create a `.babelrc` file__
	
Now we'll tell Babel to grab the most current NodeJS presets. Copy the following code onto your clipboard and enter the following command: `pbpaste >> .babelrc`

_.babelrc:_

~~~javascript
{
  "presets": [
    [
      "env",
      {
        "targets": {
          "node": "current"
        }
      }
    ]
  ]
}
~~~

#### __3. Create a script in our `package.json`__

Let's open our `package.json` file and modify it to run Nodemon using the babel-node presets. Here's what our `package.json` should look like (not counting versions, of course).

_package.json:_

~~~javascript
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "nodemon --exec yarn babel-node -- index.js"
  },
  "dependencies": {
    "express": "^4.16.3",
    "nodemon": "^1.17.2"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-preset-env": "^1.6.1"
  }
}
~~~

#### __4. Test It Out!__

Let's add some code to our `index.js` to see if it works. Copy the following text to the clipboard and type the following command: `pbpaste > index.js`

_index.js:_

~~~javascript
import express from 'express'

console.log('It Works!')
~~~

Run it!: `yarn start`. You should get something like this:

_console:_

```
yarn run v1.3.2
$ nodemon --exec yarn babel-node -- index.js
[nodemon] 1.17.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `yarn babel-node index.js`
$ /Users/USER/CleanCode/backend/node_modules/.bin/babel-node index.js
It works!
[nodemon] clean exit - waiting for changes before restart
```
----
----

# Ready to Code!

Great! Now that we're all set up with ES6+, let's talk about how to organize our server in a way that makes it clear, maintainable, and more easily testable. 

## Redux-Style Organization

Now, here's a very important part to organizing our code. We'll create _another_ `index.js` file in our `📂configs/` directory. We'll do this with the following code from the `📂configs/` directory:

`echo "export * from './server'" >> index.js`

We can now export all of our functions and constants through our `index.js` file. This works because, **if we reference the directory and not the file itself,** Node automatically looks for an `index.js` in the directory. Currently, we're only exporting the `configureServer()` function from `server.js` using `export`. 

This is a popular way of organizing code in Redux which I find great for two reasons: 

1. It keeps our code modularized. This makes it easier to test.
2. It allows to verify that we have the correct names for functions and constants. Most text editors, like VS Code and Atom, autofill available exports from a directory.

For more information, read here: [here](https://alligator.io/react/index-js-public-interfaces/) and [here](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e).

/keep in mind that you can't use `export default` with this method since you'll need to be explicit about what you're exporting. For example, with react, we'd write: 

`export class Login extends React.Componenent{...` 

and *not:* 

`export edfault class Login extends React.Componenent{...`

, we're ready to code. We'll start with how to flesh out our `index.js` file so that it's as clean as possible.

## Setting up the Simplest Server

Now we're all set up with ES6+ syntax, let's work on the `index.js`. We'll lay out the structure first with comments and setting up our ExpressJS app. Standard stuff:

_index.js:_

~~~javascript
// APP
import express from 'express'
const app = express()
// CONFIGS
// ROUTES
// RUN
app.listen(8000, err => {
	if(err){console.log(err)}
	console.log('EXPRESS SERVER Running on port: 8000')
	})
~~~



## Configuring the Server Middleware

Next, let's set up our middleware. We'll use the following packages: [Helmet](https://www.npmjs.com/package/helmet), [Compression](https://www.npmjs.com/package/compression), [Body-Parser](https://www.npmjs.com/package/body-parser), [cors](https://www.npmjs.com/package/cors), and [morgan](https://www.npmjs.com/package/morgan). Install them with Yarn: 

`yarn add helmet compression body-parser cors -S`

and

`yarn add morgan -D`

Now, in our `index.js`, add the following code:

~~~javascript
// APP
import express from 'express'
const app = express()
// CONFIGS
configureServer(app)
// ROUTES
// RUN

~~~

If we try running our app now, it will break so let's create that function we just referenced. in the `📂configs/` directory, create a file called `server.js` and add the following code:

_server.js:_

~~~javascript
import helmet from 'helmet'
import compression from 'compression'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
//
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
~~~

Let's break down that copypasta:

1. We're importing our middleware so we can run our app trhough it later:
   - [**Helmet**](https://www.npmjs.com/package/helmet) provides basic security for our HTTP headers
   - [**compression**](https://www.npmjs.com/package/compression) decreases the size of the responses we sende back the client
   - [**cors**](https://www.npmjs.com/package/cors) protects us from shady [cross-origin requests](https://w3c.github.io/webappsec-cors-for-developers/)
   - [**morgan**](https://www.npmjs.com/package/morgan) is a great, basic tool that let's us monitor HTTP activity in our console
   - [**body-parser**](https://www.npmjs.com/package/body-parser) converts the incoming requests so that we can work with them in Express
2. Next, we create a function that accepts an instance of our Express app and runs the app through the middleware. 

_(Note: Each of these middleware can be thoroughly configured. This is especially the case with **cors**. Since we're setting up a minimal server, I won't cover those details here but we'll come back to cors in a little while.)_

## Configuring the Database

For this tutorial, we'll be setting up a database connection to a [MongoDB NoSQL database](https://docs.mongodb.com/). I'll also assume that you already have it installed and running. Click [here](https://docs.mongodb.com/manual/installation/) if you don't.

First, we'll need [Mongoose](https://www.npmjs.com/package/mongoose) so we Node can interact with our Mongo databse. Install it with yarn:

~~~
yarn add mongoose -S

~~~

Next, in the `📂configs/` directory, create a file named `db.js` and add the following code:

_./configs/db.js:_
~~~javascript
import mongoose from 'mongoose'
let dbPort = 'mongodb://localhost/testapp'
//
export const configureDb = app => {
  mongoose.connect(dbPort)
  mongoose.connection.on('connected', err => {
    if (err) {
      console.log(err)
    }
    console.log('MongoDB Connected: ' + dbPort)
  })
  return app
}
~~~

Here, we're doing the following: 

1. Specify the port of our Mongo database
2. Create our function `configureDb()` function
3. Tell Mongoose to connect to the database with `mongoose.connect()`
4. Tell Mongoose to report on that connect with `mongoose.connection.on()`, sending us an error or telling us where it connected

Since we exported our function with `export const configureDb()...`, we need to export it through our `index.js` in our `📂configs/` directory. Update the file by adding the following code:

~~~javascript
export * from './db'
~~~

All that's left (for now) is to import the function in our main `index.js` in the root directory (`📁backend` directory for us). Update the file with the following code:

_./index.js:_
~~~javascript
// CONFIGS
import {configureServer, configureDb} from './configs'
configureServer(app)
configureDb(app)
~~~

If you're using a text editor like VS Code or Atom, you should see it suggest the function we specified. If not, double check that you've specified the exports correctly.

## Setting Up Routes

We'll use a similar method to set up our routes. This time, in the `📂routes/` directory, create the following two files: `public.js` and `index.js`. We're going to do something a little different here with the `index.js` but don't worry, it's very much in keeping with the organizational spirit that's been guiding us.

Add the following code to the respective files:

_./routes/public.js:_

~~~javascript
export const publicRoutes = app => {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello GET from ROOT' })
  })

  app.post('/', (req, res) => {
    res.json({ message: 'Hello POST from ROOT' })
  })
}
~~~

_./routes/index.js:_

~~~javascript
import { publicRoutes } from './public'

export const configureRoutes = app => {
  publicRoutes(app)
  return app
}
~~~

Now, let's use our routes in our main `index.js`. Our entire `index.js` should look as follows:

_./index.js:_

~~~javascript
// APP
import express from 'express'
const app = express()
// CONFIGS
import { configureServer, configureDb } from './configs'
configureServer(app)
configureDb(app)
// ROUTES
import { configureRoutes } from './routes'
configureRoutes(app)
// RUN
app.listen(8000, err => {
  if (err) {
    console.log(err)
  }
  console.log('EXPRESS SERVER Running on port: 8000')
})
~~~

If you run the app now, you should be able to get a reply back from the two routes we specified. Using [Postman](), we can see we get from `http://localhost:8000/`: 

~~~json
{
  "message": "Hello GET from ROOT"
}
~~~

Nice!

## Further Organization

But why stop there?

Looking through our code, we can see notice two things:

1. We repeat certain parts of our code, some of which we can call "constants"
2. We probably want to separate the logic from our routes

Separating our constants out into a separate file is an especially good idea. We can create a `constants.js` file in in our `📂configs` directory. It will hold all of our logic related to our working environments (like ports and API keys specified in `.env` file: see this[ Twilio article](https://www.twilio.com/blog/2017/08/working-with-environment-variables-in-node-js.html)  for more info.

## Clean index.js and Chalk

Before we get to work, let's clean up our main `index.js` even further and spiff up our console output! This isn't really necessary but why not go all our and make our code look super clean and readable? 

Add [chalk](https://www.npmjs.com/package/chalk) using yarn: 

~~~
yarn add chalk -D
~~~

Now, create a file in our `📂configs` directory called `runServer.js`. Add the following code:

~~~javascript
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
~~~

Chalk allows us to specify the color of the console output which is nice if you're staring at your console all day long. We also added the time so we can see when the server was last refreshed.

Notice that we've import `constants` from the self-same `📂configs` directory. Let's go specify those constants. Create a file named `constants.js` and export both new functions through the `index.js` in the same directory:

*./configs/constants.js:*

~~~javascript
export const constants = {
  PORT: 8000,
  DB: 'mongodb://localhost/testapp'
}
~~~

*./configs/index.js:*

~~~javascript
export * from './constants'
export * from './db'
export * from './runServer'
export * from './server'
~~~


Now we can update our `index.js` in our `📁backend` directory with the following code, remove the `app.listen(8000)...`. While we're at it, let's rearranged the `import` statments. If we ran this through a linter, it'd have a heart attack. The entire file should look like this:

*./index.js:*

~~~javascript
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
~~~

Not only is that more readable, but, when we need to modify something, we know where to go!


## Cleaning Up the Routes

The last thing we'll do is clean up our routes. We'll move the logic to a `📁database` folder that will handle the logic relating to our database. And since we're using MongoDB, we'll also need to set up our models. Again, I won't go over the specifics of setting up Mongoose/MongoDB with your app but you can read [this excellent tutorial](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications).

Make sure your in the `📁database` directory and enter the following command into your terminal:

~~~terminal
touch index.js dbActions.js publicModel.js
~~~

And add the following code, respectively:

*./database/publicModel.js:*

~~~javascript
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
~~~

*./database/widgetActions:*

~~~javascript
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
~~~
