const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      // If this is a project container, wait for button animation to complete
      if (entry.target.classList.contains("project-container")) {
        const projectInfo = entry.target.querySelector(".project-info");
        if (projectInfo) {
          // Listen for the transition end event on the project info
          const handleTransitionEnd = (e) => {
            // Only proceed if it's the transform property that finished
            if (e.propertyName === "transform") {
              drawConnectionsForProject(entry.target);
              // Remove the listener to avoid multiple calls
              projectInfo.removeEventListener(
                "transitionend",
                handleTransitionEnd
              );
            }
          };
          projectInfo.addEventListener("transitionend", handleTransitionEnd);
        }
      }
    } else {
      entry.target.classList.remove("show");
      // Clear connections when project leaves viewport
      if (entry.target.classList.contains("project-container")) {
        const svg = entry.target.querySelector(".connection-lines");
        if (svg) {
          svg.innerHTML = "";
        }
        // Reset tech item animations
        entry.target.querySelectorAll(".tech-item").forEach((item) => {
          item.classList.remove("animate");
        });
      }
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden, .project-container");
hiddenElements.forEach((element) => observer.observe(element));

function drawConnectionsForProject(project) {
  const svg = project.querySelector(".connection-lines");
  const techItems = project.querySelectorAll(".tech-item");
  const projectInfo = project.querySelector(".project-info");
  const repoLink = projectInfo.querySelector(".project-links a");

  if (!svg || !repoLink || !techItems.length) return;

  svg.innerHTML = "";
  svg.style.opacity = "1";

  // Add gradient definition
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient.setAttribute("id", "gradient");
  gradient.setAttribute("gradientUnits", "userSpaceOnUse");
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#9d4edd");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#4361ee");

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);
  defs.appendChild(gradient);
  svg.appendChild(defs);

  const linkRect = repoLink.getBoundingClientRect();
  const projectRect = project.getBoundingClientRect();

  // Calculate the center point of the button
  const centralX = linkRect.left - projectRect.left + linkRect.width / 2;
  const centralY = linkRect.top - projectRect.top + linkRect.height / 2;

  // Sort tech items by vertical position for consistent animation order
  const sortedTechItems = Array.from(techItems)
    .map((item, index) => {
      const rect = item.getBoundingClientRect();
      const techName = item.querySelector(".tech-name");
      const techNameRect = techName.getBoundingClientRect();
      return {
        item,
        rect,
        techNameRect,
        index,
        y: rect.top + rect.height / 2,
      };
    })
    .sort((a, b) => a.y - b.y);

  // Draw lines to each tech item's name
  sortedTechItems.forEach(({ item, rect, techNameRect }, index) => {
    const itemCenterX = rect.left - projectRect.left + rect.width / 2;
    const techNameCenterX =
      techNameRect.left - projectRect.left + techNameRect.width / 2;
    const techNameCenterY =
      techNameRect.top - projectRect.top + techNameRect.height / 2;

    const points = [
      [centralX, centralY],
      [techNameCenterX, centralY],
      [techNameCenterX, techNameCenterY],
    ];

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const pathD = points
      .map((point, i) => `${i === 0 ? "M" : "L"} ${point[0]} ${point[1]}`)
      .join(" ");

    path.setAttribute("d", pathD);
    path.setAttribute("fill", "none");

    const pathLength = path.getTotalLength();
    path.style.setProperty("--path-length", pathLength);

    const lineDelay = index * 0.1;
    path.style.animationDelay = `${lineDelay}s`;
    path.style.animationDuration = `${0.8}s`;

    setTimeout(() => {
      item.classList.add("animate");
    }, (lineDelay + 0.5) * 1000);

    svg.appendChild(path);
  });
}

// Handle resize
let resizeTimeout;
const isMobile = () => window.innerWidth <= 1200;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    document.querySelectorAll(".project-container").forEach((project) => {
      if (project.classList.contains("show")) {
        // Wait a bit after resize to ensure elements have settled
        setTimeout(() => {
          drawConnectionsForProject(project);
        }, 100);
      }
    });
  }, 250);
});
