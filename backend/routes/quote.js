const express = require('express');
const router = express.Router();
const withDB = require('../db');

router.get('/', (req, res) => {
  const quoteName = req.query.quoteName;
  if (!quoteName) return res.status(400).send("Champ 'quoteName' manquant.");

  withDB(async (db) => {
    await db.collection("quotes").insertOne({ quoteName });
    res.send("✅ Devis enregistré !");
  }, res);
});

module.exports = router;
