// appearance.js
// Funciones para manejar wallpapers y temas

// 📌 Cambiar fondo
export function setWallpaper(imgSrc) {
    const main = document.querySelector('.main');
    main.style.backgroundImage = `url(${imgSrc})`;
    main.style.backgroundSize = 'cover';
    main.style.backgroundPosition = 'center';
    main.style.backgroundRepeat = 'no-repeat';
    localStorage.setItem('ledooWallpaper', imgSrc);
}

// 📌 Restaurar fondo desde localStorage
export function restoreWallpaper() {
    const saved = localStorage.getItem('ledooWallpaper');
    if (saved) setWallpaper(saved);
}

// 📌 Cambiar tema (dark/light)
export function setTheme(mode) {
    const body = document.body;
    if (mode === 'dark') {
        body.classList.add('theme-dark');
        body.classList.remove('theme-light');
        localStorage.setItem('ledooTheme', 'dark');
    } else {
        body.classList.add('theme-light');
        body.classList.remove('theme-dark');
        localStorage.setItem('ledooTheme', 'light');
    }
}

// 📌 Restaurar tema desde localStorage
export function restoreTheme() {
    const saved = localStorage.getItem('ledooTheme');
    if (saved) setTheme(saved);
}

// 📌 Inicialización de apariencia
export function initAppearance() {
    console.log("✅ appearance.js cargado correctamente");

    // Restaurar fondo y tema al cargar
    restoreWallpaper();
    restoreTheme();

    // Eventos para wallpapers
    document.querySelectorAll('.wallpaper-card img').forEach(img => {
        img.addEventListener('click', () => setWallpaper(img.src));
    });

    // Eventos para botones de tema
    document.querySelectorAll('.btn-outline').forEach(btn => {
        btn.addEventListener('click', () => {
        const mode = btn.textContent.toLowerCase();
        setTheme(mode === 'oscuro' ? 'dark' : 'light');
        });
    });
}
