const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// On utilise les routes depuis des fichiers séparés
app.use('/api/calculate', require('./routes/calculate'));
app.use('/api/quote', require('./routes/quote'));

// Route inconnue
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
