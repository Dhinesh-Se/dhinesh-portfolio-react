import { useState, useEffect, useRef, useCallback } from "react";
import MovieTicker from "./components/MovieTicker";
import AnimeDimension from "./components/AnimeDimension";
import TopNavigation from "./components/TopNavigation";
import ArchitectureSection from "./components/ArchitectureSection";
import AiChat from "./components/AiChat";
import ContactForm from "./components/ContactForm";
/* ═══════════ DATA ═══════════ */
const NAV_LINKS = ["About","Skills","Architecture","Experience","Projects","Achievements","Anime Dimension","Cinema Lab","Contact"];
const toId = l => l.toLowerCase().replace(/\s+/g,"-");
const ACC = "var(--accent-color)";

const SKILLS = [
  { cat:"Languages",      items:["Java 21/17/8","SQL","PL/SQL","TypeScript","JavaScript"] },
  { cat:"Backend",        items:["Spring Boot","Spring Framework","Spring MVC","Spring Security","REST APIs","JPA/Hibernate"] },
  { cat:"Architecture & Distributed Systems", items:["Microservices","Event-Driven Architecture","Apache Kafka","Redis","API Design"] },
  { cat:"Frontend",       items:["Angular 18+","React","TypeScript","HTML5","CSS3"] },
  { cat:"Cloud & DevOps", items:["Microsoft Azure","Docker","Kubernetes","Azure DevOps","CI/CD","Git"] },
  { cat:"Database",       items:["PostgreSQL","Oracle DB","MySQL","MongoDB"] },
  { cat:"AI",             items:["Azure AI Foundry","Agentic AI","GitHub Copilot"] },
  { cat:"Testing & Tools",items:["JUnit","Mockito","MockMvc","Postman","Swagger/OpenAPI"] },
  { cat:"Payments",       items:["CyberSource","N-Genius","e-Wallet Integration","Installment Flows"] },
];

const EXPERIENCES = [
  { company:"Ernst & Young (EY)", role:"Senior Software Engineer", period:"Feb 2026 – Present", location:"Coimbatore, India", color:ACC,
    desc:"Design and build 6+ Java 21 / Spring Boot microservices and distributed systems with Swagger/OpenAPI REST APIs, plus Angular 18 front-end features, on Microsoft Azure with CI/CD through Azure DevOps. Prototype automation with Azure AI Foundry and agentic AI.",
    tags:["Java 21","Spring Boot","Microservices","Angular 18","Azure","Azure DevOps"] },
  { company:"KGISL Technologies", role:"Junior Associate – Java Full Stack Developer", period:"Dec 2022 – Feb 2026", location:"Coimbatore, India", color:"#00C9A7",
    desc:"Built enterprise web applications for UAE insurance and government platforms. Designed a group claims workflow that cut settlement time by ~30%, bulk policy issuance (~1,000 policies per batch), and e-wallet, CyberSource and N-Genius payment workflows.",
    tags:["Java 8/17/21","Spring Boot","Angular 18","Oracle","REST/SOAP"] },
];

const PROJECTS = [
  { name:"Pharmaceutical Inventory Management System", client:"Client: Pfizer", period:"EY GDS", icon:"💊",
    genre:"DISTRIBUTED SYSTEMS", rating:"⭐⭐⭐⭐⭐",
    tech:["Microservices","Apache Kafka","Redis","PostgreSQL","Kubernetes","Docker","API Gateway","OAuth 2.0"],
    highlights:["Contributed to the high-level architecture: Product, Inventory, Warehouse, Order, Procurement, Quality and Shipment microservices on Kubernetes, each with its own PostgreSQL database","Apache Kafka for event-driven communication between services","Redis for distributed caching of read-heavy data","API gateway with OAuth 2.0 / RBAC security in front of the services"] },
  { name:"Free Zone Portal", client:"Dubai Insurance", period:"Dec 2024 – Feb 2026", icon:"🏛️",
    genre:"REGULATORY EPIC", rating:"⭐⭐⭐⭐⭐",
    tech:["Spring Boot","Angular","Microservices","Oracle","Swagger","REST APIs","RBAC"],
    highlights:["Policy issuance, claims and tax-invoice functionality aligned with Freezone regulatory requirements","Swagger-documented REST APIs for premium collection, policy administration and worker compensation claims","Mobile and web access with automated invoice dispatch for Freezone entities"] },
  { name:"Worker Health Insurance (WHI)", client:"Dubai Insurance", period:"Dec 2024 – Jul 2025", icon:"🏥",
    genre:"FULL LIFECYCLE", rating:"⭐⭐⭐⭐⭐",
    tech:["Angular","Java","Spring Boot","Oracle","SOAP/XML","CyberSource","N-Genius","REST APIs"],
    highlights:["Built the full policy lifecycle platform end-to-end: installment-based payments, COI generation, admin dashboards, and finance/audit/reporting modules","Multi-role RBAC and Swagger-documented REST endpoints for third-party integrations"] },
  { name:"Worker Protection Program (WPP)", client:"Dubai Insurance", period:"Jan 2023 – Dec 2024", icon:"🛡️",
    genre:"THE ORIGIN STORY", rating:"⭐⭐⭐⭐",
    tech:["Angular","Java","Spring Boot","Oracle","CyberSource","N-Genius","REST APIs"],
    highlights:["Insurance management workflows covering claims, policy issuance, sponsor/worker management and employer compliance","Reduced premium collection processing time by ~30%, with e-wallet, CyberSource and N-Genius payment flows","Automated claims, endorsements and dynamic invoice document generation"] },
];

const ACHIEVEMENTS = [
  { icon:"🏗️", title:"Pfizer Platform Architecture",  desc:"Contributed to the high-level architecture of a distributed pharma inventory platform: seven microservices with Kafka, Redis and an OAuth 2.0 API gateway." },
  { icon:"📉", title:"~30% Faster Claims",     desc:"Designed a group claims processing and approval workflow that cut claim settlement time by approximately 30% versus the legacy process." },
  { icon:"🚀", title:"Bulk Policy Issuance",  desc:"Implemented bulk policy issuance for high-volume processing, about 1,000 policies per batch." },
  { icon:"💳", title:"e-Wallet & Payments",   desc:"Integrated e-wallet, CyberSource and N-Genius payment workflows across WPP and KGISL insurance platforms." },
];

const MOVIE_QUOTES = [
  { quote:"With great power comes great responsibility.", film:"Spider-Man" },
  { quote:"Why so serious?", film:"The Dark Knight" },
  { quote:"I am inevitable.", film:"Avengers: Endgame" },
  { quote:"To infinity and beyond!", film:"Toy Story" },
  { quote:"It's not who I am underneath, but what I do that defines me.", film:"Batman Begins" },
  { quote:"Every passing minute is another chance to turn it all around.", film:"Vanilla Sky" },
];

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|{}[]";
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

const CMD_ITEMS = [
  { label:"Go to About",          icon:"👤", action:"scroll", id:"about" },
  { label:"Go to Skills",         icon:"⚡", action:"scroll", id:"skills" },
  { label:"Go to Experience",     icon:"💼", action:"scroll", id:"experience" },
  { label:"Go to Projects",       icon:"🎬", action:"scroll", id:"projects" },
  { label:"Go to Achievements",   icon:"🏆", action:"scroll", id:"achievements" },
  { label:"Go to Cinema Lab",     icon:"🎥", action:"scroll", id:"cinema-lab" },
  { label:"Go to Contact",        icon:"✉️",  action:"scroll", id:"contact" },
  { label:"Download Resume",      icon:"📄", action:"download" },
  { label:"Toggle Matrix Rain",   icon:"💊", action:"matrix" },
  { label:"Open AI Chat",         icon:"🤖", action:"chat" },
  { label:"Email Dhinesh",        icon:"📧", action:"email" },
  { label:"Open LinkedIn",        icon:"🔗", action:"linkedin" },
  { label:"Open GitHub",          icon:"🐙", action:"github" },
];

/* ═══════════ HOOKS ═══════════ */
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
    const f=()=>{const el=document.documentElement;setP((el.scrollTop||document.body.scrollTop)/(el.scrollHeight-el.clientHeight)*100||0);};
    window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);
  },[]);
  return p;
}

/* ═══════════ UTILS ═══════════ */
function triggerDownload(){
  const t=`DHINESH V — Senior Software Engineer\njavadevdhinesh@gmail.com | 8754447528 | Coimbatore, India\nLinkedIn: linkedin.com/in/dhineshse | GitHub: github.com/Dhinesh-Se\n\nEXPERIENCE\nEY GDS — Senior Software Engineer | Feb 2026 – Present\nKGISL Technologies — Junior Associate, Java Full Stack Developer | Dec 2022 – Feb 2026\n\nSKILLS\nLanguages: Java 21/17/8, SQL, PL/SQL, TypeScript, JavaScript\nBackend: Spring Boot, Spring Framework, Spring MVC, Spring Security, REST APIs, JPA/Hibernate\nArchitecture & Distributed Systems: Microservices, Event-Driven Architecture, Apache Kafka, Redis, API Design\nFrontend: Angular 18+, React, TypeScript, HTML5, CSS3\nCloud & DevOps: Microsoft Azure, Docker, Kubernetes, Azure DevOps, CI/CD, Git\nDatabases: PostgreSQL, Oracle DB, MySQL, MongoDB\nAI: Azure AI Foundry, Agentic AI, GitHub Copilot\n\nPROJECTS\n1. Pharmaceutical Inventory Management System (EY GDS, Client: Pfizer) — Microservices, Kafka, Redis, PostgreSQL, Kubernetes, OAuth 2.0\n2. Free Zone Portal (Dubai Insurance) — Spring Boot, Angular, Microservices, Oracle\n3. Worker Health Insurance WHI (Dubai Insurance) — Angular, Java, Spring Boot, SOAP/XML\n4. Worker Protection Program WPP (Dubai Insurance) — Angular, Java, Spring Boot\n\nKEY ACHIEVEMENTS\n- Contributed to Pfizer distributed platform architecture (7 microservices, Kafka, Redis, API gateway)\n- Group claims workflow cut settlement time by ~30%\n- Bulk policy issuance (~1,000 policies per batch)\n- E-wallet, CyberSource and N-Genius payment workflows\n\nEDUCATION\nB.Tech – Information Technology (2018 – 2022)\nCoimbatore Institute of Engineering and Technology\nCertifications: Microsoft Azure Fundamentals (AZ-900), GitHub Copilot (GH-300)`;
  const b=new Blob([t],{type:"text/plain"});const u=URL.createObjectURL(b);
  const a=document.createElement("a");a.href=u;a.download="Dhinesh_V_Resume.txt";a.click();URL.revokeObjectURL(u);
}

function fireConfetti(canvasRef){
  const canvas=canvasRef.current; if(!canvas) return;
  const ctx=canvas.getContext("2d");
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;
  const particles=Array.from({length:140},()=>({
    x:Math.random()*canvas.width, y:-10-Math.random()*canvas.height*.4,
    vx:(Math.random()-0.5)*7, vy:Math.random()*5+2,
    color:["#FFE600","#00C9A7","#fff","#ff6b6b","#4ecdc4","#45b7d1"][Math.floor(Math.random()*6)],
    size:Math.random()*9+4, spin:Math.random()*0.25-0.125, angle:Math.random()*Math.PI*2, life:1,
  }));
  let raf;
  const draw=()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height); let alive=false;
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.09; p.angle+=p.spin; p.life-=0.011;
      if(p.life>0){alive=true;ctx.save();ctx.globalAlpha=p.life;ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size);ctx.restore();}
    });
    if(alive)raf=requestAnimationFrame(draw); else ctx.clearRect(0,0,canvas.width,canvas.height);
  };
  draw();
  return()=>cancelAnimationFrame(raf);
}

/* ═══════════ SUB-COMPONENTS ═══════════ */

function MatrixRain({active, bankaiOn}){
  const ref=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    if(!active)return;
    const c=ref.current; if(!c)return; const ctx=c.getContext("2d");
    let W=c.width=window.innerWidth,H=c.height=window.innerHeight;
    const fs=14,cols=Math.floor(W/fs),drops=Array(cols).fill(1);
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    const draw=()=>{
      ctx.fillStyle="rgba(0,0,0,.04)";ctx.fillRect(0,0,W,H);
      drops.forEach((y,i)=>{
        const ch=CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)];
        ctx.fillStyle=Math.random()>.97?"#ffffff":bankaiOn?"rgba(255,61,0,.6)":"rgba(255,230,0,.45)";
        ctx.font=`${fs}px monospace`;ctx.fillText(ch,i*fs,y*fs);
        if(y*fs>H&&Math.random()>.975)drops[i]=0; drops[i]++;
      });
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(raf.current);window.removeEventListener("resize",resize);};
  },[active, bankaiOn]);
  return<canvas ref={ref} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",opacity:.25}}/>;
}

function ParticleBg({animeTheme, bankaiOn}){
  const ref=useRef(null); const raf=useRef(null);
  useEffect(()=>{
    const c=ref.current; if(!c)return; const ctx=c.getContext("2d");
    let W,H;
    const resize=()=>{W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;};
    resize();
    const count = animeTheme === "eren" ? 85 : animeTheme === "luffy" ? 30 : 55;
    const pts=Array.from({length:count},()=>({
      x:Math.random()*W,
      y:Math.random()*H,
      vx:(Math.random()-.5)*(animeTheme === "eren" ? .5 : .3),
      vy:(Math.random()-.5)*(animeTheme === "eren" ? -1.0 : .3),
      r:animeTheme === "luffy" ? Math.random()*10+5 : Math.random()*1.5+.5
    }));
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      let particleColor = "rgba(255,230,0,.45)";
      let lineColor = "rgba(255,230,0,";
      if (bankaiOn) {
        particleColor = "rgba(255,61,0,.6)";
        lineColor = "rgba(255,61,0,";
      } else if (animeTheme === "luffy") {
        particleColor = "rgba(255, 230, 0, 0.25)";
        lineColor = "rgba(255, 230, 0,";
      } else if (animeTheme === "eren") {
        particleColor = "rgba(255, 61, 0, 0.6)";
        lineColor = "rgba(255, 61, 0,";
      } else if (animeTheme === "tanjiro") {
        particleColor = Math.random() > 0.5 ? "rgba(0, 229, 255, 0.6)" : "rgba(255, 109, 0, 0.6)";
        lineColor = "rgba(0, 229, 255,";
      }
      pts.forEach(p=>{
        p.x+=p.vx;p.y+=p.vy;
        if (animeTheme === "eren") {
          if (p.y < 0) p.y = H;
          if (p.x < 0 || p.x > W) p.vx *= -1;
        } else {
          if(p.x<0||p.x>W)p.vx*=-1;
          if(p.y<0||p.y>H)p.vy*=-1;
        }
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=particleColor;
        ctx.fill();
      });
      if (animeTheme !== "luffy") {
        for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
          const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<120){
            ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
            ctx.strokeStyle=`${lineColor}${(1-d/120)*.1})`;
            ctx.lineWidth=1;ctx.stroke();
          }
        }
      }
      raf.current=requestAnimationFrame(draw);
    };
    draw();
    const ro=new ResizeObserver(resize);ro.observe(c);
    return()=>{cancelAnimationFrame(raf.current);ro.disconnect();};
  },[animeTheme, bankaiOn]);
  return<canvas ref={ref} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}/>;
}

function Typewriter({text,speed=40,delay=0}){
  const[s,setS]=useState(""); const[go,setGo]=useState(false);
  const[r,v]=useInView(.2);
  useEffect(()=>{if(v&&!go)setTimeout(()=>setGo(true),delay*1000);},[v]);
  useEffect(()=>{
    if(!go)return; let i=0;
    const t=setInterval(()=>{setS(text.slice(0,++i));if(i>=text.length)clearInterval(t);},speed);
    return()=>clearInterval(t);
  },[go,text,speed]);
  return<span ref={r}>{s}<span style={{animation:"blink .7s infinite",opacity:s.length<text.length?1:0}}>▌</span></span>;
}

function FadeIn({children,delay=0,from="bottom"}){
  const[r,v]=useInView();
  const tr={bottom:"translateY(26px)",left:"translateX(-26px)",right:"translateX(26px)",scale:"scale(.95)"};
  return<div ref={r} style={{opacity:v?1:0,transform:v?"none":tr[from]||tr.bottom,transition:`opacity .65s ease ${delay}s,transform .65s ease ${delay}s`}}>{children}</div>;
}

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
      rp.current.x+=(m.current.x-rp.current.x)*.11;rp.current.y+=(m.current.y-rp.current.y)*.11;
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

function Counter({to,suffix="",dur=1800}){
  const[val,setVal]=useState(0);const[r,v]=useInView();
  useEffect(()=>{
    if(!v)return; let s=null;
    const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setVal(Math.floor(p*to));if(p<1)requestAnimationFrame(f);};
    requestAnimationFrame(f);
  },[v,to,dur]);
  return<span ref={r}>{val}{suffix}</span>;
}


/* ── 3D HERO SCENE: spinning tech cube + orbit rings + floating shards (pure CSS 3D, no deps) ── */
const CUBE_FACES = [
  ["Java 21",     "rotateY(0deg)"],
  ["Spring Boot", "rotateY(90deg)"],
  ["Kafka",       "rotateY(180deg)"],
  ["Redis",       "rotateY(270deg)"],
  ["Azure",       "rotateX(90deg)"],
  ["React",       "rotateX(-90deg)"],
];
function HeroCube3D({isMobile}){
  const sceneRef=useRef(null);
  useEffect(()=>{
    if(isMobile) return;
    if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove=e=>{
      const sc=sceneRef.current; if(!sc) return;
      const x=(e.clientX/window.innerWidth-.5)*16;
      const y=-(e.clientY/window.innerHeight-.5)*12;
      sc.style.transform=`rotateX(${y}deg) rotateY(${x}deg)`;
    };
    window.addEventListener("mousemove",onMove);
    return()=>window.removeEventListener("mousemove",onMove);
  },[isMobile]);
  const size=isMobile?110:180, half=size/2;
  const ringDots=(n,r)=>(Array.from({length:n}).map((_,i)=>{
    const a=(360/n)*i;
    return<span key={i} style={{position:"absolute",top:"50%",left:"50%",width:7,height:7,borderRadius:"50%",background:ACC,boxShadow:`0 0 10px ${ACC},0 0 22px ${ACC}66`,transform:`rotate(${a}deg) translateX(${r}px) rotate(${-a}deg) translate(-50%,-50%)`}}/>;
  }));
  return(
    <div style={{perspective:1000,width:size*2.1,height:size*2.1,display:"flex",alignItems:"center",justifyContent:"center",position:"relative"}}>
      <div ref={sceneRef} style={{transformStyle:"preserve-3d",transition:"transform .3s ease-out",width:size,height:size,position:"relative"}}>
        {/* orbit rings */}
        <div style={{position:"absolute",inset:-size*.32,border:"1px solid color-mix(in srgb,var(--accent-color) 28%,transparent)",borderRadius:"50%",transformStyle:"preserve-3d",animation:"orbitA 14s linear infinite"}}>{ringDots(2,size*.82)}</div>
        <div style={{position:"absolute",inset:-size*.52,border:"1px dashed color-mix(in srgb,var(--accent-color) 16%,transparent)",borderRadius:"50%",transformStyle:"preserve-3d",animation:"orbitB 22s linear infinite"}}>{ringDots(3,size*1.02)}</div>
        {/* floating shards */}
        <div style={{position:"absolute",top:-size*.45,left:-size*.55,width:14,height:14,background:"color-mix(in srgb,var(--accent-color) 22%,transparent)",border:"1px solid color-mix(in srgb,var(--accent-color) 55%,transparent)",animation:"shardFloat 6s ease-in-out infinite",transform:"rotate(45deg)"}}/>
        <div style={{position:"absolute",bottom:-size*.4,right:-size*.5,width:0,height:0,borderLeft:"9px solid transparent",borderRight:"9px solid transparent",borderBottom:"15px solid color-mix(in srgb,var(--accent-color) 45%,transparent)",animation:"shardFloat 7.5s .8s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:size*.15,right:-size*.62,width:9,height:9,borderRadius:"50%",border:"2px solid color-mix(in srgb,var(--accent-color) 50%,transparent)",animation:"shardFloat 5.4s 1.6s ease-in-out infinite"}}/>
        {/* the cube */}
        <div style={{position:"absolute",inset:0,transformStyle:"preserve-3d",animation:"cubeSpin 16s linear infinite"}}>
          {CUBE_FACES.map(([label,rot])=>(
            <div key={label} style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",background:"color-mix(in srgb,var(--bg-color,#080810) 72%,transparent)",border:"1px solid color-mix(in srgb,var(--accent-color) 55%,transparent)",boxShadow:"inset 0 0 26px color-mix(in srgb,var(--accent-color) 12%,transparent)",backdropFilter:"blur(2px)",transform:`${rot} translateZ(${half}px)`}}>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:isMobile?11:14,letterSpacing:".12em",color:"#E8E8F0",textTransform:"uppercase",textShadow:"0 0 14px color-mix(in srgb,var(--accent-color) 70%,transparent)"}}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"absolute",bottom:isMobile?-26:-34,left:"50%",transform:"translateX(-50%)",fontSize:9,letterSpacing:".3em",color:"rgba(255,255,255,.3)",textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"'DM Mono',monospace"}}>Core Stack · 3D</div>
    </div>
  );
}

function TiltCard({children,style={},className="",isMobile=false,pop3d=false}){
  const ref=useRef(null);
  const onMove=useCallback(e=>{
    if(isMobile)return;
    const c=ref.current; if(!c)return;
    const{left,top,width,height}=c.getBoundingClientRect();
    const x=((e.clientX-left)/width-.5)*16;
    const y=-((e.clientY-top)/height-.5)*16;
    c.style.transform=`perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
    c.style.boxShadow=`${-x*.8}px ${y*.8}px 28px rgba(255,230,0,.1)`;
  },[isMobile]);
  const onLeave=()=>{
    const c=ref.current; if(!c)return;
    c.style.transform="perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    c.style.boxShadow="";
  };
  return<div ref={ref} className={className+(pop3d?" card-3d":"")} style={{transition:"transform .2s ease,box-shadow .2s ease",...(pop3d?{transformStyle:"preserve-3d"}:{}),...style}} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

function CommandPalette({open,onClose,onMatrix,onDownload,onChat}){
  const[q,setQ]=useState("");const[sel,setSel]=useState(0);const inp=useRef(null);
  const filtered=CMD_ITEMS.filter(i=>i.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{if(open){setTimeout(()=>{setQ("");setSel(0);inp.current?.focus();},80);}},[open]);
  const run=useCallback(item=>{
    if(!item)return;
    if(item.action==="scroll")document.getElementById(item.id)?.scrollIntoView({behavior:"smooth"});
    if(item.action==="download")onDownload();
    if(item.action==="matrix")onMatrix();
    if(item.action==="chat")onChat();
    if(item.action==="email")window.open("mailto:javadevdhinesh@gmail.com");
    if(item.action==="linkedin")window.open("https://linkedin.com/in/dhineshse","_blank");
    if(item.action==="github")window.open("https://github.com/Dhinesh-Se","_blank");
    onClose();
  },[onChat,onClose,onDownload,onMatrix]);
  useEffect(()=>{
    const fn=e=>{
      if(e.key==="ArrowDown"){e.preventDefault();setSel(s=>Math.min(s+1,filtered.length-1));}
      if(e.key==="ArrowUp"){e.preventDefault();setSel(s=>Math.max(s-1,0));}
      if(e.key==="Enter")run(filtered[sel]);
      if(e.key==="Escape")onClose();
    };
    if(open)window.addEventListener("keydown",fn); return()=>window.removeEventListener("keydown",fn);
  },[open,filtered,sel,run,onClose]);
  if(!open)return null;
  return(
    <div style={{position:"fixed",inset:0,zIndex:5000,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"14vh",background:"rgba(0,0,0,.72)",backdropFilter:"blur(8px)"}} onClick={onClose}>
      <div style={{width:"min(600px,90vw)",background:"#0E0E18",border:`1px solid rgba(255,230,0,.3)`,borderRadius:10,overflow:"hidden",boxShadow:`0 24px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,230,0,.1)`}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 18px",borderBottom:"1px solid rgba(255,255,255,.07)"}}>
          <span style={{color:"rgba(255,255,255,.3)",fontSize:16}}>⌘</span>
          <input ref={inp} value={q} onChange={e=>{setQ(e.target.value);setSel(0);}} placeholder="Type a command or search…" style={{flex:1,background:"none",border:"none",outline:"none",fontFamily:"'DM Mono',monospace",fontSize:14,color:"#E8E8F0",caretColor:ACC}}/>
          <span style={{fontSize:10,color:"rgba(255,255,255,.2)",border:"1px solid rgba(255,255,255,.1)",padding:"2px 6px",borderRadius:3}}>ESC</span>
        </div>
        <div style={{maxHeight:360,overflowY:"auto"}}>
          {filtered.length===0&&<div style={{padding:"20px 18px",fontSize:12,color:"rgba(255,255,255,.3)",textAlign:"center"}}>No results for "{q}"</div>}
          {filtered.map((item,i)=>(
            <div key={item.label} data-hover onClick={()=>run(item)} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 18px",cursor:"pointer",background:i===sel?"rgba(255,230,0,.08)":"transparent",borderLeft:i===sel?`2px solid ${ACC}`:"2px solid transparent",transition:"background .15s"}}>
              <span style={{fontSize:16,width:24,textAlign:"center"}}>{item.icon}</span>
              <span style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:i===sel?"#E8E8F0":"rgba(255,255,255,.6)"}}>{item.label}</span>
              {i===sel&&<span style={{marginLeft:"auto",fontSize:10,color:"rgba(255,230,0,.5)",border:`1px solid rgba(255,230,0,.2)`,padding:"2px 6px",borderRadius:3}}>↵</span>}
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

function KonamiEaster({onClose}){
  return(
    <div style={{position:"fixed",inset:0,zIndex:6000,background:"rgba(0,0,0,.88)",display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(6px)",animation:"fadeIn .4s ease"}} onClick={onClose}>
      <div style={{textAlign:"center",padding:40,maxWidth:520}}>
        <div style={{fontSize:64,marginBottom:20,animation:"bounce 1s ease infinite"}}>🎮</div>
        <h2 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(36px,7vw,64px)",color:ACC,marginBottom:12,letterSpacing:".05em"}}>CHEAT CODE ACTIVATED!</h2>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:14,color:"rgba(255,255,255,.6)",lineHeight:1.8,marginBottom:8}}>↑↑↓↓←→←→BA — The Konami Code!</p>
        <p style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:"rgba(255,255,255,.4)",lineHeight:1.8,marginBottom:24}}>You found the secret scene. Like a true developer & movie fan — you know the classics! 🎬</p>
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

function GitHubStats(){
  const[data,setData]=useState(null);
  useEffect(()=>{fetch("https://api.github.com/users/Dhinesh-Se").then(r=>r.json()).then(d=>setData(d)).catch(()=>{});},[]);
  const[r,v]=useInView(.2);
  const stats=data?[{label:"Public Repos",val:data.public_repos??0,icon:"📦"},{label:"Followers",val:data.followers??0,icon:"👥"},{label:"Following",val:data.following??0,icon:"🔗"}]:[{label:"Public Repos",val:6,icon:"📦"},{label:"Followers",val:12,icon:"👥"},{label:"Following",val:8,icon:"🔗"}];
  return(
    <div ref={r} style={{background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.08)",borderRadius:6,padding:"22px 24px",opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:"opacity .6s ease,transform .6s ease"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
        <span style={{fontSize:18}}>🐙</span>
        <span style={{fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:14,color:"#E8E8F0"}}>GitHub Stats</span>
        <span style={{marginLeft:"auto",fontSize:10,color:data?"#00C9A7":"rgba(255,255,255,.3)",fontFamily:"'DM Mono',monospace"}}>{data?"● LIVE":"● OFFLINE"}</span>
      </div>
      <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
        {stats.map(s=>(
          <div key={s.label} style={{flex:1,minWidth:80,textAlign:"center",background:"rgba(255,255,255,.03)",borderRadius:4,padding:"12px 8px",border:"1px solid rgba(255,255,255,.06)"}}>
            <div style={{fontSize:22,marginBottom:4}}>{s.icon}</div>
            <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:22,color:ACC}}>{s.val}</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,.35)",letterSpacing:".08em",textTransform:"uppercase",marginTop:2}}>{s.label}</div>
          </div>
        ))}
      </div>
      {data?.bio&&<p style={{fontFamily:"'DM Mono',monospace",fontSize:11,color:"rgba(255,255,255,.35)",marginTop:14,lineHeight:1.6,borderTop:"1px solid rgba(255,255,255,.06)",paddingTop:12}}>{data.bio}</p>}
      <a href="https://github.com/Dhinesh-Se" target="_blank" rel="noreferrer" data-hover style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:14,fontSize:11,color:ACC,fontFamily:"'DM Mono',monospace",textDecoration:"none",letterSpacing:".05em"}}>View on GitHub ↗</a>
    </div>
  );
}

function SectionDots({active}){
  const sections=NAV_LINKS.map(l=>toId(l));
  return(
    <div style={{position:"fixed",right:18,top:"50%",transform:"translateY(-50%)",zIndex:300,display:"flex",flexDirection:"column",gap:10}}>
      {sections.map(s=>{
        const label=NAV_LINKS.find(l=>toId(l)===s)||s;
        const isActive=active===label;
        return(
          <button key={s} data-hover onClick={()=>document.getElementById(s)?.scrollIntoView({behavior:"smooth"})} title={label}
            style={{width:isActive?10:6,height:isActive?10:6,borderRadius:"50%",background:isActive?ACC:"rgba(255,255,255,.22)",border:"none",transition:"all .3s",cursor:"pointer",padding:0,boxShadow:isActive?`0 0 10px ${ACC}80`:"none"}}/>
        );
      })}
    </div>
  );
}

function ProgressBar({pct}){
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,height:3,zIndex:500,background:"rgba(255,255,255,.04)"}}>
      <div style={{height:"100%",background:`linear-gradient(90deg,${ACC},#00C9A7)`,width:`${pct}%`,transition:"width .1s",boxShadow:`0 0 8px ${ACC}80`}}/>
    </div>
  );
}

function RocketBtn({show}){
  const[launched,setLaunched]=useState(false);
  const launch=()=>{setLaunched(true);window.scrollTo({top:0,behavior:"smooth"});setTimeout(()=>setLaunched(false),1000);};
  return(
    <button data-hover onClick={launch}
      style={{position:"fixed",bottom:28,right:28,zIndex:400,width:48,height:48,borderRadius:"50%",background:ACC,border:"none",fontSize:20,cursor:"pointer",opacity:show?1:0,transform:show?(launched?"translateY(-60px) scale(1.2)":"translateY(0)"):"translateY(20px)",transition:"opacity .4s,transform .5s cubic-bezier(.34,1.56,.64,1)",boxShadow:`0 4px 20px rgba(255,230,0,.4)`,display:"flex",alignItems:"center",justifyContent:"center"}} title="Back to top">🚀</button>
  );
}

/* ═══════════ CHERRY BLOSSOMS ═══════════ */
function CherryBlossoms() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth;
    let H = c.height = window.innerHeight;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const petals = Array.from({ length: 35 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 4 + 2,
      d: Math.random() * 1.5 + 0.5,
      speed: Math.random() * 1.2 + 0.6,
      sway: Math.random() * 0.02,
      angle: Math.random() * Math.PI,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      petals.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.angle) * 0.5;
        p.angle += p.sway;
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r * 1.6, p.angle, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 183, 197, 0.75)";
        ctx.fill();
        if (p.y > H) {
          p.y = -20;
          p.x = Math.random() * W;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} />;
}

/* ═══════════ MAIN ═══════════ */
export default function Portfolio(){
  const[active,setActive]=useState("About");
  const[bankaiOn,setBankaiOn]=useState(false);
  const[animeTheme,setAnimeTheme]=useState(null);
  const[triggerShake,setTriggerShake]=useState(false);

  const toggleBankai = () => {
    const nextVal = !bankaiOn;
    setBankaiOn(nextVal);
    if (nextVal) {
      const audio = new Audio("/anime/unohana-bankai.mp3");
      audio.volume = 1.0;
      audio.play().catch(console.error);

      setTriggerShake(true);
      setTimeout(() => setTriggerShake(false), 650);
    }
  };
  const[scrolled,setScrolled]=useState(false);
  const[menuOpen,setMenuOpen]=useState(false);
  const[dlState,setDlState]=useState("idle");
  const[matrixOn,setMatrixOn]=useState(false);
  const[cmdOpen,setCmdOpen]=useState(false);
  const[konamiOn,setKonamiOn]=useState(false);
  const[showRocket,setShowRocket]=useState(false);
  const[genre,setGenre]=useState("Sci-Fi");
  const[imaxMode,setImaxMode]=useState(false);
  const[trailerOpen,setTrailerOpen]=useState(false);
  const[istTime,setIstTime]=useState("");
  const[decodedName,setDecodedName]=useState("01000100 01001000 01001001 01001110 01000101 01010011 01001000");
  const[chatOpen,setChatOpen]=useState(false);
  const confettiRef=useRef(null);
  const konamiSeq=useRef([]);
  const isMobile=useIsMobile();
  const scrollPct=useScrollProgress();

  useEffect(()=>{
    const f=()=>{
      const y=window.scrollY; setScrolled(y>40); setShowRocket(y>400);
      const secs=NAV_LINKS.map(l=>({id:l,el:document.getElementById(toId(l))}));
      for(let i=secs.length-1;i>=0;i--){
        const el=secs[i].el;
        if(el&&el.getBoundingClientRect().top<=120){
          setActive(secs[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);
  },[]);

  useEffect(()=>{document.body.style.overflow=menuOpen?"hidden":"";return()=>{document.body.style.overflow="";};},[menuOpen]);

  useEffect(()=>{
    const f=e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmdOpen(o=>!o);}};
    window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f);
  },[]);

  useEffect(()=>{
    const f=e=>{konamiSeq.current=[...konamiSeq.current,e.key].slice(-KONAMI.length);if(konamiSeq.current.join(",")===KONAMI.join(",")){setKonamiOn(true);konamiSeq.current=[];}};
    window.addEventListener("keydown",f); return()=>window.removeEventListener("keydown",f);
  },[]);

  useEffect(()=>{
    const tick=()=>setIstTime(new Date().toLocaleTimeString("en-IN",{timeZone:"Asia/Kolkata",hour12:true}));
    tick(); const id=setInterval(tick,1000); return()=>clearInterval(id);
  },[]);

  useEffect(()=>{
    const states=["44 48 49 4E 45 53 48","DHINESH","01000100 01001000...","DHINESH V"];
    let i=0; const id=setInterval(()=>{setDecodedName(states[i%states.length]);i++;},2000);
    return()=>clearInterval(id);
  },[]);

  const scrollTo=id=>{
    document.getElementById(toId(id))?.scrollIntoView({behavior:"smooth"});
    setActive(id);
    setMenuOpen(false);
  };

  const handleDl=()=>{
    setDlState("loading");
    setTimeout(()=>{triggerDownload();setDlState("done");fireConfetti(confettiRef);},600);
    setTimeout(()=>setDlState("idle"),2600);
  };

  const DlBtn=({cls="btn btn-primary",style={}})=>(
    <button data-hover className={cls} onClick={handleDl} style={{minWidth:148,justifyContent:"center",...style}}>
      {dlState==="idle"&&<><span>↓</span>Download CV</>}
      {dlState==="loading"&&<><span style={{display:"inline-block",animation:"spin .8s linear infinite"}}>⟳</span>Preparing…</>}
      {dlState==="done"&&<><span>✓</span>Downloaded!</>}
    </button>
  );

  const activeAccent = bankaiOn ? "#FF3D00" : (animeTheme === "eren" ? "#FF3D00" : (animeTheme === "tanjiro" ? "#00E5FF" : "#FFE600"));
  const activeBg = bankaiOn
    ? "#050000"
    : animeTheme === "luffy"
    ? "#090803"
    : animeTheme === "eren"
    ? "#080404"
    : animeTheme === "tanjiro"
    ? "#03070A"
    : (genre === "Thriller" ? "#07070B" : genre === "Action" ? "#0D0808" : "#080810");

  const bgColor = activeBg;

  return(
    <div className={triggerShake ? "screen-shake" : ""} style={{fontFamily:"'DM Mono',monospace",background:bgColor,color:"#E8E8F0",minHeight:"100vh",overflowX:"hidden",cursor:isMobile?"auto":"none",transition:"background .4s", "--accent-color": activeAccent, "--bg-color": activeBg}}>
      {bankaiOn && <CherryBlossoms />}
      {imaxMode&&<><div style={{position:"fixed",top:0,left:0,right:0,height:"8vh",background:"#000",zIndex:350,pointerEvents:"none"}}/><div style={{position:"fixed",bottom:0,left:0,right:0,height:"8vh",background:"#000",zIndex:350,pointerEvents:"none"}}/></>}

      {!isMobile&&<CustomCursor/>}
      {matrixOn&&<MatrixRain active={matrixOn} bankaiOn={bankaiOn}/>}
      {konamiOn&&<KonamiEaster onClose={()=>setKonamiOn(false)}/>}
      <CommandPalette open={cmdOpen} onClose={()=>setCmdOpen(false)} onMatrix={()=>setMatrixOn(o=>!o)} onDownload={handleDl} onChat={()=>setChatOpen(true)}/>

      <ProgressBar pct={scrollPct}/>
      {!isMobile&&<SectionDots active={active}/>}
      <RocketBtn show={showRocket}/>
      <AiChat externalOpen={chatOpen} onExternalClose={()=>setChatOpen(false)}/>
      <canvas ref={confettiRef} style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:4000}}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&family=Bebas+Neue&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ${!isMobile?"*{cursor:none!important;}":""}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-track{background:${bgColor};}::-webkit-scrollbar-thumb{background:${ACC};border-radius:2px;}
        ::selection{background:rgba(255,230,0,.2);color:#fff;}
        .syne{font-family:'Syne',sans-serif;}.bebas{font-family:'Bebas Neue',sans-serif;}
        .nav-link{position:relative;font-size:10.5px;letter-spacing:.04em;color:#888;text-transform:uppercase;transition:color .2s;white-space:nowrap;}
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
        .film-strip{position:relative;overflow:hidden;}
        .film-strip::before,.film-strip::after{content:'';position:absolute;top:0;bottom:0;width:26px;background:repeating-linear-gradient(to bottom,#000 0,#000 8px,transparent 8px,transparent 20px);z-index:2;pointer-events:none;}
        .film-strip::before{left:0;}.film-strip::after{right:0;}
        .glow-border{box-shadow:0 0 0 1px rgba(255,230,0,.15);}
        .glow-border:hover{box-shadow:0 0 0 1px rgba(255,230,0,.45),0 0 36px rgba(255,230,0,.1);}
        .dot-grid{background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:28px 28px;}
        .scanlines::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px);pointer-events:none;z-index:1;}
        .bar{display:block;width:24px;height:2px;background:#E8E8F0;border-radius:2px;transition:all .3s;}
        .reel-divider{display:flex;align-items:center;gap:12px;margin:0 0 40px;}
        .ticket{position:relative;}
        .ticket::before,.ticket::after{content:'';position:absolute;top:50%;width:16px;height:16px;border-radius:50%;background:var(--bg-color,#080810);transform:translateY(-50%);z-index:2;}
        .ticket::before{left:-9px;}.ticket::after{right:-9px;}
        .reel-divider::before,.reel-divider::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(255,230,0,.22),transparent);}
        .skill-pill{padding:5px 12px;border:1px solid rgba(255,255,255,.1);border-radius:3px;font-size:11px;color:#aaa;background:rgba(255,255,255,.025);transition:all .2s;white-space:nowrap;}
        .skill-pill:hover{border-color:${ACC};color:${ACC};background:rgba(255,230,0,.05);transform:translateY(-1px);}
        @keyframes cubeSpin{from{transform:rotateX(-16deg) rotateY(0deg)}to{transform:rotateX(-16deg) rotateY(360deg)}}
        @keyframes orbitA{from{transform:rotateX(74deg) rotateZ(0deg)}to{transform:rotateX(74deg) rotateZ(360deg)}}
        @keyframes orbitB{from{transform:rotateX(74deg) rotateZ(360deg)}to{transform:rotateX(74deg) rotateZ(0deg)}}
        @keyframes shardFloat{0%,100%{transform:translateY(0) translateZ(0)}50%{transform:translateY(-14px) translateZ(30px)}}
        .card-3d{perspective:900px;}
        .card-3d .pop,.card-3d .pop-sm{transition:transform .35s ease;}
        .card-3d:hover .pop{transform:translateZ(30px);}
        .card-3d:hover .pop-sm{transform:translateZ(16px);}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10%, 30%, 50%, 70%, 90% { transform: translate(-3px, 2px); }
          20%, 40%, 60%, 80% { transform: translate(3px, -2px); }
        }
        .screen-shake {
          animation: shake 0.6s ease;
        }
        .pulse{animation:pulse 2s infinite;}
        .float{animation:float 4s ease-in-out infinite;}
        @media(max-width:768px){.hide-mobile{display:none!important;}.btn{padding:10px 16px;font-size:11px;}}
        .hero-3d-desktop{display:none;}
        @media(min-width:1200px){.hero-3d-desktop{display:block;position:absolute;right:clamp(24px,5vw,96px);top:50%;transform:translateY(-54%);z-index:1;}}
        @media(min-width:769px){.hide-desktop{display:none!important;}}
        @media(prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
      `}</style>

      <TopNavigation scrolled={scrolled} menuOpen={menuOpen} setMenuOpen={setMenuOpen} active={active} navLinks={NAV_LINKS} scrollTo={scrollTo} accentColor={ACC} matrixOn={matrixOn} onToggleMatrix={()=>setMatrixOn(o=>!o)} onOpenCommand={()=>setCmdOpen(true)} DlBtn={DlBtn} quotes={MOVIE_QUOTES} isMobile={isMobile} bankaiOn={bankaiOn} onToggleBankai={toggleBankai}/>

      {/* ── HERO ── */}
      <section id="about" className="dot-grid scanlines" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"100px clamp(20px,7vw,120px) 72px",position:"relative",overflow:"hidden"}}>
        <ParticleBg animeTheme={animeTheme} bankaiOn={bankaiOn}/>
        <div className="float" style={{position:"absolute",top:"-20%",left:"28%",width:"40vw",height:"80vh",background:"radial-gradient(ellipse at center,rgba(255,230,0,.042) 0%,transparent 65%)",pointerEvents:"none",zIndex:1}}/>
        <div style={{maxWidth:980,width:"100%",position:"relative",zIndex:2}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:28}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div className="pulse" style={{width:8,height:8,borderRadius:"50%",background:"#00C9A7",flexShrink:0}}/>
              <span className="section-label">Available for Opportunities</span>
            </div>
            <div className="hide-mobile"><MovieTicker quotes={MOVIE_QUOTES} accentColor={ACC}/></div>
          </div>
          <h1 style={{fontFamily:"'Bebas Neue',sans-serif",fontWeight:400,lineHeight:.85,fontSize:"clamp(72px,14vw,160px)",letterSpacing:".02em",color:"#E8E8F0",margin:"0 0 20px"}}>
            <GlitchText text="DHINESH" style={{display:"block"}}/>
            <span style={{color:ACC,textShadow:`0 0 80px rgba(255,230,0,.4)`,display:"block"}}>V.</span>
          </h1>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,flexWrap:"wrap"}}>
            <div style={{width:36,height:2,background:ACC,flexShrink:0}}/>
            <p style={{fontSize:"clamp(12px,1.8vw,15px)",color:"#888",letterSpacing:".08em",textTransform:"uppercase"}}>
              Senior Software Engineer <span style={{color:ACC}}>@</span> Ernst & Young · Distributed Systems & Architecture
            </p>
          </div>
          <p style={{fontSize:"clamp(13px,1.5vw,15px)",color:"#888",maxWidth:580,lineHeight:1.9,marginBottom:36,fontWeight:300,minHeight:48}}>
            <Typewriter text="Close to 4 years designing event-driven microservices and distributed systems in Java 21 · Spring Boot · Angular, cloud-native on Azure. Contributed to the high-level architecture of a Pfizer pharma platform — 7 microservices, Kafka, Redis, OAuth 2.0 gateway." delay={.2}/>
          </p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
            <button data-hover className="btn btn-primary" onClick={()=>scrollTo("Projects")}>▶ View Projects</button>
            <button data-hover className="btn btn-outline" onClick={()=>scrollTo("Contact")}>Get In Touch</button>
            <DlBtn cls="btn btn-outline"/>
          </div>
          <div style={{marginBottom:44,fontSize:11,color:"rgba(255,255,255,.22)",fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span>Press</span>
            <kbd style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>⌘K</kbd>
            <span>for command palette ·</span>
            <kbd style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>🤖</kbd>
            <span>to chat with my AI</span>
          </div>
          <div style={{display:"flex",gap:"clamp(20px,5vw,48px)",flexWrap:"wrap"}}>
            {[[4,"","Years Experience","~"],[7,"","Pfizer Microservices",""],[30,"%","Faster Claims",""],[1000,"","Policies per Batch",""]].map(([n,s,l,pfx])=>(
              <div key={l}>
                <div className="syne" style={{fontWeight:800,fontSize:"clamp(22px,3.5vw,40px)",color:ACC}}>{pfx}<Counter to={n} suffix={s} dur={1800}/></div>
                <div style={{fontSize:10,color:"#444",letterSpacing:".1em",textTransform:"uppercase",marginTop:2}}>{l}</div>
              </div>
            ))}
          </div>
          {isMobile&&<div style={{display:"flex",justifyContent:"center",marginTop:44,marginBottom:56}}><HeroCube3D isMobile={true}/></div>}
        </div>
        <div className="hero-3d-desktop"><HeroCube3D isMobile={false}/></div>
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
            <TerminalCard lines={["$ whoami","// Dhinesh V — Senior Software Engineer","","$ cat stack.json","","> Backend:      Java 21, Spring Boot, REST APIs","> Architecture: Microservices, Kafka, Redis, API Design","> Frontend:     Angular 18, React, TypeScript","> Data:         PostgreSQL, Oracle, MySQL, MongoDB","> Cloud/DevOps: Azure, Docker, Kubernetes, CI/CD","> AI:           Azure AI Foundry, GitHub Copilot","","$ echo status","> Available & Building Great Things ✓"]} style={{height:"100%"}}/>
          </FadeIn>
          <FadeIn from="right">
            <div className="card" style={{padding:"22px 24px",height:"100%"}}>
              <div style={{fontSize:10,letterSpacing:".16em",color:ACC,marginBottom:16,textTransform:"uppercase"}}>How I Think About Architecture</div>
              {[["🏗️","Domains own their data","Each service owns its database, so teams deploy and scale independently."],["⚡","Events over tight coupling","Kafka domain events keep services asynchronous and resilient."],["🚀","Cache the read-heavy paths","Redis serves hot reference data; the database stays the source of truth."],["🔐","Security lives at the edge","OAuth 2.0 / RBAC at the API gateway, before any business service."]].map(([ic,h,d],i)=>(
                <div key={h} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"7px 0",borderBottom:i<3?"1px solid rgba(255,255,255,.05)":"none"}}>
                  <span style={{fontSize:15,lineHeight:1.4}}>{ic}</span>
                  <div>
                    <div style={{fontSize:12,color:"#E8E8F0",fontWeight:500,marginBottom:2}}>{h}</div>
                    <div style={{fontSize:11,color:"#777",lineHeight:1.6}}>{d}</div>
                  </div>
                </div>
              ))}
              <button data-hover onClick={()=>document.getElementById("architecture")?.scrollIntoView({behavior:"smooth"})} className="btn btn-outline" style={{marginTop:14,fontSize:10,padding:"7px 12px",width:"100%",justifyContent:"center"}}>See it applied — Pfizer platform ↓</button>
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

      <ArchitectureSection ACC={ACC} FadeIn={FadeIn}/>

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
              <TiltCard isMobile={isMobile} pop3d className="card film-strip glow-border" style={{padding:isMobile?"22px 34px":"28px 46px",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:0,right:0,background:ACC,color:"#080810",fontSize:9,fontWeight:700,letterSpacing:".12em",padding:"4px 12px",fontFamily:"'DM Mono',monospace",zIndex:3}}>{p.genre}</div>
                <div className="pop" style={{display:"flex",alignItems:"flex-start",gap:14,marginBottom:14,flexWrap:"wrap",paddingTop:8}}>
                  <span style={{fontSize:28,lineHeight:1,flexShrink:0}}>{p.icon}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <h3 className="bebas" style={{fontSize:"clamp(22px,3.5vw,34px)",letterSpacing:".04em",color:"#E8E8F0",lineHeight:1}}>{p.name}</h3>
                    <div style={{color:"#8A8A9C",fontSize:11,marginTop:3}}>{p.client} · {p.period} · {p.rating}</div>
                  </div>
                </div>
                <div className="pop-sm" style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
                  {p.tech.map(t=><span key={t} className="tag">{t}</span>)}
                </div>
                <ul style={{listStyle:"none",display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:"6px 20px"}}>
                  {p.highlights.map((h,j)=>(
                    <li key={j} style={{display:"flex",gap:8,alignItems:"flex-start",color:"#888",fontSize:12,lineHeight:1.65}}>
                      <span style={{color:ACC,marginTop:2,flexShrink:0,fontSize:9}}>▸</span>{h}
                    </li>
                  ))}
                </ul>
                {p.name.startsWith("Pharmaceutical")&&(
                  <button data-hover onClick={()=>document.getElementById("architecture")?.scrollIntoView({behavior:"smooth"})} className="btn btn-outline" style={{marginTop:16,fontSize:11,padding:"8px 14px"}}>View architecture ↓</button>
                )}
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
              <TiltCard isMobile={isMobile} pop3d className="card glow-border" style={{padding:"22px 22px",height:"100%",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:-8,fontSize:60,opacity:.04,pointerEvents:"none"}}>{a.icon}</div>
                <div className="pop" style={{fontSize:30,marginBottom:12}}>{a.icon}</div>
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
              <div style={{display:"flex",flexWrap:"wrap",gap:6}}><span className="tag">Microsoft Azure Fundamentals (AZ-900)</span><span className="tag">GitHub Copilot (GH-300)</span></div>
            </div>
          </FadeIn>
          <FadeIn from="right"><GitHubStats/></FadeIn>
        </div>
      </section>

      {/* ── ANIME DIMENSION ── */}
      <AnimeDimension onThemeChange={setAnimeTheme} isMobile={isMobile} />

      {/* ── CINEMA LAB ── */}
      <section id="cinema-lab" style={{padding:"80px clamp(20px,7vw,120px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"-20%",left:"50%",transform:"translateX(-50%)",width:"70%",height:"90%",background:"radial-gradient(ellipse at center,rgba(255,230,0,.05) 0%,transparent 65%)",pointerEvents:"none"}}/>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Cinematic Innovation</span></div>
        </FadeIn>

        {/* Marquee board */}
        <FadeIn>
          <div className="glow-border" style={{border:"1px solid rgba(255,230,0,.22)",borderRadius:10,padding:isMobile?"24px 16px":"30px clamp(18px,4vw,44px)",background:"linear-gradient(180deg,rgba(255,230,0,.05) 0%,rgba(0,0,0,.3) 100%)",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,.4)",marginBottom:26}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:16,padding:"0 6px"}}>
              {Array.from({length:isMobile?8:14}).map((_,i)=>(<div key={i} style={{width:6,height:6,borderRadius:"50%",background:ACC,boxShadow:`0 0 10px ${ACC}`,animation:`pulse 1.7s ${i*0.14}s infinite`}}/>))}
            </div>
            <div className="bebas" style={{fontSize:"clamp(42px,7.5vw,92px)",letterSpacing:".07em",textAlign:"center",lineHeight:.95,color:"#E8E8F0"}}>
              CINEMA <span style={{color:ACC,textShadow:`0 0 50px ${ACC}55`}}>LAB</span>
            </div>
            <div style={{textAlign:"center",fontSize:10,letterSpacing:".32em",color:"#777",textTransform:"uppercase",marginTop:10,fontFamily:"'DM Mono',monospace"}}>
              Now Showing · Career Trailer Daily
            </div>
            <p style={{textAlign:"center",color:"#888",fontSize:12,margin:"14px auto 0",maxWidth:520,lineHeight:1.8}}>
              An interactive playground for a cinema lover — switch genres, go IMAX, watch the trailer, decode the marquee.
            </p>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:16,padding:"0 6px"}}>
              {Array.from({length:isMobile?8:14}).map((_,i)=>(<div key={i} style={{width:6,height:6,borderRadius:"50%",background:ACC,boxShadow:`0 0 10px ${ACC}`,animation:`pulse 1.7s ${i*0.14}s infinite`}}/>))}
            </div>
          </div>
        </FadeIn>

        {/* Feature controls */}
        <FadeIn delay={.1}>
          <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24,alignItems:"center"}}>
            {[["Thriller","🎭"],["Sci-Fi","🛸"],["Action","💥"]].map(([g,ic])=>(
              <button key={g} className="btn btn-outline" data-hover onClick={()=>setGenre(g)} style={{padding:"8px 16px",fontSize:11,borderRadius:100,borderColor:genre===g?ACC:"rgba(255,255,255,.16)",color:genre===g?ACC:"#999",background:genre===g?`${ACC}12`:"transparent"}}>
                {ic} {genre===g?"✓ ":""}{g}
              </button>
            ))}
            <button className="btn btn-outline" data-hover onClick={()=>setImaxMode(v=>!v)} style={{padding:"8px 16px",fontSize:11,borderRadius:100,borderColor:imaxMode?ACC:"rgba(255,255,255,.16)",color:imaxMode?ACC:"#999",background:imaxMode?`${ACC}12`:"transparent",letterSpacing:".12em"}}>
              {imaxMode?"✓ IMAX ON":"IMAX MODE"}
            </button>
            <button className="btn btn-primary" data-hover onClick={()=>setTrailerOpen(true)} style={{padding:"8px 18px",fontSize:11,borderRadius:100,marginLeft:isMobile?0:"auto"}}>
              ▶ Watch the Career Trailer
            </button>
          </div>
        </FadeIn>

        {/* Ticket stubs */}
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:18}}>
          <FadeIn from="left">
            <div className="card ticket" style={{padding:"22px 24px",borderLeft:`3px dashed rgba(255,230,0,.35)`}}>
              <div className="section-label" style={{marginBottom:8}}>🎟 Admit One · Coimbatore (IST)</div>
              <div className="syne" style={{fontSize:34,color:ACC,marginBottom:4,textShadow:`0 0 30px ${ACC}44`}}>{istTime}</div>
              <div style={{fontSize:11,color:"#555"}}>Local showtime — recruiter timezone reference</div>
            </div>
          </FadeIn>
          <FadeIn from="right">
            <div className="card ticket" style={{padding:"22px 24px",borderLeft:`3px dashed rgba(255,230,0,.35)`}}>
              <div className="section-label" style={{marginBottom:8}}>🔐 Secret Reel · Decoder</div>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#666",marginBottom:8,wordBreak:"break-word",transition:"all .4s"}}>{decodedName}</div>
              <div style={{fontSize:18,color:ACC,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:".1em"}}>→ DHINESH V</div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Career Trailer modal */}
      {trailerOpen&&(
        <div onClick={()=>setTrailerOpen(false)} style={{position:"fixed",inset:0,zIndex:1200,background:"rgba(0,0,0,.92)",display:"grid",placeItems:"center",padding:20}}>
          <div className="card" style={{maxWidth:720,width:"100%",padding:isMobile?"24px 20px":"32px 36px",borderColor:"rgba(255,230,0,.35)",position:"relative"}} onClick={e=>e.stopPropagation()}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${ACC},#00C9A7)`}}/>
            <div className="section-label" style={{marginBottom:12}}>🎬 Career Trailer — Now Playing</div>
            <h3 className="bebas" style={{fontSize:"clamp(24px,5vw,42px)",color:"#E8E8F0",marginBottom:6,letterSpacing:".04em",lineHeight:1.1}}>
              "In a world of enterprise software..."
            </h3>
            <p style={{color:"#888",lineHeight:1.85,fontSize:13,marginBottom:16}}>
              <span style={{color:ACC}}>One developer</span> built insurance platforms at scale, contributed to the architecture of a <span style={{color:ACC}}>Kafka-based pharma platform for Pfizer</span>, and keeps shipping secure fintech experiences across Dubai and India. Now at <span style={{color:ACC}}>Ernst & Young</span>, the next chapter begins.
            </p>
            <p style={{color:"#555",fontSize:12,fontStyle:"italic",marginBottom:20}}>"Every passing minute is another chance to turn it all around." — Vanilla Sky</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <button className="btn btn-primary" onClick={()=>setTrailerOpen(false)}>Close Trailer ✕</button>
              <button className="btn btn-outline" onClick={()=>{setTrailerOpen(false);scrollTo("Contact");}}>Get In Touch →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ── */}
      <section id="contact" style={{padding:"80px clamp(20px,7vw,120px)",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at center bottom,rgba(255,230,0,.042) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Let's Connect</span></div>
          <h2 className="section-h" style={{marginBottom:14,position:"relative",zIndex:1}}>Get In<br/><span style={{color:ACC}}>Touch</span></h2>
          <p style={{color:"#888",fontSize:14,maxWidth:500,lineHeight:1.85,marginBottom:40,position:"relative",zIndex:1}}>
            Open to new opportunities, collaborations, or just a good tech conversation. Fill the form or use the buttons below.
          </p>
        </FadeIn>

        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:32,position:"relative",zIndex:1}}>
          {/* Contact form */}
          <FadeIn from="left">
            <div className="card" style={{padding:isMobile?"22px 18px":"28px 28px"}}>
              <div className="section-label" style={{marginBottom:16}}>📬 Send a Message</div>
              <ContactForm/>
            </div>
          </FadeIn>

          {/* Contact info + links */}
          <FadeIn from="right">
            <div style={{display:"flex",flexDirection:"column",gap:16}}>
              <div className="card" style={{padding:"22px 24px"}}>
                <div className="section-label" style={{marginBottom:14}}>Direct Links</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  {[["📧","Email","mailto:javadevdhinesh@gmail.com","javadevdhinesh@gmail.com"],["💼","LinkedIn","https://linkedin.com/in/dhineshse","linkedin.com/in/dhineshse"],["🐙","GitHub","https://github.com/Dhinesh-Se","github.com/Dhinesh-Se"],["📱","Phone","tel:+918754447528","8754447528"],["📍","Location",null,"Coimbatore, India"]].map(([ic,label,href,display])=>(
                    <div key={label} style={{display:"flex",alignItems:"center",gap:12,padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,.04)"}}>
                      <span style={{fontSize:16,width:22,textAlign:"center"}}>{ic}</span>
                      <div>
                        <div style={{fontSize:9,color:"#555",letterSpacing:".1em",textTransform:"uppercase",marginBottom:2}}>{label}</div>
                        {href ? <a data-hover href={href} target={href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{fontSize:12,color:ACC,fontFamily:"'DM Mono',monospace",textDecoration:"none"}}>{display}</a>
                               : <span style={{fontSize:12,color:"#888",fontFamily:"'DM Mono',monospace"}}>{display}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <a data-hover href="mailto:javadevdhinesh@gmail.com" className="btn btn-primary" style={{textDecoration:"none",flex:1,justifyContent:"center"}}>✉ Email</a>
                <a data-hover href="https://linkedin.com/in/dhineshse" target="_blank" rel="noreferrer" className="btn btn-outline" style={{textDecoration:"none",flex:1,justifyContent:"center"}}>LinkedIn ↗</a>
              </div>
              <DlBtn cls="btn btn-outline" style={{width:"100%",justifyContent:"center"}}/>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{padding:"22px clamp(20px,7vw,120px)",borderTop:"1px solid rgba(255,230,0,.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,flexDirection:isMobile?"column":"row",textAlign:isMobile?"center":"left"}}>
        <span className="syne" style={{fontWeight:800,color:ACC,fontSize:19}}>DV.</span>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
          <span style={{color:"#444",fontSize:11}}>© 2026 Dhinesh V · Senior Software Engineer @ EY</span>
          <span style={{fontSize:10,color:"rgba(255,255,255,.12)"}}>🎬 A portfolio directed with passion · Try ↑↑↓↓←→←→BA 🎮</span>
        </div>
        <DlBtn cls="btn btn-outline" style={{padding:"6px 14px",fontSize:10}}/>
      </footer>
    </div>
  );
}
