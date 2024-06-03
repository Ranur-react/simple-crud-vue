const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const initializeDatabase= require('./models/initalizeModel')
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

const { PORT } = process.env;
const port = PORT || 3000;

initializeDatabase();

// CORS configuration for specific URL
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = ['http://127.0.0.1:5500', 'https://vuejs.numpang.my.id'];
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use('/api', cors(corsOptions) ,roleRoutes);
app.use('/api', cors(corsOptions), userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
