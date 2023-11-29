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
exports.updateNavbar = void 0;
const getProfile_1 = require("./getProfile");
function updateNavbar() {
    return __awaiter(this, void 0, void 0, function* () {
        const unauthorizedNavbar = document.getElementById('unauthorizedNavbar');
        const authorizedNavbar = document.getElementById('authorizedNavbar');
        const userEmailElement = document.getElementById('userEmail');
        if (!unauthorizedNavbar || !authorizedNavbar || !userEmailElement) {
            console.error('Один из элементов навбара не найден.');
            return;
        }
        const userEmail = userEmailElement;
        const token = localStorage.getItem('token');
        if (token) {
            authorizedNavbar.style.display = 'block';
            unauthorizedNavbar.style.display = 'none';
            try {
                const profileData = yield (0, getProfile_1.getProfile)();
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
    });
}
exports.updateNavbar = updateNavbar;
