/* Janell Lewis — shared site behaviour */
(function(){
'use strict';
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- mobile menu ---- */
(function(){
  var burger = document.getElementById('burger'), mnav = document.getElementById('mnav');
  if(!burger || !mnav) return;
  function toggle(force){
    var open = typeof force === 'boolean' ? force : !mnav.classList.contains('open');
    mnav.classList.toggle('open', open); burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function(){ toggle() });
  [].slice.call(mnav.querySelectorAll('a')).forEach(function(a){
    a.addEventListener('click', function(){ toggle(false) });
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && mnav.classList.contains('open')) toggle(false);
  });
})();

/* ---- theme toggle ---- */
(function(){
  var root = document.documentElement, btn = document.getElementById('themeToggle');
  if(!btn) return;
  btn.addEventListener('click', function(){
    var dark = root.getAttribute('data-theme') === 'dark';
    if(dark) root.removeAttribute('data-theme'); else root.setAttribute('data-theme','dark');
    try{ localStorage.setItem('jl-theme', dark ? 'light' : 'dark') }catch(e){}
  });
})();

/* ---- scroll reveal + hero parallax ---- */
(function(){
  var targets = [].slice.call(document.querySelectorAll('.work,.sec-head,.about .facts,.about .bio,.exh li,.contact h2,.contact .row,.grid-foot'));
  targets.forEach(function(t){ t.classList.add('reveal') });
  var cols = window.matchMedia('(max-width:560px)').matches ? 1 : (window.matchMedia('(max-width:880px)').matches ? 2 : 3);
  [].slice.call(document.querySelectorAll('.work')).forEach(function(w,i){
    w.style.setProperty('--d', (i % cols) * 0.09 + 's');
  });
  if(!reduce && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target) } });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    targets.forEach(function(t){ io.observe(t) });
  } else {
    targets.forEach(function(t){ t.classList.add('in') });
  }

  var heroImg = document.querySelector('.hero-img img');
  if(heroImg && !reduce){
    var ticking = false;
    window.addEventListener('scroll', function(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){
        var y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.setProperty('--py', (y * 0.12) + 'px');
        ticking = false;
      });
    }, {passive:true});
  }
})();

/* ---- lightbox ----
   Each .work may carry data-frames="a.jpg|b.jpg" listing every frame of that
   work. Without it the card's own image is the only frame. All frames across
   all works are flattened into one list so prev/next walks the whole page. */
(function(){
  var lb = document.getElementById('lightbox');
  if(!lb) return;
  var img = document.getElementById('lbImg'), cap = document.getElementById('lbCap');
  var prevImg = document.getElementById('lbPrevImg'), nextImg = document.getElementById('lbNextImg');
  var frames = [], idx = 0;

  [].slice.call(document.querySelectorAll('.work')).forEach(function(w){
    var thumb = w.querySelector('.ph img');
    if(!thumb) return;
    var titleEl = w.querySelector('h3'), dimEl = w.querySelector('.dim');
    var title = titleEl ? titleEl.textContent : '';
    var dim = dimEl ? dimEl.textContent : '';
    var list = (w.getAttribute('data-frames') || thumb.getAttribute('src')).split('|');
    var start = frames.length;
    list.forEach(function(src, i){
      frames.push({src:src.trim(), alt:thumb.alt, title:title, dim:dim, n:i+1, of:list.length});
    });
    w.addEventListener('click', function(e){ e.preventDefault(); show(start) });
  });
  if(!frames.length) return;

  function at(i){ return frames[(i % frames.length + frames.length) % frames.length] }
  function show(i){
    idx = (i % frames.length + frames.length) % frames.length;
    var cur = at(idx);
    img.src = cur.src; img.alt = cur.alt;
    prevImg.src = at(idx-1).src; prevImg.alt = '';
    nextImg.src = at(idx+1).src; nextImg.alt = '';
    cap.innerHTML = '';
    cap.appendChild(document.createTextNode(cur.title + ' · ' + cur.dim));
    if(cur.of > 1){
      var s = document.createElement('span');
      s.className = 'of'; s.textContent = cur.n + ' / ' + cur.of;
      cap.appendChild(s);
    }
    lb.classList.add('open'); document.body.style.overflow = 'hidden';
  }
  function close(){ lb.classList.remove('open'); document.body.style.overflow = '' }

  document.getElementById('lbClose').addEventListener('click', close);
  prevImg.addEventListener('click', function(){ show(idx-1) });
  nextImg.addEventListener('click', function(){ show(idx+1) });
  lb.addEventListener('click', function(e){ if(e.target === lb) close() });
  document.addEventListener('keydown', function(e){
    if(!lb.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowLeft') show(idx-1);
    if(e.key === 'ArrowRight') show(idx+1);
  });

  var tx = null, ty = null;
  lb.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; ty = e.touches[0].clientY }, {passive:true});
  lb.addEventListener('touchend', function(e){
    if(tx === null) return;
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)){ dx < 0 ? show(idx+1) : show(idx-1) }
    else if(dy > 80 && Math.abs(dy) > Math.abs(dx)){ close() }
    tx = ty = null;
  }, {passive:true});
})();
})();
