document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('updateForm');
    let username = document.getElementById("nameUpdate");
    let email = document.getElementById("emailUpdate");
    let password = document.getElementById("passwordUpdate");
    let passwordAgain = document.getElementById("passwordAgainUpdate");

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');

    fetch(`http://localhost:3333/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados do usuário.');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            username.value = data.name;
            email.value = data.email;
        })
        .catch(error => {
            console.error('Erro:', error);
        });


    updateForm.addEventListener('submit', event => {
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
            fetch(`http://localhost:3333/users/${id}`, {
                method: 'PUT',
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
                    password.value = '';
                    passwordAgain.value = '';
                    alert("Cadastro realizado com sucesso");
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    });
});
