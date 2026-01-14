import { crearTarea } from './task-create.js';

export function guardarTareas() {
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

    export function restaurarTareas() {
    const saved = localStorage.getItem("ledooTasks");
    if (!saved) return;

    const tasks = JSON.parse(saved);
    tasks.forEach(t => crearTarea(t));
}
