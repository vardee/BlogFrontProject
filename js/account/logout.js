import { updateNavbar } from "../spa/navbar.js";
const logoutURL = "https://blog.kreosoft.space/api/account/logout";
document.getElementById('logout')?.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('Token not found in localStorage');
        return;
    }
    fetch(logoutURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Сетевой ответ не был успешным');
        }
        return response.json();
    })
        .then(data => {
        console.log('Пользователь успешно вышел:', data);
        localStorage.removeItem('token');
        localStorage.clear();
        if (window.location.href !== '/authorization') {
            window.history.pushState({}, '', `/`);
            updateNavbar();
        }
    })
        .catch(error => {
        console.error('Ошибка выхода:', error.message);
    });
});
