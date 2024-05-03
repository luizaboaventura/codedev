let form = document.getElementById("form");
let username = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let passwordAgain = document.getElementById("password-again");
let registerModal = document.getElementById("registerModal");

form.addEventListener('submit', (event) => {

    event.preventDefault();
    let isValid = true;

    // Validação
    let expRegName = /^[A-Za-zÀ-ü\s]{2,}$/;
    if (!expRegName.test(username.value)) {
        username.classList.add("is-invalid");
        isValid = false;
    } else {
        username.classList.remove("is-invalid");
    }

    let expRegEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!expRegEmail.test(email.value)) {
        email.classList.add("is-invalid");
        isValid = false;
    } else {
        email.classList.remove("is-invalid");
    }

    let expRegPassword = /^.{6,}$/;
    if (!expRegPassword.test(password.value)) {
        password.classList.add("is-invalid");
        isValid = false;
    } else {
        password.classList.remove("is-invalid");
    }

    let expRegPasswordAgain = /^.{6,}$/;
    if (!expRegPasswordAgain.test(passwordAgain.value)) {
        password.classList.add("is-invalid");
        isValid = false;
    } else {
        password.classList.remove("is-invalid");
    }

    if (password.value !== passwordAgain.value) {
        passwordAgain.classList.add("is-invalid");
        isValid = false;
    } else {
        passwordAgain.classList.remove("is-invalid");
    }

    // Envio
    if (isValid) {
        fetch('http://localhost:3333/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: username.value,
                email: email.value,
                password: password.value
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
                console.log('Dados enviados com sucesso:', data);
                username.value = '';
                email.value = '';
                password.value = '';
                passwordAgain.value = '';
                alert("Cadastro realizado com sucesso");
            })
            .catch(error => {
                alert(error.message);
            });
    }
})

