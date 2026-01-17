import { guardarTareas } from "./task-storage.js";

/**
 * Elimina una tarea del DOM y actualiza el almacenamiento
 * @param {HTMLElement} task - El elemento <article class="task">
 */
export function eliminarTarea(task) {
    task.remove();
    guardarTareas();
}

/**
 * Conecta el botón eliminar de una tarea con la función eliminar
 * @param {HTMLElement} task - El elemento <article class="task">
 */
export function attachDeleteHandler(task) {
    const deleteBtn = task.querySelector('[aria-label="Eliminar"]');
    if (!deleteBtn) return;

    deleteBtn.addEventListener("click", () => {
        eliminarTarea(task);
    });
}
