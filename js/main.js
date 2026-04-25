document.addEventListener("DOMContentLoaded", () => {
    const tooltipTriggers = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggers.forEach((trigger) => {
        new bootstrap.Tooltip(trigger);
    });
});