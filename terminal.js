document.addEventListener('DOMContentLoaded', function(event) {
    // Colors matching typical Linux terminal themes
    const COLORS = {
        green: '#8AE234',     // Green for username
        host: '#8AE234',     // Green for hostname
        colon: '#FFFFFF',    // Gray for colon
        path: '#3465A4',     // Blue for path
        grey: '#d1d1d1',   // Gray for $
        white: '#FFFFFF'    // White for output text
    };

    // Store timeouts for each header
    const headerTimeouts = new Map();

    function clearHeaderTimeouts(element) {
        if (headerTimeouts.has(element)) {
            headerTimeouts.get(element).forEach(timeout => clearTimeout(timeout));
            headerTimeouts.set(element, []);
        }
    }

    function addTimeout(element, timeout) {
        if (!headerTimeouts.has(element)) {
            headerTimeouts.set(element, []);
        }
        headerTimeouts.get(element).push(timeout);
    }

    function createPrompt(currentPath = '') {
        return `<span style="color: ${COLORS.grey}">nick@</span>` +
               `<span style="color: ${COLORS.grey}">myPortfolio</span>` +
               `<span style="color: ${COLORS.grey}">:</span>` +
               `<span style="color: ${COLORS.white}">~/${currentPath}</span>` +
               `<span style="color: ${COLORS.white}">$ </span>`;
    }

    const SHELL_PROMPT = createPrompt();
    const TYPING_DELAY = 500;
    const TYPING_SPEED = 100;
    const NEW_LINE_DELAY = 500;
    const INITIAL_LINE_DELAY = 500;
    
    const sectionTexts = {
        'education': 'cd Education',
        'projects': 'cd Projects',
        'contact': 'cd Contact'
    };

    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            const target = mutation.target;
            
            // Clear any existing animations when hiding
            if (!target.classList.contains('show')) {
                clearHeaderTimeouts(target);
                target.innerHTML = '';
                return;
            }
            
            // Only proceed if this is a show transition
            if (!target.classList.contains('section-header') || 
                !mutation.oldValue?.includes('show') === false) {
                return;
            }

            const sectionId = target.id;
            const text = sectionTexts[sectionId] || `cd ${sectionId}`;
            
            // Ensure clean state
            clearHeaderTimeouts(target);
            target.innerHTML = '';
            
            // Create and add initial line with animation
            const initialLine = document.createElement('div');
            initialLine.className = 'terminal-line';
            initialLine.innerHTML = SHELL_PROMPT;
            target.appendChild(initialLine);
            
            // Sequence the animations
            const timeout1 = setTimeout(() => {
                initialLine.classList.add('show');
                const timeout2 = setTimeout(() => {
                    typeWriter(text, 0, target, sectionId);
                }, TYPING_DELAY);
                addTimeout(target, timeout2);
            }, INITIAL_LINE_DELAY);
            addTimeout(target, timeout1);
        });
    });

    document.querySelectorAll('.section-header').forEach(header => {
        header.innerHTML = '';  // Start empty
        mutationObserver.observe(header, {
            attributes: true,
            attributeFilter: ['class'],
            attributeOldValue: true  // Enable access to old value
        });
    });

    function typeWriter(text, i, element, sectionId) {
        if (!element.classList.contains('show')) return;
        
        if (i < text.length) {
            const terminalLine = document.createElement('div');
            terminalLine.className = 'terminal-line show';  // Add show class immediately for typing line
            terminalLine.innerHTML = `${SHELL_PROMPT}${text.substring(0, i + 1)}<span aria-hidden="true"></span>`;
            
            // Replace existing content or add new line
            if (element.children.length === 0) {
                element.appendChild(terminalLine);
            } else {
                element.replaceChild(terminalLine, element.lastChild);
            }

            const timeout = setTimeout(() => {
                typeWriter(text, i + 1, element, sectionId);
            }, TYPING_SPEED);
            addTimeout(element, timeout);
        } else {
            const timeout = setTimeout(() => {
                if (!element.classList.contains('show')) return;
                const newPath = text.split(' ')[1];
                
                // Create first line (command)
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `${SHELL_PROMPT}${text}`;
                
                // Create prompt line
                const promptLine = document.createElement('div');
                promptLine.className = 'terminal-line';
                promptLine.innerHTML = `${createPrompt(newPath)}<span aria-hidden="true"></span>`;
                
                // Clear and add new elements
                element.innerHTML = '';
                element.appendChild(commandLine);
                element.appendChild(promptLine);
                
                // Trigger animations with slight delay between lines
                requestAnimationFrame(() => {
                    commandLine.classList.add('show');
                    setTimeout(() => {
                        promptLine.classList.add('show');
                    }, 100);
                });
            }, NEW_LINE_DELAY);
            addTimeout(element, timeout);
        }
    }
});