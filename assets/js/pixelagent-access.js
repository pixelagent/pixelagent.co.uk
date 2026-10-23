(function () {
  'use strict';
  const links = document.querySelectorAll('[data-source-access]');
  if (!links.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'access-dialog';
  dialog.setAttribute('aria-labelledby', 'access-title');
  dialog.setAttribute('aria-describedby', 'access-description');
  dialog.innerHTML = `
    <button type="button" class="access-close" aria-label="Close access request">×</button>
    <p class="access-eyebrow">Behind the build</p>
    <h2 id="access-title">Request source access</h2>
    <p id="access-description">Interested in how it works? Tell me how you’d like to use the source and I’ll get back to you by email.</p>
    <p class="access-project"></p>
    <form action="https://formsubmit.co/el/susawi" method="POST">
      <input type="hidden" name="_subject">
      <input type="hidden" name="_captcha" value="false">
      <input type="hidden" name="request_type" value="Source access">
      <input type="hidden" name="project">
      <input type="hidden" name="source_url">
      <input type="hidden" name="page_url">
      <div class="access-fields">
        <label>Your name<input name="name" autocomplete="name" maxlength="150" required></label>
        <label>Email address<input name="email" type="email" autocomplete="email" maxlength="254" required></label>
        <label class="access-wide">How would you like to use the source?<textarea name="message" rows="3" maxlength="5000" required></textarea></label>
      </div>
      <label class="access-honeypot" aria-hidden="true">Leave this empty<input name="_gotcha" tabindex="-1" autocomplete="off"></label>
      <label class="access-consent"><input type="checkbox" name="contact_permission" value="yes" required><span>I’m happy for Pixelagent to use these details to reply to my request.</span></label>
      <button class="access-submit" type="submit">Send request ↗</button>
      <p class="access-status" role="status" aria-live="polite"></p>
    </form>`;
  document.body.appendChild(dialog);
  const form = dialog.querySelector('form');
  const status = dialog.querySelector('.access-status');
  const submit = dialog.querySelector('.access-submit');
  let trigger;
  let sending = false;
  let sent = false;
  links.forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    trigger = link;
    if (!sending) {
      form.reset();
      sent = false;
      submit.disabled = false;
      submit.textContent = 'Send request ↗';
      status.textContent = '';
      const project = link.dataset.accessProject;
      form.elements.project.value = project;
      form.elements.source_url.value = link.dataset.sourceAccess;
      form.elements.page_url.value = location.href.split(/[?#]/)[0];
      form.elements._subject.value = 'Pixelagent source access request: ' + project;
      dialog.querySelector('.access-project').textContent = project;
    }
    dialog.showModal();
  }));
  dialog.querySelector('.access-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { if (trigger) trigger.focus(); });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || sent || !form.reportValidity()) return;
    if (form.elements._gotcha.value) return;
    sending = true;
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = '';
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error('Request failed');
      sent = true;
      status.textContent = 'Request sent. Thank you — I’ll reply by email about access.';
      submit.textContent = 'Request sent ✓';
    } catch (error) {
      status.textContent = 'Your request could not be sent. Please check your connection and try again.';
      submit.textContent = 'Send request ↗';
    } finally {
      sending = false;
      submit.disabled = sent;
    }
  });
})();
