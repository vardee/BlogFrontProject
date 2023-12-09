import { getProfile } from '../account/getProfile.js';
export async function updateNavbar() {
    const unauthorizedNavbar = document.getElementById('unauthorizedNavbar');
    const authorizedNavbar = document.getElementById('authorizedNavbar');
    const userEmailElement = document.getElementById('userEmail');
    console.log(unauthorizedNavbar);
    console.log(authorizedNavbar);
    if (!unauthorizedNavbar || !authorizedNavbar) {
        console.error('Один из элементов навбара не найден.');
        return;
    }
    const userEmail = userEmailElement;
    const token = localStorage.getItem('token');
    if (token) {
        authorizedNavbar.style.display = 'block';
        unauthorizedNavbar.style.display = 'none';
        try {
            const profileData = await getProfile();
            userEmail.innerText = profileData.email;
        }
        catch (error) {
            console.error('Ошибка при получении профиля:', error.message);
        }
    }
    else {
        authorizedNavbar.style.display = 'none';
        unauthorizedNavbar.style.display = 'block';
    }
}
