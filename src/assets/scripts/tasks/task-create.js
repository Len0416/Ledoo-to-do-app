import { guardarTareas } from './task-storage.js';

export function crearTarea({ titulo, fecha = "", importante = false, completada = false }) {
    const tasksContainer = document.querySelector(".tasks");
    if (!tasksContainer) return;

    const task = document.createElement("article");
    task.classList.add("task");
    if (completada) task.classList.add("completed");

    task.innerHTML = `
        <label class="checkbox">
        <input type="checkbox" aria-label="Completar tarea: ${titulo}" ${completada ? "checked" : ""} />
        <span></span>
        </label>
        <div class="task-body">
        <div class="task-title">${titulo}</div>
        <div class="task-meta">
            ${importante ? `<span class="tag important">Importante</span>` : ""}
            ${fecha ? `<span class="date">${fecha}</span>` : ""}
        </div>
        </div>
        <div class="task-actions">
        <button class="btn-icon" aria-label="Marcar importante">${importante ? "★" : "☆"}</button>
        <button class="btn-icon edit-btn" aria-label="Editar">✎</button>
        <button class="btn-icon" aria-label="Eliminar">🗑</button>
        </div>
    `;

    // Eventos de eliminar, marcar importante, completar y editar
    task.querySelector('[aria-label="Eliminar"]').addEventListener("click", () => {
        task.remove();
        guardarTareas();
    });

    const importantBtn = task.querySelector('[aria-label="Marcar importante"]');
    importantBtn.addEventListener("click", () => {
        const meta = task.querySelector(".task-meta");
        if (importantBtn.textContent === "★") {
        importantBtn.textContent = "☆";
        meta.querySelector(".tag.important")?.remove();
        } else {
        importantBtn.textContent = "★";
        const tag = document.createElement("span");
        tag.classList.add("tag", "important");
        tag.textContent = "Importante";
        meta.insertBefore(tag, meta.querySelector(".date"));
        }
        guardarTareas();
    });

    const checkbox = task.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
        task.classList.toggle("completed", checkbox.checked);
        guardarTareas();
    });

    const editBtn = task.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        const isEditing = task.classList.contains("editing");
        // ... aquí va toda la lógica de edición que ya tienes
        // (puedes mantenerla igual, solo dentro de este módulo)
    });

    tasksContainer.appendChild(task);
    guardarTareas();
}
