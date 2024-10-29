require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const shortid = require('shortid');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // For self-signed certificates
        }
    }
});

// URL model
const Url = sequelize.define('Url', {
    shorturl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    longurl: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false, // Disable automatic timestamp columns
    tableName: 'urls' // Ensure the table name is lowercase
});

// Ensure the table is created
sequelize.sync({ force: true }).then(() => {
    console.log('Database & tables created!');
});

app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Shorten URL endpoint
app.post('/shorten', async (req, res) => {
    const { longurl } = req.body;

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Validate the request body
    if (!longurl) {
        return res.status(400).json({ error: 'longurl is required' });
    }

    try {
        // Check if the long URL already exists
        let url = await Url.findOne({ where: { longurl } });

        if (!url) {
            const shorturl = shortid.generate();
            url = await Url.create({ shorturl, longurl });
        }

        res.json({ shorturl: url.shorturl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Redirect endpoint
app.get('/:shorturl', async (req, res) => {
    const { shorturl } = req.params;

    try {
        const url = await Url.findOne({ where: { shorturl } });

        if (url) {
            res.redirect(url.longurl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
