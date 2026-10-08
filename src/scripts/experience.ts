import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | undefined;
const tick = (time: number) => lenis?.raf(time * 1000);
const configureMotion = () => {
  gsap.ticker.remove(tick);
  lenis?.destroy();
  lenis = undefined;
  if (!reduced.matches) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) - 24 } });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
  }
};
configureMotion();
const context = gsap.matchMedia();
context.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero-title > span', { yPercent: 30, opacity: 0, stagger: .12, duration: 1.25, ease: 'power3.out' });
  gsap.from('.hero-topline, .hero-bottom, .hero-scroll', { opacity: 0, duration: 1, delay: .4 });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
    gsap.from(el, { y: 35, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  // Animate complete frames instead of scaling or cropping the photograph.
  document.querySelectorAll<HTMLElement>('.project-photo, .service-image, .gallery-image, .intro-image, .studio-bleed, .service-bleed, .process-photo, .contact-photo').forEach(el => {
    gsap.from(el, { y: 24, opacity: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
  });
  document.querySelectorAll<HTMLElement>('.statement-photo[data-parallax]').forEach(el => {
    gsap.fromTo(el, { y: 12 }, { y: -12, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  document.querySelectorAll<SVGSVGElement>('.architectural-svg').forEach(svg => {
    const lines = svg.querySelectorAll('[data-draw]');
    gsap.fromTo(lines, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, stagger: .12, duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
    gsap.from(svg.querySelectorAll('.material-layer'), { y: (i:number) => (2-i)*-20, opacity: 0, stagger: .2, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: svg, start: 'top 85%', once: true } });
    const sun = svg.querySelector('.study-sun');
    if (sun) gsap.fromTo(sun, {x:-10, y:10}, {x:25, y:-5, ease:'none', scrollTrigger:{trigger:svg,start:'top bottom',end:'bottom top',scrub:1}});
  });
});
reduced.addEventListener('change', configureMotion);
document.fonts.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
document.querySelectorAll('img').forEach(img => img.addEventListener('load', () => ScrollTrigger.refresh(), {once:true}));

const dialog = document.querySelector<HTMLDialogElement>('#navigation-dialog');
const menu = document.querySelector<HTMLButtonElement>('.menu-trigger');
menu?.addEventListener('click', () => { dialog?.showModal(); lenis?.stop(); menu.setAttribute('aria-expanded','true'); });
document.querySelector('.menu-close')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('close', () => { lenis?.start(); menu?.setAttribute('aria-expanded','false'); menu?.focus(); });
dialog?.addEventListener('click', event => { if(event.target===dialog) dialog.close(); });

const light = document.querySelector<HTMLButtonElement>('.light-switch');
const updateLight = () => { const dark = document.documentElement.dataset.theme === 'basalto'; light?.setAttribute('aria-pressed', String(dark)); light?.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'); };
updateLight();
light?.addEventListener('click', () => { const theme = document.documentElement.dataset.theme === 'basalto' ? 'caliza' : 'basalto'; document.documentElement.dataset.theme = theme; try { localStorage.setItem('estrato-theme',theme); } catch {} updateLight(); });

const slides = [...document.querySelectorAll<HTMLElement>('[data-slide]')];
const slideButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-slide-to]')];
const projectData = document.getElementById('hero-project-data');
if (slides.length && projectData) {
  const data: {title:string;href:string}[] = JSON.parse(projectData.textContent || '[]');
  let current = 0;
  gsap.set(slides, { opacity: (index:number) => index === 0 ? 1 : 0 });
  const selectSlide = (index:number) => {
    if(index === current) return;
    const previous = current;
    current = index;
    gsap.killTweensOf(slides);
    slides.forEach((slide,i) => { slide.classList.toggle('is-current',i===index); slide.setAttribute('aria-hidden',String(i!==index)); });
    gsap.set(slides.filter((_,i) => i!==index && i!==previous), {opacity:0});
    gsap.to(slides[previous],{opacity:0,duration:reduced.matches ? 0 : .7});
    gsap.to(slides[index],{opacity:1,duration:reduced.matches ? 0 : .7});
    const link = document.querySelector<HTMLAnchorElement>('.hero-feature');
    const title = document.querySelector('[data-slide-title]');
    if(link) link.href=data[index].href;
    if(title) title.textContent=data[index].title;
    slideButtons.forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
  };
  slideButtons.forEach(button => button.addEventListener('click', () => selectSlide(Number(button.dataset.slideTo))));
  document.querySelector('.next-slide')?.addEventListener('click', () => selectSlide((current+1)%slides.length));
}

const filterButtons = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
const cards = [...document.querySelectorAll<HTMLElement>('.portfolio-grid [data-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.filter!;
  filterButtons.forEach(b => b.setAttribute('aria-pressed',String(b===button)));
  let count = 0;
  cards.forEach(card => { const match = value==='all' || card.dataset.category!.toLowerCase().includes(value); card.hidden=!match; if(match) count++; });
  const status = document.getElementById('filter-status');
  if(status) status.textContent=`${count} proyectos en ${button.textContent}`;
  lenis?.resize(); ScrollTrigger.refresh();
}));
document.querySelectorAll<HTMLDetailsElement>('.process-step').forEach(detail => {
  const closeSiblings = () => {
    if (!detail.open) return;
    detail.parentElement?.querySelectorAll<HTMLDetailsElement>('.process-step').forEach(sibling => { if (sibling !== detail) sibling.open = false; });
  };
  detail.addEventListener('toggle', () => { closeSiblings(); lenis?.resize(); ScrollTrigger.refresh(); });
});
const header = document.querySelector<HTMLElement>('.new-header');
const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 32);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('pagehide', event => {
  if (event.persisted) { lenis?.stop(); return; }
  context.revert(); gsap.ticker.remove(tick); lenis?.destroy(); reduced.removeEventListener('change', configureMotion);
});
window.addEventListener('pageshow', event => { if (event.persisted) { lenis?.start(); ScrollTrigger.refresh(); } });
