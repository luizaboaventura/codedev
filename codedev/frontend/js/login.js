let loginForm = document.getElementById("loginForm");
let emailLogin = document.getElementById("emailLogin");
let passwordLogin = document.getElementById("passwordLogin");

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    // Validação
    let expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!expRegEmail.test(emailLogin.value)) {
        emailLogin.classList.add("is-invalid");
        isValid = false;
    } else {
        emailLogin.classList.remove("is-invalid");
    }

    let expRegPassword = /^.{6,}$/;
    if (!expRegPassword.test(passwordLogin.value)) {
        passwordLogin.classList.add("is-invalid");
        isValid = false;
    } else {
        passwordLogin.classList.remove("is-invalid");
    }

    // Envio
    if (isValid) {
        fetch('http://localhost:3333/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailLogin.value,
                password: passwordLogin.value
            })
        })
            .then(async response => {
                if (!response.ok) {
                    const err = await response.json();
                    throw new Error(err.message);
                }
                return response.json();
            })
            .then(data => {
                console.log('Login realizado com sucesso.');
                emailLogin.value = '';
                passwordLogin.value = '';
                alert("Login realizado com sucesso");
                window.location.href = `./pages/home.html?id=${data.id}`;
            })
            .catch(error => {
                alert(error.message);
            });
    }
})
