// Constants for controlling the animation and gaps
const ANIMATION_DURATION = 0.6; // Duration of the animation
const BASE_DELAY = 0.2; // Base delay before starting the animation
const ITEM_DELAY = 0.3; // Delay between each item animation
const MOBILE_GAP = 0.1; // Gap between connection origins on mobile
const DESKTOP_GAP = 0.08; // Gap between connection origins on desktop
const START_X_OFFSET = 0.3; // Offset for the starting X position on mobile
const START_Y_OFFSET = 0.6; // Offset for the starting Y position on desktop (grouped around the bottom)

function drawConnections() {
  const projects = document.querySelectorAll(".project-container");
  const isMobile = window.innerWidth <= 768;

  projects.forEach((project) => {
    const svg = project.querySelector(".connection-lines");
    const techItems = project.querySelectorAll(".tech-item");
    const projectCard = project.querySelector(".project-card");

    svg.style.opacity = "1";
    svg.innerHTML = "";

    const itemsWithDistance = Array.from(techItems).map((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const cardRect = projectCard.getBoundingClientRect();
      const distance = isMobile
        ? Math.abs(itemRect.top - cardRect.bottom)
        : Math.abs(itemRect.right - cardRect.left);
      return { item, distance, index };
    });

    itemsWithDistance.sort((a, b) => a.distance - b.distance);

    itemsWithDistance.forEach(({ item, index }, sortedIndex) => {
      const itemRect = item.getBoundingClientRect();
      const cardRect = projectCard.getBoundingClientRect();
      const projectRect = project.getBoundingClientRect();

      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );

      let startX,
        startY,
        endX,
        endY,
        midX,
        midY;

      if (isMobile) {
        // Mobile: Connect from top of project card
        startX =
          cardRect.left - projectRect.left + cardRect.width * (START_X_OFFSET + sortedIndex * MOBILE_GAP);
        startY = cardRect.top - projectRect.top;
        endX = itemRect.left - projectRect.left + itemRect.width / 2;
        endY = itemRect.bottom - projectRect.top;

        midX = startX;
        midY = endY;
      } else {
        // Desktop: Connect from bottom half of project card
        startX = cardRect.left - projectRect.left;
        startY =
          cardRect.top - projectRect.top + cardRect.height * (START_Y_OFFSET + sortedIndex * DESKTOP_GAP);
        endX = itemRect.left - projectRect.left + itemRect.width / 2;
        endY = itemRect.bottom - projectRect.top;

        midX = endX;
        midY = startY;
      }

      const path = `M ${startX} ${startY} 
                    L ${midX} ${midY}
                    L ${endX} ${endY}`;

      line.setAttribute("d", path);
      line.setAttribute("stroke", "#ceb888");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("fill", "none");

      const pathLength = line.getTotalLength();
      line.style.setProperty("--path-length", pathLength);

      const lineDelay = BASE_DELAY + sortedIndex * ITEM_DELAY;
      const touchDelay = lineDelay + ANIMATION_DURATION * 0.6;

      item.classList.remove("animate");

      setTimeout(() => {
        item.classList.add("animate");
      }, touchDelay * 1000);

      line.style.animationDelay = `${lineDelay}s`;
      svg.appendChild(line);
    });
  });
}

// Draw on load and resize with debounce
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(drawConnections, 250);
});

setTimeout(drawConnections, 100);