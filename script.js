const cur = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;

document.addEventListener('mousemove',(e)=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx-6+'px';cur.style.top=my-6+'px';
});

function animRing(){
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  ring.style.left=rx-20+'px';ring.style.top=ry-20+'px';
  requestAnimationFrame(animRing);
}
animRing();

document.querySelectorAll('a,button,.skill-tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>{
    cur.style.transform='scale(2)';
    ring.style.transform='scale(1.5)';
    ring.style.borderColor='rgba(0,212,255,0.8)';
  });
  el.addEventListener('mouseleave',()=>{
    cur.style.transform='scale(1)';
    ring.style.transform='scale(1)';
    ring.style.borderColor='rgba(0,212,255,0.5)';
  });
});

particlesJS('particles-js',{
  particles:{
    number:{value:80,density:{enable:true,value_area:800}},
    color:{value:'#00d4ff'},
    shape:{type:'circle'},
    opacity:{value:0.35,random:true,anim:{enable:true,speed:1,opacity_min:0.05,sync:false}},
    size:{value:2.5,random:true},
    line_linked:{enable:true,distance:160,color:'#00d4ff',opacity:0.12,width:1},
    move:{enable:true,speed:1.4,direction:'none',random:true,straight:false,out_mode:'out',bounce:false}
  },
  interactivity:{
    detect_on:'window',
    events:{onhover:{enable:true,mode:'grab'},onclick:{enable:true,mode:'push'},resize:true},
    modes:{grab:{distance:200,line_linked:{opacity:0.5}},push:{particles_nb:4}}
  },
  retina_detect:true
});

gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({delay:0.3});
tl.to('#hl',{opacity:1,y:0,duration:0.8,ease:'power3.out'})
  .to('#hn',{opacity:1,y:0,duration:1,ease:'power3.out'},'-=0.4')
  .to('#tw',{opacity:1,duration:0.5},'+=0.2')
  .to('#hb',{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.2')
  .to('#hs',{opacity:1,y:0,duration:0.8,ease:'power3.out'},'-=0.4');

const phrases=['Full Stack Developer','MERN Stack Specialist','AI/ML Aspiring Engineer','Problem Solver'];
let pi=0,ci=0,deleting=false;
const typed=document.getElementById('typed-text');

function typeWriter(){
  const phrase=phrases[pi];
  if(!deleting){
    typed.textContent=phrase.slice(0,ci+1);
    ci++;
    if(ci===phrase.length){
      setTimeout(()=>{deleting=true;},1800);
      setTimeout(typeWriter,80);
      return;
    }
  }else{
    typed.textContent=phrase.slice(0,ci-1);
    ci--;
    if(ci===0){deleting=false;pi=(pi+1)%phrases.length;}
  }
  setTimeout(typeWriter,deleting?40:80);
}
setTimeout(typeWriter,1500);

function animCount(el){
  const target=+el.dataset.count;
  let c=0;
  const step=Math.ceil(target/30);
  const interval=setInterval(()=>{
    c=Math.min(c+step,target);
    el.textContent=c+'+';
    if(c>=target)clearInterval(interval);
  },40);
}

const statObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.stat-num').forEach(animCount);
      statObserver.disconnect();
    }
  });
},{threshold:0.5});

const hsEl=document.getElementById('hs');
if(hsEl)statObserver.observe(hsEl);

gsap.utils.toArray('.reveal').forEach(el=>{
  gsap.fromTo(el,
    {opacity:0,y:50},
    {opacity:1,y:0,duration:0.9,ease:'power3.out',
     scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}}
  );
});

const barObserver=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-bar-fill').forEach(bar=>{
        bar.style.width=bar.dataset.width+'%';
      });
    }
  });
},{threshold:0.3});

document.querySelectorAll('.skill-category').forEach(c=>barObserver.observe(c));

window.addEventListener('scroll',()=>{
  document.getElementById('navbar').style.background=
    window.scrollY>50?'rgba(2,8,23,0.95)':'rgba(2,8,23,0.7)';
});

function handleSubmit(btn){
  btn.textContent='Sending...';
  btn.style.opacity='0.7';
  setTimeout(()=>{
    btn.textContent='Message Sent! ✓';
    btn.style.background='linear-gradient(135deg,#00ff88,#00cc66)';
    setTimeout(()=>{
      btn.textContent='Send Message →';
      btn.style.background='';
      btn.style.opacity='1';
    },3000);
  },1500);
}

let menuOpen=false;
function toggleMenu(){
  menuOpen=!menuOpen;
  const links=document.querySelector('.nav-links');
  if(menuOpen){
    links.style.cssText='display:flex;flex-direction:column;position:fixed;top:80px;left:0;right:0;background:rgba(2,8,23,0.98);padding:40px;gap:24px;z-index:999;border-bottom:1px solid rgba(0,212,255,0.15)';
  }else{
    links.style.cssText='display:none';
  }
}

document.addEventListener('mousemove',(e)=>{
  const orb=document.querySelector('.hero-orb');
  if(orb){
    const dx=(e.clientX/window.innerWidth-0.5)*18;
    const dy=(e.clientY/window.innerHeight-0.5)*18;
    orb.style.transform=`translate(${dx}px,${dy}px)`;
  }
});