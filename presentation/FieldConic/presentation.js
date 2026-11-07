// Source order. Editing these HTML files takes effect on browser refresh.
const sourceFiles = [
  '01-opening.html','02-strict-complementarity.html','03-second-order-dynamics.html',
  '04-setwise-sharpness.html','05-afterimage.html','06-closing.html',
  '09-psd-projection.html','10-final-summary.html','08-references.html'
];
let slides = [], videos = [], idleTimer;
const linkHistory = [];
const helpDialog = document.querySelector('#help-dialog');
const slideDialog = document.querySelector('#slide-dialog');

function showControls() {
  document.body.classList.remove('controls-hidden'); clearTimeout(idleTimer);
  idleTimer = setTimeout(() => document.body.classList.add('controls-hidden'),2500);
}
function updateVideoButton(v) {
  const b=v.nextElementSibling, action=v.paused?'Play':'Pause';
  b.setAttribute('aria-label',`${action} ${b.dataset.title} video`);
  b.setAttribute('aria-pressed',String(!v.paused));
  b.firstElementChild.textContent=`${v.paused?'▶':'Ⅱ'} ${action}`;
}
function resetVideos() { videos.forEach(v=>{v.pause();if(v.readyState)v.currentTime=0;updateVideoButton(v);}); }
function fitSlides() {
  // Measure every slide in its full build, keeping layout fixed across reveals.
  slides.forEach(s=>{
    const previous=s.style.cssText;
    const wasHidden=s.hasAttribute('hidden');s.removeAttribute('hidden');
    s.style.display='block';s.style.visibility='hidden';s.style.transform='none';
    const h=s.querySelector(':scope > h1');
    if(h){ h.style.fontSize='43px'; if(h.scrollWidth>h.clientWidth) h.style.fontSize=`${43*h.clientWidth/h.scrollWidth}px`; }
    const c=s.querySelector('.content'), inner=c.querySelector('.content-inner');
    inner.style.transform='none';inner.style.width='100%';
    const scale=Math.min(1,c.clientHeight/inner.scrollHeight);
    inner.style.transform=`scale(${scale})`;s.dataset.fit=scale.toFixed(4);
    s.style.cssText=previous;if(wasHidden)s.setAttribute('hidden','');
  });
  Reveal.layout();
}
function updatePosition() {
  const slide=Reveal.getCurrentSlide();if(!slide)return;
  const {h,f=-1}=Reveal.getIndices();const build=f+1,count=Number(slide.dataset.builds);
  slide.dataset.currentBuild=build;
  slide.querySelectorAll('[data-build-images]').forEach(img=>{const list=img.dataset.buildImages.split('|');img.src=list[Math.min(build,list.length-1)];});
  document.querySelector('#position').textContent=`Slide ${slide.dataset.number}`+(count>1?` · Build ${build+1}/${count}`:'');
  document.querySelector('#previous').disabled=h===0&&build===0;
  document.querySelector('#next').disabled=h===slides.length-1&&build===count-1;
  showControls();
}
function goToSlide(h,build=0) {
  Reveal.slide(Number(h),0,Number(build)-1);if(Reveal.isOverview())Reveal.toggleOverview(false);
  document.activeElement?.blur();updatePosition();
}
async function fullscreen(){if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}
function filterSlides(){const q=document.querySelector('#slide-search').value.toLocaleLowerCase().trim();document.querySelectorAll('.slide-choice').forEach(b=>b.hidden=!b.textContent.toLocaleLowerCase().includes(q));}
function showPicker(){slideDialog.showModal();const input=document.querySelector('#slide-search');input.value='';filterSlides();input.focus();}

async function start() {
  if(location.protocol==='file:')throw Error('Double-click “Open in Chrome.command” to open this editable deck through its local server.');
  const html=await Promise.all(sourceFiles.map(async file=>{const r=await fetch(`slides/${file}`,{cache:'no-store'});if(!r.ok)throw Error(`Cannot load ${file}`);return r.text();}));
  document.querySelector('.slides').innerHTML=html.join('\n');
  document.querySelectorAll('[data-component]').forEach(node=>{
    const template=document.getElementById(node.dataset.component);if(!template)throw Error(`Missing component ${node.dataset.component}`);
    node.replaceChildren(template.content.cloneNode(true));
  });
  document.querySelectorAll('template').forEach(t=>t.remove());
  slides=[...document.querySelectorAll('.slides>section')];
  slides.forEach((s,h)=>{
    s.id=`slide-${s.dataset.number}`;
    let max=0;
    s.querySelectorAll('[data-build]').forEach(el=>{const b=Number(el.dataset.build);max=Math.max(max,b);el.classList.add('fragment');el.dataset.fragmentIndex=b-1;});
    s.dataset.builds=max+1;
    const c=s.querySelector('.content'),inner=document.createElement('div');inner.className='content-inner';inner.append(...c.childNodes);c.append(inner);
    const footer=document.createElement('div');footer.className='footer';footer.textContent=s.dataset.number;s.append(footer);
    const note=document.createElement('aside');note.className='notes';note.textContent=s.dataset.title;s.append(note);
    const b=document.createElement('button');b.className='slide-choice';b.dataset.slide=h;
    const n=document.createElement('span');n.textContent=s.dataset.number;b.append(n,document.createTextNode(s.dataset.title));
    b.onclick=()=>{slideDialog.close();goToSlide(h);};document.querySelector('#slide-choices').append(b);
  });
  document.querySelectorAll('[data-cite]').forEach(a=>{a.href=`#ref-${a.dataset.cite}`;a.textContent=`[${a.dataset.cite}${a.dataset.detail?', '+a.dataset.detail:''}]`;});
  document.querySelectorAll('.slides a[href^="#"]').forEach(a=>a.onclick=e=>{
    const target=document.getElementById(a.getAttribute('href').slice(1));if(!target)return;
    e.preventDefault();const current=Reveal.getIndices();linkHistory.push({h:current.h,build:(current.f??-1)+1});
    const s=target.closest('section');goToSlide(slides.indexOf(s),0);
  });
  document.querySelectorAll('.slides a[href^="http"]').forEach(a=>{a.target='_blank';a.rel='noopener noreferrer';});
  document.querySelectorAll('.movie').forEach((slot,i)=>{
    const stem=slot.dataset.video,title=stem.replaceAll('-',' '),v=document.createElement('video');
    v.src=`assets/${stem}.mp4`;v.poster=`assets/${stem}-poster.${slot.dataset.poster||'png'}`;v.loop=true;v.playsInline=true;v.preload='none';v.id=`video-${i+1}`;
    v.defaultPlaybackRate=v.playbackRate=Number(slot.dataset.playbackRate||1);
    v.setAttribute('aria-label',title+' animation');
    const b=document.createElement('button');b.className='video-toggle';b.dataset.title=title;b.innerHTML='<span class="video-hint" aria-hidden="true">▶ Play</span>';
    slot.append(v,b);updateVideoButton(v);
    b.onclick=async e=>{e.stopPropagation();try{if(v.paused)await v.play();else v.pause();}catch(error){const n=document.querySelector('#media-error');n.textContent='Could not play video. Keep the assets folder with this deck.';n.hidden=false;console.error(error);}};
    b.onkeydown=e=>{if(e.key===' '||e.key==='Enter')e.stopPropagation();};
    v.onplay=v.onpause=()=>updateVideoButton(v);
  });
  videos=[...document.querySelectorAll('video')];
  await MathJax.startup.promise;
  await MathJax.typesetPromise([document.querySelector('.slides')]);
  await document.fonts.ready;
  await Promise.all([...document.images].map(img=>img.decode().catch(()=>{})));
  await Reveal.initialize({width:1600,height:900,margin:.04,minScale:.1,maxScale:3,center:false,
    controls:false,progress:false,slideNumber:false,hash:true,fragmentInURL:true,transition:'none',backgroundTransition:'none',
    autoPlayMedia:false,autoSlide:0,loop:false,help:false,plugins:[RevealNotes],
    keyboardCondition:()=>!helpDialog.open&&!slideDialog.open,
    keyboard:{70:fullscreen,71:showPicker,191:()=>helpDialog.showModal()}});
  fitSlides();updatePosition();document.querySelector('#loading').hidden=true;
  window.deckReady=true;
  Reveal.on('slidechanged',()=>{resetVideos();updatePosition();});
  Reveal.on('fragmentshown',updatePosition);Reveal.on('fragmenthidden',updatePosition);Reveal.on('overviewshown',resetVideos);
}
document.querySelector('#previous').onclick=()=>Reveal.prev();document.querySelector('#next').onclick=()=>Reveal.next();
document.querySelector('#slides').onclick=showPicker;document.querySelector('#fullscreen').onclick=fullscreen;
document.querySelector('#notes').onclick=()=>Reveal.getPlugin('notes').open();
document.querySelector('#help').onclick=()=>helpDialog.showModal();document.querySelector('#close-help').onclick=()=>helpDialog.close();
document.querySelector('#close-slides').onclick=()=>slideDialog.close();document.querySelector('#slide-search').oninput=filterSlides;
window.addEventListener('keydown',e=>{if(e.altKey&&e.key==='ArrowLeft'&&linkHistory.length){e.preventDefault();e.stopImmediatePropagation();const p=linkHistory.pop();goToSlide(p.h,p.build);}},true);
window.addEventListener('pointermove',showControls);window.addEventListener('keydown',showControls);
window.addEventListener('DOMContentLoaded',()=>start().catch(error=>{document.querySelector('#loading').textContent=error.message;console.error(error);}));
