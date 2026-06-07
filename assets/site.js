const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 30);
updateHeader();
window.addEventListener('scroll', updateHeader);

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
}));

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => button.closest('.faq-item').classList.toggle('open'));
});

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.portfolio-card').forEach(card => {
      card.hidden = filter !== 'all' && card.dataset.category !== filter;
    });
  });
});

const testimonialCarousel = document.querySelector('.testimonial-carousel');
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = [...document.querySelectorAll('.testimonial-slide')];
const testimonialCount = document.querySelector('.testimonial-count');
const testimonialPrevious = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');
let testimonialIndex = 0;

const showTestimonial = index => {
  if (!testimonialSlides.length) return;
  testimonialIndex = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * 100}%)`;
  testimonialSlides.forEach((slide, slideIndex) => {
    const active = slideIndex === testimonialIndex;
    slide.classList.toggle('active', active);
    slide.setAttribute('aria-hidden', String(!active));
  });
  testimonialCount.textContent = `${String(testimonialIndex + 1).padStart(2, '0')} / ${String(testimonialSlides.length).padStart(2, '0')}`;
};

testimonialPrevious?.addEventListener('click', () => showTestimonial(testimonialIndex - 1));
testimonialNext?.addEventListener('click', () => showTestimonial(testimonialIndex + 1));
testimonialCarousel?.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') showTestimonial(testimonialIndex - 1);
  if (event.key === 'ArrowRight') showTestimonial(testimonialIndex + 1);
});
testimonialCarousel?.setAttribute('tabindex', '0');
showTestimonial(0);

const form = document.querySelector('.contact-form');
form?.addEventListener('submit', event => {
  event.preventDefault();
  form.querySelector('.form-success').style.display = 'block';
  form.reset();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
