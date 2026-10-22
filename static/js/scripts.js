/* Editable content remains in contents/*.md; index.html contains a readable fallback. */
'use strict';
const contentDirectory = 'contents/';
const sectionNames = ['home', 'publications', 'background', 'awards'];

async function readText(path) {
  const response = await fetch(path, {cache: 'no-cache'});
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.text();
}

function prepareExternalLinks() {
  document.querySelectorAll('main a[href^="https://"]').forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

async function refreshContent() {
  // Browsers prohibit fetch(file://...). Keep the complete embedded page for local previews.
  if (window.location.protocol === 'file:') return;
  if (window.jsyaml) {
    try {
      const config = jsyaml.load(await readText(contentDirectory + 'config.yml'));
      if (config && typeof config === 'object') {
        Object.entries(config).forEach(([id, value]) => {
          const element = document.getElementById(id);
          if (element) element.textContent = String(value);
        });
      }
    } catch (error) {
      console.warn('Using the embedded site configuration:', error.message);
    }
  }
  if (!window.marked) return;
  marked.use({mangle: false, headerIds: false});
  await Promise.all(sectionNames.map(async name => {
    try {
      const source = await readText(contentDirectory + name + '.md');
      // The Markdown files are repository-owner-authored content, not user submissions.
      document.getElementById(name + '-md').innerHTML = marked.parse(source);
    } catch (error) {
      console.warn(`Using the embedded ${name} section:`, error.message);
    }
  }));
}

window.addEventListener('DOMContentLoaded', async () => {
  document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('navbarResponsive');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });
  await refreshContent();
  prepareExternalLinks();
  if (window.MathJax && MathJax.startup && MathJax.startup.promise) {
    try {
      await MathJax.startup.promise;
      if (MathJax.typesetPromise) await MathJax.typesetPromise([document.querySelector('main')]);
    } catch (error) {
      console.warn('Math rendering could not be completed:', error.message);
    }
  }
  if (window.bootstrap) {
    bootstrap.ScrollSpy.getInstance(document.body)?.dispose();
    new bootstrap.ScrollSpy(document.body, {target: '#mainNav', offset: 100});
  }
  document.documentElement.dataset.ready = 'true';
});
