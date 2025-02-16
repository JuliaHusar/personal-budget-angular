const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const fs = require('fs');
const path = require('path');

app.use(cors());

const budget = JSON.parse(fs.readFileSync('data-json.json', 'utf8'));

app.get('/budget', (req, res) => {
    res.json(budget);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});