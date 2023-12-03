
import { updateNavbar } from "../ts/navbar.js";
import { addTagsToDiv } from '../ts/tagsToDiv.js';

const customRoute = (event, path) => {
    event.preventDefault();
    window.history.pushState({}, "", path);
    handleLocation(path);
    window.location.reload();
};

const routes = {
    "/": "/pages/main.html",
    "/authorization": "/pages/authorization.html",
    "/registration": "/pages/registration.html",
    "/profile": "/pages/profile.html",
    "/post": "/pages/pageWithPosts.html"
};

const handleLocation = async (path = window.location.pathname) => {
    const routePath = routes[path];
    const token = localStorage.getItem('token');
    
    if (token && ((path === "/authorization") || (path === "/registration"))) {
            window.history.pushState({}, '', `/`);
        console.log("asdasdasdasd")
    }

    if (path === "/") {
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

            const scriptTags = document.querySelectorAll('script[data-src]');
            scriptTags.forEach(scriptTag => {
                const src = scriptTag.dataset.src;
                if (src) {
                    import(src)
                        .then(module => {
                        })
                        .catch(error => {
                            console.error('Ошибка при загрузке скрипта:', error);
                        });
                }
            });

            updateNavbar();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error.message);
        }
    } else {
        console.error('Маршрут не найден:', path);
    }
};

const handleClick = (event) => {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('href').startsWith('/')) {
        customRoute(event, target.getAttribute('href'));
    }
};

document.body.addEventListener('click', handleClick);
window.addEventListener('popstate', () => handleLocation());
window.addEventListener('DOMContentLoaded', () => handleLocation());

const savedEventListeners = {
    click: [document.body, handleClick],
    popstate: [window, () => handleLocation()]
};

window.onload = () => {
    for (const [element, listener] of Object.values(savedEventListeners)) {
        element.addEventListener(listener[0], listener[1]);
    }
};
