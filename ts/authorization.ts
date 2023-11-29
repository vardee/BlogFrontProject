
const requestAuthURL = "https://blog.kreosoft.space/api/account/login";

document.getElementById('authorizationForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const errorMessageElement = document.getElementById('error-message');
    if (!errorMessageElement) {
        console.error('Error message element not found');
        return;
    }

    const emailInput = document.getElementById('email') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;

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
        window.location.href = "#/";
    })
    .catch(error => {
        console.error('Ошибка регистрации:', error.message);
        errorMessageElement.textContent = 'Ошибка регистрации: ' + error.message;
        errorMessageElement.style.display = 'block';
    });
});


