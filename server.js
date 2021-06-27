const express = require('express');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;
 
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`)
  })

app.use(routes);