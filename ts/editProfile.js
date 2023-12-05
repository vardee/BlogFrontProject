"use strict";
const requestEditURL = "https://blog.kreosoft.space/api/account/profile";
document.getElementById('editForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }
    if (!token) {
        console.log('Пользователь не авторизован');
        errorMessageElement.textContent = 'Пользователь не авторизован';
        errorMessageElement.style.display = 'block';
        return;
    }
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const datetime = document.getElementById('datetime').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const requestData = {
        fullName: username,
        email: email,
        birthDate: datetime,
        gender: gender,
        phoneNumber: phone,
    };
    console.log(token);
    fetch(requestEditURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
        console.log('Данные поменяны:', data);
    })
        .catch(error => {
        console.error('Ошибка смены данных:', error.message);
        if (error.response) {
            console.error('HTTP Status:', error.response.status);
            error.response.text().then((text) => {
                console.error('Response Text:', text);
            });
        }
        else {
            console.error('Response Error:', error);
        }
        errorMessageElement.textContent = 'Ошибка смены данных: ' + error.message;
        errorMessageElement.style.display = 'block';
    });
});
