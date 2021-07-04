const express = require('express');
const routes = require('./routes');
// const apiRoutes = require('./routes/api/apiRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});

//testing
// app.get('/api/notes', (req, res) => {
//     res.json({ name: 'test' });
// });

app.use(routes);
// app.use('/api', apiRoutes);
