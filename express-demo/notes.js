const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
//console.log(`app:${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()); // parses req.body
app.use(express.urlencoded( {extended: true })); // key=value&key=value puts it in req.body as json
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

//export DEBUG=app:startup

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

dbDebugger('Connected to Database');

/* export NODE_ENV=production
if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
*/
app.use(logger);



/*
app.use(function(req,res,next) {
    console.log('Authenticating...');
    next(); //Needs Next to go to the next middleware.
});

Pug / EJS returns html markup

*/

// PORT
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`listening on port ${port}`));


/*
app.get();
app.post();
app.put();
app.delete();*/