export function validateRegistrationData(username, password, email, phone) {
    if (!username.trim()) {
        return 'Имя пользователя не может быть пустым';
    }
    if (password.length < 6) {
        return 'Пароль должен содержать минимум 6 символов';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Неверный формат электронной почты';
    }
    const phoneRegex = /^(\+7|\b8)([0-9]{10})$/;
    ;
    if (!phoneRegex.test(phone)) {
        return 'Неверный формат номера телефона. Используйте: +7 (xxx) xxx-xx-xx';
    }
    return '';
}
