const express = require('express');
const router = express.Router();
const withDB = require('../db');

// Enregistrement d’un devis
router.get('/', (req, res) => {
  const { quoteName, salary, days } = req.query;

  if (!quoteName || !salary || !days) {
    return res.status(400).send("Champs requis manquants.");
  }

  withDB(async (db) => {
    const quote = {
      quoteName,
      salary: parseFloat(salary),
      days: parseInt(days)
    };
    await db.collection("quotes").insertOne(quote);
    res.send("✅ Devis enregistré !");
  }, res);
});

// 🔥 AJOUT : route pour récupérer tous les devis
router.get('/all', (req, res) => {
  withDB(async (db) => {
    const quotes = await db.collection("quotes").find().toArray();
    res.json(quotes);
  }, res);
});

module.exports = router;
