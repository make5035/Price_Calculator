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

      await fetch(`/api/quote?quoteName=${encodeURIComponent(quoteName)}&salary=${salary}&days=${days}`);
      await fetchQuotes(); // 🔄 Rafraîchir la liste après ajout
    } catch (err) {
      finalPriceEl.textContent = "⚠️ Erreur de communication avec le serveur.";
      console.error(err);
    }
  });

  fetchQuotes(); // Chargement initial
});

async function fetchQuotes() {
  try {
    const res = await fetch('/api/quote/all');
    const data = await res.json();

    const list = document.getElementById('quoteList');
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<li class="list-group-item">Aucun devis enregistré</li>';
    } else {
      data.forEach(q => {
        list.innerHTML += `<li class="list-group-item">
          📄 <strong>${q.quoteName}</strong> — £${q.salary}, ${q.days} days
        </li>`;
      });
    }
  } catch (err) {
    console.error('Erreur lors du chargement des devis', err);
  }
}
