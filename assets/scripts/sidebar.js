// sidebar.js (robusto, con logs y toggle)
document.addEventListener('DOMContentLoaded', () => {
    const topbarButtons = document.querySelectorAll('.topbar .btn-icon');
    const panels = document.querySelectorAll('.context-panel');
    const settingsPanel = document.querySelector('.settings-panel');

    console.log('[sidebar] botones topbar encontrados:', topbarButtons.length);
    console.log('[sidebar] panels encontrados:', panels.length);
    console.log('[sidebar] settingsPanel encontrado:', !!settingsPanel);

    const normalize = (label) => {
        if (!label) return null;
        // Si ya viene como "panel-xxx" lo devolvemos tal cual
        if (label.startsWith('panel-')) return label;
        // Normalizar: minúsculas, espacios -> guiones, quitar caracteres no válidos
        return 'panel-' + label.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    };

    const closeAllPanels = () => {
        panels.forEach(p => p.classList.remove('open'));
        if (settingsPanel) settingsPanel.classList.remove('open');
    };

    const openPanelById = (id) => {
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) {
        console.warn('[sidebar] no existe panel con id:', id);
        return;
        }

        // Si el panel ya está abierto, lo cerramos (toggle)
        const alreadyOpen = target.classList.contains('open');
        closeAllPanels();
        if (!alreadyOpen) {
        target.classList.add('open');
        console.log('[sidebar] abierto:', id);
        } else {
        console.log('[sidebar] cerrado (toggle):', id);
        }
    };

    topbarButtons.forEach(btn => {
        btn.addEventListener('click', (ev) => {
        ev.stopPropagation();

        const aria = btn.getAttribute('aria-label');
        const normalized = normalize(aria);

        console.log('[sidebar] click en botón, aria-label:', aria, '-> normalized:', normalized);

        // Si es el botón de settings (tiene clase .setting) lo manejamos aparte
        if (btn.classList.contains('setting')) {
            if (!settingsPanel) {
            console.warn('[sidebar] settings-panel no encontrado en DOM');
            return;
            }
            settingsPanel.classList.toggle('open');
            console.log('[sidebar] toggle settings-panel ->', settingsPanel.classList.contains('open'));
            // cerramos panels contextuales si abrimos settings
            if (settingsPanel.classList.contains('open')) panels.forEach(p => p.classList.remove('open'));
            return;
        }

        // Si no hay normalized target, ignoramos
        if (!normalized) {
            console.warn('[sidebar] aria-label inválido o vacío en botón:', btn);
            return;
        }

        openPanelById(normalized);
        });
    });

    // Cerrar con el botón interno ✖
    document.querySelectorAll('.close-panel').forEach(closeBtn => {
        closeBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        const panel = closeBtn.closest('.context-panel');
        if (panel) {
            panel.classList.remove('open');
            console.log('[sidebar] panel cerrado manualmente:', panel.id);
        }
        });
    });

    // Cerrar settings con su botón (si existe)
    const closeSettings = document.querySelector('.close-settings');
    if (closeSettings && settingsPanel) {
        closeSettings.addEventListener('click', () => {
        settingsPanel.classList.remove('open');
        console.log('[sidebar] settings-panel cerrado por botón');
        });
    }

    // Click fuera para cerrar paneles (útil en móvil)
    document.addEventListener('click', (ev) => {
        if (ev.target.closest('.context-panel') || ev.target.closest('.topbar') || ev.target.closest('.settings-panel')) return;
        panels.forEach(p => p.classList.remove('open'));
        if (settingsPanel) settingsPanel.classList.remove('open');
        // console.log('[sidebar] click fuera: cierro panels y settings');
    });

    // Evitar que clicks dentro del panel se propaguen y cierren por el listener global
    panels.forEach(p => p.addEventListener('click', (ev) => ev.stopPropagation()));
});
