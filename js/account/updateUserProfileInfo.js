import { getProfile } from "./getProfile.js";
export async function inputEditProfile() {
    try {
        const profileData = await getProfile();
        const emailInput = document.getElementById('email');
        const usernameInput = document.getElementById('username');
        const datetimeInput = document.getElementById('datetime');
        const genderSelect = document.getElementById('gender');
        const phoneInput = document.getElementById('phone');
        emailInput.value = profileData.email || '';
        usernameInput.value = profileData.fullName || '';
        datetimeInput.value = profileData.birthDate || '';
        genderSelect.value = profileData.gender || '';
        phoneInput.value = profileData.phoneNumber || '';
    }
    catch (error) {
        console.error('Ошибка при заполнении данных профиля:', error.message);
    }
}
