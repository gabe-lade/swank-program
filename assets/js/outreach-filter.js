// Client-side topic filtering + keyword search for outreach lists.
// Works on any block marked [data-outreach-filter] containing:
//   - topic buttons:  [data-topic="<slug>|all"]
//   - a search input: [data-search]
//   - entries:        [data-topics="<space-separated slugs>"] [data-title="<lowercased>"]
//   - an empty note:  [data-empty]
// No dependencies; safe to load on every outreach page.
(function () {
  function initRoot(root) {
    var search = root.querySelector('[data-search]');
    var chips = Array.prototype.slice.call(root.querySelectorAll('[data-topic]'));
    var entries = Array.prototype.slice.call(root.querySelectorAll('[data-topics]'));
    var empty = root.querySelector('[data-empty]');
    var active = 'all';

    // Hide topic chips that no entry on this page actually uses.
    chips.forEach(function (chip) {
      var slug = chip.getAttribute('data-topic');
      if (slug === 'all') return;
      var used = entries.some(function (e) {
        return e.getAttribute('data-topics').split(' ').indexOf(slug) !== -1;
      });
      if (!used) chip.hidden = true;
    });

    function apply() {
      var q = ((search && search.value) || '').trim().toLowerCase();
      var visible = 0;
      entries.forEach(function (e) {
        var topics = e.getAttribute('data-topics').split(' ');
        var title = e.getAttribute('data-title') || '';
        var matchTopic = active === 'all' || topics.indexOf(active) !== -1;
        var matchSearch = q === '' || title.indexOf(q) !== -1;
        var show = matchTopic && matchSearch;
        e.hidden = !show;
        if (show) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        active = chip.getAttribute('data-topic');
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    apply();
  }

  var roots = document.querySelectorAll('[data-outreach-filter]');
  Array.prototype.forEach.call(roots, initRoot);
})();
