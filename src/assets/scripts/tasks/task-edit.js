import { guardarTareas } from "./task-storage.js";

/**
 * Conecta el botón editar de una tarea con la lógica de edición
 * @param {HTMLElement} task - El elemento <article class="task">
 */
export function editarTarea(task) {
    const editBtn = task.querySelector(".edit-btn");
    const deleteBtn = task.querySelector('[aria-label="Eliminar"]');
    if (!editBtn || !deleteBtn) return;

    editBtn.addEventListener("click", () => {
        const isEditing = task.classList.contains("editing");

        if (!isEditing) {
        const titleEl = task.querySelector(".task-title");
        const dateEl = task.querySelector(".date");
        if (!titleEl) return;

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = titleEl.textContent;
        titleInput.classList.add("edit-input");

        const dateInput = document.createElement("input");
        dateInput.type = "datetime-local";
        dateInput.value = dateEl?.textContent || "";
        dateInput.classList.add("edit-input");

        titleEl.replaceWith(titleInput);
        if (dateEl) {
            dateEl.replaceWith(dateInput);
        } else {
            task.querySelector(".task-meta")?.appendChild(dateInput);
        }

        editBtn.textContent = "Guardar cambios";
        editBtn.setAttribute("aria-label", "Guardar");
        task.classList.add("editing");
        deleteBtn.style.display = "none";

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("btn-cancel");
        cancelBtn.textContent = "✖";
        cancelBtn.setAttribute("aria-label", "Cancelar edición");

        const actions = task.querySelector(".task-actions");
        if (actions) actions.appendChild(cancelBtn);

        cancelBtn.addEventListener("click", () => {
            titleInput.replaceWith(titleEl);
            if (dateEl) {
            dateInput.replaceWith(dateEl);
            } else {
            dateInput.remove();
            }
            editBtn.textContent = "Editar";
            editBtn.setAttribute("aria-label", "Editar");
            task.classList.remove("editing");
            cancelBtn.remove();
            deleteBtn.style.display = "";
        });

        } else {
        const titleInput = task.querySelector("input[type='text'].edit-input");
        const dateInput = task.querySelector("input[type='datetime-local'].edit-input");
        if (!titleInput) return;

        const newTitleEl = document.createElement("div");
        newTitleEl.classList.add("task-title");
        newTitleEl.textContent = titleInput.value.trim() || "Sin título";
        titleInput.replaceWith(newTitleEl);

        if (dateInput) {
            if (dateInput.value) {
            const newDateEl = document.createElement("span");
            newDateEl.classList.add("date");
            newDateEl.textContent = dateInput.value;
            dateInput.replaceWith(newDateEl);
            } else {
            dateInput.remove();
            }
        }

        editBtn.textContent = "Editar";
        editBtn.setAttribute("aria-label", "Editar");
        task.classList.remove("editing");
        task.querySelector(".btn-cancel")?.remove();
        deleteBtn.style.display = "";

        guardarTareas();
        }
    });
}
