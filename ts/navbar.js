import { getProfile } from './getProfile.js';
export async function updateNavbar() {
    const unauthorizedNavbar = document.getElementById('unauthorizedNavbar');
    const authorizedNavbar = document.getElementById('authorizedNavbar');
    const userEmailElement = document.getElementById('userEmail');

    if (!unauthorizedNavbar || !authorizedNavbar) {
        console.error('Один из элементов навбара не найден.');
        return;
    }

    const token = localStorage.getItem('token');
    if (token) {
        console.log(token);
        authorizedNavbar.style.display = 'block';
        unauthorizedNavbar.style.display = 'none';
        try {
            const profileData = await getProfile();
            userEmailElement.innerText = profileData.email;
        } catch (error) {
            console.error('Ошибка при получении профиля:', error.message);
        }
    } else {
        authorizedNavbar.style.display = 'none';
        unauthorizedNavbar.style.display = 'block';
    }
}
