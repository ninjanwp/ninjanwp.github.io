const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // If this is a project container, wait for button animation to complete
            if (entry.target.classList.contains('project-container')) {
                const projectInfo = entry.target.querySelector('.project-info');
                if (projectInfo) {
                    // Listen for the transition end event on the project info
                    const handleTransitionEnd = (e) => {
                        // Only proceed if it's the transform property that finished
                        if (e.propertyName === 'transform') {
                            drawConnectionsForProject(entry.target);
                            // Remove the listener to avoid multiple calls
                            projectInfo.removeEventListener('transitionend', handleTransitionEnd);
                        }
                    };
                    projectInfo.addEventListener('transitionend', handleTransitionEnd);
                }
            }
        } else {
            entry.target.classList.remove('show');
            // Clear connections when project leaves viewport
            if (entry.target.classList.contains('project-container')) {
                const svg = entry.target.querySelector('.connection-lines');
                if (svg) {
                    svg.innerHTML = '';
                }
                // Reset tech item animations
                entry.target.querySelectorAll('.tech-item').forEach(item => {
                    item.classList.remove('animate');
                });
            }
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden, .project-container');
hiddenElements.forEach(element => observer.observe(element));

function drawConnectionsForProject(project) {
    const svg = project.querySelector(".connection-lines");
    const techItems = project.querySelectorAll(".tech-item");
    const projectInfo = project.querySelector(".project-info");
    const repoLink = projectInfo.querySelector(".project-links a");

    if (!svg || !repoLink || !techItems.length) return;

    svg.innerHTML = "";
    svg.style.opacity = "1";

    const linkRect = repoLink.getBoundingClientRect();
    const projectRect = project.getBoundingClientRect();
    const isEven = Array.from(project.parentElement.children).indexOf(project) % 2 !== 0;

    // Calculate the center point of the button
    const centralX = linkRect.left - projectRect.left + linkRect.width / 2;
    const centralY = linkRect.top - projectRect.top + linkRect.height / 2;

    // Sort tech items by vertical position for consistent animation order
    const sortedTechItems = Array.from(techItems).map((item, index) => {
        const rect = item.getBoundingClientRect();
        return {
            item,
            rect,
            index,
            y: rect.top + rect.height / 2
        };
    }).sort((a, b) => a.y - b.y);

    // Draw lines to each tech item
    sortedTechItems.forEach(({ item, rect }, index) => {
        const endX = rect.left - projectRect.left + rect.width / 2;
        const endY = rect.top - projectRect.top + rect.height / 2;

        // Create path with three points:
        // 1. Start at button center
        // 2. Point at same Y as button but X aligned with tech item
        // 3. Tech item center
        const points = [
            [centralX, centralY],    // Start at button
            [endX, centralY],        // Horizontal point aligned with tech item
            [endX, endY]             // Tech item center
        ];

        // Create path
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const pathD = points.map((point, i) => 
            `${i === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`
        ).join(' ');
        
        path.setAttribute("d", pathD);
        path.setAttribute("fill", "none");

        const pathLength = path.getTotalLength();
        path.style.setProperty("--path-length", pathLength);

        const lineDelay = 0.2 + index * 0.1;
        path.style.animationDelay = `${lineDelay}s`;
        path.style.animationDuration = `${0.8}s`;

        // Add tech item animation when line reaches it
        setTimeout(() => {
            item.classList.add("animate");
        }, (lineDelay + 0.6) * 1000); // Appear as line is about to reach the item

        svg.appendChild(path);
    });
}

// Handle resize
let resizeTimeout;
const isMobile = () => window.innerWidth <= 1200;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        document.querySelectorAll('.project-container').forEach(project => {
            if (project.classList.contains('show')) {
                // Wait a bit after resize to ensure elements have settled
                setTimeout(() => {
                    drawConnectionsForProject(project);
                }, 100);
            }
        });
    }, 250);
});