
// ========================================
// BRILU — CREATIVE PORTFOLIO
// ========================================
// Add images to assets/projects/ and make sure the filenames match.

const projects = [
  {
    number: "01",
    title: "Coca-Cola Trophy Tour",
    category: "campaign",
    categoryLabel: "Campaign · Event creative",
    description: "Event-related creative assets and visual communication supporting the Coca-Cola Trophy Tour.",
    image: "assets/projects/project-01.jpg",
    alt: "Coca-Cola Trophy Tour creative work",
    note: "Selected event creative. Add only approved, public-facing work."
  },
  {
    number: "02",
    title: "702 Walk the Talk",
    category: "campaign",
    categoryLabel: "Event · Accreditation",
    description: "Accreditation and route-map design supporting the 702 Walk the Talk event experience.",
    image: "assets/projects/project-02.png",
    images: [
      "assets/projects/project-02.png",
      "assets/projects/project-02-2.png"
    ],
    alt: "702 Walk the Talk event design",
    note: "Event collateral and wayfinding-related design."
  },
  {
    number: "03",
    title: "Octagon Rugby",
    category: "digital",
    categoryLabel: "Digital · Social media",
    description: "Visual refresh work exploring a more consistent and engaging creative direction for Octagon Rugby's social presence.",
    image: "assets/projects/project-03.jpg",
    alt: "Octagon Rugby social media design",
    note: "Selected social media design work."
  },
  {
    number: "04",
    title: "Octagon Cricket",
    category: "digital",
    categoryLabel: "Digital · Social media",
    description: "Social media visual development for Octagon Cricket, with an emphasis on clear layouts and a consistent visual identity.",
    image: "assets/projects/project-04.jpg",
    alt: "Octagon Cricket social media design",
    note: "Selected social media design work."
  },
  {
    number: "05",
    title: "Coca-Cola Be a Bok",
    category: "campaign",
    categoryLabel: "Campaign · PR creative",
    description: "PR-related creative supporting the Coca-Cola Be a Bok campaign.",
    image: "assets/projects/project-05.jpg",
    alt: "Coca-Cola Be a Bok campaign creative",
    note: "Campaign creative. Confirm public-use approval before publishing."
  },
  {
    number: "06",
    title: "NBA Africa Pitch",
    category: "pitch",
    categoryLabel: "Pitch concept · Apparel design",
    description: "Apparel design concepts developed for an NBA Africa pitch, exploring how a creative direction can translate onto clothing and merchandise.",
    image: "assets/projects/project-06-1.jpg",
    images: [
      "assets/projects/project-06-1.jpg",
      "assets/projects/project-06-2.jpg",
      "assets/projects/project-06-3.jpg",
      "assets/projects/project-06-4.jpg",
     
    ],
    alt: "NBA Africa pitch apparel design concept",
    note: "Pitch concept only. The pitch was not won."
  },
  {
    number: "07",
    title: "DHL Stadium",
    category: "design",
    categoryLabel: "Graphic design · Venue creative",
    description: "Stadium-related visual communication and design assets created for event and venue use.",
    image: "assets/projects/project-07.jpg",
    images: [
      "assets/projects/project-07.jpg",
      "assets/projects/project-07-1.jpg",
      "assets/projects/project-07-2.jpg"
    ],
    alt: "DHL Stadium design work",
    note: "Selected venue creative."
  },
  {
    number: "08",
    title: "DHL Business Lounge",
    category: "design",
    categoryLabel: "Graphic design · Brochure",
    description: "Business lounge brochure design focused on presenting information in a polished and accessible way.",
    image: "assets/projects/project-08.jpg",
    alt: "DHL Business Lounge brochure",
    note: "Selected brochure design."
  },
  {
    number: "09",
    title: "2026/2027 Rugby Fixtures",
    category: "design",
    categoryLabel: "Graphic design · Sports",
    description: "Fixture design exploring clear hierarchy and easy-to-follow information for the rugby season.",
    image: "assets/projects/project-09.jpg",
    alt: "2026/2027 rugby fixtures graphic",
    note: "Selected sports design work."
  },
  {
    number: "10",
    title: "UEFA × Mastercard",
    category: "digital",
    categoryLabel: "Digital · Social campaign",
    description: "Selected social campaign creative developed for a UEFA and Mastercard-related project.",
    image: "assets/projects/project-10.jpg",
    alt: "UEFA and Mastercard social campaign creative",
    note: "Show only approved assets. Do not include work that is confidential or still under review."
  }
];

const projectGrid = document.getElementById("projectGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCount = document.getElementById("projectCount");

const lightbox = document.getElementById("lightbox");
const lightboxClose =
  document.getElementById("lightboxClose") ||
  document.getElementById("closeLightbox");

const lightboxImage = document.getElementById("lightboxImage");
const lightboxPlaceholder = document.getElementById("lightboxPlaceholder");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxNote = document.getElementById("lightboxNote");

let previousFocus = null;
let activeProject = null;
let activeImages = [];
let activeImageIndex = 0;
let lightboxNavigation = null;

/* Return project images in their preferred order without duplicates. */
function getProjectImages(project) {
  const list = Array.isArray(project.images) && project.images.length
    ? project.images
    : Array.isArray(project.image)
      ? project.image
      : project.image
        ? [project.image]
        : [];

  return [...new Set(list.filter(Boolean))];
}

/* Check whether an image path actually loads. */
function imageExists(path) {
  return new Promise(resolve => {
    const image = new Image();

    image.onload = () => resolve(path);
    image.onerror = () => resolve(null);

    image.src = path;
  });
}

/* Return only images that exist, preserving their original order. */

async function getAvailableProjectImages(project) {
  const candidates = getProjectImages(project);

  const results = await Promise.all(
    candidates.map(async (path) => {
      const loadedPath = await imageExists(path);

      if (!loadedPath) {
        console.warn(
          `Image not found: ${path}. Check the filename and assets/projects/ folder.`
        );
      }

      return loadedPath;
    })
  );

  return results.filter(Boolean);
}


/* Create a helpful message if a project image is missing. */
function getOrCreateLightboxMessage() {
  let message = document.getElementById("lightboxImageMessage");

  if (!message && lightboxImage && lightboxImage.parentElement) {
    message = document.createElement("div");
    message.id = "lightboxImageMessage";
    message.className = "lightbox-image-message";
    message.hidden = true;

    lightboxImage.insertAdjacentElement("afterend", message);
  }

  return message;
}

function fileName(path) {
  return String(path || "project image").split("/").pop();
}

/* Render project cards and pastel covers. */
function renderProjects(filter = "all") {
  if (!projectGrid) return;

  const visibleProjects = projects.filter(project =>
    filter === "all" || project.category === filter
  );

  projectGrid.innerHTML = "";

  visibleProjects.forEach(project => {
    const images = getProjectImages(project);
    const card = document.createElement("article");

    card.className = "project-card glass";
    card.dataset.category = project.category;
    card.dataset.projectNumber = project.number;

    card.innerHTML = `
      <button class="project-open" type="button"
        aria-label="Open ${project.title} project">

        <div class="project-cover" aria-hidden="true">
          <span class="cover-orbit cover-orbit-one"></span>
          <span class="cover-orbit cover-orbit-two"></span>
          <span class="cover-glass-shape"></span>

          <span class="cover-number">${project.number} / 10</span>
          <span class="cover-category">${project.categoryLabel}</span>
          <span class="cover-title">${project.title}</span>

          <span class="cover-footer">
            <span>BRILU — SELECTED WORK</span>
            <span>↗</span>
          </span>

          ${
            images.length > 1
              ? `<span class="cover-image-count">${images.length} images inside</span>`
              : ""
          }
        </div>

        <div class="project-info">
          <div class="project-meta">
            <span class="project-number">${project.number}</span>
            <span class="project-category">${project.categoryLabel}</span>
          </div>

          <h3>${project.title}</h3>
          <p>${project.description}</p>

          <span class="project-view-hint">
            Explore project <span aria-hidden="true">↗</span>
          </span>
        </div>
      </button>
    `;

    card
      .querySelector(".project-open")
      .addEventListener("click", () => openLightbox(project));

    projectGrid.appendChild(card);
  });

  if (!visibleProjects.length) {
    projectGrid.innerHTML =
      '<p class="project-empty">No projects in this category yet.</p>';
  }

  if (projectCount) {
    projectCount.textContent = String(visibleProjects.length);
  }
}

/* Project filter buttons. */
filterButtons.forEach(button => {
  button.setAttribute(
    "aria-pressed",
    button.classList.contains("active") ? "true" : "false"
  );

  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    renderProjects(button.dataset.filter || "all");
  });
});

/* Create previous/next controls for projects with multiple images. */
function createLightboxNavigation() {
  if (!lightboxImage || !lightboxImage.parentElement) return null;

  const wrap = lightboxImage.parentElement;
  let nav = wrap.querySelector(".lightbox-navigation");

  if (nav) return nav;

  nav = document.createElement("div");
  nav.className = "lightbox-navigation";
  nav.setAttribute("aria-label", "Project image navigation");

  nav.innerHTML = `
    <button class="lightbox-previous" type="button"
      aria-label="Previous image">‹</button>

    <span class="lightbox-image-counter" aria-live="polite">1 / 1</span>

    <button class="lightbox-next" type="button"
      aria-label="Next image">›</button>
  `;

  wrap.appendChild(nav);

  nav.querySelector(".lightbox-previous").addEventListener("click", event => {
    event.stopPropagation();
    changeLightboxImage(-1);
  });

  nav.querySelector(".lightbox-next").addEventListener("click", event => {
    event.stopPropagation();
    changeLightboxImage(1);
  });

  return nav;
}

/* Display a selected image inside the lightbox. */
function showLightboxImage(index) {
  if (!activeImages.length || !lightboxImage || !activeProject) return;

  activeImageIndex = (index + activeImages.length) % activeImages.length;

  const path = activeImages[activeImageIndex];

  lightboxImage.alt =
    `${activeProject.alt} — image ${activeImageIndex + 1}`;

  lightboxImage.onerror = () => {
    lightboxImage.style.display = "none";

    const message = getOrCreateLightboxMessage();

    if (message) {
      message.hidden = false;
      message.textContent =
        `Could not load ${fileName(path)}. Check the filename and assets/projects/ folder.`;
    }
  };

  lightboxImage.onload = () => {
    const message = getOrCreateLightboxMessage();

    if (message) message.hidden = true;

    lightboxImage.style.display = "block";
  };

  lightboxImage.src = path;
  lightboxImage.style.display = "block";

  const counter = lightboxNavigation?.querySelector(
    ".lightbox-image-counter"
  );

  if (counter) {
    counter.textContent =
      `${activeImageIndex + 1} / ${activeImages.length}`;
  }

  if (lightboxNavigation) {
    lightboxNavigation.style.display =
      activeImages.length > 1 ? "flex" : "none";
  }
}

function changeLightboxImage(direction) {
  if (activeImages.length > 1) {
    showLightboxImage(activeImageIndex + direction);
  }
}

/* Open a project and check which of its images are available. */
async function openLightbox(project) {
  if (!lightbox) return;

  previousFocus = document.activeElement;
  activeProject = project;
  activeImages = await getAvailableProjectImages(project);
  activeImageIndex = 0;

  if (lightboxTitle) {
    lightboxTitle.textContent = project.title;
  }

  if (lightboxCategory) {
    lightboxCategory.textContent = project.categoryLabel;
  }

  if (lightboxDescription) {
    lightboxDescription.textContent = project.description;
  }

  if (lightboxNote) {
    lightboxNote.textContent = project.note || "";
  }

  lightboxNavigation = createLightboxNavigation();

  const message = getOrCreateLightboxMessage();

  if (activeImages.length) {
    if (message) message.hidden = true;
    if (lightboxImage) lightboxImage.style.display = "block";

    showLightboxImage(0);
  } else {
    if (lightboxImage) lightboxImage.style.display = "none";

    if (message) {
      message.hidden = false;
      message.textContent =
        `Project images have not been found. Add the image file(s) to assets/projects/. Expected file: ${project.image}`;
    }

    if (lightboxNavigation) {
      lightboxNavigation.style.display = "none";
    }
  }

  if (lightboxPlaceholder) {
    lightboxPlaceholder.hidden = activeImages.length > 0;
  }

  document.body.classList.add("lightbox-open");

  if (typeof lightbox.showModal === "function" && !lightbox.open) {
    lightbox.showModal();
  }

  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");

  if (lightboxClose) lightboxClose.focus();
}

/* Close the lightbox and restore focus. */
function closeProjectLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");

  if (typeof lightbox.close === "function" && lightbox.open) {
    lightbox.close();
  }

  if (previousFocus && typeof previousFocus.focus === "function") {
    previousFocus.focus();
  }
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeProjectLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeProjectLightbox();
    }
  });

  lightbox.addEventListener("close", () => {
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
  });
}

/* Keyboard controls for the lightbox. */
document.addEventListener("keydown", event => {
  if (!lightbox || !lightbox.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeProjectLightbox();
  }

  if (event.key === "ArrowLeft") {
    changeLightboxImage(-1);
  }

  if (event.key === "ArrowRight") {
    changeLightboxImage(1);
  }
});

/* Mobile menu. */
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("nav-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
      menuToggle.textContent = "☰";
    });
  });
}

/* Copy email address. */
const copyEmailButton = document.getElementById("copyEmail");

const copyFeedback =
  document.getElementById("copyStatus") ||
  document.getElementById("copyFeedback");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    if (!email || email.includes("YOUR_EMAIL")) {
      if (copyFeedback) {
        copyFeedback.textContent =
          "Please add your email address in index.html first.";
      }

      return;
    }

    try {
      await navigator.clipboard.writeText(email);

      if (copyFeedback) {
        copyFeedback.textContent = "Email copied to clipboard.";
      }
    } catch (error) {
      if (copyFeedback) {
        copyFeedback.textContent = `You can reach me at ${email}`;
      }
    }
  });
}

/* Automatically update the footer year. */
const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

/* Initial render. */
renderProjects();
