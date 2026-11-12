/* SparkUp Creative — shared UI */
(function(){
const page=document.body.dataset.page||'';
const arrow='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M2 8h11M9 4l4 4-4 4"/></svg>';
window.ARROW=arrow;
const links=[['brands','Brands',true],['academy','Academy',false],['studio','Studio',false],['free','Free',true]];

/* header */
const hdr=document.createElement('header');hdr.className='hdr';
hdr.innerHTML=`<a class="logo" href="/" aria-label="SparkUp Creative home"><img src="/img/prism.png" alt="">sparkup</a>
<nav class="nav">${links.map(([h,t,d])=>`<a href="${h==='free'?'/#free':'/'+h}" class="${page===h?'on':''}">${t}${d?'<sup></sup>':''}</a>`).join('')}</nav>
<a class="hdr-cta" href="/contact">Contact</a>
<button class="burger" aria-label="Menu"><span></span><span></span></button>`;
document.body.prepend(hdr);
const menu=document.createElement('div');menu.className='menu';
menu.innerHTML=[['/','Home'],['/brands','Brands'],['/academy','Academy'],['/studio','Studio'],['/#free','Free'],['/contact','Contact']].map(([h,t],i)=>`<a class="big" href="${h}">${t}<span>0${i+1}</span></a>`).join('')+`<p class="mono">SparkUp Creative LLC · Sheridan, WY · Kanpur, IN</p>`;
document.body.prepend(menu);
hdr.querySelector('.burger').onclick=()=>menu.classList.toggle('open');
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));

/* footer */
const f=document.querySelector('footer.ftr');
if(f){f.innerHTML=`
<div class="ftr-top">
  <div><h3>Keep you in<br>the loop.<span class="burst"></span></h3>
    <p class="lead" style="margin-top:12px">New books, new programs and new tools from all our brands. One short email when something ships.</p>
    <form class="nl"><input type="email" required placeholder="Enter your email" aria-label="Email"><button class="btn btn-lime" type="submit">Join our newsletter ${arrow}</button>
    <p class="note">No spam, only real updates. You can leave any time.</p></form></div>
  <div class="fcol"><p class="mono h">Navigate</p><a href="/">Home</a><a href="/brands">Brands</a><a href="/academy">Academy</a><a href="/studio">Studio</a><a href="/contact">Contact</a></div>
  <div class="fcol"><p class="mono h">Our brands</p><a href="https://www.legacyegerie.com" target="_blank" rel="noopener">Legacy Égérie</a><a href="https://www.wrenglow.com" target="_blank" rel="noopener">Wrenglow</a><a href="https://mybook.to/LittleLightsSeries" target="_blank" rel="noopener">Little Lights</a><a href="https://www.wrenglow.com/glim" target="_blank" rel="noopener">Glim's Little Whys</a><a href="https://www.areebacreates.com" target="_blank" rel="noopener">CreatorOS</a><a href="https://www.yasershamim.com" target="_blank" rel="noopener">Creator Academy</a></div>
  <div class="socials"><span>Follow us on socials</span><div><a href="https://www.youtube.com/@yasershamim" target="_blank" rel="noopener">YT</a><a href="https://www.facebook.com/sparkupcreative" target="_blank" rel="noopener">FB</a><a href="https://wa.me/919369671970" target="_blank" rel="noopener">WA</a></div></div>
</div>
<div class="ftr-bot">
  <div><p style="font-size:17px;letter-spacing:-.02em">AI systems, brands and books<br>that teach, build and sell.</p>
    <div class="ftr-mark"><b>SparkUp</b>\\Creative</div>
    <small>An AI training, content and publishing company. Registered in Wyoming, USA. Built in Kanpur, India.<br>© ${new Date().getFullYear()} SparkUp Creative LLC. All rights reserved.</small></div>
  <div class="fcol"><p class="mono h">Offline</p><p style="font-size:14px">SparkUp Creative LLC<br>30 N Gould St, Ste R<br>Sheridan, WY 82801, USA</p>
    <p class="mono h" style="margin-top:40px">Phone · WhatsApp</p><a class="phone" style="text-transform:none;font-family:var(--sans);letter-spacing:-.04em" href="https://wa.me/919369671970">+91 93696 71970</a></div>
  <div class="fcol"><p class="mono h">Online</p><a style="text-transform:none;font-family:var(--sans);font-size:15px;color:var(--lime-ink)" href="mailto:info@sparkupcreative.com">info@sparkupcreative.com</a>
    <a href="#" class="up" aria-label="Back to top" onclick="window.scrollTo({top:0});return false"><svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 36V5M8 17L20 5l12 12"/></svg></a></div>
</div>`;
f.querySelector('.nl').onsubmit=e=>{e.preventDefault();const v=e.target.querySelector('input').value;location.href=`mailto:info@sparkupcreative.com?subject=${encodeURIComponent('Newsletter signup')}&body=${encodeURIComponent('Please add me to the SparkUp Creative newsletter: '+v)}`;};
}

/* brand art */
const books=[1,2,3,4,5,6].map(i=>`<img src="/little-lights/img/book${i}.jpg" alt="Little Lights book ${i} cover" loading="lazy">`).join('');
const ART={
legacy:()=>`<div class="art art-legacy"><img class="lmark" src="/img/brands/legacy-mark-gold.png" alt=""><div class="fan">${[1,2,3].map(i=>`<img src="/img/brands/legacy-vol${i}.jpg" alt="The Quiet Authority Collection, volume ${i}" loading="lazy">`).join('')}</div></div>`,
wren:()=>`<div class="art art-wren"><div class="shelf">${[['color','Color &amp; Create'],['hook','Hook &amp; Loop'],['paper','Paper Days']].map(([k,t])=>`<figure><img src="/img/brands/wren-${k}.jpg" alt="Wrenglow ${t} shelf" loading="lazy"><figcaption>${t}</figcaption></figure>`).join('')}</div><img class="wlogo" src="/img/brands/wren-logo.png" alt="Wrenglow logo"></div>`,
lights:()=>`<div class="art art-lights"><div class="books">${books}</div></div>`,
glim:()=>`<div class="art art-glim"><div class="stars">${[[12,18],[30,70],[48,12],[62,80],[88,22],[78,60],[22,44],[94,84]].map(([x,y],i)=>`<i style="left:${x}%;top:${y}%;animation-delay:${i*.4}s"></i>`).join('')}</div><div class="gbooks"><img src="/img/brands/glim-book1.jpg" alt="100,000 Whys for Toddlers with Glim the Firefly" loading="lazy"><img src="/img/brands/glim-book2.jpg" alt="But Why, Glim? Poop, Potty and My Busy Body" loading="lazy"></div><img class="fly" src="/img/brands/glim.png" alt="Glim the Firefly" loading="lazy"></div>`,
os:()=>`<div class="art art-os"><img class="poster" src="/img/brands/creatoros-ecosystem.jpg" alt="The CreatorOS ecosystem" loading="lazy"><div class="term"><div class="dots"><i></i><i></i><i></i></div>
<div>&gt; prompt vault <span>.......</span> loaded</div><div>&gt; script system <span>......</span> ready</div><div>&gt; thumbnail flow <span>.....</span> ready</div><div>&gt; publish pipeline <span>...</span> live</div><div>&gt; creator mode <span>.......</span> ON<b class="cur">▍</b></div></div></div>`,
academy:()=>`<div class="art art-academy"><img src="/assets/showreel-3.png" alt="Students at work in the SparkUp Creative academy lab" loading="lazy"></div>`
};
document.querySelectorAll('[data-art]').forEach(el=>{el.insertAdjacentHTML('afterbegin',ART[el.dataset.art]())});

/* reveal */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.rv').forEach(el=>io.observe(el));

/* counters */
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,end=+el.dataset.count,suf=el.dataset.suf||'';const t0=performance.now();
  const step=t=>{const p=Math.min(1,(t-t0)/1600),v=Math.round(end*(1-Math.pow(1-p,3)));el.textContent=v+suf;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.4});
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));

/* accordions */
document.querySelectorAll('.plan-h').forEach(b=>b.onclick=()=>{const p=b.parentElement;const was=p.classList.contains('open');p.parentElement.querySelectorAll('.plan').forEach(x=>x.classList.remove('open'));if(!was)p.classList.add('open')});
document.querySelectorAll('.q button').forEach(b=>b.onclick=()=>b.parentElement.classList.toggle('open'));

/* clock */
const ck=document.getElementById('clock');
if(ck){const tick=()=>{const d=new Date();const f=(tz)=>d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:tz});ck.innerHTML=`Our time ${f('Asia/Kolkata')}<br>UTC+5:30 Kanpur, India`};tick();setInterval(tick,1000)}

/* ticker */
const tk=document.querySelector('.hero-ticker div');
if(tk){let i=0;const n=tk.children.length;setInterval(()=>{i=(i+1)%n;tk.style.transform=`translateY(${-22*i}px)`},2200)}

/* lightbox */
const lb=document.querySelector('.lb');
if(lb){const v=lb.querySelector('video');document.querySelectorAll('[data-reel]').forEach(b=>b.addEventListener('click',()=>{lb.classList.add('open');v.currentTime=0;v.play()}));
  const close=()=>{lb.classList.remove('open');v.pause()};lb.querySelector('button').onclick=close;lb.onclick=e=>{if(e.target===lb)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()})}

/* reveal-text (studio) */
document.querySelectorAll('.reveal-text').forEach(el=>{
  el.innerHTML=el.textContent.trim().split(/\s+/).map(w=>`<span>${w}</span>`).join(' ');
  const sp=[...el.children];
  const upd=()=>{const r=el.getBoundingClientRect();const p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));const k=Math.floor(p*sp.length*1.15);sp.forEach((s,i)=>s.classList.toggle('on',i<k))};
  addEventListener('scroll',upd,{passive:true});upd();
});

/* manifesto scroll */
const mf=document.querySelector('.manifesto');
if(mf){
  const lines=[...mf.querySelectorAll('.mf-line,.mf-big')];
  const cv=mf.querySelector('canvas'),cx=cv.getContext('2d');
  let W,H,dpr=Math.min(2,devicePixelRatio||1);
  const P=[...Array(70)].map(()=>({x:Math.random(),y:Math.random(),r:2+Math.random()*9,v:.2+Math.random(),ph:Math.random()*6.28}));
  const size=()=>{W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr};size();addEventListener('resize',size);
  let prog=0;
  const upd=()=>{const r=mf.getBoundingClientRect();prog=Math.min(1,Math.max(0,-r.top/(r.height-innerHeight)));
    lines.forEach((l,i)=>{const a=i*.2,b=a+.2;const p=Math.min(1,Math.max(0,(prog-a+.06)/(b-a)));
      const isBig=l.classList.contains('mf-big');
      const s=isBig?1+ (1-p)*1.6:1+(1-p)*2.2;
      l.style.opacity=p;l.style.transform=`translateY(${(1-p)*60}px) scale(${s})`;l.style.filter=`blur(${(1-p)*10}px)`;})};
  addEventListener('scroll',upd,{passive:true});upd();
  const draw=t=>{cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,W,H);
    for(const p of P){const y=((p.y-t*.00002*p.v-prog*.4*p.v)%1+1)%1;const x=p.x*W+Math.sin(t*.0006+p.ph)*14;
      cx.beginPath();cx.arc(x,y*H,p.r,0,6.283);
      cx.strokeStyle='rgba(10,11,8,.35)';cx.lineWidth=1.2;cx.stroke();
      cx.beginPath();cx.arc(x-p.r*.35,y*H-p.r*.35,p.r*.28,0,6.283);cx.fillStyle='rgba(200,255,0,.9)';cx.fill();}
    requestAnimationFrame(draw)};
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)requestAnimationFrame(draw);
}
})();
