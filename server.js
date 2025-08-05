const express = require('express');        // Importe express
const path = require('path');              // Sert à gérer les chemins de fichiers

const app = express();                     // Crée l'application Express
const port = 8080;                         // Port local (tu iras sur localhost:8080)

app.use(express.static(path.join(__dirname, 'public'))); 
// Sert les fichiers du dossier 'public' (HTML, CSS, images, etc.)

// Si la page n'existe pas, renvoyer une erreur 404
app.get('*', (req, res) => {
  res.status(404).send("Page non trouvée");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
