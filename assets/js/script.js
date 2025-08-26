'use strict';

/* ---------- small helper ---------- */
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));
const toggle = (el, cls="active") => el && el.classList.toggle(cls);

/* ---------- sidebar (mobile) ---------- */
const sidebar = $('[data-sidebar]');
const sidebarBtn = $('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => toggle(sidebar, 'active'));
}

/* ---------- testimonials modal (safe if removed) ---------- */
const tItems = $$('[data-testimonials-item]');
const modalContainer = $('[data-modal-container]');
const modalCloseBtn = $('[data-modal-close-btn]');
const overlay = $('[data-overlay]');
const modalImg = $('[data-modal-img]');
const modalTitle = $('[data-modal-title]');
const modalText = $('[data-modal-text]');

const openTestimonial = (src, alt, title, text) => {
  if (!modalContainer || !overlay) return;
  if (modalImg) { modalImg.src = src; modalImg.alt = alt || ''; }
  if (modalTitle) modalTitle.innerHTML = title || '';
  if (modalText) modalText.innerHTML = text || '';
  modalContainer.classList.add('active');
  overlay.classList.add('active');
};

if (tItems.length && modalContainer && overlay) {
  tItems.forEach(item => {
    item.addEventListener('click', () => {
      const av = item.querySelector('[data-testimonials-avatar]');
      const tt = item.querySelector('[data-testimonials-title]');
      const tx = item.querySelector('[data-testimonials-text]');
      openTestimonial(av?.src, av?.alt, tt?.innerHTML, tx?.innerHTML);
    });
  });
  modalCloseBtn?.addEventListener('click', () => {
    modalContainer.classList.remove('active'); overlay.classList.remove('active');
  });
  overlay?.addEventListener('click', () => {
    modalContainer.classList.remove('active'); overlay.classList.remove('active');
  });
}

/* ---------- custom select + filtering ---------- */
const select = $('[data-select]');
const selectItems = $$('[data-select-item]');
const selectValue = $('[data-selecct-value]'); // (همان املای قالب)
const filterBtns = $$('[data-filter-btn]');
const filterItems = $$('[data-filter-item]');

const applyFilter = (value) => {
  const v = (value || 'all').trim().toLowerCase();
  filterItems.forEach(item => {
    const cat = (item.dataset.category || '').trim().toLowerCase();
    if (v === 'all' || v === cat) item.classList.add('active');
    else item.classList.remove('active');
  });
};

if (select) {
  select.addEventListener('click', () => toggle(select, 'active'));
  selectItems.forEach(it => {
    it.addEventListener('click', () => {
      const v = it.innerText;
      if (selectValue) selectValue.innerText = v;
      select.classList.remove('active');
      applyFilter(v);
    });
  });
}

let lastBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const v = btn.innerText;
    if (selectValue) selectValue.innerText = v;
    applyFilter(v);
    lastBtn?.classList.remove('active');
    btn.classList.add('active');
    lastBtn = btn;
  });
});

/* ---------- contact form enable/disable ---------- */
const form = $('[data-form]');
const formInputs = $$('[data-form-input]');
const formBtn = $('[data-form-btn]');
if (form && formInputs.length && formBtn) {
  formInputs.forEach(inp => {
    inp.addEventListener('input', () => {
      if (form.checkValidity()) formBtn.removeAttribute('disabled');
      else formBtn.setAttribute('disabled', '');
    });
  });
}

/* ---------- page navigation (robust) ---------- */
const pages = $$('[data-page]');
const pageMap = pages.reduce((acc, p) => {
  const key = (p.dataset.page || '').trim().toLowerCase();
  if (key) acc[key] = p;
  return acc;
}, {});

const navLinks = $$('[data-nav-link]');
const aliases = { projects: 'portfolio', publication: 'publications' };

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    // اولویت با data-target
    let key = (link.dataset.target || link.textContent || '').trim().toLowerCase();
    key = aliases[key] || key;
    const targetPage = pageMap[key];
    if (!targetPage) { console.warn('No page found for', key); return; }

    pages.forEach(p => p.classList.remove('active'));
    navLinks.forEach(b => b.classList.remove('active'));
    targetPage.classList.add('active');
    link.classList.add('active');
    window.scrollTo(0, 0);
  });
});
