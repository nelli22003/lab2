document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let errorMessage = document.getElementById("error-message");

    if (!email || !password) {
        errorMessage.textContent = "Both fields are required!";
        return;
    }

    if (!validateEmail(email)) {
        errorMessage.textContent = "Invalid email format!";
        return;
    }

    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Login successful!");
            window.location.href = "/dashboard";
        } else {
            errorMessage.textContent = "Invalid credentials!";
        }
    })
    .catch(error => console.error("Error:", error));
});

function validateEmail(email) {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
