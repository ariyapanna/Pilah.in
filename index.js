require('dotenv').config();

const express = require('express');
const cors = require('cors');

const path = require('path');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Logger
app.use((req, res, next) => {
    if (req.url === '/favicon.ico') return next();

    const method = chalk.cyan(req.method);        
    const url = chalk.yellow(req.url);         
    const time = chalk.green(new Date().toLocaleTimeString()); 

    console.log(`[${time}] ${method} -> ${url}`);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(chalk.bgGreen.black(` ✅ Server started `) + chalk.green(` at http://localhost:${PORT}`));
});