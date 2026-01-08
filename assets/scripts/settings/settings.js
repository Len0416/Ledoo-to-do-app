// settings.js
export function openSettingsPanel() {
    const settingsPanel = document.querySelector('.settings-panel');
    if (!settingsPanel) {
        console.log('⚠️ settings-panel no encontrado');
        return;
    }

    document.querySelectorAll('.context-panel').forEach(p => p.classList.remove('open'));
    settingsPanel.classList.add('open');
}

export function closeSettingsPanel() {
    const settingsPanel = document.querySelector('.settings-panel');
    if (!settingsPanel) return;
    settingsPanel.classList.remove('open');
}

export function toggleSettingsPanel() {
    const settingsPanel = document.querySelector('.settings-panel');
    if (!settingsPanel) return;

    if (settingsPanel.classList.contains('open')) {
        closeSettingsPanel();
    } else {
        openSettingsPanel();
    }
}
