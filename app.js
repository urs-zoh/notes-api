const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());

pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL');
        connection.release();
    })
    .catch(err => {
        console.error('MySQL connection error:', err);
    });

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
