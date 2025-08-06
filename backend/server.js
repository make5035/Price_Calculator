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
