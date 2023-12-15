// index.js
const express = require('express');
const app = express();
const port = 3000;
const livresRoutes = require('./Routes/livresRoutes');
app.use(express.json());

app.use('/livres', livresRoutes);

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});