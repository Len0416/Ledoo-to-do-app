function crearTarea({ titulo, fecha = "", importante = false, completada = false }) {
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

  // Eliminar
  task.querySelector('[aria-label="Eliminar"]').addEventListener("click", () => {
    task.remove();
    guardarTareas();
  });

  // Importante
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

  // Completada
  const checkbox = task.querySelector('input[type="checkbox"]');
  checkbox.addEventListener("change", () => {
    task.classList.toggle("completed", checkbox.checked);
    guardarTareas();
  });

  // Editar
  const editBtn = task.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    const isEditing = task.classList.contains("editing");

    if (!isEditing) {
      const titleEl = task.querySelector(".task-title");
      const dateEl = task.querySelector(".date");

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
        task.querySelector(".task-meta").appendChild(dateInput);
      }

      editBtn.textContent = "💾";
      editBtn.setAttribute("aria-label", "Guardar");
      task.classList.add("editing");

      const cancelBtn = document.createElement("button");
      cancelBtn.classList.add("btn-icon", "cancel-btn");
      cancelBtn.textContent = "✖";
      cancelBtn.setAttribute("aria-label", "Cancelar edición");
      task.querySelector(".task-actions").insertBefore(cancelBtn, task.querySelector('[aria-label="Eliminar"]'));

      cancelBtn.addEventListener("click", () => {
        titleInput.replaceWith(titleEl);
        if (dateEl) {
          dateInput.replaceWith(dateEl);
        } else {
          dateInput.remove();
        }
        editBtn.textContent = "✎";
        editBtn.setAttribute("aria-label", "Editar");
        task.classList.remove("editing");
        cancelBtn.remove();
      });

    } else {
      const titleInput = task.querySelector(".edit-input[type='text']");
      const dateInput = task.querySelector(".edit-input[type='datetime-local']");

      const newTitleEl = document.createElement("div");
      newTitleEl.classList.add("task-title");
      newTitleEl.textContent = titleInput.value.trim() || "Sin título";

      const newDateEl = document.createElement("span");
      newDateEl.classList.add("date");
      newDateEl.textContent = dateInput.value;

      titleInput.replaceWith(newTitleEl);
      dateInput.replaceWith(newDateEl);

      editBtn.textContent = "✎";
      editBtn.setAttribute("aria-label", "Editar");
      task.classList.remove("editing");
      task.querySelector(".cancel-btn")?.remove();

      guardarTareas();
    }
  });

  tasksContainer.appendChild(task);
  guardarTareas();
}

// Guardar tareas
function guardarTareas() {
  const tasks = [];
  document.querySelectorAll(".task").forEach(task => {
    const titulo = task.querySelector(".task-title")?.textContent || "";
    const fecha = task.querySelector(".date")?.textContent || "";
    const importante = task.querySelector('[aria-label="Marcar importante"]').textContent === "★";
    const completada = task.querySelector('input[type="checkbox"]').checked;

    tasks.push({ titulo, fecha, importante, completada });
  });
  localStorage.setItem("ledooTasks", JSON.stringify(tasks));
}

// Restaurar tareas
function restaurarTareas() {
  const saved = localStorage.getItem("ledooTasks");
  if (!saved) return;

  const tasks = JSON.parse(saved);
  tasks.forEach(t => crearTarea(t));
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  restaurarTareas();

  const form = document.querySelector(".task-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const titulo = form.querySelector(".task-input").value.trim();
      const fecha = form.querySelector(".task-date").value;
      const importante = form.querySelector(".task-important input").checked;

      if (titulo !== "") {
        crearTarea({ titulo, fecha, importante });
        form.reset();
      }
    });
  }
});