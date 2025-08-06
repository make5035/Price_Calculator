const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const salary = parseFloat(req.query.salary);
  const days = parseFloat(req.query.days);

  if (isNaN(salary) || isNaN(days) || salary <= 0 || days <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const price = Math.round(((salary / 365) * days) / 50) * 50;
  res.json({ price });
});

module.exports = router;
