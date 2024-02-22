document.addEventListener('DOMContentLoaded', function () {
    const folders = document.querySelectorAll('.folder');

    folders.forEach(folder => {
        folder.addEventListener('dblclick', function () {
            const modalId = 'modal-' + this.id; // Construct the modal ID
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex'; // Show the modal
            }
        });
    });

    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        // When a modal header is clicked, bring the modal to the front
        const header = modal.querySelector('.modal-header');
        header.addEventListener('mousedown', function () {
            bringToFront(modal);
        });

        // Also apply the draggable functionality
        makeModalDraggable(modal, header);
    });
    

    // Add click event listeners to close buttons
    const closeButtons = document.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.parentElement.parentElement.style.display = 'none'; // Hide the modal
        });
    });

    });

    function makeModalDraggable(modal, header) {
        let offsetX = 0, offsetY = 0, drag = false;
    
        header.addEventListener('mousedown', function (e) {
            drag = true;
    
            // Get the initial position of the modal relative to the viewport
            const rect = modal.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
    
            // When dragging starts, we want to remove any margin auto that centers the modal
            modal.style.marginLeft = rect.left + "px";
            modal.style.marginTop = rect.top + "px";
            modal.style.marginRight = "auto";
            modal.style.marginBottom = "auto";
    
            function onMouseMove(e) {
                if (!drag) return;
                // Calculate the new position
                const newLeft = e.clientX - offsetX;
                const newTop = e.clientY - offsetY;
    
                // Update the modal's position
                modal.style.marginLeft = `${newLeft}px`;
                modal.style.marginTop = `${newTop}px`;
            }
    
            function onMouseUp() {
                drag = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
    
            // Attach the mousemove and mouseup listeners to the document
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            e.preventDefault(); // Prevent default action (text selection, etc.)
        });
    }

    // Function to bring an element to the front
function bringToFront(element) {
    // Define the maximum z-index value that draggable elements can have
    const maxZIndex = 99;

    // Find all draggable elements (modals and terminal)
    const draggableElements = document.querySelectorAll('.modal, #terminal');

    // Get the highest current z-index without exceeding the maxZIndex
    let highestIndex = 0;
    draggableElements.forEach(draggableElement => {
        const zIndex = parseInt(window.getComputedStyle(draggableElement).zIndex, 10) || 0;
        if (zIndex < maxZIndex) {
            highestIndex = zIndex > highestIndex ? zIndex : highestIndex;
        }
    });

    // Set the z-index of the clicked element to be one higher than the current highest,
    // but not higher than maxZIndex
    element.style.zIndex = highestIndex < maxZIndex ? highestIndex + 1 : maxZIndex;
}
