const express = require('express');
const settings = require('../config.json');
const statusModule = require('./StatusJSON.js');


const app = express();
const port = settings.PORT; // Adjust port as needed
console.log(`Port set to ${port}`)
app.get('/status/raw', async (req, res) => {
    try {
        const status = await statusModule();
        console.log(status)
        res.json(status);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

try {
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
} catch (error) {
    console.log(`Error: ${error}`)
}

module.exports = app;