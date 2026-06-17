// Copy-to-clipboard for suggested-citation blocks.
// Wire any <button data-copy-target="ID"> to copy the text of #ID.
(function () {
  function init(btn) {
    btn.addEventListener('click', function () {
      var el = document.getElementById(btn.getAttribute('data-copy-target'));
      if (!el) return;
      var text = el.textContent.trim();
      var done = function () {
        var orig = btn.getAttribute('data-label') || btn.textContent;
        btn.setAttribute('data-label', orig);
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = orig; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () { select(el); });
      } else {
        select(el);
      }
    });
  }
  function select(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  var btns = document.querySelectorAll('[data-copy-target]');
  Array.prototype.forEach.call(btns, init);
})();
