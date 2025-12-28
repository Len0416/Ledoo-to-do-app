// ===========================
// 📌 Función: Toggle Sidebar
// ===========================
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('open');
}

// ===========================
// 📌 Función: Toggle Ajustes (hamburguesa)
// ===========================
function toggleSettingsPanel() {
  const settingsPanel = document.querySelector('.settings-panel');
  settingsPanel.classList.toggle('open');
}

// ===========================
// 📌 Función: Cambiar Fondo
// ===========================
function setWallpaper(imgSrc) {
  const main = document.querySelector('.main');
  main.style.backgroundImage = `url(${imgSrc})`;
  main.style.backgroundSize = 'cover';
  main.style.backgroundPosition = 'center';
  main.style.backgroundRepeat = 'no-repeat';
  localStorage.setItem('ledooWallpaper', imgSrc);
}

// ===========================
// 📌 Función: Restaurar Fondo
// ===========================
function restoreWallpaper() {
  const saved = localStorage.getItem('ledooWallpaper');
  if (saved) setWallpaper(saved);
}

// ===========================
// 📌 Función: Cambiar Tema
// ===========================
function setTheme(mode) {
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

function restoreTheme() {
  const saved = localStorage.getItem('ledooTheme');
  if (saved) setTheme(saved);
}

// ===========================
// 📌 Inicialización
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ functions.js cargado correctamente");

  // Restaurar fondo y tema
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

  // ✅ Eventos para hamburguesa
  const hamburgerBtn = document.querySelector('.hamburger');
  const closeBtn = document.querySelector('.close-settings');
  const settingsPanel = document.querySelector('.settings-panel');

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      settingsPanel.classList.add('open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      settingsPanel.classList.remove('open');
    });
  }
});
