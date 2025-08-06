const { MongoClient } = require('mongodb');
const uri = process.env.DBURI;

async function withDB(callback, res) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("mydb");
    await callback(db);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Erreur serveur");
  } finally {
    await client.close();
  }
}

module.exports = withDB;
