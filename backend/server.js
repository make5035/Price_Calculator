const express = require('express');
const { MongoClient } = require("mongodb");

const app = express();
const port = 8080;
const uri = process.env.DBURI;

// Route API pour ajouter un devis
app.get('/api/quote', async (req, res) => {
  const quoteName = req.query.quoteName;

  if (!quoteName) {
    return res.status(400).send("Champ 'quoteName' manquant.");
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("quotes");
    await collection.insertOne({ quoteName: quoteName });
    res.send("Devis enregistré !");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  } finally {
    await client.close();
  }
});

// Sert les fichiers HTML/CSS depuis le dossier public
app.use(express.static('public'));

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});


const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("mydb");
    const collection = db.collection("quotes");
    const quote = { quoteName: "test", salary: 30000, days: 20 };

    await collection.insertOne(quote);
    console.log("Quote insérée !");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);


const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Sert les fichiers statiques (HTML, CSS, JS, images) dans le dossier "public"
app.use(express.static(path.join(__dirname, '../public')));

// Route API pour calculer un tarif
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

// Route 404 personnalisée - doit venir en dernier !
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${port}`);
});
