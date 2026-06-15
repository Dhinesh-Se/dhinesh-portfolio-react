import { useState, useEffect, useRef, useCallback } from "react";
import MovieTicker from "./components/MovieTicker";
import AnimeDimension, { animeSynth } from "./components/AnimeDimension";
import TopNavigation from "./components/TopNavigation";
import AiChat from "./components/AiChat";
import ContactForm from "./components/ContactForm";
import AnimeBackgroundVFX from "./components/AnimeBackgroundVFX";
/* ═══════════ DATA ═══════════ */
const NAV_LINKS = ["About","Skills","Experience","Projects","Achievements","Anime Dimension","Cinema Lab","Contact"];
const toId = l => l.toLowerCase().replace(/\s+/g,"-");
const ACC = "var(--accent-color)";

const SKILLS = [
  { cat:"Frontend",       items:["Angular (v12+)","TypeScript","JavaScript ES6+","HTML5","CSS3","Bootstrap","AngularJS"] },
  { cat:"Backend",        items:["Java","Spring Boot","Spring MVC","Spring Security","RESTful APIs","Microservices","SOAP"] },
  { cat:"Database",       items:["MySQL","PostgreSQL","PL/SQL (Oracle)","MongoDB","Spring Data JPA","Hibernate"] },
  { cat:"DevOps & Tools", items:["Docker","Kubernetes","Git/GitHub","Maven","Postman","Swagger/OpenAPI","JIRA"] },
  { cat:"Payments",       items:["CyberSource","N-Genius","e-Wallet Integration","Installment Flows"] },
];

const EXPERIENCES = [
  { company:"Ernst & Young (EY)", role:"Software Engineer", period:"Feb 2026 – Present", location:"Coimbatore, India", color:ACC,
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
  const t=`DHINESH V — Full Stack Software Engineer\njavadevdhinesh@gmail.com | 8754447528 | Coimbatore, India\nLinkedIn: linkedin.com/in/dhineshse | GitHub: github.com/Dhinesh-Se\n\nEXPERIENCE\nErnst & Young (EY) — Software Engineer | Feb 2026 – Present\nKGiSL Technologies — Junior Associate / Full Stack Developer | Dec 2022 – Jan 2026\n\nSKILLS\nFrontend: Angular (v12+), TypeScript, JavaScript ES6+, HTML5, CSS3\nBackend: Java, Spring Boot, Spring MVC, Spring Security, RESTful APIs, Microservices\nDatabase: MySQL, PostgreSQL, PL/SQL (Oracle), MongoDB, Spring Data JPA, Hibernate\nDevOps: Docker, Kubernetes, Git/GitHub, Maven, Postman, Swagger/OpenAPI, JIRA\nPayments: CyberSource, N-Genius, e-Wallet Integration, Installment Flows\n\nPROJECTS\n1. Free Zone Portal (Dubai Insurance) — Spring Boot, Angular, Microservices, Oracle\n2. Worker Health Insurance WHI (Dubai Insurance) — Angular, Java, Spring Boot, SOAP\n3. Worker Protection Program WPP (Dubai Insurance) — Angular, Java, Spring Boot\n\nKEY ACHIEVEMENTS\n- WHI platform delivered in 30 days meeting government deadline\n- Group Claims workflow reduced settlement time by 30%\n- Bulk Policy Issuance dramatically improved throughput\n- Innovative e-wallet system integrated in WPP\n\nEDUCATION\nB.Tech – Information Technology (2018 – 2022)\nCoimbatore Institute of Engineering and Technology\nCertificate: Learn Java Programming – Beginner to Master`;
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

function AnimeCinematicIntro({onDone}){
  const[phase,setPhase]=useState(0);
  const canvasRef=useRef(null);
  const rafRef=useRef(null);
  const particlesRef=useRef([]);
  const lightningRef=useRef([]);
  const shockwaveRef=useRef(null);
  const[quoteText,setQuoteText]=useState("");
  const fullQuote="I'm gonna be the King of the Pirates!";

  // Phase timeline
  useEffect(()=>{
    const t0=setTimeout(()=>setPhase(1),400);       // Quote typewriter
    const t1=setTimeout(()=>setPhase(2),2800);       // Luffy VFX
    const t2=setTimeout(()=>{
      setPhase(3);                                    // Name reveal + shockwave
      animeSynth.playShockwave();
    },5800);
    const t3=setTimeout(()=>setPhase(4),7200);       // Fade out
    const t4=setTimeout(()=>onDone(),8200);           // Done
    return()=>{clearTimeout(t0);clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);clearTimeout(t4);};
  },[]);

  // Typewriter for quote
  useEffect(()=>{
    if(phase<1)return;
    let i=0;
    const iv=setInterval(()=>{
      setQuoteText(fullQuote.slice(0,++i));
      if(i>=fullQuote.length)clearInterval(iv);
    },45);
    return()=>clearInterval(iv);
  },[phase]);

  // Drums of Liberation heartbeat during phase 2
  useEffect(()=>{
    if(phase!==2)return;
    animeSynth.playDrumsOfLiberation();
    const iv=setInterval(()=>animeSynth.playDrumsOfLiberation(),800);
    return()=>clearInterval(iv);
  },[phase]);

  // Canvas VFX animation
  useEffect(()=>{
    const c=canvasRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    let W=c.width=window.innerWidth;
    let H=c.height=window.innerHeight;
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);

    // Steam particles generator
    const spawnSteam=()=>{
      for(let i=0;i<4;i++){
        particlesRef.current.push({
          x:W*0.3+Math.random()*W*0.4,
          y:H+10,
          vx:(Math.random()-0.5)*2,
          vy:-(Math.random()*4+2),
          r:Math.random()*20+8,
          alpha:Math.random()*0.5+0.3,
          isGold:Math.random()>0.4,
          life:1,
        });
      }
    };

    // Lightning bolt generator
    const spawnLightning=()=>{
      const pts=[];
      let cx=Math.random()*W;let cy=0;
      pts.push({x:cx,y:cy});
      const targetY=H*(0.4+Math.random()*0.4);
      while(cy<targetY){
        cx+=(Math.random()-0.5)*50;
        cy+=Math.random()*35+10;
        pts.push({x:cx,y:cy});
      }
      lightningRef.current.push({points:pts,life:1.0,decay:0.06});
    };

    let frame=0;
    const draw=()=>{
      ctx.clearRect(0,0,W,H);
      frame++;

      if(phase>=2){
        // Spawn steam particles
        if(frame%3===0)spawnSteam();
        // Spawn lightning occasionally
        if(frame%25===0)spawnLightning();

        // Draw red/golden aura glow behind center
        const auraRadius=Math.min(W,H)*0.35+Math.sin(frame*0.05)*20;
        const aura=ctx.createRadialGradient(W/2,H*0.45,0,W/2,H*0.45,auraRadius);
        aura.addColorStop(0,"rgba(255,80,20,0.15)");
        aura.addColorStop(0.5,"rgba(255,180,0,0.06)");
        aura.addColorStop(1,"rgba(255,50,10,0)");
        ctx.fillStyle=aura;
        ctx.fillRect(0,0,W,H);

        // Draw steam particles
        particlesRef.current.forEach((p,i)=>{
          p.x+=p.vx;p.y+=p.vy;p.vy*=0.99;p.r*=1.005;p.life-=0.008;p.alpha*=0.985;
          if(p.life<=0)return;
          ctx.save();
          ctx.globalAlpha=p.alpha*p.life;
          const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);
          if(p.isGold){
            g.addColorStop(0,"rgba(255,200,50,0.5)");
            g.addColorStop(1,"rgba(255,100,20,0)");
          }else{
            g.addColorStop(0,"rgba(255,60,20,0.6)");
            g.addColorStop(1,"rgba(200,20,5,0)");
          }
          ctx.fillStyle=g;
          ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
          ctx.restore();
        });
        particlesRef.current=particlesRef.current.filter(p=>p.life>0);

        // Draw lightning
        lightningRef.current.forEach(bolt=>{
          if(bolt.life<=0||bolt.points.length<2)return;
          ctx.save();
          ctx.globalAlpha=bolt.life*0.9;
          ctx.strokeStyle="rgba(180,120,255,0.95)";
          ctx.lineWidth=Math.random()*3+1.5;
          ctx.shadowBlur=18;ctx.shadowColor="#ba68c8";
          ctx.lineCap="round";
          ctx.beginPath();
          ctx.moveTo(bolt.points[0].x,bolt.points[0].y);
          for(let i=1;i<bolt.points.length;i++){
            ctx.lineTo(bolt.points[i].x+(Math.random()-0.5)*6,bolt.points[i].y);
          }
          ctx.stroke();
          // White core
          ctx.globalAlpha=bolt.life*0.4;ctx.strokeStyle="#fff";ctx.lineWidth=1;ctx.shadowBlur=6;ctx.shadowColor="#fff";
          ctx.beginPath();ctx.moveTo(bolt.points[0].x,bolt.points[0].y);
          for(let i=1;i<bolt.points.length;i++)ctx.lineTo(bolt.points[i].x,bolt.points[i].y);
          ctx.stroke();
          ctx.restore();
          bolt.life-=bolt.decay;
        });
        lightningRef.current=lightningRef.current.filter(b=>b.life>0);
      }

      // Phase 3: Shockwave ring
      if(phase>=3&&!shockwaveRef.current){
        shockwaveRef.current={r:0,maxR:Math.max(W,H)*0.8,alpha:0.7,speed:18};
      }
      if(shockwaveRef.current){
        const sw=shockwaveRef.current;
        sw.r+=sw.speed;sw.alpha*=0.96;
        if(sw.alpha>0.01){
          ctx.save();
          ctx.globalAlpha=sw.alpha;
          ctx.strokeStyle="#FFE600";ctx.lineWidth=3;ctx.shadowBlur=20;ctx.shadowColor="#FFE600";
          ctx.beginPath();ctx.arc(W/2,H*0.42,sw.r,0,Math.PI*2);ctx.stroke();
          // Inner ring
          ctx.strokeStyle="rgba(255,255,255,0.4)";ctx.lineWidth=1;
          ctx.beginPath();ctx.arc(W/2,H*0.42,sw.r*0.85,0,Math.PI*2);ctx.stroke();
          ctx.restore();
        }
      }

      rafRef.current=requestAnimationFrame(draw);
    };
    draw();
    return()=>{cancelAnimationFrame(rafRef.current);window.removeEventListener("resize",resize);};
  },[phase]);

  const introShake=phase===3?"screen-shake":"";
  return(
    <div className={introShake} style={{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",opacity:phase===4?0:1,transition:"opacity 1s ease",pointerEvents:phase===4?"none":"all"}}>
      {/* Scan lines overlay */}
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,.012) 2px,rgba(255,255,255,.012) 4px)",pointerEvents:"none",zIndex:5}}/>
      {/* Cinematic bars */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:"10%",background:"#000",zIndex:6}}/>
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:"10%",background:"#000",zIndex:6}}/>

      {/* VFX Canvas */}
      <canvas ref={canvasRef} style={{position:"absolute",inset:0,zIndex:1}}/>

      {/* Luffy silhouette image (visible in phase 2+) */}
      <div style={{
        position:"absolute",top:"50%",left:"50%",
        transform:`translate(-50%,-50%) scale(${phase>=2?1.05:0.9})`,
        width:"100vw",height:"100vh",
        backgroundImage:"url(/anime/luffy_landscape.png)",backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",
        opacity:phase>=2?(phase>=3?0.35:0.8):0,
        transition:"opacity 1s ease,transform 1.2s cubic-bezier(.25,.8,.25,1)",
        filter:phase>=3?"blur(4px)":"none",
        zIndex:2,
        mixBlendMode:"screen",
      }}/>

      {/* Content overlay */}
      <div style={{textAlign:"center",zIndex:7,position:"relative",maxWidth:700,padding:"0 20px"}}>
        {/* Phase 1: Luffy Quote */}
        <p style={{
          fontFamily:"'DM Mono',monospace",fontSize:"clamp(14px,2.5vw,20px)",
          color:"#FFE600",fontStyle:"italic",lineHeight:1.7,letterSpacing:".03em",
          opacity:phase>=1&&phase<3?1:0,
          transform:phase>=1?"translateY(0)":"translateY(20px)",
          transition:"opacity .8s ease,transform .8s ease",
          textShadow:"0 0 40px rgba(255,230,0,.5),0 0 80px rgba(255,100,20,.3)",
          minHeight:60,
        }}>
          "{quoteText}"
          {quoteText.length<fullQuote.length&&<span style={{animation:"blink .7s infinite"}}>▌</span>}
        </p>
        <p style={{
          fontFamily:"'DM Mono',monospace",fontSize:"clamp(9px,1.5vw,11px)",
          color:"rgba(255,255,255,.35)",letterSpacing:".4em",textTransform:"uppercase",
          marginTop:8,
          opacity:phase>=1&&phase<3?1:0,transition:"opacity .6s ease .5s",
        }}>— Monkey D. Luffy</p>

        {/* Phase 2: Gear Second indicator */}
        <div style={{
          marginTop:30,
          opacity:phase===2?1:0,
          transition:"opacity .6s ease",
        }}>
          <span style={{
            fontFamily:"'Bebas Neue',sans-serif",fontSize:"clamp(12px,2vw,16px)",
            letterSpacing:".3em",color:"#FF3D00",
            textShadow:"0 0 20px rgba(255,61,0,.8)",
            animation:"pulse 1s infinite",
          }}>⚡ GEAR SECOND — ACTIVATED ⚡</span>
        </div>

        {/* Phase 3: Name reveal */}
        <div style={{
          marginTop:phase>=3?0:40,
          opacity:phase>=3?1:0,
          transform:phase>=3?"scale(1) translateY(-30px)":"scale(1.3) translateY(30px)",
          transition:"all .6s cubic-bezier(.25,.8,.25,1)",
        }}>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:"clamp(10px,2vw,13px)",letterSpacing:".5em",color:"rgba(255,230,0,.7)",textTransform:"uppercase",marginBottom:18}}>A DHINESH V PRODUCTION</p>
          <h1 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(52px,12vw,120px)",color:"#fff",letterSpacing:"-.02em",lineHeight:.85,textShadow:"0 0 60px rgba(255,230,0,.5),0 0 120px rgba(255,60,10,.3)"}}>
            DHINESH<br/><span style={{color:"var(--accent-color)"}}>V.</span>
          </h1>
          <p style={{fontFamily:"'DM Mono',monospace",fontSize:"clamp(9px,1.5vw,11px)",letterSpacing:".3em",color:"rgba(255,255,255,.35)",textTransform:"uppercase",marginTop:16}}>FULL STACK SOFTWARE ENGINEER</p>
        </div>
      </div>

      {/* Skip button */}
      <button onClick={()=>onDone()} style={{
        position:"absolute",bottom:"14%",right:"5%",zIndex:10,
        background:"none",border:"1px solid rgba(255,255,255,.15)",borderRadius:4,
        padding:"6px 16px",color:"rgba(255,255,255,.3)",fontSize:10,
        fontFamily:"'DM Mono',monospace",letterSpacing:".1em",cursor:"pointer",
        transition:"color .2s,border-color .2s",
      }} onMouseEnter={e=>{e.target.style.color="#FFE600";e.target.style.borderColor="#FFE600";}} onMouseLeave={e=>{e.target.style.color="rgba(255,255,255,.3)";e.target.style.borderColor="rgba(255,255,255,.15)";}}>
        SKIP ▶
      </button>
    </div>
  );
}

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

function Counter({to,suffix="",dur=1800}){
  const[val,setVal]=useState(0);const[r,v]=useInView();
  useEffect(()=>{
    if(!v)return; let s=null;
    const f=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);setVal(Math.floor(p*to));if(p<1)requestAnimationFrame(f);};
    requestAnimationFrame(f);
  },[v,to,dur]);
  return<span ref={r}>{val}{suffix}</span>;
}

function TiltCard({children,style={},className="",isMobile=false}){
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
  return<div ref={ref} className={className} style={{transition:"transform .2s ease,box-shadow .2s ease",...style}} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</div>;
}

function CommandPalette({open,onClose,onMatrix,onDownload,onChat}){
  const[q,setQ]=useState("");const[sel,setSel]=useState(0);const inp=useRef(null);
  const filtered=CMD_ITEMS.filter(i=>i.label.toLowerCase().includes(q.toLowerCase()));
  useEffect(()=>{if(open){setQ("");setSel(0);setTimeout(()=>inp.current?.focus(),80);}},[open]);
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
    if(item.action==="chat")onChat();
    if(item.action==="email")window.open("mailto:javadevdhinesh@gmail.com");
    if(item.action==="linkedin")window.open("https://linkedin.com/in/dhineshse","_blank");
    if(item.action==="github")window.open("https://github.com/Dhinesh-Se","_blank");
    onClose();
  };
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
  const[intro,setIntro]=useState(true);
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
    } else {
      animeSynth.playGetsugaSlash();
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

  useEffect(() => {
    const handleGlobalClick = (e) => {
      const isClickable = e.target.closest("button, a, input, select, [data-hover], [role='button']");
      if (isClickable) {
        animeSynth.playSwordUnsheathe();
      }
    };
    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);
  useEffect(()=>{
    const f=()=>{
      const y=window.scrollY; setScrolled(y>40); setShowRocket(y>400);
      const secs=NAV_LINKS.map(l=>({id:l,el:document.getElementById(toId(l))}));
      for(let i=secs.length-1;i>=0;i--){
        const el=secs[i].el;
        if(el&&el.getBoundingClientRect().top<=120){
          setActive(prev => {
            if(prev !== secs[i].id){
              animeSynth.playEnergyWhoosh();
              vfxRef.current?.triggerRandom();
            }
            return secs[i].id;
          });
          break;
        }
      }
    };
    window.addEventListener("scroll",f); return()=>window.removeEventListener("scroll",f);
  },[]);

  const vfxRef = useRef(null);

  useEffect(()=>{document.body.style.overflow=menuOpen||intro?"hidden":"";return()=>{document.body.style.overflow="";};},[menuOpen,intro]);

  useEffect(()=>{
    const f=e=>{if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmdOpen(o=>{ if(!o) animeSynth.playPortalOpen(); return !o; });}};
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
    animeSynth.playZenitsuThunder();
    vfxRef.current?.triggerThunder();
  };

  const handleDl=()=>{
    animeSynth.playEnergyWhoosh();
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

      <AnimeBackgroundVFX ref={vfxRef} active={!intro && !bankaiOn} />
      {intro&&<AnimeCinematicIntro onDone={()=>setIntro(false)}/>}
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
        .film-strip{position:relative;overflow:hidden;}
        .film-strip::before,.film-strip::after{content:'';position:absolute;top:0;bottom:0;width:26px;background:repeating-linear-gradient(to bottom,#000 0,#000 8px,transparent 8px,transparent 20px);z-index:2;pointer-events:none;}
        .film-strip::before{left:0;}.film-strip::after{right:0;}
        .glow-border{box-shadow:0 0 0 1px rgba(255,230,0,.15);}
        .glow-border:hover{box-shadow:0 0 0 1px rgba(255,230,0,.45),0 0 36px rgba(255,230,0,.1);}
        .dot-grid{background-image:radial-gradient(rgba(255,255,255,.04) 1px,transparent 1px);background-size:28px 28px;}
        .scanlines::after{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.12) 2px,rgba(0,0,0,.12) 4px);pointer-events:none;z-index:1;}
        .bar{display:block;width:24px;height:2px;background:#E8E8F0;border-radius:2px;transition:all .3s;}
        .reel-divider{display:flex;align-items:center;gap:12px;margin:0 0 40px;}
        .reel-divider::before,.reel-divider::after{content:'';flex:1;height:1px;background:linear-gradient(to right,transparent,rgba(255,230,0,.22),transparent);}
        .skill-pill{padding:5px 12px;border:1px solid rgba(255,255,255,.1);border-radius:3px;font-size:11px;color:#aaa;background:rgba(255,255,255,.025);transition:all .2s;white-space:nowrap;}
        .skill-pill:hover{border-color:${ACC};color:${ACC};background:rgba(255,230,0,.05);transform:translateY(-1px);}
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
              Software Engineer <span style={{color:ACC}}>@</span> Ernst & Young
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
          <div style={{marginBottom:44,fontSize:11,color:"rgba(255,255,255,.22)",fontFamily:"'DM Mono',monospace",display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
            <span>Press</span>
            <kbd style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>⌘K</kbd>
            <span>for command palette ·</span>
            <kbd style={{border:"1px solid rgba(255,255,255,.15)",borderRadius:3,padding:"1px 6px",color:"rgba(255,255,255,.4)",fontFamily:"monospace"}}>🤖</kbd>
            <span>to chat with my AI</span>
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
                <div style={{position:"absolute",top:0,right:0,background:ACC,color:"#080810",fontSize:9,fontWeight:700,letterSpacing:".12em",padding:"4px 12px",fontFamily:"'DM Mono',monospace",zIndex:3}}>{p.genre}</div>
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
          <FadeIn from="right"><GitHubStats/></FadeIn>
        </div>
      </section>

      {/* ── ANIME DIMENSION ── */}
      <AnimeDimension onThemeChange={setAnimeTheme} isMobile={isMobile} />

      {/* ── CINEMA LAB ── */}
      <section id="cinema-lab" style={{padding:"80px clamp(20px,7vw,120px)"}}>
        <FadeIn>
          <div className="reel-divider"><span className="section-label">Cinematic Innovation</span></div>
          <h2 className="section-h" style={{marginBottom:18}}>Portfolio <span style={{color:ACC}}>Cinema Lab</span></h2>
          <p style={{color:"#888",fontSize:13,lineHeight:1.8,maxWidth:600,marginBottom:28}}>Interactive playground — switch genres, go IMAX, watch the career trailer, or decode my name.</p>
        </FadeIn>
        <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:24}}>
          {["Thriller","Sci-Fi","Action"].map(g=>(
            <button key={g} className="btn btn-outline" data-hover onClick={()=>setGenre(g)} style={{padding:"7px 14px",fontSize:11,borderColor:genre===g?ACC:"rgba(255,255,255,.2)",color:genre===g?ACC:"#aaa"}}>
              {genre===g?"✓ ":""}{g} Mode
            </button>
          ))}
          <button className="btn btn-primary" data-hover onClick={()=>setTrailerOpen(true)} style={{padding:"7px 14px",fontSize:11}}>▶ Watch Trailer</button>
          <button className="btn btn-outline" data-hover onClick={()=>setImaxMode(v=>!v)} style={{padding:"7px 14px",fontSize:11,borderColor:imaxMode?ACC:"rgba(255,255,255,.2)",color:imaxMode?ACC:"#aaa"}}>
            {imaxMode?"✓ IMAX ON":"IMAX Mode"}
          </button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:16}}>
          <TiltCard isMobile={isMobile} className="card" style={{padding:20}}>
            <div className="section-label" style={{marginBottom:8}}>🕐 Live Clock · Coimbatore (IST)</div>
            <div className="syne" style={{fontSize:32,color:ACC,marginBottom:4}}>{istTime}</div>
            <div style={{fontSize:11,color:"#555"}}>Asia/Kolkata — recruiter timezone reference</div>
          </TiltCard>
          <TiltCard isMobile={isMobile} className="card" style={{padding:20}}>
            <div className="section-label" style={{marginBottom:8}}>🔢 Binary/Hex Decoder</div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:"#666",marginBottom:8,wordBreak:"break-word",transition:"all .4s"}}>{decodedName}</div>
            <div style={{fontSize:16,color:ACC,fontFamily:"'Bebas Neue',sans-serif",letterSpacing:".08em"}}>→ DHINESH V</div>
          </TiltCard>
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
              <span style={{color:ACC}}>One developer</span> built insurance platforms at scale, delivered a government-grade WHI rollout in <span style={{color:ACC}}>30 days</span>, and keeps shipping secure fintech experiences across Dubai and India. Now at <span style={{color:ACC}}>Ernst & Young</span>, the next chapter begins.
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
          <span style={{color:"#444",fontSize:11}}>© 2026 Dhinesh V · Full Stack Software Engineer @ EY</span>
          <span style={{fontSize:10,color:"rgba(255,255,255,.12)"}}>🎬 A portfolio directed with passion · Try ↑↑↓↓←→←→BA 🎮</span>
        </div>
        <DlBtn cls="btn btn-outline" style={{padding:"6px 14px",fontSize:10}}/>
      </footer>
    </div>
  );
}
