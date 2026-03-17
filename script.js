function copyToClipboard(text, btnId) {
  navigator.clipboard.writeText(text).then(function () {
    var btn = document.getElementById(btnId);
    if (btn) {
      var original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check" style="color:#2196f3"></i>';
      setTimeout(function () {
        btn.innerHTML = original;
      }, 1200);
    }
  });
}

const typewriterWords = ["Backend Development", "Java Spring Boot", "Node.js"];
const googleColors = [
  "#EA4335", // red
  "#FBBC05", // yellow
  "#34A853", // green
  "#5F33CF", // purple
];
let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterDelay = 90;
let typewriterPause = 1200;
let colorIndex = 0;

function typewriterTick() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;
  const currentWord = typewriterWords[typewriterIndex];
  el.style.color = googleColors[colorIndex];
  if (isDeleting) {
    el.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typewriterIndex = (typewriterIndex + 1) % typewriterWords.length;
      colorIndex = (colorIndex + 1) % googleColors.length;
      setTimeout(typewriterTick, 400);
      return;
    }
    setTimeout(typewriterTick, typewriterDelay / 2);
  } else {
    el.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typewriterTick, typewriterPause);
      return;
    }
    setTimeout(typewriterTick, typewriterDelay);
  }
}
document.addEventListener("DOMContentLoaded", function () {
  typewriterTick();
});

function showSection(sectionId) {
  document.querySelectorAll(".content").forEach(function (sec) {
    sec.style.display = "none";
  });
  var el = document.getElementById(sectionId);
  if (el) el.style.display = "block";
}

function showProjectModal(id) {
  document.getElementById("modal-overlay").style.display = "block";
  document.getElementById(id).style.display = "block";
}

function closeProjectModal(id) {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById(id).style.display = "none";
}

document.getElementById("modal-overlay").onclick = function () {
  document.querySelectorAll(".project-details-modal").forEach(function (modal) {
    modal.style.display = "none";
  });
  document.getElementById("modal-overlay").style.display = "none";
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("modal-overlay").style.display = "none";
    document
      .querySelectorAll(".project-details-modal")
      .forEach(function (modal) {
        modal.style.display = "none";
      });
    // Clear the search bar and show all projects
    var searchInput = document.getElementById("projects-search");
    if (searchInput && searchInput.value) {
      searchInput.value = "";
      renderProjects(projects);
      searchInput.blur();
    }
  }
});

function projectCard({
  id,
  title,
  summary,
  desc,
  details,
  github,
  youtube,
  medium,
  tools,
}) {
  return `
    <div class="project-card">
      <h3>${title}</h3>
      <p class="project-desc">${summary || desc}</p>
      <div class="project-tools-row">
        ${(tools || [])
          .slice(0, 3)
          .map((tool) => `<span class="project-tool-badge">${tool}</span>`)
          .join(" ")}
      </div>
      <div class="project-card-actions-row">
        <button class="view-details-btn" onclick=\"showProjectModal('${id}')\">
          View Details <i class='fas fa-arrow-right'></i>
        </button>
        <div class="project-links-btns">
          <a href="${github}" target="_blank" class="icon-btn github" title="GitHub"><i class="fab fa-github"></i></a>
          <a href="${youtube}" target="_blank" class="icon-btn youtube" title="YouTube"><i class="fab fa-youtube"></i></a>
          <a href="${medium}" target="_blank" class="icon-btn medium" title="Medium"><i class="fab fa-medium"></i></a>
        </div>
      </div>
      <div class="project-details-modal" id="${id}" style="display: none;">
        <button class="close-modal" onclick=\"closeProjectModal('${id}')\">&times;</button>
        <h2>${title}</h2>
        <div class="modal-underline"></div>
        <div class="modal-desc">${summary || desc}</div>
        <ul>
          ${details.map((item) => `<li>${item}</li>`).join("")}
        </ul>
        <div class="modal-tools-row">
          ${(tools || [])
            .map((tool) => `<span class='project-tool-badge'>${tool}</span>`)
            .join(" ")}
        </div>
        <div class="modal-links">
          <a href="${github}" target="_blank" class="modal-link-btn github" title="GitHub Repository"><i class="fab fa-github"></i>View Repository</a>
          <a href="${youtube}" target="_blank" class="modal-link-btn youtube" title="YouTube Demo"><i class="fab fa-youtube"></i>YouTube</a>
          <a href="${medium}" target="_blank" class="modal-link-btn medium" title="Medium Article"><i class="fab fa-medium"></i>Medium</a>
        </div>
      </div>
    </div>
  `;
}

const projects = 
  [
  {
    id: "ride-booking-details",
    title: "Ride Booking backend",
    summary: "Scalable ride-booking service with geospatial matching and secure payments.",
    desc: "A robust backend service managing the full ride lifecycle, from initial request to secure wallet-based payment processing.",
    details: [
      "Developed a robust and scalable backend for a ride-booking service managing the full ride lifecycle from request to secur wallet-based payment.",
      "Integrated geospatial services using PostgreSQL/PostGIS and OSRM to handle high-precision coordinate data, enablin real-time location-based driver matching and accurate route distance estimations.",
      "Implemented a stateless authentication and authorization framework using Spring Security and JWT, establishing Role Based Access Control to manage distinct permissions for different users.",
      "Optimized database query performance by implementing geospatial indexing, which reduced search latency by 35%."
    ],
    github: "https://github.com/Pranesh2288",
    youtube: "https://www.youtube.com/@pranesh2288",
    medium: "https://medium.com/@pranesh2288",
    tools: ["Java", "Spring Boot", "PostgreSQL", "PostGIS", "REST API", "Git", "JUnit", "Swagger"],
  },
  {
    id: "url-shortener-details",
    title: "URL Shortener backend",
    summary: "RESTful API for shortening URLs using Base62 encoding.",
    desc: "Engineered a modular system following Layered Architecture principles to transform database IDs into unique, human-readable keys.",
    details: [
      "Engineered a RESTful API using Spring Boot and Java 21 to shorten URLs, implementing Base62 encoding to transform internal database IDs into unique, human-readable keys.",
      "Architected a modular system following Layered Architecture principles (Controller, Service, Repository) to ensure separation of concerns and maintainable, clean code.",
      "Integrated PostgreSQL via Spring Data JPA, implementing custom features to export link data into CSV format.",
      "Developed an automated test suite utilizing JUnit 5 and Mockito to verify complex business logic."
    ],
    github: "https://github.com/Pranesh2288",
    youtube: "https://www.youtube.com/@pranesh2288",
    medium: "https://medium.com/@pranesh2288",
    tools: ["Java", "Spring Boot", "PostgreSQL", "Spring Data JPA", "JUnit 5", "Mockito", "Maven"],
  },
  {
    id: "polaroid-details",
    title: "Polaroid Movie Listing website",
    summary: "Full-stack movie discovery platform with high-performance caching.",
    desc: "A movie discovery and booking platform supporting over 10,000+ titles with complex multi-criteria filtering.",
    details: [
      "Developed a full-stack movie discovery and booking platform using Node.js and MongoDB, enabling seamless search and booking for over 10,000+ titles with complex multi-criteria filtering",
      "Reduced API latency by 45% through Redis caching and MongoDB indexing, enabling sub 200ms response time for queries.",
      "Validated authentication endpoint reliability by implementing automated integration testing suite with Jest and Supertest",
      "Streamlined deployment reliability across environments by using Docker containerization.",
    ],
    github: "https://github.com/Pranesh2288",
    youtube: "https://www.youtube.com/@pranesh2288",
    medium: "https://medium.com/@pranesh2288",
    tools: ["React", "Node.js", "MongoDB", "Docker", "Redis", "REST API", "Jest", "Supertest"],
  }
];

function renderProjects(filteredProjects) {
  document.getElementById("projects-list").innerHTML = filteredProjects
    .map(projectCard)
    .join("");
}

function filterProjects() {
  const query = document
    .getElementById("projects-search")
    .value.trim()
    .toLowerCase();
  if (!query) {
    renderProjects(projects);
    return;
  }
  const filtered = projects.filter((p) => {
    const titleMatch = p.title.toLowerCase().includes(query);
    const techMatch = (p.tools || []).some((tool) =>
      tool.toLowerCase().includes(query)
    );
    return titleMatch || techMatch;
  });
  renderProjects(filtered);
}

document.addEventListener("DOMContentLoaded", function () {
  renderProjects(projects);
  const searchInput = document.getElementById("projects-search");
  const resetBtn = document.getElementById("projects-search-reset");
  searchInput.addEventListener("input", filterProjects);
  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    renderProjects(projects);
    searchInput.focus();
  });
});
