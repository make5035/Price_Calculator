const express = require('express');        // Importe express
const path = require('path');              // Sert à gérer les chemins de fichiers

const app = express();                     // Crée l'application Express
const port = 8080;                         // Port local

// Sert les fichiers statiques (HTML, CSS, images...) dans 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API de calcul (appelée par fetch dans le JS)
app.get('/api/calculate', (req, res) => {
  const salary = parseFloat(req.query.salary);
  const days = parseFloat(req.query.days);

  if (isNaN(salary) || isNaN(days) || salary <= 0 || days <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  let price = (salary / 365) * days;
  price = Math.round(price / 50) * 50;

  res.json({ price });
});

// Si aucune route ne correspond : 404
app.get('*', (req, res) => {
  res.status(404).send("Page non trouvée");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
