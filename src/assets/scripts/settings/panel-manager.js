export function openPanelById(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    document.querySelectorAll('.context-panel').forEach(p => p.classList.remove('open'));
    panel.classList.add('open');
}

export function closeAllPanels() {
    document.querySelectorAll('.context-panel').forEach(p => p.classList.remove('open'));
    document.querySelector('.settings-panel')?.classList.remove('open');
}
