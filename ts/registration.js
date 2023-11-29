"use strict";
var _a;
const requestRegisterURL = "https://blog.kreosoft.space/api/account/register";
(_a = document.getElementById('registrationForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const datetime = document.getElementById('datetime').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const requestData = {
        fullName: username,
        password: password,
        email: email,
        birthDate: datetime,
        gender: gender,
        phoneNumber: phone,
    };
    fetch(requestRegisterURL, {
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
        console.log('Регистрация успешна:', data);
    })
        .catch(error => {
        console.error('Ошибка регистрации:', error.message);
        errorMessageElement.textContent = 'Ошибка регистрации: ' + error.message;
        errorMessageElement.style.display = 'block';
    });
});
