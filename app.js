
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

async function loadSite(){
  const res = await fetch("data/site.json");
  if(!res.ok) throw new Error("Impossible de charger le contenu.");
  return await res.json();
}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function link(url,label,cls=""){
  if(!url) return "";
  return `<a class="${cls}" href="${esc(url)}">${esc(label)}</a>`;
}
function nav(current){
  const items=[["index.html","Home","home"],["music.html","Music","music"],["universe.html","Universe","universe"],["videos.html","Videos","videos"],["contact.html","Contact","contact"]];
  return `<nav class="nav"><a class="logo" href="index.html">VAELORIS</a><div class="navlinks">${items.map(i=>`<a class="${current===i[2]?"active":""}" href="${i[0]}">${i[1]}</a>`).join("")}</div><div class="status"><span class="dot"></span>Official</div></nav>`;
}
function footer(d){
 return `<footer><div class="footer-logo">${esc(d.site.name)}</div><div>${esc(d.site.copyright)}</div><div>${esc(d.site.tagline)}</div></footer>`;
}
function trackHtml(t){
 const audio=t.audio?`<audio controls preload="none" style="width:100%;margin-top:18px" src="${esc(t.audio)}"></audio>`:"";
 const links=[t.spotify?`<a class="platform" href="${esc(t.spotify)}">Spotify</a>`:"",t.youtube?`<a class="platform" href="${esc(t.youtube)}">YouTube</a>`:""].join("");
 return `<article class="track"><div class="tracktop"><div class="trackname">${esc(t.title)}</div><div class="statuslabel">${esc(t.status)}</div></div><div class="meta">${esc(t.meta)}</div>${audio}${links?`<div class="platforms">${links}</div>`:""}</article>`;
}
function videosHtml(items){
 return items.map(v=>`<a class="video reveal" href="${esc(v.url||"#")}"><img src="${esc(v.image)}" alt="${esc(v.title)}"><div class="overlay"><div class="num">${esc(v.number)}</div><div><div class="play">▶</div><div class="vname">${esc(v.title)}</div></div></div></a>`).join("");
}
async function render(){
 const d=await loadSite();
 document.title=`${d.site.name} — Official Website`;
 const page=document.body.dataset.page||"home";
 $(".site-nav").innerHTML=nav(page);
 if(page==="home"){
  $(".hero").style.backgroundImage=`url("${d.hero.background}")`;
  $("#hero").innerHTML=`<div class="hero-content"><div class="eyebrow">${esc(d.hero.eyebrow)}</div><h1 class="hero-title">${esc(d.hero.title)}</h1><div class="hero-bottom"><p class="hero-desc">${esc(d.hero.description)}</p><div class="buttons">${link(d.hero.primaryUrl,d.hero.primaryLabel,"btn primary")}${link(d.hero.secondaryUrl,d.hero.secondaryLabel,"btn")}</div></div></div><div class="scroll">Scroll to discover</div>`;
  $("#homeMusic").innerHTML=`<div class="eyebrow">${esc(d.music.eyebrow)}</div><h2 class="section-title">THE<br>SOUND.</h2><p class="intro">${esc(d.music.intro)}</p>`;
  $("#homeCover").innerHTML=`<div class="cover"><img src="${esc(d.music.cover)}" alt="VAELORIS artwork"><div class="cover-label">${esc(d.music.releaseCode)}</div><div class="cover-center"><span>UNKNOWN</span></div></div>`;
  $("#homeTracks").innerHTML=`<div class="tracks">${d.music.tracks.slice(0,3).map(trackHtml).join("")}</div><div class="platforms"><a class="platform" href="music.html">VIEW MUSIC →</a></div>`;
  $(".universe").style.backgroundImage=`url("${d.universe.background}")`;
  $("#homeUniverse").innerHTML=`<div class="eyebrow">${esc(d.universe.eyebrow)}</div><h2 class="section-title">${esc(d.universe.title).replace(" ","<br>")}</h2><p class="universe-text">${esc(d.universe.text)}</p><div class="signal"><i></i>${esc(d.universe.signal)}</div>`;
  $("#homeVideos").innerHTML=`<div class="eyebrow">${esc(d.videos.eyebrow)}</div><h2 class="section-title">${esc(d.videos.title)}</h2>`;
  $("#homeVideoGrid").innerHTML=videosHtml(d.videos.items);
  $("#manifesto").innerHTML=`<div class="manifesto-text"><span class="dim">${esc(d.manifesto.line1)}</span><br>${esc(d.manifesto.line2)}<br>${esc(d.manifesto.line3)}<br><span class="dim">${esc(d.manifesto.line4)}</span><br>${esc(d.manifesto.line5)}</div>`;
 } else if(page==="music"){
  $("#pageHero").innerHTML=`<div class="eyebrow">${esc(d.music.eyebrow)}</div><h1 class="section-title">${esc(d.music.title)}</h1><p class="intro">${esc(d.music.intro)}</p>`;
  $("#musicPage").innerHTML=`<div class="music-grid"><div class="cover"><img src="${esc(d.music.cover)}" alt="VAELORIS artwork"><div class="cover-label">${esc(d.music.releaseCode)}</div><div class="cover-center"><span>VAELORIS</span></div></div><div><div class="tracks">${d.music.tracks.map(trackHtml).join("")}</div></div></div>`;
 } else if(page==="universe"){
  $(".pagehero").style.backgroundImage=`linear-gradient(90deg,rgba(5,5,7,.9),rgba(5,5,7,.45)),url("${d.universe.background}")`;
  $("#pageHero").innerHTML=`<div class="eyebrow">${esc(d.universe.eyebrow)}</div><h1 class="section-title">${esc(d.universe.title)}</h1>`;
  $("#universePage").innerHTML=`<p class="universe-text" style="font-size:17px;max-width:700px">${esc(d.universe.text)}</p><div class="signal"><i></i>${esc(d.universe.signal)}</div>`;
 } else if(page==="videos"){
  $("#pageHero").innerHTML=`<div class="eyebrow">${esc(d.videos.eyebrow)}</div><h1 class="section-title">${esc(d.videos.title)}</h1>`;
  $("#videosPage").innerHTML=`<div class="video-head"><p class="intro" style="margin-top:0">Visuals, music and fragments from the VAELORIS universe.</p><a class="channel" href="${esc(d.videos.youtubeChannel)}">YouTube channel →</a></div><div class="video-grid">${videosHtml(d.videos.items)}</div>`;
 } else if(page==="contact"){
  $("#pageHero").innerHTML=`<div class="eyebrow">${esc(d.contact.eyebrow)}</div><h1 class="section-title">${esc(d.contact.title)}</h1><p class="intro">${esc(d.contact.description)}</p>`;
  $("#contactPage").innerHTML=`<div class="contact-grid"><div><a class="email" href="mailto:${esc(d.contact.email)}">${esc(d.contact.email)}</a></div><div class="socials">${d.contact.socials.map(s=>`<a class="social" href="${esc(s.url)}"><span>${esc(s.name)}</span><span>↗</span></a>`).join("")}</div></div>`;
 }
 $(".site-footer").innerHTML=footer(d);
 setTimeout(()=>$$(".reveal").forEach(el=>el.classList.add("visible")),80);
}
render().catch(err=>console.error(err));
