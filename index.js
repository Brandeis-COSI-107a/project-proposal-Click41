const port = 8080;
const express = require('express');
const bodyParser = require('body-parser'); 
const homeController = require('./controllers/homeController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); 

app.set("view engine", "ejs");

app.get('/', homeController.login);
app.post("/", homeController.respondWithForm);

app.use((req, res, next) => {
    console.log(`Request received at: ${new Date()}`);
    next();
});

app.listen(port, () => {
    console.log(`Server running on website: http://localhost:${port}`);
});
