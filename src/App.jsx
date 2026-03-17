import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════ DATA ═══════════════ */
const NAV_LINKS = ["About","Skills","Experience","Projects","Achievements","Contact"];
const ACC = "#FFE600";

const SKILLS = [
  { cat:"Frontend",       items:["Angular (v12+)","TypeScript","JavaScript ES6+","HTML5","CSS3","Bootstrap","AngularJS"] },
  { cat:"Backend",        items:["Java","Spring Boot","Spring MVC","Spring Security","RESTful APIs","Microservices","SOAP"] },
  { cat:"Database",       items:["MySQL","PostgreSQL","PL/SQL (Oracle)","MongoDB","Spring Data JPA","Hibernate"] },
  { cat:"DevOps & Tools", items:["Docker","Kubernetes","Git/GitHub","Maven","Postman","Swagger/OpenAPI","JIRA"] },
  { cat:"Payments",       items:["CyberSource","N-Genius","e-Wallet Integration","Installment Flows"] },
];

const EXPERIENCES = [
  { company:"Ernst & Young (EY)", role:"Senior Software Engineer", period:"Feb 2026 – Present", location:"Coimbatore, India", color:ACC,
    desc:"Contributing to high-impact enterprise solutions at one of the world's leading professional services firms.",
    tags:["Enterprise Solutions","Consulting","Full Stack"] },
  { company:"KGISL Technologies", role:"Junior Associate – Full Stack Developer", period:"Dec 2022 – Jan 2026", location:"Coimbatore, India", color:"#00C9A7",
    desc:"Built and delivered large-scale insurance platforms for Dubai-based clients, from policy issuance to claims and compliance.",
    tags:["Spring Boot","Angular","Oracle","Microservices","Docker"] },
];

const PROJECTS = [
  { name:"Free Zone Portal", client:"Dubai Insurance", period:"Dec 2024 – Jan 2026", icon:"🏛️",
    genre:"REGULATORY EPIC", rating:"⭐⭐⭐⭐⭐",
    tech:["Spring Boot","Angular","Microservices","Oracle","Event-Driven Arch."],
    highlights:["Policy issuance & claims modules compliant with Freezone regulations","Tax-invoice generation with automated dispatch from DIN to Freezone entities","RBAC for secure data handling","Optimized REST APIs for mobile & web"] },
  { name:"Worker Health Insurance (WHI)", client:"Dubai Insurance", period:"Dec 2024 – Jan 2026", icon:"🏥",
    genre:"AGAINST THE CLOCK", rating:"⭐⭐⭐⭐⭐",
    tech:["Angular","Java","Spring Boot","Oracle","SOAP","CyberSource","N-Genius"],
    highlights:["Delivered entire platform in 30 days under strict government deadlines","Real-time MOHRE data sync for regulatory compliance","Installment-based payment flows & COI generation","Dashboard-driven admin panel with finance & audit"] },
  { name:"Worker Protection Program (WPP)", client:"Dubai Insurance", period:"Jan 2023 – Dec 2024", icon:"🛡️",
    genre:"THE ORIGIN STORY", rating:"⭐⭐⭐⭐",
    tech:["Angular","Java","Spring Boot","Oracle","CyberSource","N-Genius"],
    highlights:["Reduced premium collection processing time by ~30%","Secure payment gateway integrations (CyberSource, N-Genius)","Automated endorsements, claims workflows & invoice generation","e-Wallet payment system for seamless premium collection"] },
];

const ACHIEVEMENTS = [
  { icon:"⚡", title:"30-Day WHI Delivery",  desc:"Delivered the entire Workers Health Insurance platform in 30 days, meeting strict government go-live deadlines." },
  { icon:"📉", title:"30% Faster Claims",     desc:"Designed a Group Claims Processing workflow that reduced settlement time by 30% — adopted by the client." },
  { icon:"🚀", title:"Bulk Policy Issuance",  desc:"Introduced bulk policy issuance functionality, dramatically improving operational throughput." },
  { icon:"💳", title:"e-Wallet Innovation",   desc:"Integrated an innovative e-wallet system in WPP enabling seamless automatic premium collection." },
];

const MOVIE_QUOTES = [
  { quote:"With great power comes great responsibility.", film:"Spider-Man" },
  { quote:"Why so serious?", film:"The Dark Knight" },
  { quote:"I am inevitable.", film:"Avengers: Endgame" },
  { quote:"To infinity and beyond!", film:"Toy Story" },
  { quote:"It's not who I am underneath, but what I do that defines me.", film:"Batman Begins" },
];

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|{}[]";
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const CMD_ITEMS = [
  { label:"Go to About",        icon:"👤", action:"scroll", id:"about" },
  { label:"Go to Skills",       icon:"⚡", action:"scroll", id:"skills" },
  { label:"Go to Experience",   icon:"💼", action:"scroll", id:"experience" },
  { label:"Go to Projects",     icon:"🎬", action:"scroll", id:"projects" },
  { label:"Go to Achievements", icon:"🏆", action:"scroll", id:"achievements" },
  { label:"Go to Contact",      icon:"✉️",  action:"scroll", id:"contact" },
  { label:"Download Resume",    icon:"📄", action:"download" },
  { label:"Toggle Matrix Rain", icon:"💊", action:"matrix" },
  { label:"Email Dhinesh",      icon:"📧", action:"email" },
  { label:"Open LinkedIn",      icon:"🔗", action:"linkedin" },
  { label:"Open GitHub",        icon:"🐙", action:"github" },
];

/* ═══════════════ HOOKS ═══════════════ */
function useInView(t=0.1){
  const r=useRef(null); const [v,setV]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:t});
    if(r.current)o.observe(r.current); return()=>o.disconnect();
  },[]);
  return[r,v];
}
function useIsMobile(){
  const[m,setM]=useState(()=>typeof window!=="undefined"&&window.innerWidth<768);
  useEffect(()=>{const f=()=>setM(window.innerWidth<768);window.addEventListener("resize",f);return()=>window.removeEventListener("resize",f);},[]);
  return m;
}
function useScrollProgress(){
  const[p,setP]=useState(0);
  useEffect(()=>{
    const f=()=>{
      const el=document.documentElement;
      setP((el.scrollTop||document.body.scrollTop)/(el.scrollHeight-el.clientHeight)*100||0);
    };
    window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);
  },[]);
  return p;
}

/* ═══════════════ UTILITIES ═══════════════ */
function triggerDownload(){
  const t=`DHINESH V — Full Stack Software Engineer\njavadevdhinesh@gmail.com | 8754447528 | Coimbatore, India\nLinkedIn: linkedin.com/in/dhineshse | GitHub: github.com/Dhinesh-Se\n\nEXPERIENCE\nErnst & Young (EY) — Software Engineer | Feb 2026–Present\nKGiSL Technologies — Junior Associate | Dec 2022–Jan 2026\n\nSKILLS\nFrontend: Angular, TypeScript, JavaScript, HTML5, CSS3\nBackend: Java, Spring Boot, RESTful APIs, Microservices\nDatabase: MySQL, Oracle, MongoDB, PostgreSQL\nDevOps: Docker, Kubernetes, Git, Maven\nPayments: CyberSource, N-Genius, e-Wallet\n\nEDUCATION\nB.Tech – Information Technology (2018–2022)\nCoimbatore Institute of Engineering and Technology`;
  const b=new Blob([t],{type:"text/plain"});const u=URL.createObjectURL(b);
  const a=document.createElement("a");a.href=u;a.download="Dhinesh_V_Resume.txt";a.click();URL.revokeObjectURL(u);
}

/* ═══════════════ CONFETTI ═══════════════ */
function fireConfetti(canvasRef){
  const canvas=canvasRef.current; if(!canvas) return;
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const particles=Array.from({length:120},()=>({
    x:Math.random()*canvas.width, y:canvas.height*Math.random()*-.5-10,
    vx:(Math.random()-0.5)*6, vy:Math.random()*4+2,
    color:[ACC,"#00C9A7","#fff","#ff6b6b","#4ecdc4"][Math.floor(Math.random()*5)],
    size:Math.random()*8+4, spin:Math.random()*0.2-0.1, angle:Math.random()*Math.PI*2,
    life:1,
  }));
  let raf;
  const draw=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let alive=false;
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.angle+=p.spin; p.life-=0.012;
      if(p.life>0){ alive=true; ctx.save(); ctx.globalAlpha=p.life;
        ctx.translate(p.x,p.y); ctx.rotate(p.angle);
        ctx.fillStyle=p.color; ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size); ctx.restore(); }
    });
    if(alive) raf=requestAnimationFrame(draw);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  };
  draw();
  return()=>cancelAnimationFrame(raf);
}

/* ═══════════════ CINEMATIC INTRO ═══════════════ */
function CinematicIntro({onDone}){
  const[phase,setPhase]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setPhase(1),400);
    const t2=setTimeout(()=>setPhase(2),1800);
    const t3=setTimeout(()=>setPhase(3),3400);
    const t4=setTimeout(()=>onDone(),4200);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
  },[]);
  return(
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:phase===3?0:1,transition:"opacity .8s ease",pointerEvents:phase===3?"none":"all"}}>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.012) 2px,rgba(255,255,255,.012) 4px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:0,left:0,right:0,height:"12%",background:"#000",zIndex:2}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"12%",background:"#000",zIndex:2}}/>
      <div style={{textAlign:"center",zIndex:3}}>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:"clamp(10px,2vw,13px)",letterSpacing:".5em",color:"rgba(255,230,0,.7)",textTransform:"uppercase",marginBottom:24,opacity:phase>=1?1:0,transition:"opacity .8s ease"}}>A DHINESH V PRODUCTION</p>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(48px,10vw,100px)",color:"#fff",letterSpacing:"-.02em",lineHeight:.88,opacity:phase>=2?1:0,transform:phase>=2?"scale(1)":"scale(1.1)",transition:"opacity .9s ease,transform .9s ease",textShadow:"0 0 80px rgba(255,230,0,.45)"}}>
          DHINESH<br/><span style={{color:ACC}}>V.</span>
        </h1>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:"clamp(9px,1.5vw,11px)",letterSpacing:".3em",color:"rgba(255,255,255,.35)",textTransform:"uppercase",marginTop:20,opacity:phase>=2?1:0,transition:"opacity 1s ease .3s"}}>FULL STACK SOFTWARE ENGINEER</p>
      </div>
    </div>
  );
}

/* ═══════════════ MATRIX RAIN ═══════════════ */
function MatrixRain({active}){
  const ref=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    if(!active)return;
    const c=ref.current; if(!c)return; const ctx=c.getContext("2d");
    let W=c.width=window.innerWidth,H=c.height=window.innerHeight;
    const fs=14,cols=Math.floor(W/fs),drops=Array(cols).fill(1);
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    const draw=()=>{
      ctx.fillStyle="rgba(0,0,0,.04)"; ctx.fillRect(0,0,W,H);
      drops.forEach((y,i)=>{
        const ch=CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)];
        ctx.fillStyle=Math.random()>.97?"#ffffff":"rgba(255,230,0,.45)";
        ctx.font=`${fs}px monospace`; ctx.fillText(ch,i*fs,y*fs);
        if(y*fs>H&&Math.random()>.975)drops[i]=0; drops[i]++;
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf.current);window.removeEventListener("resize",resize);};
  },[active]);
  return<canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:.2}}/>;
}

/* ═══════════════ PARTICLES ═══════════════ */
function ParticleBg(){
  const ref=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c)return; const ctx=c.getContext("2d");
    let W,H;
    const resize=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;};
    resize();
    const pts=Array.from({length:55},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,r:Math.random()*1.5+.5}));
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle="rgba(255,230,0,.45)";ctx.fill();
      });
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(255,230,0,${(1-d/120)*.1})`;ctx.lineWidth=1;ctx.stroke();}
      }
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    const ro=new ResizeObserver(resize);ro.observe(c);
    return()=>{cancelAnimationFrame(raf.current);ro.disconnect();};
  },[]);
  return<canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

/* ═══════════════ TYPEWRITER ═══════════════ */
function Typewriter({text,speed=40,delay=0,style={}}){
  const[s,setS]=useState(""); const[go,setGo]=useState(false);
  const[r,v]=useInView(.2);
  useEffect(()=>{if(v&&!go)setTimeout(()=>setGo(true),delay*1000);},[v]);
  useEffect(()=>{
    if(!go)return; let i=0;
    const t=setInterval(()=>{setS(text.slice(0,++i));if(i>=text.length)clearInterval(t);},speed);
    return()=>clearInterval(t);
  },[go,text,speed]);
  return<span ref={r} style={style}>{s}<span style={{animation:"blink .7s infinite",opacity:s.length<text.length?1:0}}>▌</span></span>;
}

/* ═══════════════ FADEIN ═══════════════ */
function FadeIn({children,delay=0,from="bottom"}){
  const[r,v]=useInView();
  const tr={bottom:"translateY(26px)",left:"translateX(-26px)",right:"translateX(26px)",scale:"scale(.95)"};
  return<div ref={r} style={{opacity:v?1:0,transform:v?"none":tr[from]||tr.bottom,transition:`opacity .65s ease ${delay}s,transform .65s ease ${delay}s`}}>{children}</div>;
}

/* ═══════════════ CUSTOM CURSOR ═══════════════ */
function CustomCursor(){
  const dr=useRef(null),rr=useRef(null),m=useRef({x:-200,y:-200}),rp=useRef({x:-200,y:-200}),raf=useRef(null);
  const[hov,setHov]=useState(false),[clk,setClk]=useState(false);
  useEffect(()=>{
    const mv=e=>{m.current={x:e.clientX,y:e.clientY}};
    const dw=()=>setClk(true),up=()=>setClk(false);
    const hv=e=>setHov(!!e.target.closest("a,button,[data-hover]"));
    window.addEventListener("mousemove",mv);window.addEventListener("mousemove",hv);
    window.addEventListener("mousedown",dw);window.addEventListener("mouseup",up);
    const tick=()=>{
      rp.current.x+=(m.current.x-rp.current.x)*.11; rp.current.y+=(m.current.y-rp.current.y)*.11;
      if(dr.current){dr.current.style.left=`${m.current.x}px`;dr.current.style.top=`${m.current.y}px`;}
      if(rr.current){rr.current.style.left=`${rp.current.x}px`;rr.current.style.top=`${rp.current.y}px`;}
      raf.current=requestAnimationFrame(tick);
    };
    raf.current=requestAnimationFrame(tick);
    return()=>{window.removeEventListener("mousemove",mv);window.removeEventListener("mousemove",hv);window.removeEventListener("mousedown",dw);window.removeEventListener("mouseup",up);cancelAnimationFrame(raf.current);};
  },[]);
  return(<>
    <div ref={dr} style={{position:"fixed",pointerEvents:"none",zIndex:99999,width:clk?5:9,height:clk?5:9,borderRadius:"50%",background:ACC,transform:"translate(-50%,-50%)",transition:"width .15s,height .15s",mixBlendMode:"difference",top:0,left:0}}/>
    <div ref={rr} style={{position:"fixed",pointerEvents:"none",zIndex:99998,width:hov?52:36,height:hov?52:36,borderRadius:"50%",border:`1.5px solid ${hov?ACC:"rgba(255,230,0,.5)"}`,transform:"translate(-50%,-50%)",transition:"width .3s cubic-bezier(.34,1.56,.64,1),height .3s,border-color .2s",top:0,left:0}}/>
  </>);
}

/* ═══════════════ GLITCH TEXT ═══════════════ */
function GlitchText({text,style={}}){
  const[g,setG]=useState(false);
  useEffect(()=>{const i=setInterval(()=>{setG(true);setTimeout(()=>setG(false),160);},3000+Math.random()*2000);return()=>clearInterval(i);},[]);
  return(
    <span style={{position:"relative",display:"inline-block",...style}}>
      {text}
      {g&&<><span style={{position:"absolute",top:0,left:0,color:"#ff004d",clipPath:"inset(15% 0 65% 0)",transform:"translate(-2px)",opacity:.85,pointerEvents:"none"}}>{text}</span><span style={{position:"absolute",top:0,left:0,color:"#00ffff",clipPath:"inset(55% 0 15% 0)",transform:"translate(2px)",opacity:.85,pointerEvents:"none"}}>{text}</span></>}
    </span>
  );
}

/* ═══════════════ MOVIE TICKER ═══════════════ */
function MovieTicker(){
  const[i,setI]=useState(0),[vis,setVis]=useState(true);
  useEffect(()=>{const t=setInterval(()=>{setVis(false);setTimeout(()=>{setI(x=>(x+1)%MOVIE_QUOTES.length);setVis(true);},450);},4000);return()=>clearInterval(t);},[]);
  const q=MOVIE_QUOTES[i];
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,overflow:"hidden",maxWidth:360}}>
      <span style={{fontSize:13,flexShrink:0}}>🎬</span>
      <div style={{opacity:vis?1:0,transition:"opacity .4s",fontSize:11,color:"rgba(255,255,255,.4)",fontStyle:"italic",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
        "{q.quote}" — <span style={{color:"rgba(255,230,0,.6)"}}>{q.film}</span>
      </div>
    </div>
  );
}

/* ═══════════════ TERMINAL CARD ═══════════════ */
function TerminalCard({lines=[],style={}}){
  const[n,setN]=useState(0);
  const[r,v]=useInView(.15);
  useEffect(()=>{
    if(!v)return; let i=0;
    const t=setInterval(()=>{setN(++i);if(i>=lines.length)clearInterval(t);},110);
    return()=>clearInterval(t);
  },[v,lines.length]);
  return(
    <div ref={r} style={{background:"#0A0A0F",border:"1px solid rgba(255,230,0,.2)",borderRadius:6,overflow:"hidden",...style}}>
      <div style={{background:"rgba(255,255,255,.04)",padding:"8px 14px",display:"flex",alignItems:"center",gap:8,borderBottom:"1px solid rgba(255,255,255,.06)"}}>
        {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{width:11,height:11,borderRadius:"50%",background:c}}/>)}
        <span style={{fontSize:10,color:"rgba(255,255,255,.3)",marginLeft:4,fontFamily:"monospace"}}>~/dhinesh-portfolio</span>
      </div>
      <div style={{padding:"14px 18px",fontFamily:"'DM Mono',monospace",fontSize:12,lineHeight:1.9}}>
        {lines.slice(0,n).map((l,i)=>(
          <div key={i} style={{color:l.startsWith("$")?ACC:l.startsWith("//")||l.startsWith("#")?"rgba(255,255,255,.28)":l.startsWith(">")?"#00C9A7":"rgba(255,255,255,.72)"}}>{l}</div>
        ))}
        {n<lines.length&&<span style={{color:ACC,animation:"blink .7s infinite"}}>▌</span>}
      </div>
    </div>
  );
}

/* ═══════════════ SKILL BAR ═══════════════ */
function SkillBar({label,pct,delay=0}){
  const[r,v]=useInView();
  return(
    <div ref={r} style={{marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:11,color:"rgba(255,255,255,.65)",fontFamily:"'DM Mono',monospace"}}>{label}</span>
        <span style={{fontSize:10,color:ACC,fontFamily:"'DM Mono',monospace"}}>{pct}%</span>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,.07)",borderRadius:2,overflow:"hidden"}}>
        <div style={{height:"100%",background:`linear-gradient(90deg,${ACC},#00C9A7)`,borderRadius:2,width:v?`${pct}%`:"0%",transition:`width 1.1s ease ${delay}s`}}/>
      </div>
    </div>
  );
}

/* ═══════════════ COUNTER ═══════════════ */
function Counter({to,suffix="",dur=1800}){
  const[val,setVal]=useState(0);const[r,v]=useInView();
  useEffect(()=>{
    if(!v)return; let s=null;
    const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setVal(Math.floor(p*to));if(p<1)requestAnimationFrame(f);};
    requestAnimationFrame(f);
  },[v,to,dur]);
  return<span ref={r}>{val}{suffix}</span>;
}

/* ═══════════════ 3D TILT CARD ═══════════════ */
function TiltCard({children,style={},className="",isMobile=false}){
  const ref=useRef(null);
  const onMove=useCallback(e=>{
    if(isMobile)return;
    const c=ref.current; if(!c)return;
    const{left,top,width,height}=c.getBoundingClientRect();
    const x=((e.clientX-left)/width-.5)*18;
    const y=-((e.clientY-top)/height-.5)*18;
    c.style.transform=`perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    c.style.boxShadow=`${-x*.8}px ${y*.8}px 32px rgba(255,230,0,.12)`;
  },[isMobile]);
  const onLeave=()=>{
    const c=ref.current; if(!c)return;
    c.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    c.style.boxShadow="";
  };
  return(
    <div ref={ref} className={className} style={{transition:"transform .2s ease,box-shadow .2s ease",...style}} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* ═══════════════ COMMAND PALETTE ═══════════════ */
function CommandPalette({open,onClose,onMatrix,onDownload}){
  const[q,setQ]=useState("");const[sel,setSel]=useState(0);const inp=useRef(null);
  const filtered=CMD_ITEMS.filter(i=>i.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{if(open){setQ("");setSel(0);setTimeout(()=>inp.current?.focus(),80);}}, [open]);
  useEffect(()=>{
    const fn=e=>{
      if(e.key==="ArrowDown"){e.preventDefault();setSel(s=>Math.min(s+1,filtered.length-1));}
      if(e.key==="ArrowUp"){e.preventDefault();setSel(s=>Math.max(s-1,0));}
      if(e.key==="Enter")run(filtered[sel]);
      if(e.key==="Escape")onClose();
    };
    if(open)window.addEventListener("keydown",fn); return()=>window.removeEventListener("keydown",fn);
  },[open,filtered,sel]);
  const run=item=>{
    if(!item)return;
    if(item.action==="scroll")document.getElementById(item.id)?.scrollIntoView({behavior:"smooth"});
    if(item.action==="download")onDownload();
    if(item.action==="matrix")onMatrix();
    if(item.action==="email")window.open("mailto:javadevdhinesh@gmail.com");
    if(item.action==="linkedin")window.open("https://linkedin.com/in/dhineshse","_blank");
    if(item.action==="github")window.open("https://github.com/Dhinesh-Se","_blank");
    onClose();
  };
  if(!open)return null;
  return(
    <div style={{position:"fixed",inset:0,zIndex:5000,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"14vh",background:"rgba(0,0,0,.7)",backdropFilter:"blur(8px)"}} onClick={onClose}>
      <div style={{width:"min(600px,90vw)",background:"#0E0E18",border:`1px solid rgba(255,230,0,.3)`,borderRadius:10,overflow:"hidden",boxShadow:`0 24px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,230,0,.1)`}} onClick={e=>e.stopPropagation()}>
        {/* Search input */}
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
          <span style={{color:"rgba(255,255,255,.3)",fontSize:16}}>⌘</span>
          <input ref={inp} value={q} onChange={e=>{setQ(e.target.value);setSel(0);}}
            placeholder="Type a command or search…"
            style={{flex:1,background:"none",border:"none",outline:"none",fontFamily:"'DM Mono',monospace",fontSize:14,color:"#E8E8F0",caretColor:ACC}}/>
          <span style={{fontSize:10,color:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.1)",padding:"2px 6px",borderRadius:3}}>ESC</span>
        </div>
        {/* Items */}
        <div style={{maxHeight:360,overflowY:"auto"}}>
          {filtered.length===0&&<div style={{padding:"20px 18px",fontSize:12,color:"rgba(255,255,255,.3)",textAlign:"center"}}>No results for "{q}"</div>}
          {filtered.map((item,i)=>(
            <div key={item.label} data-hover onClick={()=>run(item)}
              style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",cursor:"pointer",background:i===sel?"rgba(255,230,0,.08)":"transparent",borderLeft:i===sel?`2px solid ${ACC}`:"2px solid transparent",transition:"background .15s"}}>
              <span style={{fontSize:16,width:24,textAlign:"center"}}>{item.icon}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:i===sel?"#E8E8F0":"rgba(255,255,255,.6)"}}>{item.label}</span>
              {i===sel&&<span style={{marginLeft:"auto",fontSize:10,color:"rgba(255,230,0,.5)",border:`1px solid rgba(255,230,0,.2)`,padding:"2px 6px",borderRadius:3}}>↵ Enter</span>}
            </div>
          ))}
        </div>
        <div style={{padding:"8px 18px",borderTop:"1px solid rgba(255,255,255,.06)",display:"flex",gap:16}}>
          {[["↑↓","Navigate"],["↵","Select"],["ESC","Close"]].map(([k,l])=>(
            <span key={l} style={{fontSize:10,color:"rgba(255,255,255,.25)",display:"flex",alignItems:"center",gap:4}}>
              <span style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 5px",color:"rgba(255,255,255,.4)"}}>{k}</span>{l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════ KONAMI EASTER EGG ═══════════════ */
function KonamiEaster({onClose}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:6000,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",animation:"fadeIn .4s ease"}} onClick={onClose}>
      <div style={{textAlign:"center",padding:40,maxWidth:520}}>
        <div style={{fontSize:64,marginBottom:20,animation:"bounce 1s ease infinite"}}>🎮</div>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,7vw,64px)",color:ACC,marginBottom:12,letterSpacing:".05em"}}>CHEAT CODE ACTIVATED!</h2>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.8,marginBottom:8}}>↑↑↓↓←→←→BA — The Konami Code!</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.8,marginBottom:24}}>
          You just discovered the secret scene. Like a true developer and movie fan — you know the classics! 🎬
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          {["🏗️ Java","⚡ Spring Boot","🎯 Angular","🐳 Docker","🎬 Hollywood"].map(s=>(
            <span key={s} style={{fontFamily:"'DM Mono',monospace",fontSize:11,padding:"4px 10px",border:`1px solid rgba(255,230,0,.3)`,borderRadius:3,color:ACC}}>{s}</span>
          ))}
        </div>
        <p style={{marginTop:24,fontSize:11,color:"rgba(255,255,255,.2)",fontFamily:"'DM Mono',monospace"}}>Click anywhere to close</p>
      </div>
    </div>
  );
}

/* ═══════════════ GITHUB STATS ═══════════════ */
function GitHubStats(){
  const[data,setData]=useState(null),[err,setErr]=useState(false);
  useEffect(()=>{
    fetch("https://api.github.com/users/Dhinesh-Se")
      .then(r=>r.json()).then(d=>setData(d)).catch(()=>setErr(true));
  },[]);
  const[r,v]=useInView(.2);
  const stats=data?[
    {label:"Public Repos", val:data.public_repos??0, icon:"📦"},
    {label:"Followers",    val:data.followers??0,    icon:"👥"},
    {label:"Following",    val:data.following??0,    icon:"🔗"},
  ]:[
    {label:"Public Repos", val:6,  icon:"📦"},
    {label:"Followers",    val:12, icon:"👥"},
    {label:"Following",    val:8,  icon:"🔗"},
  ];
  return(
    <div ref={r} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",borderRadius:6,padding:"22px 24px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"opacity .6s ease,transform .6s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <span style={{fontSize:18}}>🐙</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#E8E8F0"}}>GitHub Stats</span>
        <span style={{marginLeft:"auto",fontSize:10,color:data?"#00C9A7":"rgba(255,255,255,.3)",fontFamily:"'DM Mono',monospace"}}>{data?"● LIVE":"● OFFLINE"}</span>
      </div>
      <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
        {stats.map(s=>(
          <div key={s.label} style={{flex:1,minWidth:80,textAlign:"center",background:"rgba(255,255,255,.03)",borderRadius:4,padding:"12px 8px",border:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:ACC}}>{s.val}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.35)",letterSpacing:".08em",textTransform:"uppercase",marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {data&&data.bio&&<p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,.35)",marginTop:14,lineHeight:1.6,borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:12}}>{data.bio}</p>}
      <a href="https://github.com/Dhinesh-Se" target="_blank" rel="noreferrer" data-hover
        style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:14,fontSize:11,color:ACC,fontFamily:"'DM Mono',monospace",textDecoration:"none",letterSpacing:".05em"}}>
        View on GitHub ↗
      </a>
    </div>
  );
}

/* ═══════════════ SECTION NAV DOTS ═══════════════ */
function SectionDots({active}){
  const sections=NAV_LINKS.map(l=>l.toLowerCase());
  return(
    <div style={{position:"fixed",right:20,top:"50%",transform:"translateY(-50%)",zIndex:300,display:"flex",flexDirection:"column",gap:10}}>
      {sections.map(s=>(
        <button key={s} data-hover onClick={()=>document.getElementById(s)?.scrollIntoView({behavior:"smooth"})}
          title={s.charAt(0).toUpperCase()+s.slice(1)}
          style={{width:active===s.charAt(0).toUpperCase()+s.slice(1)?10:6,height:active===s.charAt(0).toUpperCase()+s.slice(1)?10:6,borderRadius:"50%",
            background:active===s.charAt(0).toUpperCase()+s.slice(1)?ACC:"rgba(255,255,255,.25)",border:"none",
            transition:"all .3s",cursor:"pointer",padding:0,
            boxShadow:active===s.charAt(0).toUpperCase()+s.slice(1)?`0 0 10px ${ACC}80`:"none"}}/>
      ))}
    </div>
  );
}

/* ═══════════════ PROGRESS BAR ═══════════════ */
function ProgressBar({pct}){
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,height:3,zIndex:500,background:"rgba(255,255,255,.05)"}}>
      <div style={{height:"100%",background:`linear-gradient(90deg,${ACC},#00C9A7)`,width:`${pct}%`,transition:"width .1s",boxShadow:`0 0 8px ${ACC}80`}}/>
    </div>
  );
}

/* ═══════════════ ROCKET BTN ═══════════════ */
function RocketBtn({show}){
  const[launched,setLaunched]=useState(false);
  const launch=()=>{
    setLaunched(true);
    window.scrollTo({top:0,behavior:"smooth"});
    setTimeout(()=>setLaunched(false),1000);
  };
  return(
    <button data-hover onClick={launch}
      style={{position:"fixed",bottom:28,right:28,zIndex:400,width:48,height:48,borderRadius:"50%",
        background:ACC,border:"none",fontSize:20,cursor:"pointer",
        opacity:show?1:0,transform:show?(launched?"translateY(-60px) scale(1.2)":"translateY(0)"):"translateY(20px)",
        transition:"opacity .4s,transform .5s cubic-bezier(.34,1.56,.64,1)",
        boxShadow:`0 4px 20px rgba(255,230,0,.4)`,display:"flex",alignItems:"center",justifyContent:"center"}}
      title="Back to top">
      🚀
    </button>
  );
}

/* ═══════════════ MAIN ═══════════════ */
export default function Portfolio(){
  const[intro,setIntro]=useState(true);
  const[active,setActive]=useState("About");
  const[scrolled,setScrolled]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[dlState,setDlState]=useState("idle");
  const[matrixOn,setMatrixOn]=useState(false);
  const[cmdOpen,setCmdOpen]=useState(false);
  const[konamiOn,setKonamiOn]=useState(false);
  const[showRocket,setShowRocket]=useState(false);
  const confettiRef=useRef(null);
  const konamiSeq=useRef([]);
  const isMobile=useIsMobile();
  const scrollPct=useScrollProgress();

  // Scroll tracking
  useEffect(()=>{
    const f=()=>{
      const y=window.scrollY; setScrolled(y>40); setShowRocket(y>400);
      // Active section tracking
      const secs=NAV_LINKS.map(l=>({id:l,el:document.getElementById(l.toLowerCase())}));
      for(let i=secs.length-1;i>=0;i--){
        const el=secs[i].el; if(el&&el.getBoundingClientRect().top<=120){setActive(secs[i].id);break;}
      }
    };
    window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);
  },[]);

  // Body overflow
  useEffect(()=>{document.body.style.overflow=menuOpen||intro?"hidden":"";return()=>{document.body.style.overflow="";};},[menuOpen,intro]);

  // Cmd+K shortcut
  useEffect(()=>{
    const f=e=>{
      if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmdOpen(o=>!o);}
    };
    window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f);
  },[]);

  // Konami code
  useEffect(()=>{
    const f=e=>{
      konamiSeq.current=[...konamiSeq.current,e.key].slice(-KONAMI.length);
      if(konamiSeq.current.join(",")===KONAMI.join(",")){setKonamiOn(true);konamiSeq.current=[];}
    };
    window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f);
  },[]);

  const scrollTo=id=>{document.getElementById(id.toLowerCase())?.scrollIntoView({behavior:"smooth"});setActive(id);setMenuOpen(false);};

  const handleDl=()=>{
    setDlState("loading");
    setTimeout(()=>{
      triggerDownload(); setDlState("done");
      // Confetti!
      fireConfetti(confettiRef);
    },600);
    setTimeout(()=>setDlState("idle"),2600);
  };

  const DlBtn=({cls="btn btn-primary",style={}})=>(
    <button data-hover className={cls} onClick={handleDl} style={{minWidth:148,justifyContent:"center",...style}}>
      {dlState==="idle"&&<><span>↓</span>Download CV</>}
      {dlState==="loading"&&<><span style={{display:"inline-block",animation:"spin .8s linear infinite"}}>⟳</span>Preparing…</>}
      {dlState==="done"&&<><span>✓</span>Downloaded!</>}
    </button>
  );

  return(
    <div style={{fontFamily:"'DM Mono',monospace",background:"#080810",color:"#E8E8F0",minHeight:"100vh",overflowX:"hidden",cursor:isMobile?"auto":"none"}}>
      {/* Overlays */}
      {intro&&<CinematicIntro onDone={()=>setIntro(false)}/>}
      {!isMobile&&<CustomCursor/>}
      {matrixOn&&<MatrixRain active={matrixOn}/>}
      {konamiOn&&<KonamiEaster onClose={()=>setKonamiOn(false)}/>}
      <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} onMatrix={()=>setMatrixOn(o=>!o)} onDownload={handleDl}/>

      {/* Fixed UI */}
      <ProgressBar pct={scrollPct}/>
      {!isMobile&&<SectionDots active={active}/>}
      <RocketBtn show={showRocket}/>
      <canvas ref={confettiRef} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:4000}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ${!isMobile?"*{cursor:none!important;}":""}
        body{background:#080810;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#080810;}
        ::-webkit-scrollbar-thumb{background:${ACC};border-radius:2px;}
        .syne{font-family:'Syne',sans-serif;}
        .bebas{font-family:'Bebas Neue',sans-serif;}
        .nav-link{position:relative;font-size:12px;letter-spacing:.1em;color:#888;text-transform:uppercase;transition:color .2s;white-space:nowrap;}
        .nav-link:hover,.nav-link.active{color:${ACC};}
        .nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:${ACC};transition:width .3s;}
        .nav-link:hover::after,.nav-link.active::after{width:100%;}
        .card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:6px;transition:border-color .3s,box-shadow .3s;}
        .card:hover{border-color:rgba(255,230,0,.32);box-shadow:0 0 28px rgba(255,230,0,.06);}
        .tag{display:inline-block;padding:3px 9px;background:rgba(255,230,0,.07);border:1px solid rgba(255,230,0,.22);color:${ACC};font-size:10px;letter-spacing:.07em;border-radius:3px;}
        .section-label{font-size:10px;letter-spacing:.22em;color:${ACC};text-transform:uppercase;}
        .section-h{font-family:'Syne',sans-serif;font-weight:800;font-size:clamp(28px,5vw,52px);line-height:1.05;color:#E8E8F0;}
        .btn{display:inline-flex;align-items:center;gap:7px;padding:11px 22px;font-family:'DM Mono',monospace;font-size:12px;letter-spacing:.1em;text-transform:uppercase;border-radius:3px;border:2px solid;transition:all .22s;text-decoration:none;}
        .btn-primary{background:${ACC};color:#080810;border-color:${ACC};font-weight:500;}
        .btn-primary:hover{background:transparent;color:${ACC};}
        .btn-outline{background:transparent;color:#E8E8F0;border-color:rgba(255,255,255,.12);}
        .btn-outline:hover{border-color:${ACC};color:${ACC};}
        .film-strip::before,.film-strip::after{content:'';position:absolute;top:0;bottom:0;width:26px;background:repeating-linear-gradient(to bottom,#000 0,#000 8px,transparent 8px,transparent 20px);z-index:2;pointer-events:none;}
        .film-strip::before{left:0;}.film-strip::after{right:0;}
        .glow-border{box-shadow:0 0 0 1px rgba(255,230,0,.15);}
        .glow-border:hover{box-shadow:0 0 0 1px rgba(255,230,0,.45),0 0 36px rgba(255,230,0,.1);}
        .dot-grid{background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:28px 28px;}
        .scanlines::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px);pointer-events:none;z-index:1;}
        .bar{display:block;width:24px;height:2px;background:#E8E8F0;border-radius:2px;transition:all .3s;}
        .reel-divider{display:flex;align-items:center;gap:12px;margin:0 0 40px;}
        .reel-divider::before,.reel-divider::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(255,230,0,.22),transparent);}
        .skill-pill{padding:5px 12px;border:1px solid rgba(255,255,255,.1);border-radius:3px;font-size:11px;color:#aaa;background:rgba(255,255,255,.025);transition:all .2s;}
        .skill-pill:hover{border-color:${ACC};color:${ACC};background:rgba(255,230,0,.05);transform:translateY(-1px);}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        .pulse{animation:pulse 2s infinite;}
        .float{animation:float 4s ease-in-out infinite;}
        @media(max-width:768px){.hide-mobile{display:none!important;}.btn{padding:10px 16px;font-size:11px;}}
        @media(min-width:769px){.hide-desktop{display:none!important;}}
      `}</style>

      {/* ── NAV ── */}
      <nav style={{position:"fixed",top:3,left:0,right:0,zIndex:200,height:60,display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 clamp(16px,5vw,72px)",
        background:scrolled||menuOpen?"rgba(8,8,16,.96)":"transparent",
        backdropFilter:scrolled||menuOpen?"blur(16px)":"none",
        borderBottom:scrolled&&!menuOpen?"1px solid rgba(255,230,0,.08)":"none",
        transition:"background .3s,border-color .3s"}}>
        <span data-hover onClick={()=>scrollTo("About")} style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,color:ACC,letterSpacing:".02em",cursor:"pointer"}}>
          DV<span style={{color:"#E8E8F0"}}>.</span>
        </span>
        <div className="hide-mobile" style={{display:"flex",alignItems:"center",gap:22}}>
          {NAV_LINKS.map(l=>(
            <span key={l} data-hover className={`nav-link ${active===l?"active":""}`} onClick={()=>scrollTo(l)}>{l}</span>
          ))}
          {/* Cmd+K hint */}
          <button data-hover onClick={()=>setCmdOpen(true)}
            style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",padding:"5px 10px",borderRadius:5,fontSize:11,color:"rgba(255,255,255,.4)",fontFamily:"'DM Mono',monospace",transition:"all .2s"}}
            title="Command Palette">
            <span>⌘</span><span>K</span>
          </button>
          <button data-hover onClick={()=>setMatrixOn(o=>!o)}
            style={{background:matrixOn?"rgba(255,230,0,.1)":"transparent",border:`1px solid ${matrixOn?ACC:"rgba(255,255,255,.12)"}`,color:matrixOn?ACC:"#888",padding:"5px 10px",borderRadius:3,fontSize:11,fontFamily:"'DM Mono',monospace"}}>
            {matrixOn?"◼ MATRIX":"◻ MATRIX"}
          </button>
          <DlBtn style={{padding:"7px 14px",fontSize:11}}/>
        </div>
        <div className="hide-desktop" style={{display:"flex",alignItems:"center",gap:10}}>
          <button data-hover onClick={()=>setCmdOpen(true)}
            style={{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.1)",padding:"5px 8px",borderRadius:4,fontSize:12,color:"rgba(255,255,255,.5)",fontFamily:"monospace"}}>⌘</button>
          <button data-hover onClick={()=>setMenuOpen(o=>!o)} style={{background:"none",border:"none",padding:6,display:"flex",flexDirection:"column",gap:5,zIndex:201}} aria-label="Menu">
            <span className="bar" style={{transform:menuOpen?"rotate(45deg) translate(5px,5px)":"none"}}/>
            <span className="bar" style={{opacity:menuOpen?0:1}}/>
            <span className="bar" style={{transform:menuOpen?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen&&(
        <div style={{position:"fixed",inset:0,zIndex:199,background:"#09090F",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"flex-start",padding:"80px clamp(28px,8vw,60px) 40px",animation:"slideDown .3s ease"}}>
          <div style={{marginBottom:20}}><MovieTicker/></div>
          <nav style={{display:"flex",flexDirection:"column",gap:4,marginBottom:36}}>
            {NAV_LINKS.map((l,i)=>(
              <span key={l} data-hover onClick={()=>scrollTo(l)}
                style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:"clamp(28px,8vw,40px)",letterSpacing:"-.01em",color:active===l?ACC:"#555",textTransform:"uppercase",transition:"color .2s",display:"block",padding:"8px 0"}}>
                <span style={{fontSize:".4em",color:ACC,marginRight:8}}>▸</span>{l}
              </span>
            ))}
          </nav>
          <DlBtn cls="btn btn-primary" style={{maxWidth:260,width:"100%",justifyContent:"center"}}/>
          <div style={{marginTop:24,fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"'DM Mono',monospace"}}>Press ⌘K for command palette</div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" className="dot-grid scanlines" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px clamp(20px,7vw,120px) 72px",position:"relative",overflow:"hidden"}}>
        <ParticleBg/>
        <div className="float" style={{position:"absolute",top:"-20%",left:"28%",width:"40vw",height:"80vh",background:"radial-gradient(ellipse at center,rgba(255,230,0,.042) 0%,transparent 65%)",pointerEvents:"none",zIndex:1}}/>
        <div style={{maxWidth:980,width:"100%",position:"relative",zIndex:2}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#00C9A7",flexShrink:0}}/>
              <span className="section-label">Available for Opportunities</span>
            </div>
            <div className="hide-mobile"><MovieTicker/></div>
          </div>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontWeight:400,lineHeight:.85,fontSize:"clamp(72px,14vw,160px)",letterSpacing:".02em",color:"#E8E8F0",margin:"0 0 20px"}}>
            <GlitchText text="DHINESH" style={{display:"block"}}/>
            <span style={{color:ACC,textShadow:`0 0 80px rgba(255,230,0,.4)`,display:"block"}}>V.</span>
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,flexWrap:"wrap"}}>
            <div style={{width:36,height:2,background:ACC,flexShrink:0}}/>
            <p style={{fontSize:"clamp(12px,1.8vw,15px)",color:"#888",letterSpacing:".08em",textTransform:"uppercase"}}>
              Senior Software Engineer <span style={{color:ACC}}>@</span> Ernst & Young
            </p>
          </div>
          <p style={{fontSize:"clamp(13px,1.5vw,15px)",color:"#888",maxWidth:580,lineHeight:1.9,marginBottom:36,fontWeight:300,minHeight:48}}>
            <Typewriter text="3+ years building enterprise-grade platforms in insurance & fintech. Expert in Java · Spring Boot · Angular — from microservices to secure payment systems." delay={.2}/>
          </p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
            <button data-hover className="btn btn-primary" onClick={()=>scrollTo("Projects")}>▶ View Projects</button>
            <button data-hover className="btn btn-outline" onClick={()=>scrollTo("Contact")}>Get In Touch</button>
            <DlBtn cls="btn btn-outline"/>
          </div>
          {/* Cmd K hint */}
          <div style={{marginBottom:44,fontSize:11,color:"rgba(255,255,255,.25)",fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center",gap:6}}>
            <span>Press</span>
            <span style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)"}}>⌘K</span>
            <span>or</span>
            <span style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)"}}>Ctrl+K</span>
            <span>to open command palette</span>
          </div>
          <div style={{display:"flex",gap:"clamp(20px,5vw,48px)",flexWrap:"wrap"}}>
            {[[3,"+","Years Exp."],[3,"","Platforms Built"],[30,"%","Faster Claims"],[30,"d","WHI Delivery"]].map(([n,s,l])=>(
              <div key={l}>
                <div className="syne" style={{fontWeight:800,fontSize:"clamp(22px,3.5vw,40px)",color:ACC}}><Counter to={n} suffix={s} dur={1800}/></div>
                <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"absolute",bottom:28,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,zIndex:2}}>
          <span style={{fontSize:9,letterSpacing:".2em",color:"#444",textTransform:"uppercase"}}>scroll</span>
          <div style={{width:1,height:36,background:`linear-gradient(to bottom,${ACC},transparent)`,animation:"pulse 2s infinite"}}/>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{padding:"80px clamp(20px,7vw,120px)",background:"rgba(255,255,255,.015)"}}>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Technical Arsenal</span></div>
          <h2 className="section-h" style={{marginBottom:44}}>Skills &<br/><span style={{color:ACC}}>Technologies</span></h2>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:20,marginBottom:24}}>
          <FadeIn from="left">
            <TerminalCard lines={["$ whoami","// Dhinesh V — Full Stack Engineer","","$ cat stack.json","","> Frontend:  Angular, TypeScript, JS","> Backend:   Java, Spring Boot, APIs","> Database:  Oracle, MySQL, MongoDB","> DevOps:    Docker, Kubernetes, Git","> Payments:  CyberSource, N-Genius","","$ echo status","> Available & Building Great Things ✓"]} style={{height:"100%"}}/>
          </FadeIn>
          <FadeIn from="right">
            <div className="card" style={{padding:"22px 24px",height:"100%"}}>
              <div style={{fontSize:10,letterSpacing:".16em",color:ACC,marginBottom:18,textTransform:"uppercase"}}>Proficiency Levels</div>
              {[["Java / Spring Boot",95],["Angular / TypeScript",90],["REST APIs / Microservices",92],["Oracle / MySQL / MongoDB",85],["Docker / Kubernetes",78],["Payment Gateway Integration",88]].map(([k,v],i)=>(
                <SkillBar key={k} label={k} pct={v} delay={i*.1}/>
              ))}
            </div>
          </FadeIn>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,240px),1fr))",gap:14}}>
          {SKILLS.map((s,i)=>(
            <FadeIn key={s.cat} delay={i*.07}>
              <TiltCard isMobile={isMobile} className="card" style={{padding:"18px 20px",height:"100%"}}>
                <div style={{fontSize:10,letterSpacing:".16em",color:ACC,marginBottom:14,textTransform:"uppercase"}}>{s.cat}</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {s.items.map(item=><span key={item} data-hover className="skill-pill">{item}</span>)}
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{padding:"80px clamp(20px,7vw,120px)"}}>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Career Path</span></div>
          <h2 className="section-h" style={{marginBottom:44}}>Work<br/><span style={{color:ACC}}>Experience</span></h2>
        </FadeIn>
        <div style={{position:"relative",paddingLeft:isMobile?18:26}}>
          <div style={{position:"absolute",left:0,top:8,bottom:8,width:1,background:`linear-gradient(to bottom,${ACC},rgba(255,230,0,.05))`}}/>
          {EXPERIENCES.map((exp,i)=>(
            <FadeIn key={exp.company} delay={i*.12}>
              <div style={{position:"relative",marginBottom:28}}>
                <div style={{position:"absolute",left:isMobile?-24:-32,top:8,width:12,height:12,borderRadius:"50%",background:exp.color,boxShadow:`0 0 16px ${exp.color}90`}}/>
                <TiltCard isMobile={isMobile} className="card glow-border" style={{padding:isMobile?"18px 16px":"22px 26px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:6,marginBottom:6}}>
                    <div>
                      <h3 className="syne" style={{fontWeight:700,fontSize:"clamp(15px,2.5vw,19px)",color:"#E8E8F0"}}>{exp.company}</h3>
                      <div style={{color:exp.color,fontSize:12,marginTop:2}}>{exp.role}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"#444"}}>{exp.period}</div>
                      <div style={{fontSize:10,color:"#444",marginTop:2}}>📍 {exp.location}</div>
                    </div>
                  </div>
                  <p style={{color:"#888",fontSize:13,lineHeight:1.75,margin:"10px 0 14px"}}>{exp.desc}</p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                    {exp.tags.map(t=><span key={t} className="tag">{t}</span>)}
                  </div>
                </TiltCard>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{padding:"80px clamp(20px,7vw,120px)",background:"rgba(255,255,255,.015)"}}>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">🎬 Featured Productions</span></div>
          <h2 className="section-h" style={{marginBottom:44}}>Key<br/><span style={{color:ACC}}>Projects</span></h2>
        </FadeIn>
        <div style={{display:"flex",flexDirection:"column",gap:22}}>
          {PROJECTS.map((p,i)=>(
            <FadeIn key={p.name} delay={i*.1}>
              <TiltCard isMobile={isMobile} className="card film-strip glow-border" style={{padding:isMobile?"22px 34px":"28px 46px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,right:0,background:ACC,color:"#080810",fontSize:9,fontWeight:700,letterSpacing:".12em",padding:"4px 12px",fontFamily:"'DM Mono',monospace",zIndex:3}}>
                  {p.genre}
                </div>
                <div style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14,flexWrap:"wrap",paddingTop:8}}>
                  <span style={{fontSize:28,lineHeight:1,flexShrink:0}}>{p.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <h3 className="bebas" style={{fontSize:"clamp(22px,3.5vw,34px)",letterSpacing:".04em",color:"#E8E8F0",lineHeight:1}}>{p.name}</h3>
                    <div style={{color:"#444",fontSize:11,marginTop:3}}>{p.client} · {p.period} · {p.rating}</div>
                  </div>
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                  {p.tech.map(t=><span key={t} className="tag">{t}</span>)}
                </div>
                <ul style={{listStyle:"none",display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:"6px 20px"}}>
                  {p.highlights.map((h,j)=>(
                    <li key={j} style={{display:"flex",gap:8,alignItems:"flex-start",color:"#888",fontSize:12,lineHeight:1.65}}>
                      <span style={{color:ACC,marginTop:2,flexShrink:0,fontSize:9}}>▸</span>{h}
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={{padding:"80px clamp(20px,7vw,120px)"}}>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Impact</span></div>
          <h2 className="section-h" style={{marginBottom:44}}>Key<br/><span style={{color:ACC}}>Achievements</span></h2>
        </FadeIn>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,220px),1fr))",gap:16}}>
          {ACHIEVEMENTS.map((a,i)=>(
            <FadeIn key={a.title} delay={i*.08}>
              <TiltCard isMobile={isMobile} className="card glow-border" style={{padding:"22px 22px",height:"100%",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:-8,fontSize:60,opacity:.04,pointerEvents:"none"}}>{a.icon}</div>
                <div style={{fontSize:30,marginBottom:12}}>{a.icon}</div>
                <h3 className="syne" style={{fontWeight:700,fontSize:14,marginBottom:8,color:ACC}}>{a.title}</h3>
                <p style={{color:"#888",fontSize:12,lineHeight:1.75}}>{a.desc}</p>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EDUCATION + GITHUB ── */}
      <section style={{padding:"52px clamp(20px,7vw,120px)",background:"rgba(255,255,255,.015)"}}>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:20}}>
          <FadeIn from="left">
            <div className="card" style={{padding:isMobile?"20px 18px":"24px 28px",height:"100%"}}>
              <div className="section-label" style={{marginBottom:7}}>Education</div>
              <h3 className="syne" style={{fontWeight:700,fontSize:"clamp(15px,2.5vw,19px)",color:"#E8E8F0",marginBottom:4}}>B.Tech – Information Technology</h3>
              <p style={{color:"#888",fontSize:13,marginBottom:16}}>Coimbatore Institute of Engineering and Technology</p>
              <div style={{color:ACC,fontSize:13,marginBottom:10}}>2018 – 2022</div>
              <span className="tag">Java Programming – Beginner to Master</span>
            </div>
          </FadeIn>
          <FadeIn from="right">
            <GitHubStats/>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"80px clamp(20px,7vw,120px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center bottom,rgba(255,230,0,.042) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <FadeIn>
          <div className="reel-divider" style={{justifyContent:"center"}}><span className="section-label">Let's Connect</span></div>
          <h2 className="section-h" style={{marginBottom:14,position:"relative",zIndex:1}}>Get In<br/><span style={{color:ACC}}>Touch</span></h2>
          <p style={{color:"#888",fontSize:14,maxWidth:440,margin:"0 auto 40px",lineHeight:1.85,position:"relative",zIndex:1}}>
            Open to new opportunities, collaborations, or just a good tech conversation. Let's build something great together.
          </p>
          <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginBottom:40,position:"relative",zIndex:1}}>
            <a data-hover href="mailto:javadevdhinesh@gmail.com" className="btn btn-primary" style={{textDecoration:"none"}}>✉ Email Me</a>
            <a data-hover href="https://linkedin.com/in/dhineshse" target="_blank" rel="noreferrer" className="btn btn-outline" style={{textDecoration:"none"}}>LinkedIn ↗</a>
            <a data-hover href="https://github.com/Dhinesh-Se" target="_blank" rel="noreferrer" className="btn btn-outline" style={{textDecoration:"none"}}>GitHub ↗</a>
            <DlBtn cls="btn btn-outline"/>
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:isMobile?12:36,flexWrap:"wrap",flexDirection:isMobile?"column":"row",alignItems:"center",position:"relative",zIndex:1}}>
            {[["📧","javadevdhinesh@gmail.com"],["📱","8754447528"],["📍","Coimbatore, India"]].map(([ic,v])=>(
              <div key={v} style={{color:"#444",fontSize:12,display:"flex",alignItems:"center",gap:7}}><span>{ic}</span>{v}</div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{padding:"22px clamp(20px,7vw,120px)",borderTop:"1px solid rgba(255,230,0,.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,flexDirection:isMobile?"column":"row",textAlign:isMobile?"center":"left"}}>
        <span className="syne" style={{fontWeight:800,color:ACC,fontSize:19}}>DV.</span>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <span style={{color:"#444",fontSize:11}}>© 2026 Dhinesh V · Full Stack Software Engineer @ EY</span>
          <span style={{fontSize:10,color:"rgba(255,255,255,.15)"}}>🎬 A portfolio directed with passion · Try ↑↑↓↓←→←→BA 🎮</span>
        </div>
        <DlBtn cls="btn btn-outline" style={{padding:"6px 14px",fontSize:10}}/>
      </footer>
    </div>
  );
}
