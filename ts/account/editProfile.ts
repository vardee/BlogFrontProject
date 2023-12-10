import { validateRegistrationData } from "../additionService/informationValidation.js";

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

    const username = (document.getElementById('username') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const datetime = (document.getElementById('datetime') as HTMLInputElement).value;
    const gender = (document.getElementById('gender') as HTMLSelectElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    const validationErrors = validateRegistrationData(username, datetime, email, phone);

    if (validationErrors) {
        errorMessageElement.textContent = validationErrors;
        errorMessageElement.style.display = 'block';
        return;
    }

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
        window.location.reload();
    
        if (error.response) {
            console.error('HTTP Status:', error.response.status);
            error.response.text().then((text: any) => {
                console.error('Response Text:', text);
            });
        } else {
            console.error('Response Error:', error);
        }
    });
});
