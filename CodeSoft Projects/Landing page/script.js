// script.js — simple interactivity for Aurora Jewels landing page

// DOM helpers
const q = (sel, ctx=document) => ctx.querySelector(sel);
const qa = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = q('.nav-toggle');
  const navLinks = q('.nav-links');
  navToggle && navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  // Smooth scroll for internal links
  qa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile menu
        navLinks.classList.remove('show');
      }
    });
  });

  // Quick view modal
  const modal = q('#productModal');
  const modalImage = q('#modalImage');
  const modalTitle = q('#modalTitle');
  const modalPrice = q('#modalPrice');
  const modalClose = q('.modal-close');

  qa('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if(!card) return;
      const name = card.dataset.name || card.querySelector('h3')?.innerText;
      const price = card.dataset.price || card.querySelector('.price')?.innerText;
      const img = card.dataset.img || card.querySelector('img')?.src;

      modalImage.src = img || '';
      modalImage.alt = name || 'Product image';
      modalTitle.textContent = name || '';
      modalPrice.textContent = price || '';

      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  modalClose && modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });

  // Contact form validation (simple)
  const contactForm = q('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = q('#name', contactForm).value.trim();
      const email = q('#email', contactForm).value.trim();
      const message = q('#message', contactForm).value.trim();

      if(!name || !email || !message){
        alert('Please fill in all fields before sending.');
        return;
      }

      // Minimal email pattern check
      const emailOK = /\S+@\S+\.\S+/.test(email);
      if(!emailOK){
        alert('Please provide a valid email address.');
        return;
      }

      // Emulate success — in real site you'd POST to an API
      contactForm.reset();
      alert('Thanks — your message has been sent! We will reply shortly.');
    });
  }

});
