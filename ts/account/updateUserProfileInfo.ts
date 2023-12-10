import { getProfile } from "./getProfile.js";
export async function inputEditProfile() {
    try {
        const profileData = await getProfile();
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const usernameInput = document.getElementById('username') as HTMLInputElement;
        const datetimeInput = document.getElementById('datetime') as HTMLInputElement;
        const genderSelect = document.getElementById('gender') as HTMLSelectElement;
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        emailInput.value = profileData.email || '';
        usernameInput.value = profileData.fullName || '';
        datetimeInput.value = profileData.birthDate || '';
        genderSelect.value = profileData.gender || '';
        phoneInput.value = profileData.phoneNumber || '';

    } catch (error) {
        console.error('Ошибка при заполнении данных профиля:', (error as Error).message);
    }
}
