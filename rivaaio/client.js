(() => {
  'use strict';
  const form = document.querySelector('#signup-form');
  if (!form) return;
  const plan = form.elements.plan;
  const revenue = form.elements.revenue;
  const status = document.querySelector('#form-status');
  const button = form.querySelector('button[type=submit]');
  const confirmation = document.querySelector('#confirmation');
  let requestId = crypto.randomUUID();
  let startedAt = Date.now();
  let busy = false;

  function track(event, values = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, product: 'RivaAIO', ...values});
  }
  function updatePlan() {
    const small = revenue.value === 'under5';
    document.querySelector('#selected-plan').textContent = {basic:'Basic', enhanced:'Enhanced+', advice:'Plan consultation'}[plan.value];
    document.querySelector('#selected-price').textContent = plan.value === 'enhanced' ? '$1,000 / month' : plan.value === 'advice' ? 'We will help you choose' : small ? '$250 / month Small Business Rate' : '$500 / month standard rate';
    document.querySelector('#rate-note').textContent = plan.value === 'basic' ? (small ? 'Subject to qualification for companies under $5 million in annual revenue.' : 'The $250 rate applies to qualifying companies under $5 million in annual revenue.') : 'Scope and terms are confirmed before any recurring payment is authorized.';
    button.textContent = plan.value === 'advice' ? 'Request a plan consultation' : 'Request subscription setup';
  }
  plan.addEventListener('change', updatePlan);
  revenue.addEventListener('change', updatePlan);
  document.querySelectorAll('[data-plan]').forEach(link => link.addEventListener('click', () => {
    plan.value = link.dataset.plan;
    updatePlan();
    track('rivaaio_plan_selected', {plan:plan.value});
  }));
  document.querySelectorAll('[data-intent="review"]').forEach(link => link.addEventListener('click', () => {
    plan.value = 'advice';
    updatePlan();
  }));

  // Preserve attribution for this submission without persisting personal details in browser storage.
  const params = new URLSearchParams(location.search);
  const allowedAttribution = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
  const attribution = Object.fromEntries(allowedAttribution.map(key => [key, (params.get(key) || '').slice(0,160)]));

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || !form.reportValidity()) return;
    busy = true;
    button.disabled = true;
    status.textContent = 'Saving your request…';
    try {
      const payload = Object.fromEntries(new FormData(form));
      payload.consent = form.elements.consent.checked;
      const response = await fetch(form.dataset.endpoint || '/rivaaio/api/requests', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...payload, requestId, elapsed:Date.now()-startedAt, attribution})
      });
      const data = await response.json();
      if (!response.ok) throw Error(data.error || 'Your request could not be saved. Please try again.');
      document.querySelector('#reference').textContent = data.reference;
      document.querySelector('#confirmation-message').textContent = 'Your ' + (plan.value === 'advice' ? 'plan consultation' : (plan.value === 'basic' ? 'Basic' : 'Enhanced+') + ' subscription') + ' request has been saved.';
      const previewNote = document.querySelector('#preview-confirmation');
      previewNote.hidden = !data.preview;
      previewNote.textContent = data.preview ? 'Private review test: this request is saved in the review database. ' + (data.emailEnabled ? 'Internal email alerts are enabled for Jordan. This receipt confirms the saved request. ' : 'Email delivery is not connected yet. ') + 'No QuickBooks invitation, payment, or service activation has been created.' : '';
      form.hidden = true;
      confirmation.hidden = false;
      confirmation.focus();
      track('rivaaio_request_saved', {plan:plan.value, preview:data.preview === true});
      status.textContent = '';
    } catch (error) {
      status.textContent = error.message === 'Failed to fetch' ? 'We could not confirm receipt. Please try again, or contact growth@rivastrategies.com.' : error.message;
    } finally {
      busy = false;
      button.disabled = false;
    }
  });
  document.querySelector('#new-request').addEventListener('click', () => {
    form.reset(); requestId=crypto.randomUUID(); startedAt=Date.now();
    confirmation.hidden=true; form.hidden=false; updatePlan(); form.elements.name.focus();
  });
  updatePlan();
})();
