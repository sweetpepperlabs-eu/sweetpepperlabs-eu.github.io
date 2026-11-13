// Contact form: send in the background and show the thank-you box on the same page.
// Without JavaScript the form posts normally and Formspree returns the visitor to /contact/#sent.
(function () {
  var form = document.getElementById('contact-form');
  var sent = document.getElementById('sent');
  if (!form || !sent || !window.fetch || !window.FormData) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = true;

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Send failed');
        form.reset();
        form.hidden = true;
        sent.classList.add('is-visible');
        sent.scrollIntoView({ behavior: 'smooth', block: 'center' });
        sent.focus();
      })
      .catch(function () {
        // Fall back to the normal form submission so the message is not lost.
        form.submit();
      })
      .finally(function () {
        if (button) button.disabled = false;
      });
  });
})();
