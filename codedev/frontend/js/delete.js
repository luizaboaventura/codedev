let deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const id = params.get('id');

    fetch(`http://localhost:3333/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(async response => {
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }
            return response;
        })
        .then(data => {
            console.log(data);
            window.location.href = '../index.html';
        })
        .catch(error => {
            alert(error.message);
        });
})