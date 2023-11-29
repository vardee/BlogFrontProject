import{updateNavbar} from "../ts/navbar.js"
document.addEventListener('DOMContentLoaded', function () {
    const customRoute = (event) => {
        event = event || window.event;
        event.preventDefault();
        window.history.replaceState({}, "", event.target.href);
        handleLocation();
    };

    const routes = {
        "/": "/pages/main.html",
        "/authorization": "/pages/authorization.html",
        "/registration": "/pages/registration.html",
        "/profile": "/pages/profile.html"
    };

    const handleLocation = async () => {
        const path = window.location.hash.substring(1);
        const routePath = routes[path];
    
        if (routePath) {
            try {
                const response = await fetch(routePath);
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
                console.error('Ошибка при загрузке файла:', error);
    
            }
        }
        else{
        try {
            const response = await fetch(routes["/"]);
            const html = await response.text();
            document.getElementById("containerId").innerHTML = html;
            updateNavbar();
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
        }
    }
    };

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.tagName === 'A' && target.getAttribute('href').startsWith('#/')) {
            customRoute(event);
        }
    });

    window.onpopstate = handleLocation;
    window.onload = handleLocation;
    handleLocation();
});
