const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.status(404).send("Page non trouvée");
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
