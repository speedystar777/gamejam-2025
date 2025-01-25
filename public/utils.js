const mouseControlsCheckbox = document.getElementById("mouse-controls");
function mouseControlsEnabled() {
    return mouseControlsCheckbox.checked;
}

function getOffset(el) {
    const rect = el?.getBoundingClientRect();
    return {
        left: rect?.left + window.scrollX,
        top: rect?.top + window.scrollY,
    };
}