/* SparkUp Creative: motion layer (intro, scramble, services stack, fit text, hero scroll) */
(function(){
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const CH='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/* ---------- text scramble ---------- */
function scramble(el,dur=900){
  if(RM||el.dataset.scr==='done')return;
  const nodes=[];const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
  while(w.nextNode()){const n=w.currentNode;if(n.nodeValue.trim())nodes.push([n,n.nodeValue])}
  if(!nodes.length)return;
  el.dataset.scr='done';
  const t0=performance.now();
  const step=t=>{const p=clamp((t-t0)/dur);
    nodes.forEach(([n,txt])=>{const k=Math.floor(p*txt.length);
      let o='';for(let i=0;i<txt.length;i++){const c=txt[i];o+=(i<k||c===' '||c==='\n'||/[^\w]/.test(c))?c:CH[(Math.random()*CH.length)|0]}
      n.nodeValue=o});
    if(p<1)requestAnimationFrame(step);else nodes.forEach(([n,txt])=>n.nodeValue=txt)};
  requestAnimationFrame(step);
}
window.scrambleText=scramble;

/* split helpers */
function splitLetters(el){
  const walk=n=>{[...n.childNodes].forEach(c=>{
    if(c.nodeType===3){const f=document.createDocumentFragment();
      [...c.nodeValue].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;if(ch===' ')s.innerHTML='&nbsp;';f.appendChild(s)});
      c.replaceWith(f)} else if(c.nodeType===1&&!c.classList.contains('ch'))walk(c)})};
  walk(el);return [...el.querySelectorAll('.ch')];
}
function splitWords(el){
  el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span class="wd"><span>${w}</span></span>`).join(' ');
  return [...el.querySelectorAll('.wd>span')];
}

/* ---------- fit giant words to full width ---------- */
function fitGiants(){
  document.querySelectorAll('.giant').forEach(g=>{
    const pe=g.parentElement,cs=getComputedStyle(pe);const box=pe.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
    g.style.fontSize='100px';g.style.display='inline-block';const w=g.getBoundingClientRect().width;g.style.display='';
    const fs=Math.min(100*box/w*.99,520);g.style.fontSize=fs+'px';
  });
}
document.fonts&&document.fonts.ready.then(fitGiants);fitGiants();
addEventListener('resize',fitGiants);

/* ---------- hero intro ---------- */
const hero=document.getElementById('hero');
if(hero){
  const mark=hero.querySelector('.i-letters');const letters=splitLetters(mark);
  letters.forEach((s,i)=>s.style.transitionDelay=(1.0+i*.035)+'s');
  const words=splitWords(hero.querySelector('.i-words'));
  words.forEach((s,i)=>s.style.transitionDelay=(1.35+i*.06)+'s');
  const btns=[...hero.querySelectorAll('.hero-btns .btn')];
  hero.classList.add('pre');if(!RM)document.body.classList.add('intro-wait');
  const go=()=>{
    document.body.classList.remove('intro-wait');
    hero.classList.add('on');
    setTimeout(()=>hero.querySelectorAll('.scr').forEach(e=>scramble(e,1100)),1500);
    setTimeout(()=>{hero.querySelector('.hero-btns').classList.add('open');btns.forEach(b=>scramble(b,700))},2050);
  };
  if(RM){hero.classList.add('on');hero.querySelector('.hero-btns').classList.add('open')}
  else{const img=hero.querySelector('.hero-bg img');
    const start=()=>requestAnimationFrame(()=>requestAnimationFrame(go));
    if(img.complete)start();else{img.addEventListener('load',start,{once:true});setTimeout(start,2500)}}

  /* hero scroll-out */
  const content=[...hero.querySelectorAll('.hero-top,.hero-mid,.hero-bot,.side-ticks')];
  const bar=hero.querySelector('.hero-btns');
  const onScroll=()=>{const y=Math.max(0,scrollY);const p=clamp(y/(hero.offsetHeight*.9));
    content.forEach(c=>{c.style.transform=`translateY(${-y}px)`});
    if(hero.classList.contains('on')&&bar.classList.contains('open')!==(p<.12)){bar.classList.toggle('open',p<.12)}
  };
  addEventListener('scroll',onScroll,{passive:true});onScroll();
}

/* ---------- scramble labels + buttons on reveal ---------- */
const sio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){scramble(e.target,800);sio.unobserve(e.target)}}),{threshold:.6});
document.querySelectorAll('.sec-head .tag, .svc-top>span:first-child, main .btn:not(.hero-btns .btn), .stack-foot>span, .bd-info .logo-line span:first-child, .phase .mono, .tl .d').forEach(el=>sio.observe(el));

/* ---------- services: stacked cards with blur-out + letter reveal ---------- */
const cards=[...document.querySelectorAll('.svc')];
if(cards.length){
  cards.forEach(c=>{
    const inner=document.createElement('div');inner.className='svc-in';
    [...c.children].filter(x=>!x.classList.contains('svc-top')).forEach(x=>inner.appendChild(x));c.appendChild(inner);
    const h=c.querySelector('h3');const ls=splitLetters(h);ls.forEach((s,i)=>s.style.transitionDelay=(i*.028)+'s');
    c.querySelectorAll('.svc-body li').forEach((li,i)=>li.style.transitionDelay=(.35+i*.08)+'s');
  });
  const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('shown');cio.unobserve(e.target)}}),{threshold:.25});
  cards.forEach(c=>cio.observe(c));
  const giant=document.querySelector('.svc-giant .giant');
  const upd=()=>{
    cards.forEach((c,i)=>{const n=cards[i+1];const inn=c.querySelector('.svc-in');
      if(!n){inn.style.filter='';inn.style.opacity='';return}
      const d=n.getBoundingClientRect().top-c.getBoundingClientRect().top;const p=clamp(1-d/c.offsetHeight);
      inn.style.filter=p>.01?`blur(${p*12}px)`:'';inn.style.opacity=1-p*.85});
    if(giant){const r=giant.getBoundingClientRect();const hdr=56;const p=clamp((hdr+40-r.top)/(r.height*1.1));
      giant.style.filter=p>.01?`blur(${p*18}px)`:'';giant.style.opacity=1-p*.9}
  };
  addEventListener('scroll',upd,{passive:true});upd();
}
})();
