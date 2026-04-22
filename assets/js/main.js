// Mobile nav toggle + dropdown handling
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (links && links.classList.contains('is-open')) {
        links.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // How-to filter (extensible category filter)
  const filters = document.querySelectorAll('.howto-filter');
  const cards = document.querySelectorAll('[data-howto-cat]');
  if (filters.length && cards.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const cat = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        cards.forEach(function (c) {
          const cats = (c.getAttribute('data-howto-cat') || '').split(',').map(function (s) { return s.trim(); });
          c.style.display = (cat === 'all' || cats.indexOf(cat) !== -1) ? '' : 'none';
        });
      });
    });
  }
})();
