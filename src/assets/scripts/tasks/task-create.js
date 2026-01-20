import { guardarTareas } from "./task-storage.js";
import { editarTarea } from "./task-edit.js";
import { attachDeleteHandler } from "./task-delete.js";

export function crearTarea({ titulo, fecha = "", importante = false, completada = false }) {
    const tasksContainer = document.querySelector(".tasks");
    if (!tasksContainer) return;

    const task = document.createElement("article");
    task.classList.add("task");
    if (completada) task.classList.add("completed");

    task.innerHTML = `
        <div class="task-body">
        <div class="task-title">${titulo}</div>
        <div class="task-meta">
            ${fecha ? `<span class="date">${fecha}</span>` : ""}
        </div>
        </div>
        <div class="task-actions">
            ${importante ? `<span class="tag important">Importante</span>` : ""}
            <label class="checkbox">
            <input type="checkbox" aria-label="Completar tarea: ${titulo}" ${completada ? "checked" : ""} />
            <span></span>
            </label>
            <button class="btn-icon" aria-label="Marcar importante">${importante ? "★" : "☆"}</button>
            <button class="edit-btn" aria-label="Editar">Editar</button>
            <button class="cancel-btn" aria-label="Eliminar">Eliminar</button>
        </div>
    `;

    // Conectar edición y eliminación
    editarTarea(task);
    attachDeleteHandler(task);

    // Evento marcar importante
    const importantBtn = task.querySelector('[aria-label="Marcar importante"]');
    importantBtn.addEventListener("click", () => {
        const meta = task.querySelector(".task-actions");

        if (importantBtn.textContent === "★") {
            importantBtn.textContent = "☆";
            meta.querySelector(".tag.important")?.remove();
        } else {
            importantBtn.textContent = "★";
            // ✅ Evitar duplicados antes de insertar
            if (!meta.querySelector(".tag.important")) {
            const tag = document.createElement("span");
            tag.classList.add("tag", "important");
            tag.textContent = "Importante";
            meta.insertBefore(tag, meta.querySelector(".checkbox"));
            }
        }
    guardarTareas();
    });

    // Evento completar
    const checkbox = task.querySelector('input[type="checkbox"]');
    checkbox.addEventListener("change", () => {
        task.classList.toggle("completed", checkbox.checked);
        guardarTareas();
    });

    tasksContainer.appendChild(task);
    guardarTareas();
}
