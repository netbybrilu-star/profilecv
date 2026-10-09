
const projects = [
  {
    title: 'Coca-Cola Trophy Tour',
    category: 'Event creative · Signage · Accreditation',
    file: 'assets/projects/project-01.jpg',
    label: 'COCA-COLA',
    sub: 'TROPHY TOUR',
    bg: 'linear-gradient(135deg, #f4d4c5, #d54d3b)'
  },
  {
    title: '702 Walk the Talk',
    category: 'Event creative · Route maps · VAPs',
    file: 'assets/projects/project-02.jpg',
    label: 'WALK THE',
    sub: 'TALK / 702',
    bg: 'linear-gradient(135deg, #f0d7aa, #df9a40)'
  },
  {
    title: 'Octagon Rugby',
    category: 'Social creative · Visual refresh',
    file: 'assets/projects/project-03.jpg',
    label: 'OCTAGON',
    sub: 'RUGBY',
    bg: 'linear-gradient(135deg, #d9e7b9, #8fa75d)'
  },
  {
    title: 'Octagon Cricket',
    category: 'Social creative · Visual refresh',
    file: 'assets/projects/project-04.jpg',
    label: 'OCTAGON',
    sub: 'CRICKET',
    bg: 'linear-gradient(135deg, #cfe4e8, #7197a2)'
  },
  {
    title: 'Coca-Cola Be a Bok',
    category: 'PR campaign · Creative support',
    file: 'assets/projects/project-05.jpg',
    label: 'BE A',
    sub: 'BOK',
    bg: 'linear-gradient(135deg, #e8d9d1, #bd4b42)'
  },
  {
    title: 'Capitec × Mastercard',
    category: 'Anniversary event · Strategic creative',
    file: 'assets/projects/project-06.jpg',
    label: 'CAPITEC ×',
    sub: 'MASTERCARD',
    bg: 'linear-gradient(135deg, #f3e2a8, #d1b34e)'
  },
  {
    title: 'Mastercard X-Pay',
    category: 'Campaign · Strategic creative',
    file: 'assets/projects/project-07.jpg',
    label: 'X-PAY',
    sub: 'MADE TO MOVE',
    bg: 'linear-gradient(135deg, #e6d4ed, #a88bbd)'
  },
  {
    title: 'DHL Stadium',
    category: 'Email signatures · Internal collage',
    file: 'assets/projects/project-08.jpg',
    label: 'DHL',
    sub: 'STADIUM',
    bg: 'linear-gradient(135deg, #f4df9c, #d7b33b)'
  },
  {
    title: 'DHL Business Lounge',
    category: 'Brochure design',
    file: 'assets/projects/project-09.jpg',
    label: 'BUSINESS',
    sub: 'LOUNGE',
    bg: 'linear-gradient(135deg, #d8d9d4, #a7aaa4)'
  },
  {
    title: '2026/2027 Rugby Fixtures',
    category: 'Stadium communication · Fixtures',
    file: 'assets/projects/project-10.jpg',
    label: 'SEASON',
    sub: '26 / 27',
    bg: 'linear-gradient(135deg, #d4e5d2, #82a181)'
  },
  {
    title: 'UEFA × Mastercard',
    category: 'Social campaign · Creative amendments',
    file: 'assets/projects/project-11.jpg',
    label: 'UEFA ×',
    sub: 'MASTERCARD',
    bg: 'linear-gradient(135deg, #d3dcf1, #879bc6)'
  }
];

// Select the project gallery container
const grid = document.getElementById('projectGrid');

// Create a card for each project
projects.forEach((project, index) => {
  const card = document.createElement('article');

  card.className = 'project-card glass reveal';
  card.style.animationDelay = `${index * 45}ms`;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute(
    'aria-label',
    `Open ${project.title} project image`
  );

  // Image container
  const imageWrap = document.createElement('div');
  imageWrap.className = 'project-image';

  // Project image
  const img = document.createElement('img');
  img.src = project.file;
  img.alt = project.title;
  img.loading = 'lazy';

  // Placeholder shown until the real image is added
  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.style.setProperty('--placeholder', project.bg);

  placeholder.innerHTML = `
    <div>
      <strong>
        ${project.label}<br>
        ${project.sub}
      </strong>
      <br>
      <small>REPLACE WITH YOUR PROJECT IMAGE</small>
    </div>
  `;

  // Remove the placeholder when the image loads
  img.addEventListener('load', () => {
    placeholder.remove();
  });

  // Hide the broken image if the file does not exist
  img.addEventListener('error', () => {
    img.remove();
  });

  imageWrap.append(img, placeholder);

  // Project title and category
  const meta = document.createElement('div');
  meta.className = 'project-meta';

  meta.innerHTML = `
    <div>
      <h3>${project.title}</h3>
      <p>${project.category}</p>
    </div>
    <span class="project-arrow">↗</span>
  `;

  // Add everything to the card and gallery
  card.append(imageWrap, meta);
  grid.append(card);

  // Open the project preview
  const open = () => {
    const lightbox = document.getElementById('lightbox');
    const lightImg = document.getElementById('lightboxImage');

    lightImg.src = project.file;
    lightImg.alt = project.title;

    lightImg.onerror = () => {
      lightImg.removeAttribute('src');
      lightImg.alt = 'Add project image at ' + project.file;
    };

    document.getElementById('lightboxTitle').textContent =
      project.title;

    document.getElementById('lightboxCategory').textContent =
      project.category;

    lightbox.showModal();
  };

  // Open with a mouse click
  card.addEventListener('click', open);

  // Also support Enter and Space on the keyboard
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      open();
    }
  });
});

// Close the project preview using the close button
document
  .getElementById('closeLightbox')
  .addEventListener('click', () => {
    document.getElementById('lightbox').close();
  });

// Close the preview when clicking its backdrop
document
  .getElementById('lightbox')
  .addEventListener('click', event => {
    if (event.target.id === 'lightbox') {
      event.currentTarget.close();
    }
  });

// Copy your email address to the clipboard
document
  .getElementById('copyEmail')
  .addEventListener('click', async () => {
    const status = document.getElementById('copyStatus');

    try {
      await navigator.clipboard.writeText(
        'zech01hlongwane@gmail.com'
      );

      status.textContent = 'Email copied!';
    } catch {
      status.textContent =
        'Email: zech01hlongwane@gmail.com';
    }
  });
