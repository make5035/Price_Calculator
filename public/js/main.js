document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const quoteName = document.getElementById("quoteName").value;
    const salary = document.getElementById("salary").value;
    const days = document.getElementById("days").value;

    const finalPriceEl = document.getElementById("finalPrice");

    try {
      const calcRes = await fetch(`/api/calculate?salary=${salary}&days=${days}`);
      const calcData = await calcRes.json();

      if (calcData.error) {
        finalPriceEl.textContent = "❌ " + calcData.error;
        return;
      }

      finalPriceEl.textContent = `✅ Suggested price: £${calcData.price}`;
      await fetch(`/api/quote?quoteName=${encodeURIComponent(quoteName)}`);
    } catch (err) {
      finalPriceEl.textContent = "⚠️ Erreur de communication avec le serveur.";
      console.error(err);
    }
  });
});
