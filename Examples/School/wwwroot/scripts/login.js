
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Autenticando...
        `;
        console.log(submitButton)
        
        const loginData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:5035/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            submitButton.disabled = false;
            if (response.ok) {
                return response.json();
            }
            throw new Error('Não foi possível realizar o login.');
        })
        .then(data => {
            const modal = new CustomModal();
            localStorage.setItem('Token', data.token)
            modal.show('Login bem sucedido', data.message, [
                {
                    text: 'Ok',
                    type: 'primary',
                    handler: () => {
                        window.location.href = 'index.html';
                    }
                }
            ]);
        })
        .catch(error => {
            submitButton.disabled = false;
            submitButton.innerHTML = 'Login';
            loginMessage.innerHTML = `<span class="text-danger">Erro ao realizar o login: ${error.message}</span>`;
        })

    })
})