// panel-init.js
// Controla los paneles contextuales y el settings-panel (⚙️)
// Integra también la inicialización de wallpapers y temas desde appearance.js
import { initAppearance } from './appearance.js';
import { openSettingsPanel, closeSettingsPanel, toggleSettingsPanel } from './settings.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ panel-init.js cargado correctamente");

    // Inicializar apariencia (wallpapers y temas)
    initAppearance();

    // Selecciona todos los botones dentro del topbar (👤, 📒, ⚙️, etc.)
    const topbarButtons = document.querySelectorAll('.topbar .btn-icon');
    const settingsPanel = document.querySelector('.settings-panel');

    // -------------------------------
    // Funciones para paneles contextuales
    // -------------------------------

    // Abre un panel contextual por id y cierra los demás
    function openPanelById(id) {
        const panel = document.getElementById(id);
        if (!panel) return;

        // Cierra todos los paneles contextuales
        document.querySelectorAll('.context-panel').forEach(p => p.classList.remove('open'));

        // Abre el panel solicitado
        panel.classList.add('open');
    }

    // Cierra todos los paneles (contextuales y ajustes)
    function closeAllPanels() {
        document.querySelectorAll('.context-panel').forEach(p => p.classList.remove('open'));
        closeSettingsPanel(); // también cierra ajustes
    }

    // -------------------------------
    // Listeners de los botones del topbar
    // -------------------------------
    topbarButtons.forEach(btn => {
        btn.addEventListener('click', (ev) => {
        ev.stopPropagation(); // evita que el clic cierre todo por el listener global

        // Si el botón es ⚙️ (ajustes)
        if (btn.classList.contains('setting')) {
            toggleSettingsPanel();
            return; // no sigue con lógica de paneles contextuales
        }

        // Para los demás botones, abre el panel contextual asociado
        const targetId = btn.dataset.panel;
        openPanelById(targetId);
        });
    });

    // -------------------------------
    // Botón ✖ dentro de cada panel contextual
    // -------------------------------
    document.querySelectorAll('.close-panel').forEach(btn => {
        btn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        btn.closest('.context-panel')?.classList.remove('open');
        });
    });

    // -------------------------------
    // Botón ✖ dentro del settings-panel
    // -------------------------------
    document.querySelector('.close-settings')?.addEventListener('click', (ev) => {
        ev.stopPropagation();
        closeSettingsPanel();
    });

    // -------------------------------
    // Listener global: clic fuera de paneles
    // -------------------------------
    document.addEventListener('click', (ev) => {
        // Si el clic ocurre dentro del topbar, un panel contextual o el settings-panel → no hace nada
        if (
        ev.target.closest('.topbar') ||
        ev.target.closest('.context-panel') ||
        ev.target.closest('.settings-panel')
        ) return;

        // Si el clic ocurre fuera → cierra todo
        closeAllPanels();
    });
});
