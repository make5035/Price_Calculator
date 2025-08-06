require('dotenv').config(); // 👈 Charge les variables d'environnement depuis le fichier .env

const { MongoClient } = require('mongodb');
const uri = process.env.DBURI; // 👈 Récupère la variable DBURI définie dans le fichier .env

async function withDB(callback, res) {
  const client = new MongoClient(uri);

  try {
    await client.connect(); // 👈 Connexion à MongoDB
    const db = client.db("mydb"); // 👈 Accès à la base "mydb"
    await callback(db); // 👈 Exécute ce qu'on lui demande de faire avec la base
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Erreur serveur");
  } finally {
    await client.close(); // 👈 Toujours fermer proprement la connexion
  }
}

module.exports = withDB;
