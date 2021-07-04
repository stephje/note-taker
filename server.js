const express = require('express');
const routes = require('./routes');
var path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

app.use(routes);
