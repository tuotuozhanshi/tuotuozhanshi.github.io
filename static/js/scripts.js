/* Bilingual personal homepage. All content is authored locally by the site owner. */
'use strict';
(() => {
  const site = window.YANG_LI_SITE;
  if (!site || !site.languages) return;
  const sectionNames = ['home', 'publications', 'background', 'internship', 'awards'];
  const storageKey = 'yang-li-site-language';
  const buildVersion = 'compact-sdu-r6';
  let currentLanguage = 'en';
  let requestVersion = 0;
  let mathQueue = Promise.resolve();

  function initialLanguage() {
    try {
      const requested = new URL(window.location.href).searchParams.get('lang');
      if (requested === 'zh' || requested === 'zh-CN') return 'zh';
      if (requested === 'en') return 'en';
      const saved = window.localStorage.getItem(storageKey);
      if (saved === 'en' || saved === 'zh') return saved;
    } catch (_) { /* A private/offline browser may deny storage access. */ }
    return site.defaultLanguage || 'en';
  }

  async function readText(path) {
    const response = await fetch(`${path}${path.includes('?') ? '&' : '?'}v=${buildVersion}`, {cache: 'no-cache'});
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    return response.text();
  }

  function readingPosition() {
    if (window.scrollY < 15) return {top: 0};
    const marker = (document.getElementById('mainNav')?.offsetHeight || 72) + 32;
    const section = sectionNames.map(id => document.getElementById(id))
      .find(el => el && el.getBoundingClientRect().bottom > marker);
    return section ? {id: section.id, offset: window.scrollY - section.offsetTop} : {bottom: true};
  }

  function restorePosition(position) {
    if (!position) return;
    const html = document.documentElement;
    const oldBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    let top = position.top || 0;
    if (position.id) top = document.getElementById(position.id).offsetTop + position.offset;
    if (position.bottom) top = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo(0, Math.max(0, top));
    requestAnimationFrame(() => { html.style.scrollBehavior = oldBehavior; });
  }

  function prepareLinks() {
    document.querySelectorAll('main a[href^="https://"]').forEach(link => {
      link.target = '_blank';
      link.rel = 'noopener';
    });
  }

  function refreshScrollSpy() {
    if (!window.bootstrap?.ScrollSpy) return;
    const previous = bootstrap.ScrollSpy.getInstance(document.body);
    if (previous) previous.refresh();
    else new bootstrap.ScrollSpy(document.body, {target: '#mainNav', offset: 100});
  }

  function typesetMath() {
    if (!window.MathJax?.startup?.promise) return;
    mathQueue = mathQueue.then(async () => {
      await MathJax.startup.promise;
      if (MathJax.typesetPromise) await MathJax.typesetPromise([document.querySelector('main')]);
    }).catch(error => console.warn('Math rendering:', error.message));
  }

  function render(language, keepPosition = true) {
    const content = site.languages[language];
    if (!content) return;
    const position = keepPosition ? readingPosition() : null;
    const config = content.config;
    if (window.MathJax?.typesetClear) MathJax.typesetClear([document.querySelector('main')]);

    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.language = language;
    document.title = config.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = config.description || '';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = config[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const value = config[element.dataset.i18nAria];
      if (typeof value === 'string') element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
      const value = config[element.dataset.i18nAlt];
      if (typeof value === 'string') element.alt = value;
    });
    sectionNames.forEach(name => {
      const container = document.getElementById(`${name}-md`);
      if (container && typeof content.sections[name] === 'string') {
        container.innerHTML = content.sections[name];
      }
    });
    document.querySelectorAll('.language-button').forEach(button => {
      const active = button.dataset.lang === language;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    prepareLinks();
    refreshScrollSpy();
    restorePosition(position);
    typesetMath();
  }

  async function refreshFromFiles(language, version) {
    // The embedded content makes double-click previews work without a web server.
    if (window.location.protocol === 'file:' || !window.marked) return;
    const directory = language === 'zh' ? 'contents/zh/' : 'contents/';
    const fresh = {config: {...site.languages[language].config}, sections: {...site.languages[language].sections}};
    marked.use({mangle: false, headerIds: false});
    await Promise.all([
      (async () => {
        if (!window.jsyaml) return;
        try {
          const config = jsyaml.load(await readText(directory + 'config.yml'));
          if (config && typeof config === 'object') Object.assign(fresh.config, config);
        } catch (error) { console.warn('Using embedded site labels:', error.message); }
      })(),
      ...sectionNames.map(async name => {
        try {
          fresh.sections[name] = marked.parse(await readText(`${directory}${name}.md`));
        } catch (error) { console.warn(`Using embedded ${name} content:`, error.message); }
      })
    ]);
    const changed = JSON.stringify(fresh) !== JSON.stringify(site.languages[language]);
    site.languages[language] = fresh;
    // Prevent an older response from overwriting a later language selection.
    if (version === requestVersion && language === currentLanguage) {
      if (changed) render(language, true);
      document.documentElement.dataset.ready = 'true';
    }
  }

  function setLanguage(language, updateUrl = true) {
    if (!site.languages[language]) return;
    const version = ++requestVersion;
    currentLanguage = language;
    document.documentElement.dataset.ready = 'loading';
    render(language, updateUrl);
    try { window.localStorage.setItem(storageKey, language); } catch (_) {}
    if (updateUrl) {
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', language);
        window.history.replaceState(null, '', url);
      } catch (_) { /* Language switching still works when URL updates are blocked. */ }
    }
    // Rendering is already complete; remote refresh only applies repository edits.
    document.documentElement.dataset.ready = 'true';
    refreshFromFiles(language, version);
  }

  window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.language-switch').hidden = false;
    document.querySelectorAll('.language-button').forEach(button => {
      button.addEventListener('click', () => setLanguage(button.dataset.lang));
    });
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const menu = document.getElementById('navbarResponsive');
        if (menu.classList.contains('show') && window.bootstrap) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
    setLanguage(initialLanguage(), false);
    if (window.location.hash) {
      requestAnimationFrame(() => {
        const destination = document.getElementById(window.location.hash.slice(1));
        if (destination) destination.scrollIntoView({behavior: 'instant', block: 'start'});
      });
    }
  });
})();
