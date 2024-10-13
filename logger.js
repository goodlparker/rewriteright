const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Ensure log directory exists
const logDirectory = path.join(__dirname, 'logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
    path.join(logDirectory, 'access.log'),
    { flags: 'a' }
);

// Custom token for morgan to log the body of the request
morgan.token('reqBody', (req, res) => JSON.stringify(req.body));


exports.createRequestLogMiddleware = () => morgan(':date[iso] :method :url :status :res[content-length] - :response-time ms :reqBody', {
    stream: accessLogStream,
    // Skip logging for development env or any other condition
    skip: (req, res) => process.env.NODE_ENV === 'development'
});
