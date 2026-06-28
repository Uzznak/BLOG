// Détecte si on est dans un sous-dossier (articles/)
const root = document.currentScript.getAttribute('data-root') || '';

// ── Header ──
const header = `
<header class="header">
  <a href="${root}index.html" class="logo"><em>//</em> uzznak</a>
  <nav class="nav">
    <a href="${root}index.html">accueil</a>
    <a href="${root}index.html#writeups">writeups</a>
    <a href="${root}index.html#projets">projets</a>
    <a href="${root}index.html#veille">veille</a>
    <a href="${root}a-propos.html">à propos</a>
  </nav>
</header>`;

// ── Sidebar ──
const sidebar = `
<aside class="sidebar">
  <div class="sidebar-section">
    <div class="sidebar-heading">Blog</div>
    <a href="${root}index.html" class="sidebar-link">Accueil</a>
    <a href="${root}index.html#all" class="sidebar-link">Tous les articles</a>
    <a href="${root}a-propos.html" class="sidebar-link">À propos</a>
  </div>
  <hr class="sidebar-divider">
  <div class="sidebar-section">
    <div class="sidebar-heading">Catégories</div>
    <a href="${root}index.html#veille" class="sidebar-link">Veille &amp; événements</a>
    <a href="${root}index.html#writeups" class="sidebar-link">Writeups CTF</a>
    <a href="${root}index.html#projets" class="sidebar-link">Projets sécu</a>
    <a href="${root}index.html#reseau" class="sidebar-link">Réseaux</a>
  </div>
  <hr class="sidebar-divider">
  <div class="sidebar-section">
    <div class="sidebar-heading">Plateformes</div>
    <a href="https://www.root-me.org/" target="_blank" rel="noopener" class="sidebar-link">Root-Me →</a>
    <a href="https://www.hackthebox.com/" target="_blank" rel="noopener" class="sidebar-link">HackTheBox →</a>
    <a href="https://github.com/Uzznak" target="_blank" rel="noopener" class="sidebar-link">GitHub →</a>
  </div>
</aside>`;

// ── Footer ──
const footer = `
<footer class="footer">
  <span class="footer-text">uzznak · 2026 · aucune donnée collectée</span>
  <div class="footer-links">
    <a href="https://www.root-me.org/" target="_blank" rel="noopener">root-me</a>
    <a href="https://github.com/Uzznak" target="_blank" rel="noopener">github</a>
    <a href="${root}feed.xml">rss</a>
  </div>
</footer>`;

// ── Injection ──
document.getElementById('header').outerHTML = header;
document.getElementById('sidebar').outerHTML = sidebar;
document.getElementById('footer').outerHTML  = footer;

// ── Active link ──
const links = document.querySelectorAll('.nav a, .sidebar-link');
links.forEach(link => {
  if (link.href === window.location.href) link.classList.add('active');
});