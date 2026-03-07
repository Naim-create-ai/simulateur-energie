let appareils = [];
let monGraphique = null;

function ajouterAppareil() {

  const nom = document.getElementById("nom").value;
  const puissance = parseFloat(document.getElementById("puissance").value);
  const heures = parseFloat(document.getElementById("heures").value);

  if (!nom || isNaN(puissance) || isNaN(heures)) {
    alert("Veuillez remplir tous les champs correctement.");
    return;
  }

  appareils.push({ nom, puissance, heures });

  afficherListe();

  document.getElementById("nom").value = "";
  document.getElementById("puissance").value = "";
  document.getElementById("heures").value = "";
}

function afficherListe() {

  const liste = document.getElementById("liste");
  liste.innerHTML = "";

  appareils.forEach(appareil => {

    const li = document.createElement("li");

    li.textContent =
      appareil.nom +
      " - " +
      appareil.puissance +
      "W - " +
      appareil.heures +
      "h/jour";

    liste.appendChild(li);

  });

}

function calculerTotal() {

  const jours = parseFloat(document.getElementById("jours").value);

  if (isNaN(jours)) {
    alert("Veuillez entrer un nombre de jours.");
    return;
  }

  let consommationMensuelle = 0;

  appareils.forEach(appareil => {

    consommationMensuelle +=
      (appareil.puissance * appareil.heures * jours) / 1000;

  });

  const consommationAnnuelle = consommationMensuelle * 12;

  const coutMensuel = consommationMensuelle * 0.23;
  const coutAnnuel = consommationAnnuelle * 0.23;

  document.getElementById("resultat").innerHTML = `
    <p>Consommation mensuelle : ${consommationMensuelle.toFixed(2)} kWh</p>
    <p>Consommation annuelle : ${consommationAnnuelle.toFixed(2)} kWh</p>
    <p>Coût mensuel estimé : ${coutMensuel.toFixed(2)} €</p>
    <p>Coût annuel estimé : ${coutAnnuel.toFixed(2)} €</p>
  `;

  afficherGraphique(consommationMensuelle, consommationAnnuelle);

}

function afficherGraphique(mensuelle, annuelle) {

  const ctx = document.getElementById("monGraphique").getContext("2d");

  if (monGraphique) {
    monGraphique.destroy();
  }

  monGraphique = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Mensuelle", "Annuelle"],
      datasets: [{
        label: "Consommation (kWh)",
        data: [mensuelle, annuelle]
      }]
    }
  });

}
