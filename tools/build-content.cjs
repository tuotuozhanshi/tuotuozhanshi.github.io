/* Optional: regenerate embedded content for offline preview after editing Markdown.
   Usage (from the repository root): node tools/build-content.cjs
   No npm install is required; the project already includes marked and js-yaml. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const marked = require(path.join(root, 'static/js/marked.min.js'));
const yaml = require(path.join(root, 'static/js/js-yaml.min.js'));
marked.use({mangle: false, headerIds: false});
const names = ['home', 'publications', 'background', 'internship', 'awards'];
const data = {defaultLanguage: 'en', languages: {}};
for (const language of ['en', 'zh']) {
  const dir = path.join(root, 'contents', language === 'zh' ? 'zh' : '');
  const config = yaml.load(fs.readFileSync(path.join(dir, 'config.yml'), 'utf8'));
  const sections = Object.fromEntries(names.map(name => [
    name, marked.parse(fs.readFileSync(path.join(dir, name + '.md'), 'utf8'))
  ]));
  data.languages[language] = {config, sections};
}
fs.writeFileSync(path.join(root, 'static/js/site-content.js'),
  '// Embedded bilingual fallback for direct file previews and unavailable content requests.\n' +
  'window.YANG_LI_SITE = ' + JSON.stringify(data, null, 2) + ';\n');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const name of names) {
  const expression = new RegExp(`<!-- CONTENT:${name}:START -->[\\s\\S]*?<!-- CONTENT:${name}:END -->`);
  if (!expression.test(html)) throw new Error(`Missing fallback markers for ${name}`);
  html = html.replace(expression,
    () => `<!-- CONTENT:${name}:START -->\n${data.languages.en.sections[name]}<!-- CONTENT:${name}:END -->`);
}
fs.writeFileSync(path.join(root, 'index.html'), html);
console.log('Updated embedded English/Chinese content and index.html fallback.');
