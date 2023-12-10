import { updateNavbar } from "../spa/navbar.js";

const requestAuthURL = "https://blog.kreosoft.space/api/account/login";

document.getElementById('authorizationForm')?.addEventListener('submit', async function (event) {
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

    try {
        const response = await fetch(requestAuthURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Сетевой ответ не был успешным');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Авторизация успешна:', data);
        window.location.href = "/";
        updateNavbar();
    } catch (error) {
        console.error('Ошибка авторизации:', (error as Error).message);
        if ((error as Error).message === 'Неверный email или пароль') {
            errorMessageElement.textContent = (error as Error).message;
        } else {
            errorMessageElement.textContent = 'Ошибка авторизации: Неверный email или пароль';
        }
        errorMessageElement.style.display = 'block';
    }
});
