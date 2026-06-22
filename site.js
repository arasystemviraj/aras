(() => {
  'use strict';

  const pages = [
    ['index.html', 'Home'],
    ['information.html', 'System'],
    ['working.html', 'Engineering'],
    ['simulator.html', 'Simulator']
  ];

  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const main = document.querySelector('main, .sim-shell, .layout, .hero');
  if (main && !main.id) main.id = 'main-content';

  const skip = document.createElement('a');
  skip.className = 'tk-skip-link';
  skip.href = `#${main?.id || 'main-content'}`;
  skip.textContent = 'Skip to main content';

  const nav = document.createElement('nav');
  nav.className = 'tk-site-nav';
  nav.setAttribute('aria-label', 'Primary navigation');
  nav.innerHTML = `
    <div class="tk-site-nav__inner">
      <a class="tk-brand" href="index.html" aria-label="TwinKey ARAS home">
        <span class="tk-brand__mark" aria-hidden="true">TK</span>
        <span>TwinKey ARAS</span>
      </a>
      <div class="tk-site-nav__links">
        ${pages.map(([href, label]) => `<a href="${href}"${current === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </div>
    </div>`;

  document.body.prepend(nav);
  document.body.prepend(skip);

  document.querySelectorAll('button:not([type])').forEach(button => button.type = 'button');
  document.querySelectorAll('input[type="range"]').forEach(input => {
    const label = input.closest('.srow')?.querySelector('.slbl')?.textContent?.trim();
    if (label && !input.getAttribute('aria-label')) input.setAttribute('aria-label', label);
  });
  document.querySelectorAll('.sval').forEach(value => value.setAttribute('aria-live', 'polite'));
  document.querySelectorAll('canvas').forEach(canvas => {
    canvas.setAttribute('role', 'img');
    if (!canvas.getAttribute('aria-label')) {
      const heading = canvas.closest('.panel, .glass-panel')?.querySelector('h2, h3, .panel-title')?.textContent?.trim();
      canvas.setAttribute('aria-label', heading ? `${heading} visualization` : 'System visualization');
    }
  });
  document.querySelectorAll('table').forEach(table => {
    if (table.parentElement?.classList.contains('tk-table-wrap')) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'tk-table-wrap';
    wrapper.setAttribute('role', 'region');
    wrapper.setAttribute('aria-label', 'Scrollable data table');
    wrapper.tabIndex = 0;
    table.before(wrapper);
    wrapper.append(table);
  });
})();
