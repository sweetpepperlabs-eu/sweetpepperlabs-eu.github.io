// Tag filter for the Posts page. Vanilla JS, no dependencies.
// Without JavaScript the full list is shown, so nothing is lost.
(function () {
  var list = document.getElementById('post-list');
  var status = document.getElementById('filter-status');
  if (!list) return;

  var tag = new URLSearchParams(window.location.search).get('tag');
  var items = list.querySelectorAll('li');
  var shown = 0;

  items.forEach(function (li) {
    var tags = (li.getAttribute('data-tags') || '').trim().split(/\s+/);
    var match = !tag || tags.indexOf(tag) !== -1;
    li.hidden = !match;
    if (match) shown += 1;
  });

  document.querySelectorAll('.tag-chip').forEach(function (chip) {
    var t = new URL(chip.href).searchParams.get('tag');
    if ((t || null) === (tag || null)) {
      chip.setAttribute('aria-current', 'page');
    }
  });

  if (status) {
    status.textContent = tag ? shown + ' post(s) tagged #' + tag : '';
  }
})();
