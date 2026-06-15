import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   ANIME BACKGROUND VFX — Persistent Full-Screen Canvas
   Renders:
     • Zoro 3-sword diagonal slashes (green)
     • Zenitsu thunder lightning bolts (yellow-white)
     • Luffy Gear Second steam particles (red-gold)
   ═══════════════════════════════════════════════════════ */

const AnimeBackgroundVFX = forwardRef(function AnimeBackgroundVFX({ active = true }, ref) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const effectsRef = useRef([]);
  const autoTimerRef = useRef(null);

  /* ── EFFECT GENERATORS ── */

  const createZoroSlash = useCallback((W, H) => {
    // 3 diagonal slash lines
    const slashes = [];
    const baseAngle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3;
    const startX = Math.random() * W * 0.6 + W * 0.2;
    const startY = Math.random() * H * 0.4 + H * 0.1;

    for (let i = 0; i < 3; i++) {
      const angle = baseAngle + (i - 1) * 0.18;
      const len = Math.random() * 300 + 400;
      slashes.push({
        x1: startX + (i - 1) * 40,
        y1: startY + (i - 1) * 25,
        x2: startX + (i - 1) * 40 + Math.cos(angle) * len,
        y2: startY + (i - 1) * 25 + Math.sin(angle) * len,
        progress: 0,
        width: Math.random() * 3 + 2,
      });
    }

    return {
      type: "zoro",
      slashes,
      life: 1.0,
      decay: 0.025,
      flash: 1.0,
    };
  }, []);

  const createZenitsuThunder = useCallback((W, H) => {
    // Lightning bolt from top to random point
    const bolts = [];
    const boltCount = Math.floor(Math.random() * 2) + 1;

    for (let b = 0; b < boltCount; b++) {
      const points = [];
      let cx = Math.random() * W;
      let cy = 0;
      points.push({ x: cx, y: cy });

      const targetY = H * (0.5 + Math.random() * 0.4);
      while (cy < targetY) {
        cx += (Math.random() - 0.5) * 60;
        cy += Math.random() * 40 + 15;
        points.push({ x: cx, y: cy });
      }

      bolts.push({ points, branchProb: 0.15 });
    }

    return {
      type: "zenitsu",
      bolts,
      life: 1.0,
      decay: 0.04,
      flash: 1.0,
      flashDecay: 0.08,
    };
  }, []);

  const createLuffySteam = useCallback((W, H) => {
    const particles = [];
    const count = 25;
    const originX = Math.random() * W;
    const originY = H * 0.7 + Math.random() * H * 0.2;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: originX + (Math.random() - 0.5) * 200,
        y: originY + Math.random() * 60,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -(Math.random() * 3 + 1.5),
        r: Math.random() * 16 + 6,
        alpha: Math.random() * 0.4 + 0.2,
        isGold: Math.random() > 0.5,
      });
    }

    return {
      type: "steam",
      particles,
      life: 1.0,
      decay: 0.012,
    };
  }, []);

  /* ── TRIGGER FUNCTIONS (exposed via ref) ── */
  const triggerEffect = useCallback((type) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = canvas.width;
    const H = canvas.height;

    let effect;
    switch (type) {
      case "zoro":
        effect = createZoroSlash(W, H);
        break;
      case "zenitsu":
        effect = createZenitsuThunder(W, H);
        break;
      case "steam":
        effect = createLuffySteam(W, H);
        break;
      default: {
        // Random pick
        const types = ["zenitsu", "steam"];
        const pick = types[Math.floor(Math.random() * types.length)];
        effect = pick === "zenitsu"
          ? createZenitsuThunder(W, H)
          : createLuffySteam(W, H);
      }
    }

    effectsRef.current.push(effect);
  }, [createZoroSlash, createZenitsuThunder, createLuffySteam]);

  useImperativeHandle(ref, () => ({
    triggerSlash: () => triggerEffect("zoro"),
    triggerThunder: () => triggerEffect("zenitsu"),
    triggerSteam: () => triggerEffect("steam"),
    triggerRandom: () => triggerEffect("random"),
  }), [triggerEffect]);

  /* ── RENDER LOOP ── */
  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const drawZoroSlash = (effect) => {
      const { slashes, life, flash } = effect;

      // Screen flash
      if (flash > 0.5) {
        ctx.fillStyle = `rgba(100, 255, 120, ${(flash - 0.5) * 0.06})`;
        ctx.fillRect(0, 0, W, H);
      }

      slashes.forEach((s) => {
        // Animate progress
        if (s.progress < 1) s.progress = Math.min(1, s.progress + 0.12);

        const curX2 = s.x1 + (s.x2 - s.x1) * s.progress;
        const curY2 = s.y1 + (s.y2 - s.y1) * s.progress;

        // Glow trail
        ctx.save();
        ctx.globalAlpha = life * 0.6;
        ctx.strokeStyle = "#00FF44";
        ctx.lineWidth = s.width + 8;
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#00FF44";
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(curX2, curY2);
        ctx.stroke();

        // Sharp core line
        ctx.globalAlpha = life;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = s.width;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#88FF88";
        ctx.beginPath();
        ctx.moveTo(s.x1, s.y1);
        ctx.lineTo(curX2, curY2);
        ctx.stroke();
        ctx.restore();
      });

      effect.life -= effect.decay;
      effect.flash = Math.max(0, effect.flash - 0.06);
    };

    const drawZenitsuThunder = (effect) => {
      const { bolts, life, flash } = effect;

      // Yellow screen flash
      if (flash > 0.4) {
        ctx.fillStyle = `rgba(255, 230, 0, ${(flash - 0.4) * 0.08})`;
        ctx.fillRect(0, 0, W, H);
      }

      bolts.forEach((bolt) => {
        const { points } = bolt;
        if (points.length < 2) return;

        // Main bolt
        ctx.save();
        ctx.globalAlpha = life * 0.9;
        ctx.strokeStyle = "#FFE600";
        ctx.lineWidth = Math.random() * 3 + 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#FFE600";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          // Jitter existing points for animation
          const jx = points[i].x + (Math.random() - 0.5) * 6;
          const jy = points[i].y + (Math.random() - 0.5) * 3;
          ctx.lineTo(jx, jy);

          // Random branches
          if (Math.random() < bolt.branchProb) {
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(jx, jy);
            const bx = jx + (Math.random() - 0.5) * 80;
            const by = jy + Math.random() * 50;
            ctx.lineTo(bx, by);
            ctx.strokeStyle = "rgba(255, 255, 200, 0.6)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(jx, jy);
            ctx.strokeStyle = "#FFE600";
            ctx.lineWidth = Math.random() * 3 + 2;
          }
        }
        ctx.stroke();

        // White hot core
        ctx.globalAlpha = life * 0.5;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#FFFFFF";
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      });

      effect.life -= effect.decay;
      effect.flash = Math.max(0, effect.flash - effect.flashDecay);
    };

    const drawSteam = (effect) => {
      const { particles, life } = effect;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy *= 0.98;
        p.r *= 1.008;
        p.alpha *= 0.97;

        ctx.save();
        ctx.globalAlpha = p.alpha * life;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        if (p.isGold) {
          grad.addColorStop(0, "rgba(255, 200, 50, 0.4)");
          grad.addColorStop(1, "rgba(255, 100, 20, 0)");
        } else {
          grad.addColorStop(0, "rgba(255, 80, 30, 0.5)");
          grad.addColorStop(1, "rgba(200, 30, 10, 0)");
        }
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      effect.life -= effect.decay;
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Draw all active effects
      effectsRef.current.forEach((effect) => {
        if (effect.life <= 0) return;
        switch (effect.type) {
          case "zoro":
            drawZoroSlash(effect);
            break;
          case "zenitsu":
            drawZenitsuThunder(effect);
            break;
          case "steam":
            drawSteam(effect);
            break;
        }
      });

      // Prune dead effects
      effectsRef.current = effectsRef.current.filter((e) => e.life > 0);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Auto-trigger random effects every 4-8 seconds
    const startAutoTrigger = () => {
      const delay = 4000 + Math.random() * 4000;
      autoTimerRef.current = setTimeout(() => {
        triggerEffect("random");
        startAutoTrigger();
      }, delay);
    };
    startAutoTrigger();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(autoTimerRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [active, triggerEffect]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.55,
      }}
    />
  );
});

export default AnimeBackgroundVFX;
