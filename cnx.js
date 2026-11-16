
<script>
document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let identifiant = document.querySelector(
        'input[type="text"]'
    ).value;

    let motDePasse = document.querySelector(
        'input[type="password"]'
    ).value;

    if (identifiant === "ahmed" && motDePasse === "123456") {

        window.location.href = "epargne.html";

    } else {

        alert("Identifiant ou mot de passe incorrect !");

    }

});
</script>
