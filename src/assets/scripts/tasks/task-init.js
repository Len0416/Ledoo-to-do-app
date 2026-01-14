import { crearTarea } from './task-create.js';
import { restaurarTareas } from './task-storage.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ tasksScripts cargado correctamente");
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
