"use strict";
var _a;
const requestAuthURL = "https://blog.kreosoft.space/api/account/login";
(_a = document.getElementById('authorizationForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
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
    })
        .catch(error => {
        console.error('Ошибка авторизации:', error.message);
    });
});
