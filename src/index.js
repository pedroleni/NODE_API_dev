const express = require("express");
const cors = require('cors');
const UserRoutes = require('./api/user/user.routes');
const ConcertRoutes = require('./api/concerts/concert.routes');

const { connectDb } = require('./helpers/db');
const { setUpCloudinary } = require("./helpers/cloudinary");
connectDb();
setUpCloudinary();

const PORT = process.env.PORT || 8000;


const app = express();

// Cors enable
app.use(cors({ 
    origin: (_origin, callback) => {
        callback(null, true);
    },

        credentials: true 
    
    }));

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




// Json Data
app.use(express.json({ limit: '1mb' }))
// urlEncoded
app.use(express.urlencoded({ limit: '1mb', extended: true }));
// Routes

app.use('/api/v1/user', UserRoutes);
app.use('/api/v1/concert', ConcertRoutes );

// Error handler
app.use((error, _req, res, _next) => {
    return  res
    .status(error.code || 500)
    .json(error.message || 'Unexpected error');
});


app.use('*', (_req, _res, next) => {
    const error = new Error();
    error.status = 404;
    error.message = 'Route not found';
    return next(error);
})


// Enable Language
app.disable('x-powered-by')
// Open Listener Server


app.listen(PORT, () => {
    console.log('Server is running in http://localhost:' + PORT)
  });

