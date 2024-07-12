// app.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const shortid = require('shortid');
const connectDB = require('./db');
const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Define URL schema and model
const urlSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    longUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Url = mongoose.model('Url', urlSchema);

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Shorten URL endpoint
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;

    // Check if the long URL already exists
    let url = await Url.findOne({ longUrl });

    if (!url) {
        const shortUrl = shortid.generate();
        url = new Url({ shortUrl, longUrl });
        await url.save();
    }

    res.json({ shortUrl: url.shortUrl });
});

// Redirect endpoint
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    const url = await Url.findOne({ shortUrl });

    if (url) {
        res.redirect(url.longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(port, () => {
    console.log("Server is running successfully!");
});

module.exports = app;
