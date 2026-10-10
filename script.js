
// ========================================
// BRILU — CREATIVE PORTFOLIO
// ========================================

// Add your project images to assets/projects/.
// The file names below should match your actual image files.

const projects = [
    {
        number: "01",
        title: "Coca-Cola Trophy Tour",
        category: "campaign",
        categoryLabel: "Campaign · Event creative",
        description:
            "Event-related creative assets and visual communication supporting the Coca-Cola Trophy Tour.",
        image: "assets/projects/project-01.jpg",
        alt: "Coca-Cola Trophy Tour creative work",
        note: "Selected event creative. Add only approved, public-facing work."
    },
    {
        number: "02",
        title: "702 Walk the Talk",
        category: "campaign",
        categoryLabel: "Event · Accreditation",
        description:
            "Accreditation and route-map design supporting the 702 Walk the Talk event experience.",
        image: [
            "assets/projects/project-02.jpg",
            "assets/projects/project-02-2.jpg"
        ],
        alt: "702 Walk the Talk event design",
        note: "Event collateral and wayfinding-related design."
    },
    {
        number: "03",
        title: "Octagon Rugby",
        category: "digital",
        categoryLabel: "Digital · Social media",
        description:
            "Visual refresh work exploring a more consistent and engaging creative direction for Octagon Rugby's social presence.",
        image: "assets/projects/project-03.jpg",
        alt: "Octagon Rugby social media design",
        note: "Selected social media design work."
    },
    {
        number: "04",
        title: "Octagon Cricket",
        category: "digital",
        categoryLabel: "Digital · Social media",
        description:
            "Social media visual development for Octagon Cricket, with an emphasis on clear layouts and a consistent visual identity.",
        image: "assets/projects/project-04.jpg",
        alt: "Octagon Cricket social media design",
        note: "Selected social media design work."
    },
    {
        number: "05",
        title: "Coca-Cola Be a Bok",
        category: "campaign",
        categoryLabel: "Campaign · PR creative",
        description:
            "PR-related creative supporting the Coca-Cola Be a Bok campaign.",
        image: "assets/projects/project-05.jpg",
        alt: "Coca-Cola Be a Bok campaign creative",
        note: "Campaign creative. Confirm public-use approval before publishing."
    },
    
{
    number: "06",
    title: "NBA Africa Pitch",
    category: "pitch",
    categoryLabel: "Pitch concept · Apparel design",
    description:
        "Apparel design concepts developed for an NBA Africa pitch, exploring how a creative direction can translate onto clothing and merchandise.",
    image: "assets/projects/project-06-1.jpg",
    images: [
        "assets/projects/project-06-1.jpg",
        "assets/projects/project-06-2.jpg",
        "assets/projects/project-06-3.jpg",
        "assets/projects/project-06-4.jpg"
    ],
    alt: "NBA Africa pitch apparel design concept",
    note: "Pitch concept only. The pitch was not won."
},
{
    number: "07",
    title: "DHL Stadium",
    category: "design",
    categoryLabel: "Graphic design · Venue creative",
    description:
        "Stadium-related visual communication and design assets created for event and venue use.",
    image: "assets/projects/project-07-1.jpg",
    images: [
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
        description:
            "Business lounge brochure design focused on presenting information in a polished and accessible way.",
        image: "assets/projects/project-08.jpg",
        alt: "DHL Business Lounge brochure",
        note: "Selected brochure design."
    },
    {
        number: "09",
        title: "2026/2027 Rugby Fixtures",
        category: "design",
        categoryLabel: "Graphic design · Sports",
        description:
            "Fixture design exploring clear hierarchy and easy-to-follow information for the rugby season.",
        image: "assets/projects/project-09.jpg",
        alt: "2026/2027 rugby fixtures graphic",
        note: "Selected sports design work."
    },
    {
        number: "10",
        title: "UEFA × Mastercard",
        category: "digital",
        categoryLabel: "Digital · Social campaign",
        description:
            "Selected social campaign creative developed for a UEFA and Mastercard-related project.",
        image: "assets/projects/project-10.jpg",
        alt: "UEFA and Mastercard social campaign creative",
        note: "Show only approved assets. Do not include work that is confidential or still under review."
    }
];

// ========================================
// RENDER PROJECT CARDS
// ========================================

const projectGrid = document.getElementById("projectGrid");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCount = document.getElementById("projectCount");

function renderProjects(filter = "all") {
    if (!projectGrid) return;

    const filteredProjects = projects.filter(project => {
        return filter === "all" || project.category === filter;
    });

    projectGrid.innerHTML = "";

    filteredProjects.forEach(project => {
        const card = document.createElement("article");
        card.className = "project-card glass";
        card.dataset.category = project.category;

        card.innerHTML = `
            <button
                class="project-open"
                type="button"
                aria-label="View ${project.title} project details"
            >
                <div class="project-image-wrap">
                    <img
                        class="project-image"
                        src="${project.image}"
                        alt="${project.alt}"
                        loading="lazy"
                    >

                    <div class="project-image-placeholder">
                        <span class="placeholder-number">${project.number}</span>
                        <span class="placeholder-title">${project.title}</span>
                        <span class="placeholder-hint">
                            Add image: ${project.image.split("/").pop()}
                        </span>
                    </div>

                    <span class="project-open-icon">↗</span>
                </div>

                <div class="project-info">
                    <div class="project-meta">
                        <span class="project-number">${project.number}</span>
                        <span class="project-category">${project.categoryLabel}</span>
                    </div>

                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </div>
            </button>
        `;

        // If the image is missing, show the styled placeholder.
        const image = card.querySelector(".project-image");

        image.addEventListener("error", () => {
            image.style.display = "none";
            card.querySelector(".project-image-placeholder").style.display = "flex";
        });

        // Hide the placeholder when the image loads successfully.
        image.addEventListener("load", () => {
            image.style.display = "block";
            card.querySelector(".project-image-placeholder").style.display = "none";
        });

        card.querySelector(".project-open").addEventListener("click", () => {
            openLightbox(project);
        });

        projectGrid.appendChild(card);
    });

    if (projectCount) {
        projectCount.textContent = projects.length;
    }
}

// ========================================
// FILTER PROJECTS
// ========================================

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        renderProjects(button.dataset.filter);
    });
});

// ========================================
// PROJECT LIGHTBOX
// ========================================

const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxPlaceholder = document.getElementById("lightboxPlaceholder");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const lightboxDescription = document.getElementById("lightboxDescription");
const lightboxNote = document.getElementById("lightboxNote");

let previousFocus = null;

function openLightbox(project) {
    if (!lightbox) return;

    previousFocus = document.activeElement;

    lightboxTitle.textContent = project.title;
    lightboxCategory.textContent = project.categoryLabel;
    lightboxDescription.textContent = project.description;
    lightboxNote.textContent = project.note;

    lightboxImage.alt = project.alt;
    lightboxImage.src = project.image;
    lightboxImage.style.display = "block";
    lightboxPlaceholder.style.display = "none";

    lightboxImage.onerror = () => {
        lightboxImage.style.display = "none";
        lightboxPlaceholder.style.display = "flex";
        lightboxPlaceholder.querySelector("span").textContent = project.title;
    };

    lightboxImage.onload = () => {
        lightboxImage.style.display = "block";
        lightboxPlaceholder.style.display = "none";
    };

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");

    if (lightboxClose) lightboxClose.focus();
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");

    if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
    }
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && lightbox?.classList.contains("open")) {
        closeLightbox();
    }
});

// ========================================
// MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("nav-open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "×" : "☰";
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("nav-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// ========================================
// COPY EMAIL
// ========================================

const copyEmailButton = document.getElementById("copyEmail");
const copyFeedback = document.getElementById("copyFeedback");

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        const email = copyEmailButton.dataset.email;

        if (!email || email.includes("YOUR_EMAIL")) {
            if (copyFeedback) {
                copyFeedback.textContent =
                    "Please add your email address in index.html and script.js first.";
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
                copyFeedback.textContent =
                    `You can reach me at ${email}`;
            }
        }
    });
}

// ========================================
// FOOTER YEAR
// ========================================

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// ========================================
// INITIALISE
// ========================================

renderProjects();
