function log(req,res,next) {
    console.log('Logging...');
    next(); //Needs Next to go to the next middleware.
}

module.exports = log;