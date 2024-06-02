const express = require('express');
const dotenv = require('dotenv');
const initializeDatabase= require('./models/initalizeModel')
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

const { PORT } = process.env;
const port = PORT || 3000;

initializeDatabase();

app.use('/api', roleRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
