const port = 8080;
const express = require('express');
const homeController = require('./controllers/homeController');
//const layouts = require('express-ejs-layouts');

const app = express();

app.set("view engine", "ejs");
//app.use(layouts);

app.get('/welcome', (req, res) => {
    let name = (req.params.name);
    res.send(`Hello ${name}`);

    });

app.get('/', homeController.login);
app.post("/", homeController.respondWithForm);

app.use((req, res, next) => {
    console.log(`Request received at: ${new Date()}`);
    next();
    });

app.listen(port, () => {
    console.log(`Server running on website: http://localhost:${port}`);
    });
