window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  // Temps minimum d'affichage du loader (en ms)
  const MIN_DURATION = 1000; // 2 secondes

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.remove();
    }, 400); // durée de la transition
  }, MIN_DURATION);
});


let percent = 0;
const percentEl = document.getElementById("loaderPercent");

const interval = setInterval(() => {
  percent++;
  percentEl.textContent = percent;
  if (percent >= 100) clearInterval(interval);
}, 25);


// 

// Barre de progression au scroll
window.addEventListener('scroll', () => {
    const fill = document.getElementById('progressFill');
    if (!fill) return;
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    fill.style.width = Math.min(pct, 100) + '%';
});

// Formulaire contact → ouvre le client mail avec les données pré-remplies
async function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('.form-submit');
    const defaultBtn = '<span>Envoyer le message</span> <i class="fas fa-paper-plane"></i>';

    const email = form.querySelector('#contact-email')?.value.trim() || '';
    if (!email) {
        form.querySelector('#contact-email')?.focus();
        return;
    }

    // Construit les données pour Web3Forms
    const prenom = form.querySelector('#contact-prenom')?.value.trim() || '';
    const nom = form.querySelector('#contact-nom')?.value.trim() || '';
    const sujet = form.querySelector('#contact-sujet')?.value.trim() || 'Contact depuis le portfolio';

    const formData = new FormData(form);
    formData.set('name', `${prenom} ${nom}`.trim() || 'Visiteur');
    formData.set('subject', sujet);
    formData.set('replyto', email);

    // État "envoi en cours"
    btn.disabled = true;
    btn.innerHTML = '<span>Envoi en cours...</span> <i class="fas fa-spinner fa-spin"></i>';
    btn.style.background = '';

    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();

        if (data.success) {
            btn.innerHTML = '<span>Message envoyé !</span> <i class="fas fa-check"></i>';
            btn.style.background = '#28C840';
            form.reset();
        } else {
            throw new Error(data.message || 'Échec de l\'envoi');
        }
    } catch (err) {
        btn.innerHTML = '<span>Erreur, réessayez</span> <i class="fas fa-exclamation-triangle"></i>';
        btn.style.background = '#FF5F57';
        console.error('Web3Forms:', err);
    } finally {
        setTimeout(() => {
            btn.innerHTML = defaultBtn;
            btn.style.background = '';
            btn.disabled = false;
        }, 4000);
    }
}

const themeButtons = document.querySelectorAll('.theme-btn, .theme-btn-small');
const html = document.documentElement;

// Update all theme button icons
function updateThemeIcons() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeButtons.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    });
}

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcons();
}

// Détecter le thème système
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(prefersDark ? 'dark' : 'light');
}

// Add click event to all theme buttons
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
});

// Mobile menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    const isOpen = menu.classList.toggle('active');
    if (btn) btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.querySelector('.mobile-menu-btn');
    menu.classList.remove('active');
    if (btn) btn.setAttribute('aria-expanded', 'false');
}

function moveCarousel(id, direction) {
    const totals = {
        'p2': 2,
        'colocation': 7,
        'snake': 3,
        'clientserveur': 2,
        'apprecette': 2
    };
    const total = totals[id] || 3;
    
    if (!carouselState[id]) carouselState[id] = { index: 0, total: total };
    const state = carouselState[id];
    state.index = (state.index + direction + state.total) % state.total;
    updateCarousel(id, state.index);
}
function goToSlide(id, index) {
    const totals = {
        'p2': 2,
        'colocation': 7,
        'snake': 3,
        'clientserveur': 2,
        'apprecette': 2
    };
    const total = totals[id] || 3;
    if (!carouselState[id]) carouselState[id] = { index: 0, total: total };
    carouselState[id].index = index;
    updateCarousel(id, index);
}
function updateCarousel(id, index) {
    const track = document.getElementById('carousel-' + id);
    if (!track) return;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    const state = carouselState[id];
    if (!state) return;
    for (let i = 0; i < state.total; i++) {
        const dot = document.getElementById(`dot-${id}-${i}`);
        if (dot) {
            dot.classList.toggle('active', i === index);
            dot.classList.toggle('inactive', i !== index);
        }
    }
}

// ========================================
// PROJECT MODAL
// ========================================

const projectsData = {

        'ldap': {
            title: 'Authentification LDAP',
            category: 'Systèmes',
            year: '2025',
            description: `Mise en place d’un système d’authentification Linux avec LDAP, Docker et Python.`,
            images: ['img/projets/ldap1.webp'],
            techs: ['Python', 'Docker', 'LDAP'],
            github: 'https://github.com/laize-loucia/ldap1',
            role: 'Projet personnel',
            roleDesc: 'Implémentation complète du système et configuration des services.'
        },

        'ipc': {
            title: 'Client – Serveur IPC',
            category: 'Systèmes',
            year: '2024',
            description: `Application client-serveur utilisant la communication inter-processus (IPC) pour gérer des réservations.`,
            images: ['Images/progclient.png', 'Images/progserveur.png'],
            techs: ['C', 'Linux', 'IPC'],
            github: 'https://github.com/banu005/Mini-projet-ProgSysRep.git',
            role: 'Travail en binôme',
            roleDesc: 'Implémentation du client et communication avec le serveur.'
        },

        'risk': {
            title: 'Risk Record',
            category: 'CLI · Sécurité',
            year: '2026',
            description: `Application CLI permettant de gérer des enregistrements de risques : CRUD, stockage JSON et logging.`,
            images: [],
            techs: ['Python', 'JSON', 'CLI', 'Logging'],
            github: null,
            role: 'Projet individuel',
            roleDesc: 'Développement de la logique CRUD et gestion des erreurs.'
        },

        'renault': {
            title: 'Optimisation fichier LUP',
            category: 'Data',
            year: '2025',
            description: `Automatisation VBA sur Excel pour améliorer le traitement de données internes et générer des KPI.`,
            images: [],
            techs: ['Excel', 'VBA'],
            github: null,
            role: 'Alternance Renault',
            roleDesc: 'Automatisation et structuration des données métier.'
        },

        'access': {
            title: 'AccessChecker',
            category: 'Sécurité',
            year: '2026',
            description: `Infrastructure de sécurité avec LDAP, NGINX TLS et OWASP ModSecurity.`,
            images: ['img/projets/AccessChecker.webp'],
            techs: ['NGINX', 'OWASP', 'Docker'],
            github: null,
            role: 'Projet personnel',
            roleDesc: 'Mise en place sécurisation réseau et reverse proxy.'
        },

        'colocation': {
            title: 'Application de colocation',
            category: 'Web',
            year: '2024',
            description: `Application web pour gérer tâches, dépenses et organisation d’une colocation.`,
            images: ['Images/colocation1.png'],
            video: 'https://www.youtube.com/embed/Teqj2Syxauk',
            techs: ['Python', 'Flask', 'MySQL'],
            github: 'https://github.com/balletFrancois18/Projet-IHM-Colocation.git',
            role: 'Projet académique',
            roleDesc: 'Développement complet + gestion des utilisateurs.'
        },


  /* ARCHIVES */

  'ourcq': {
    title: 'Ourcq Spot',
    category: 'Mobile',
    year: '2024',
    description: `Application mobile avec carte interactive et agenda.`,
    images: ['img/projets/OurcqspotMobile.webp'],
    techs: ['Kotlin', 'SQL'],
    github: null
  },

  'dashboard': {
    title: 'Dashboard Inria',
    category: 'Data',
    year: '2025',
    description: `Analyse de 1000 utilisateurs et visualisation avec Streamlit.`,
    images: ['img/projets/DashboardInria.webp'],
    techs: ['Python', 'Pandas', 'Streamlit'],
    github: null
  },

  'oria': {
    title: 'Site Web Oria',
    category: 'Web',
    year: '2024',
    description: `Site PHP MVC avec formulaire sécurisé et traduction.`,
    images: ['img/projets/OriaWebsite.webp'],
    techs: ['PHP', 'MySQL'],
    github: 'https://oria.alwaysdata.net/?lang=fr'
  },

  'scraping': {
    title: 'Web Scraping Wikipédia',
    category: 'Data',
    year: '2024',
    description: `Extraction et analyse de données via API.`,
    images: ['img/projets/Wikipedia_scrapping_project.webp'],
    techs: ['Python', 'API'],
    github: 'https://github.com/laize-loucia/WikiScraping-CorpusBuilder'
  }

};



function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;
    
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    
    let imagesHtml = '';
    project.images.forEach(img => {
        imagesHtml += `<div class="modal-image" style="background-image: url('${img}');"></div>`;
    });
    
    let linksHtml = '';
    if (project.github) {
        linksHtml += `<a href="${project.github}" target="_blank" class="modal-link primary">
            <i class="fab fa-github"></i>
            <span>Voir le code</span>
        </a>`;
    }
    linksHtml += `<button class="modal-link secondary" onclick="closeProjectModal()">
        <i class="fas fa-times"></i>
        <span>Fermer</span>
    </button>`;
    
    let roleHtml = '';
    if (project.role) {
        roleHtml = `
            <div class="modal-role">
                <h4 class="modal-techs-title">Rôle</h4>
                <p class="modal-role-text"><strong>${project.role}</strong></p>
                <p class="modal-role-desc">${project.roleDesc}</p>
            </div>
        `;
    }
    
    content.innerHTML = `
        <div class="modal-header">
            <div class="modal-category">${project.category}</div>
            <h2 class="modal-title">${project.title}</h2>
            <span class="modal-year">${project.year}</span>
        </div>
        <p class="modal-description">${project.description}</p>
        ${project.video ? `<div class="modal-video"><iframe src="${project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>` : ''}
        <div class="modal-images">${imagesHtml}</div>
        ${roleHtml}
        <div class="modal-techs">
            <h4 class="modal-techs-title">Technologies utilisées</h4>
            <div class="modal-techs-list">
                ${project.techs.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="modal-links">${linksHtml}</div>
    `;
    
    modal.classList.add('active');
