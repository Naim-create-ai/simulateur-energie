let monGraphique;

function calculer() {

  let puissance = parseFloat(document.getElementById("puissance").value);
  let heures = parseFloat(document.getElementById("heures").value);
  let jours = parseFloat(document.getElementById("jours").value);

  if (isNaN(puissance) || isNaN(heures) || isNaN(jours)) {
    document.getElementById("resultat").innerHTML =
      "Veuillez remplir tous les champs correctement.";
    return;
  }

  let consommation = (puissance * heures * jours) / 1000;
  let cout = consommation * 0.23;

  document.getElementById("resultat").innerHTML =
    `<p>Consommation : ${consommation.toFixed(2)} kWh</p>
     <p>Coût estimé : ${cout.toFixed(2)} €</p>`;

  afficherGraphique(consommation);
}

function afficherGraphique(consommation) {

  let ctx = document.getElementById('monGraphique').getContext('2d');

  if (monGraphique) {
    monGraphique.destroy();
  }

  monGraphique = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Consommation (kWh)'],
      datasets: [{
        label: 'Consommation',
        data: [consommation],
      }]
    }
  });
}