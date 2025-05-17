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

const typewriterWords = ["Web Development", "Data Science"];
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

const projects = [
  {
    id: "proj1-details",
    title: "Medical Image Segmentation",
    summary: "Retinal OCT segmentation using deep learning.",
    desc: "Deep learning-based segmentation of retinal OCT images using Attention U-Net and contrastive learning.",
    details: [
      "Processed and converted 6000+ 3D .raw retinal OCT scans from the Re-Touch dataset into 2D .tif images.",
      "Engineered an Attention U-Net with separable convolutional layers and a dual-loss function, achieving an 81.3 Dice coefficient.",
      "Enhanced the Dice coefficient to 92.5 using Min-Max Contrastive Semi-Supervised Learning.",
    ],
    github: "https://github.com/Pranesh2288/BTP_PROJECT",
    youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID1",
    medium:
      "https://medium.com/@pranesh2288/medical-image-segmentation-article",
    tools: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
  },
  {
    id: "proj2-details",
    title: "UNICEF Road Safety Data Analysis",
    summary: "UK road safety data analysis and ML insights.",
    desc: "Statistical and ML analysis of UK road safety data to identify accident patterns and inform safety improvements.",
    details: [
      "Performed EDA on a 32-feature UK road safety dataset.",
      "Applied Z-score based outlier detection and statistical hypothesis testing.",
      "Engineered new features and conducted correlation analysis.",
    ],
    github: "https://github.com/Pranesh2288/Road-Safety-Analysis",
    youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID2",
    medium:
      "https://medium.com/@pranesh2288/unicef-road-safety-data-analysis-article",
    tools: ["Python", "Pandas", "Matplotlib", "Scikit-learn"],
  },
  {
    id: "proj3-details",
    title: "Intruder Alert System",
    summary: "Real-time face recognition access alert system.",
    desc: "Real-time face recognition access alert system with notifications and performance evaluation.",
    details: [
      "Developed a real-time face recognition access alert system using Python, OpenCV, and MongoDB.",
      "Implemented alert notifications via Telegram, Discord, and email.",
      "Recognizes users based on stored face embeddings and triggers an alert if detected in a restricted area.",
      "Utilized pytest, mongo-mock, timeit, and selenium for testing and performance evaluation.",
    ],
    github: "https://github.com/Pranesh2288/Unauthorized-Entry-Alert-System",
    youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID3",
    medium: "https://medium.com/@pranesh2288/intruder-alert-system-article",
    tools: ["Python", "OpenCV", "MongoDB", "Telegram API", "Discord API"],
  },
  {
    id: "proj4-details",
    title: "Mushroom Classification using Decision Tree",
    summary: "Classify mushrooms as edible or poisonous.",
    desc: "Decision tree model to classify mushrooms as edible or poisonous based on morphological features.",
    details: [
      "Developed a decision tree model using the C4.5 algorithm to classify mushrooms as edible or poisonous.",
      "Performed data preprocessing, including correlation analysis and feature selection.",
      "Utilized k-fold cross-validation and identified areas for improvement, such as data pruning and alternative algorithms like CART.",
    ],
    github: "https://github.com/Pranesh2288/Mushroom-Classification",
    youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID4",
    medium: "https://medium.com/@pranesh2288/mushroom-classification-article",
    tools: ["Python", "Scikit-learn", "Pandas"],
  },
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
