function drawConnections() {
  const projects = document.querySelectorAll(".project-container");
  const isMobile = window.innerWidth <= 768;
  const ANIMATION_DURATION = 0.6; // Reduced from 1.0
  const BASE_DELAY = 0.2; // Reduced from 0.4
  const ITEM_DELAY = 0.3; // Reduced from 0.6

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
          cardRect.left - projectRect.left + cardRect.width * (0.3 + sortedIndex * 0.1);
        startY = cardRect.top - projectRect.top;
        endX = itemRect.left - projectRect.left + itemRect.width / 2;
        endY = itemRect.bottom - projectRect.top;

        midX = startX;
        midY = endY;
      } else {
        // Desktop: Connect from bottom half of project card
        startX = cardRect.left - projectRect.left;
        startY =
          cardRect.top - projectRect.top + cardRect.height * (0.5 + sortedIndex * 0.08);
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