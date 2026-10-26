/* No financial values leave this worksheet or enter browser storage. */
(() => {
  'use strict';
  const form = document.getElementById('expense-form');
  if (!form) return;
  const rows = [...form.querySelectorAll('[data-expense-row]')];
  const total = document.getElementById('eligible-expense-total');
  const error = document.getElementById('worksheet-error');
  const currency = new Intl.NumberFormat('en-US', {style:'currency', currency:'USD'});
  let announcement;
  function update(immediate = false) {
    clearTimeout(announcement);
    let cents = 0;
    let valid = true;
    rows.forEach(row => {
      const cost = row.querySelector('[data-cost]');
      const share = row.querySelector('[data-share]');
      const inputs = [cost, share];
      inputs.forEach(input => input.setAttribute('aria-invalid', String(!input.validity.valid)));
      if (inputs.some(input => !input.validity.valid)) {
        valid = false;
        row.querySelector('[data-row-total]').textContent = '—';
        return;
      }
      const rowCents = Math.round(cost.valueAsNumber * share.valueAsNumber * Number(row.dataset.factor));
      cents += rowCents;
      row.querySelector('[data-row-total]').textContent = currency.format(rowCents / 100);
    });
    error.hidden = valid;
    const render = () => { total.textContent = valid ? currency.format(cents / 100) : 'Check the highlighted inputs'; };
    if (!valid || immediate) render();
    else announcement = setTimeout(render, 250);
  }
  form.addEventListener('input', () => update());
  form.addEventListener('submit', event => {event.preventDefault(); update(true);});
  // The reset event fires before controls have returned to their default values.
  form.addEventListener('reset', () => setTimeout(() => update(true), 0));
  form.hidden = false;
  update(true);
})();
