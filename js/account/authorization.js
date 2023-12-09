import { updateNavbar } from "../spa/navbar.js";
const requestAuthURL = "https://blog.kreosoft.space/api/account/login";
document.getElementById('authorizationForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const email = emailInput.value;
    const password = passwordInput.value;
    const requestData = {
        email: email,
        password: password
    };
    fetch(requestAuthURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
    })
        .then(data => {
        localStorage.setItem('token', data.token);
        console.log('Авторизация успешна:', data);
        window.location.href = ("/");
        updateNavbar();
    })
        .catch(error => {
        console.error('Ошибка регистрации:', error.message);
        errorMessageElement.textContent = 'Ошибка регистрации: ' + error.message;
        errorMessageElement.style.display = 'block';
    });
});
