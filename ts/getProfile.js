"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
function getProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const profileDataURL = "https://blog.kreosoft.space/api/account/profile";
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = yield fetch(profileDataURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                if (!response.ok) {
                    throw new Error(`Сетевой ответ не был успешным: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Ошибка при получении профиля:', error.message);
                throw error;
            }
        }
        else {
            console.log('Пользователь не авторизован');
            throw new Error('Пользователь не авторизован');
        }
    });
}
exports.getProfile = getProfile;
