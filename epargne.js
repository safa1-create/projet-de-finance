
 
// 1. Capital initial
let capitalInitial = 300;


// 2. Les opérations initiales
let operations = [

    {
        date: "2026-03-12",
        source: "Versement initial",
        montant: 300,
        nature: "credit"
    },

    {
        date: "2026-03-31",
        source: "Capitalisation IC",
        montant: 0.180,
        nature: "interet"
    },

    {
        date: "2026-06-30",
        source: "Retrait en espèces",
        montant: 100,
        nature: "debit"
    },

    {
        date: "2026-06-30",
        source: "Capitalisation IC",
        montant: 1.330,
        nature: "interet"
    },

    {
        date: "2026-07-19",
        source: "Versement en espèces",
        montant: 200,
        nature: "credit"
    },

    {
        date: "2026-08-06",
        source: "Versement en espèces",
        montant: 50,
        nature: "credit"
    },

    {
        date: "2026-09-13",
        source: "Retrait en espèces",
        montant: 250,
        nature: "debit"
    },

    {
        date: "2026-09-30",
        source: "Capitalisation IC",
        montant: 1.432,
        nature: "interet"
    }

];


// 3. Déterminer le taux selon la date
function obtenirTaux(date) {

    let mois = Number(date.split("-")[1]);

    if (mois >= 1 && mois <= 7) {
        return 2.25;
    }

    return 2.50;
}


// 4. Afficher le compte
function afficherCompte() {

    let solde = 0;
    let totalVersements = 0;
    let totalRetraits = 0;
    let totalInterets = 0;

    let tableau = document.getElementById("tableau");

    tableau.innerHTML = "";

    // Trier les opérations par date
    operations.sort(function(a, b) {
        return a.date.localeCompare(b.date) ||
               a.ordre - b.ordre;
    });

    operations.forEach(function(op) {

        let debit = 0;
        let credit = 0;

        let taux = obtenirTaux(op.date);

        if (op.nature === "credit") {

            credit = op.montant;
            solde += op.montant;
            totalVersements += op.montant;

        }

        else if (op.nature === "debit") {

            debit = op.montant;
            solde -= op.montant;
            totalRetraits += op.montant;

        }

        else if (op.nature === "interet") {

            credit = op.montant;
            solde += op.montant;
            totalInterets += op.montant;

        }

        let ligne = document.createElement("tr");

        let dateAffichee =
            op.date.split("-").reverse().join("/");

        ligne.innerHTML = `
            <td>${dateAffichee}</td>
            <td>${op.source}</td>
            <td class="debit">${debit.toFixed(3)}</td>
            <td class="credit">${credit.toFixed(3)}</td>
            <td>${solde.toFixed(3)}</td>
            <td>${taux.toFixed(2)} %</td>
        `;

        tableau.appendChild(ligne);

    });


    // Actualiser les informations du compte

    document.getElementById("capital").textContent =
        capitalInitial.toFixed(3) + " DT";

    document.getElementById("solde").textContent =
        solde.toFixed(3) + " DT";

    document.getElementById("versements").textContent =
        totalVersements.toFixed(3) + " DT";

    document.getElementById("retraits").textContent =
        totalRetraits.toFixed(3) + " DT";

    document.getElementById("interets").textContent =
        totalInterets.toFixed(3) + " DT";

}


// 5. Ajouter une nouvelle opération

let formulaire = document.getElementById("operationForm");

formulaire.addEventListener("submit", function(event) {

    event.preventDefault();

    let nature =
        document.getElementById("typeOperation").value;

    let date =
        document.getElementById("dateOperation").value;

    let montant =
        Number(document.getElementById("montantOperation").value);

    let message =
        document.getElementById("message");


    // Vérifier les champs

    if (nature === "" || date === "" ||
        !Number.isFinite(montant) || montant <= 0) {

        message.style.color = "red";
        message.textContent = "Veuillez remplir tous les champs correctement.";

        return;
    }


    // Calculer le solde actuel

    let soldeActuel = 0;

    operations.forEach(function(op) {

        if (op.nature === "debit") {
            soldeActuel -= op.montant;
        }

        else {
            soldeActuel += op.montant;
        }

    });


    // Vérifier le retrait

    if (nature === "debit" && montant > soldeActuel) {

        message.style.color = "red";
        message.textContent = "Solde insuffisant !";

        return;
    }


    // Créer la nouvelle opération

    let nouvelleOperation = {

        date: date,

        source: nature === "credit"
            ? "Versement en espèces"
            : "Retrait en espèces",

        montant: montant,

        nature: nature,

        ordre: Date.now()

    };


    // Ajouter au tableau des opérations

    operations.push(nouvelleOperation);


    // Actualiser le tableau et les soldes

    afficherCompte();


    // Afficher le message

    message.style.color = "green";
    message.textContent = "Opération ajoutée avec succès !";


    // Vider les champs

    formulaire.reset();

});


// 6. Affichage initial
operations.forEach(function(op, index) {
    op.ordre = index;
});

afficherCompte();
