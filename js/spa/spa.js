import { updateNavbar } from "./navbar.js";
import { addTagsToDiv } from '../tags/tagsToDiv.js';
import { showCommunityFullInformation } from "../community/communityInformationPage.js"
import { displayCommunity } from "../community/showCommunityList.js";
import {addCommunitiesToDiv} from "../community/communititesToDiv.js"
import { displayAuthors } from "../authors/showAuthorsList.js";
import {inputEditProfile} from "../account/updateUserProfileInfo.js"
import {showNotification} from "../additionService/showError.js"
 
export function loadScripts(scriptCode) {
    const container = document.createElement('div');
    container.innerHTML = scriptCode;

    const scriptTags = container.querySelectorAll('script[type="module"]');

    scriptTags.forEach(scriptTag => {
        const src = scriptTag.src.split('?')[0];
        const randomValue = Math.random();
        const updatedSrc = `${src}?random=${randomValue}`;

        const existingScript = document.querySelector(`script[type="module"][data-src="${src}"]`);

        if (existingScript) {
            existingScript.src = updatedSrc;
        } else {
            const newScript = document.createElement('script');
            newScript.type = "module";
            newScript.src = updatedSrc;
            newScript.setAttribute('data-src', updatedSrc);
            document.body.appendChild(newScript);
        }
    });
}


export const customRoute = (event, path) => {
    event.preventDefault();
    window.history.pushState({}, "", path);
    handleLocation(path);
    window.location.reload();
};

const routes = {
    "/": "/pages/main.html",
    "/login/": "/pages/authorization.html",
    "/registration": "/pages/registration.html",
    "/profile": "/pages/profile.html",
    "/post/create": "/pages/create.html",
    "/post/:id": "/pages/post.html",
    "/communities": "/pages/community.html",
    "/communities/:id": "/pages/communityPage.html",
    "/authors/": "/pages/authors.html"

};

const handleLocation = async (path = window.location.pathname) => {
    let routePath = null;

    for (const [route, routePage] of Object.entries(routes)) {
        const routeParts = route.split("/").filter(part => part !== "");
        const pathParts = path.split("/").filter(part => part !== "");

        if (routeParts.length === pathParts.length) {
            const params = {};

            const isMatch = routeParts.every((part, index) => {
                if (part.startsWith(":")) {
                    const paramName = part.slice(1);
                    params[paramName] = pathParts[index];
                    return true;
                }
                return part === pathParts[index];
            });

            if (isMatch) {
                routePath = routePage;
                break;
            }
        }
    }

    const token = localStorage.getItem('token');

    if (token && ((path === "/login/") || (path === "/registration/"))) {
        window.history.pushState({}, '', '/');
        window.location.reload();
    }

    if (path === "/" || path === "/post/create") {
        addTagsToDiv();
    }
    if (routePath) {
        try {
            const response = await fetch(routePath);

            if (!response.ok) {
                throw new Error(`Ошибка загрузки страницы. Код ошибки: ${response.status}`);
            }

            const html = await response.text();
            document.getElementById("containerId").innerHTML = html;

            const scriptTags = document.querySelectorAll('script[type="module"]');
            scriptTags.forEach(scriptTag => {
                const scriptCode = scriptTag.outerHTML;
                loadScripts(scriptCode);
            });

            updateNavbar();
            if (!token && (path === "/communities" || path === "/communities/" || path === "/authors/" || path === "/profile" || path === "/post/create")) {
                window.history.pushState({}, '', '/login/');
                window.location.reload();
            }
            
            if (path === "/communities") {
                await displayCommunity();
            }
            if (path.startsWith("/communities/")) {
                await addTagsToDiv();
                await showCommunityFullInformation();
            }
            if (path === "/post/create") {
                await addCommunitiesToDiv();
            }
            if (path === "/authors/") {
                await displayAuthors();
            }
            if(path === "/profile"){
                await inputEditProfile();
             }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error.message);
        }
    } else {
        console.error('Маршрут не найден:', path);
    }
};

const handleClick = (event) => {
    const target = event.target;
    const href = target.getAttribute('href');
    if (target.tagName === 'A' && href && href.startsWith('/')) {
        customRoute(event, href);
    }
};

document.body.addEventListener('click', handleClick);
window.addEventListener('popstate', () => handleLocation());
window.addEventListener('DOMContentLoaded', () => handleLocation());

const savedEventListeners = {
    click: [document.body, handleClick],
    popstate: [window, () => handleLocation()]
};

document.addEventListener('DOMContentLoaded', () => {
    for (const [element, listener] of Object.values(savedEventListeners)) {
        element.addEventListener(listener[0], listener[1]);
    }
});
