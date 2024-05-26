document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const user = data.users.find(user => user.vards === username && user.parole === password);
                if (user) {
                    window.location.href = "public_database.html";
                } else {
                    alert("Nepareizs lietotājvārds vai parole");
                }
            })
            .catch(error => console.error('Error fetching users.json:', error));
    });
});