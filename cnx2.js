<script>
document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let identifiant = document.querySelector(
        'input[type="text"]'
    ).value;

    let motDePasse = document.querySelector(
        'input[type="password"]'
    ).value;

    if (identifiant === "societe manar" && motDePasse === "1234567") {

        window.location.href = "courant.html";

    } else {

        alert("Identifiant ou mot de passe incorrect !");

    }

});
</script>
