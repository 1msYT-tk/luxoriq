// Particles
(function(){
  const c=document.getElementById('particles');if(!c)return;
  for(let i=0;i<40;i++){const p=document.createElement('div');p.className='particle';p.style.cssText=`left:${Math.random()*100}%;animation-duration:${8+Math.random()*12}s;animation-delay:${Math.random()*10}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px`;c.appendChild(p);}
})();

// Fade-up observer
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));
document.querySelectorAll('#hero .fade-up').forEach(el=>el.classList.add('visible'));

// Nav scroll
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.background=window.scrollY>50?'rgba(10,10,10,0.95)':'rgba(10,10,10,0.6)';
});

// Hamburger
const ham=document.getElementById('hamburger'),mob=document.getElementById('mobileMenu');
ham?.addEventListener('click',()=>{
  mob.classList.toggle('open');
  const sp=ham.querySelectorAll('span');
  if(mob.classList.contains('open')){sp[0].style.cssText='transform:rotate(45deg) translate(5px,5px)';sp[1].style.cssText='opacity:0';sp[2].style.cssText='transform:rotate(-45deg) translate(5px,-5px)';}
  else sp.forEach(s=>s.style.cssText='');
});
mob?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mob.classList.remove('open');ham.querySelectorAll('span').forEach(s=>s.style.cssText='');}));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const expanded=btn.getAttribute('aria-expanded')==='true';
    document.querySelectorAll('.faq-q').forEach(b=>{b.setAttribute('aria-expanded','false');b.nextElementSibling.style.maxHeight='0';});
    if(!expanded){btn.setAttribute('aria-expanded','true');btn.nextElementSibling.style.maxHeight=btn.nextElementSibling.scrollHeight+'px';}
  });
});

// Contact form
document.getElementById('contactForm')?.addEventListener('submit',function(e){
  e.preventDefault();
  this.style.display='none';
  document.getElementById('formSuccess').classList.add('show');
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});
