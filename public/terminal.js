document.addEventListener('DOMContentLoaded', function () {


    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');
    let history = [];
    let historyIndex = -1;

    const terminal = document.getElementById('terminal');




    inputField.addEventListener('keydown', function (event) {
        // Handle command history navigation
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault(); // Prevent cursor movement
            if (event.key === 'ArrowUp' && historyIndex < history.length - 1) {
                historyIndex++;
            } else if (event.key === 'ArrowDown' && historyIndex > 0) {
                historyIndex--;
            }

            if (historyIndex >= 0 && historyIndex < history.length) {
                inputField.value = history[historyIndex];
            } else {
                inputField.value = '';
            }
        }

        // Handle command execution and auto-completion
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const inputVal = inputField.value.trim();
            if (inputVal === '') return;

            // Reset history index and add command to history
            historyIndex = -1;
            history.unshift(inputVal);
            processCommand(inputVal.split(' ')); // Split command and arguments
            inputField.value = ''; // Clear input after command execution
        } else if (event.key === 'Tab') {
            event.preventDefault(); // Prevent focus change
            autoCompleteCommand(inputField.value.trim());
        }
    });

    // Command processing with arguments
    function processCommand(args) {
        const command = args[0].toLowerCase();
        const params = args.slice(1); // Separate command arguments

        outputDiv.innerHTML += `<div class="input-line">${document.querySelector('.prompt').textContent}${args.join(' ')}</div>`;

        switch (command) {
            case 'help':
                showHelp();
                break;
            case 'about':
                outputDiv.innerHTML += `<p>I'm a web developer passionate about building interactive web applications.</p>`;
                break;
            case 'echo':
                outputDiv.innerHTML += `<p>${params.join(' ')}</p>`; // Echo command arguments
                break;
            case 'clear':
                outputDiv.innerHTML = '';
                break;
            case 'light':
                changeTheme('light');
                break;
            case 'dark':
                changeTheme('dark');
                break;
            case 'pastel':
                changeTheme('pastel');
                break;
            case 'synthwave':
                changeTheme('synthwave');
                break;
            case 'halo':
                changeTheme('halo');
                break;
            default:
                outputDiv.innerHTML += `<p>Command not recognized. Type 'help' for a list of commands.</p>`;
                break;
        }

        outputDiv.scrollTop = outputDiv.scrollHeight; // Scroll to the bottom
    }


    // Show available commands
    function showHelp() {
        outputDiv.innerHTML += `<p>Available commands:<br>
                              - help: Show available commands<br>
                              - about: Learn more about me<br>
                              - light: Switch to light mode<br>
                              - dark: Switch to dark mode<br>
                              - pastel: Switch to pastel mode<br>
                              - synthwave: Switch to synthwave mode<br>
                              - halo: Switch to Halo mode<br>
                              - echo [message]: Echoes a message<br>
                              - clear: Clear the terminal output</p>`;
    }

    // Auto-complete command
    function autoCompleteCommand(input) {
        const commands = ['help', 'about', 'echo', 'clear'];
        const match = commands.find(cmd => cmd.startsWith(input));
        if (match) {
            inputField.value = match;
        }
    }
});

// Helper function to scroll the output div to the bottom
function scrollToBottom(element) {
    element.scrollTop = element.scrollHeight;
}


