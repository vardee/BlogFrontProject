import { getProfile, ProfileData } from '../account/getProfile.js'; 

export async function updateNavbar(): Promise<void> {
    const unauthorizedNavbar = document.getElementById('unauthorizedNavbar');
    const authorizedNavbar = document.getElementById('authorizedNavbar');
    const userEmailElement = document.getElementById('userEmail');

    console.log(unauthorizedNavbar);
    console.log(authorizedNavbar);
    if (!unauthorizedNavbar || !authorizedNavbar) {
        console.error('Один из элементов навбара не найден.');
        return;
    }
    const userEmail = userEmailElement as HTMLSpanElement;
    const token = localStorage.getItem('token');
     if (token) {
        authorizedNavbar.style.display = 'block';
        unauthorizedNavbar.style.display = 'none';

        try {
            const profileData: ProfileData = await getProfile();
            userEmail.innerText = profileData.email as string;
        } catch (error) {
            console.error('Ошибка при получении профиля:', (error as Error).message);
        }
    } else {
        authorizedNavbar.style.display = 'none';
        unauthorizedNavbar.style.display = 'block';
    }
}