import { useState, useEffect, useRef } from "react";

/* ═══════════ WEB AUDIO SOUND SYNTHESIZER ═══════════ */
class AnimeSoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playGetsugaSlash() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    // Whoosh (Noise + Filter sweep)
    const bufferSize = ctx.sampleRate * 0.4; // 0.4s whoosh
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(8000, now + 0.15);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.4);
    filter.Q.setValueAtTime(3, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.4, now + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    // Blade ring (Oscillator pitch sweep)
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(2000, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    const delay = ctx.createDelay();
    delay.delayTime.setValueAtTime(0.02, now);
    const feedback = ctx.createGain();
    feedback.gain.setValueAtTime(0.45, now);

    // Echo path
    oscGain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);

    // Output connections
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    delay.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.4);
    osc.start(now);
    osc.stop(now + 0.45);
  }

  playReiatsuCharge() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const duration = 1.2;

    // Modulator LFO for spiritual pressure shaking
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.setValueAtTime(12, now); // 12Hz vibrations

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(15, now);

    // Carrier for the energy hum
    const carrier = ctx.createOscillator();
    carrier.type = "sawtooth";
    carrier.frequency.setValueAtTime(50, now);
    carrier.frequency.exponentialRampToValueAtTime(280, now + duration);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.exponentialRampToValueAtTime(1500, now + duration);
    filter.Q.setValueAtTime(6, now);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.4, now + 0.25);
    gainNode.gain.linearRampToValueAtTime(0.3, now + duration - 0.25);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(carrier.frequency);

    carrier.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    lfo.start(now);
    lfo.stop(now + duration);
    carrier.start(now);
    carrier.stop(now + duration);
  }

  playThunderStrike() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    // 1. Crack (Noise burst)
    const crackSize = ctx.sampleRate * 0.15;
    const crackBuffer = ctx.createBuffer(1, crackSize, ctx.sampleRate);
    const crackData = crackBuffer.getChannelData(0);
    for (let i = 0; i < crackSize; i++) {
      crackData[i] = Math.random() * 2 - 1;
    }
    const crackSrc = ctx.createBufferSource();
    crackSrc.buffer = crackBuffer;

    const crackFilter = ctx.createBiquadFilter();
    crackFilter.type = "highpass";
    crackFilter.frequency.setValueAtTime(1000, now);

    const crackGain = ctx.createGain();
    crackGain.gain.setValueAtTime(0.5, now);
    crackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    // 2. Boom (Sub-bass drop)
    const boomOsc = ctx.createOscillator();
    boomOsc.type = "sine";
    boomOsc.frequency.setValueAtTime(140, now);
    boomOsc.frequency.exponentialRampToValueAtTime(35, now + 0.85);

    const boomGain = ctx.createGain();
    boomGain.gain.setValueAtTime(0, now);
    boomGain.gain.linearRampToValueAtTime(0.75, now + 0.02);
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    crackSrc.connect(crackFilter);
    crackFilter.connect(crackGain);
    crackGain.connect(ctx.destination);

    boomOsc.connect(boomGain);
    boomGain.connect(ctx.destination);

    crackSrc.start(now);
    crackSrc.stop(now + 0.15);
    boomOsc.start(now);
    boomOsc.stop(now + 0.9);
  }

  playWaterSlash() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const duration = 0.6;

    // Swoosh sword pitch sweep
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1600, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + duration * 0.5);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Splashing sound (Filter-swept white noise)
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(300, now);
    filter.frequency.linearRampToValueAtTime(1800, now + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(120, now + duration);
    filter.Q.setValueAtTime(1.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.25, now + 0.08);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
    noise.start(now);
    noise.stop(now + duration);
  }

  playDrumsOfLiberation() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const beat = (time, intensity = 1.0) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(95, time);
      osc.frequency.exponentialRampToValueAtTime(32, time + 0.18);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(150, time);

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, time);
      gainNode.gain.linearRampToValueAtTime(0.85 * intensity, time + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(time);
      osc.stop(time + 0.3);
    };

    // Heartbeat double drum strike
    beat(now, 1.0);
    beat(now + 0.16, 0.7);
  }

  /* ── Quick sword unsheathe "shing!" for button/link clicks ── */
  playSwordUnsheathe() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    // Metallic ring
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(3200, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.12);

    const oscGain = ctx.createGain();
    oscGain.gain.setValueAtTime(0, now);
    oscGain.gain.linearRampToValueAtTime(0.18, now + 0.01);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    // Tiny noise whoosh
    const bufSize = ctx.sampleRate * 0.1;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const nf = ctx.createBiquadFilter();
    nf.type = "highpass";
    nf.frequency.setValueAtTime(4000, now);

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0, now);
    ng.gain.linearRampToValueAtTime(0.12, now + 0.01);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(oscGain); oscGain.connect(ctx.destination);
    noise.connect(nf); nf.connect(ng); ng.connect(ctx.destination);

    osc.start(now); osc.stop(now + 0.15);
    noise.start(now); noise.stop(now + 0.1);
  }

  /* ── Zenitsu-style thunder crack for navigation ── */
  playZenitsuThunder() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    // Sharp electric crack
    const crackSize = ctx.sampleRate * 0.08;
    const crackBuf = ctx.createBuffer(1, crackSize, ctx.sampleRate);
    const cd = crackBuf.getChannelData(0);
    for (let i = 0; i < crackSize; i++) cd[i] = Math.random() * 2 - 1;
    const crack = ctx.createBufferSource();
    crack.buffer = crackBuf;

    const cf = ctx.createBiquadFilter();
    cf.type = "bandpass";
    cf.frequency.setValueAtTime(6000, now);
    cf.Q.setValueAtTime(2, now);

    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.3, now);
    cg.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    // Buzzing electric resonance
    const buzz = ctx.createOscillator();
    buzz.type = "sawtooth";
    buzz.frequency.setValueAtTime(220, now);
    buzz.frequency.exponentialRampToValueAtTime(80, now + 0.25);

    const bf = ctx.createBiquadFilter();
    bf.type = "lowpass";
    bf.frequency.setValueAtTime(800, now);
    bf.frequency.exponentialRampToValueAtTime(200, now + 0.25);

    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0, now);
    bg.gain.linearRampToValueAtTime(0.2, now + 0.01);
    bg.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    crack.connect(cf); cf.connect(cg); cg.connect(ctx.destination);
    buzz.connect(bf); bf.connect(bg); bg.connect(ctx.destination);

    crack.start(now); crack.stop(now + 0.08);
    buzz.start(now); buzz.stop(now + 0.3);
  }

  /* ── Subtle energy whoosh for scroll transitions ── */
  playEnergyWhoosh() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const bufSize = ctx.sampleRate * 0.2;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.setValueAtTime(200, now);
    f.frequency.exponentialRampToValueAtTime(3000, now + 0.1);
    f.frequency.exponentialRampToValueAtTime(200, now + 0.2);
    f.Q.setValueAtTime(1.5, now);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.1, now + 0.04);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    noise.connect(f); f.connect(g); g.connect(ctx.destination);
    noise.start(now); noise.stop(now + 0.2);
  }

  /* ── Soft hover tick ── */
  playHoverTick() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(2400, now);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.06, now + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.06);
  }

  /* ── Portal opening reverse sweep for command palette ── */
  playPortalOpen() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.exponentialRampToValueAtTime(1800, now + 0.25);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.15, now + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.setValueAtTime(400, now);
    f.frequency.exponentialRampToValueAtTime(4000, now + 0.25);

    osc.connect(f); f.connect(g); g.connect(ctx.destination);
    osc.start(now); osc.stop(now + 0.3);
  }

  /* ── Shockwave impact for intro name reveal ── */
  playShockwave() {
    this.init();
    const { ctx } = this;
    const now = ctx.currentTime;

    // Deep impact
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.6);

    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.6, now + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    // White noise burst
    const bufSize = ctx.sampleRate * 0.15;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;

    const nf = ctx.createBiquadFilter();
    nf.type = "lowpass";
    nf.frequency.setValueAtTime(2000, now);
    nf.frequency.exponentialRampToValueAtTime(100, now + 0.15);

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.35, now);
    ng.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(g); g.connect(ctx.destination);
    noise.connect(nf); nf.connect(ng); ng.connect(ctx.destination);

    osc.start(now); osc.stop(now + 0.7);
    noise.start(now); noise.stop(now + 0.15);
  }
}

// Singleton synth instance
const synth = new AnimeSoundSynth();

/* ═══════════ TRACK DATA ═══════════ */
const TRACKS = [
  {
    name: "On the Precipice of Defeat",
    desc: "Tense Battle Themes",
    url: "https://archive.org/download/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/01.%20On%20the%20Precipice%20of%20Defeat.mp3",
  },
  {
    name: "Number One (Vocal Version)",
    desc: "Ichigo Kurosaki Theme",
    url: "https://archive.org/download/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%201/21.%20Number%20One%20%28Vocal%20version%29.mp3",
  },
  {
    name: "Clavar La Espada",
    desc: "Espada Spanish Guitar",
    url: "https://archive.org/download/bleach-ost_202205/BLEACH%20OST/Bleach%20Original%20Soundtrack%203/04.%20clavar%20la%20espada.mp3",
  },
  {
    name: "Treachery (Aizen Theme)",
    desc: "Epic Orchestral Rock",
    url: "https://archive.org/download/bleach-ost_202205/BLEACH%20OST/02.%20Diamond%20Dust%20Rebellion/24.%20Treachery.mp3",
  },
  {
    name: "Number One (TYBW)",
    desc: "Modern Spiritual Pressure",
    url: "https://archive.org/download/bleach-ost_202205/BLEACH%20OST/Number%20One%20%28TYBW%29.mp3",
  },
];

/* ═══════════ CHARACTER DATA ═══════════ */
const CHARACTERS = [
  {
    id: "luffy",
    name: "Monkey D. Luffy",
    anime: "One Piece",
    img: "/anime/luffy.png",
    accent: "#FFE600",
    quote: "If you don't take risks, you can't create a future!",
    form: "GEAR 5 (NIKA)",
    ability: "Drums of Liberation",
    sfx: () => synth.playDrumsOfLiberation(),
  },
  {
    id: "eren",
    name: "Eren Yeager",
    anime: "Attack on Titan",
    img: "/anime/eren.png",
    accent: "#FF3D00",
    quote: "If you win, you live. If you lose, you die. If you don't fight, you can't win!",
    form: "ATTACK TITAN",
    ability: "Rumbling Core",
    sfx: () => synth.playThunderStrike(),
  },
  {
    id: "tanjiro",
    name: "Tanjiro Kamado",
    anime: "Demon Slayer",
    img: "/anime/tanjiro.png",
    accent: "#00E5FF",
    quote: "No matter how many people you lose, you have no choice but to go on living.",
    form: "HINOKAMI KAGURA",
    ability: "Sun Breathing",
    sfx: () => synth.playWaterSlash(),
  },
];

export default function AnimeDimension({ onThemeChange, isMobile }) {
  const [activeChar, setActiveChar] = useState(null);
  const [previewChar, setPreviewChar] = useState(null);
  const soundEnabled = false;

  // Music Player States
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(0.45);
  const [audioError, setAudioError] = useState(false);

  // Visualizer Canvas Refs
  const audioRef = useRef(null);
  const visualizerCanvasRef = useRef(null);
  const animationFrameIdRef = useRef(null);

  // Web Audio Context & Analyzer Node for Player
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);

  /* Static character cards: image aura animations were removed for a calmer presentation. */

  /* ═══════════ MUSIC PLAYER ENGINE ═══════════ */
  const initializeAudioContext = () => {
    if (audioContextRef.current) return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128; // high performance bar resolution

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      if (audioRef.current) {
        // Enable crossOrigin credentials for visualizer CORS
        audioRef.current.crossOrigin = "anonymous";
        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        sourceRef.current = source;
      }
    } catch (e) {
      console.warn("Could not create Web Audio Graph for music. Defaulting to simulated visualizer.", e);
    }
  };

  const handlePlayPause = () => {
    synth.init(); // awaken sounds
    initializeAudioContext();

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback error:", err);
        setAudioError(true);
        // Trigger visualizer animation anyway even if blocked
        setIsPlaying(true);
      });
    }
  };

  const handleTrackChange = (index) => {
    setAudioError(false);
    let nextIdx = index;
    if (index >= TRACKS.length) nextIdx = 0;
    if (index < 0) nextIdx = TRACKS.length - 1;

    setCurrentTrackIdx(nextIdx);
    setTrackProgress(0);

    // Give state time to update before loading track
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.load();
        if (isPlaying) {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            setIsPlaying(false);
          });
        }
      }
    }, 50);

  };

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track progress
  const onTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setTrackProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const onTrackEnded = () => {
    handleTrackChange(currentTrackIdx + 1);
  };

  /* ═══════════ CANVAS MUSIC VISUALIZER ═══════════ */
  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    const drawVisualizer = () => {
      animationFrameIdRef.current = requestAnimationFrame(drawVisualizer);
      ctx.clearRect(0, 0, W, H);

      let dataArray = [];
      let bufferLength = 32;

      const activeColor = activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600";

      if (isPlaying && analyserRef.current && !audioError) {
        // Retrieve real frequency data
        bufferLength = analyserRef.current.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);
      } else if (isPlaying) {
        // Simulated responsive visualizer if audio blocked or CORS fails
        bufferLength = 32;
        dataArray = Array.from({ length: bufferLength }, (_, i) => {
          const base = Math.sin(Date.now() * 0.005 + i * 0.3) * 35 + 40;
          const randomSpike = Math.random() > 0.9 ? Math.random() * 30 : 0;
          return Math.min(255, Math.max(0, base + randomSpike));
        });
      } else {
        // Flat bars when quiet
        bufferLength = 32;
        dataArray = Array.from({ length: bufferLength }, () => 4);
      }

      const barWidth = (W / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        // Normalize value to canvas height
        const percent = dataArray[i] / 255;
        const barHeight = Math.max(2, percent * H * 0.9);

        // Gradient for visualizer bar
        const grad = ctx.createLinearGradient(0, H, 0, H - barHeight);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.02)");
        grad.addColorStop(0.5, activeColor + "70");
        grad.addColorStop(1, activeColor);

        ctx.fillStyle = grad;
        // Rounded bars
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, H - barHeight, barWidth - 2, barHeight, [2, 2, 0, 0]);
          ctx.fill();
        } else {
          ctx.fillRect(x, H - barHeight, barWidth - 2, barHeight);
        }

        x += barWidth;
      }
    };

    drawVisualizer();

    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [isPlaying, activeChar, audioError]);

  /* ═══════════ ACTION HANDLERS ═══════════ */
  const handleCharClick = (charId) => {
    let newChar = charId;
    if (activeChar === charId) {
      newChar = null; // reset if clicked again
    }

    setActiveChar(newChar);
    onThemeChange(newChar);

    if (newChar && soundEnabled) {
      // Trigger heavier sound effect and Reiatsu charge
      synth.playReiatsuCharge();
      setTimeout(() => {
        const target = CHARACTERS.find(c => c.id === newChar);
        if (target) target.sfx();
      }, 200);
    }
  };

  /* ═══════════ REDESIGNED RENDER ═══════════ */
  const shown = CHARACTERS.find(c => c.id === (previewChar || activeChar)) || null;
  const activeMeta = activeChar ? CHARACTERS.find(c => c.id === activeChar) : null;
  const accent = activeMeta ? activeMeta.accent : "#FFE600";

  return (
    <section
      id="anime-dimension"
      style={{
        padding: "80px clamp(20px,7vw,120px)",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, rgba(0,0,0,.42) 0%, rgba(0,0,0,.18) 50%, rgba(0,0,0,.42) 100%)",
        borderTop: "1px solid rgba(255,255,255,.03)",
        borderBottom: "1px solid rgba(255,255,255,.03)",
      }}
    >
      {/* Ambient aura follows the selected character */}
      <div
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: "70%",
          height: "130%",
          background: `radial-gradient(ellipse at center, ${accent}14 0%, transparent 62%)`,
          pointerEvents: "none",
          transition: "background .6s ease",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="reel-divider">
          <span className="section-label" style={{ color: accent, transition: "color .4s" }}>
            ⚔️ Anime Dimension ⚔️
          </span>
        </div>

        <div style={{ marginBottom: 36 }}>
          <h2 className="section-h">
            Choose Your<br />
            <span style={{ color: accent, textShadow: `0 0 40px ${accent}33`, transition: "color .4s" }}>
              Fighter
            </span>
          </h2>
          <p style={{ color: "#888", fontSize: 13, marginTop: 10, maxWidth: 560, lineHeight: 1.8 }}>
            Three heroes, three frequencies. Pick one and the entire site shifts to their energy. Tap again to reset the dimension.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.9fr 1fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          {/* ── CHARACTER STAGE ── */}
          <div
            style={{
              position: "relative",
              borderRadius: 10,
              overflow: "hidden",
              minHeight: isMobile ? 380 : 460,
              border: `1px solid ${shown ? shown.accent + "55" : "rgba(255,255,255,.08)"}`,
              boxShadow: shown ? `0 24px 60px ${shown.accent}18, inset 0 0 0 1px rgba(0,0,0,.4)` : "0 24px 60px rgba(0,0,0,.4)",
              background: "#07070D",
              transition: "border-color .4s, box-shadow .4s",
            }}
          >
            {shown ? (
              <>
                {/* Stage image */}
                <div
                  key={shown.id}
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${shown.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    opacity: 0.75,
                    animation: "fadeIn .5s ease",
                  }}
                />
                {/* Readability gradients */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,7,13,.96) 8%, rgba(7,7,13,.35) 45%, rgba(7,7,13,.05) 75%)", zIndex: 1 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(7,7,13,.55) 0%, transparent 45%)", zIndex: 1 }} />

                {/* Status chip */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(0,0,0,.55)",
                    backdropFilter: "blur(6px)",
                    border: `1px solid ${activeChar === shown.id ? shown.accent : "rgba(255,255,255,.18)"}`,
                    borderRadius: 100,
                    padding: "5px 14px",
                  }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeChar === shown.id ? shown.accent : "#666", boxShadow: activeChar === shown.id ? `0 0 10px ${shown.accent}` : "none" }} />
                  <span style={{ fontSize: 9, letterSpacing: ".18em", color: activeChar === shown.id ? shown.accent : "#999", textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>
                    {activeChar === shown.id ? "Dimension Active" : "Previewing"}
                  </span>
                </div>

                {/* Big name + meta overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: isMobile ? 20 : 28, zIndex: 2 }}>
                  <div style={{ fontSize: 10, letterSpacing: ".2em", color: shown.accent, textTransform: "uppercase", fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>
                    {shown.anime}
                  </div>
                  <div className="bebas" style={{ fontSize: isMobile ? 44 : "clamp(48px,6vw,84px)", lineHeight: .92, color: "#FFF", letterSpacing: ".02em", textShadow: "0 4px 30px rgba(0,0,0,.6)" }}>
                    {shown.name}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
                    <span style={{ fontSize: 9, letterSpacing: ".1em", padding: "4px 10px", border: `1px solid ${shown.accent}66`, borderRadius: 3, color: shown.accent, background: `${shown.accent}14`, textTransform: "uppercase" }}>
                      {shown.form}
                    </span>
                    <span style={{ fontSize: 9, letterSpacing: ".1em", padding: "4px 10px", border: "1px solid rgba(255,255,255,.16)", borderRadius: 3, color: "#BBB", textTransform: "uppercase" }}>
                      {shown.ability}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,.62)", fontStyle: "italic", maxWidth: 480, borderLeft: `2px solid ${shown.accent}`, paddingLeft: 12 }}>
                    "{shown.quote}"
                  </p>
                </div>
              </>
            ) : (
              /* Idle stage: invite a pick */
              <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "radial-gradient(ellipse at center, rgba(255,230,0,.05) 0%, transparent 60%)" }}>
                <div style={{ textAlign: "center", padding: 20 }}>
                  <div style={{ fontSize: 44, marginBottom: 14, animation: "float 4s ease-in-out infinite" }}>⚔️</div>
                  <div className="bebas" style={{ fontSize: isMobile ? 34 : 46, color: "rgba(255,255,255,.85)", letterSpacing: ".04em" }}>No Fighter Selected</div>
                  <p style={{ fontSize: 12, color: "#777", marginTop: 8, fontFamily: "'DM Mono',monospace" }}>Pick a character from the roster to shift the dimension.</p>
                </div>
              </div>
            )}
          </div>

          {/* ── ROSTER + MUSIC COLUMN ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Roster tiles */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(3,1fr)" : "1fr", gap: 12 }}>
              {CHARACTERS.map((char) => {
                const isActive = activeChar === char.id;
                return (
                  <div
                    key={char.id}
                    data-hover
                    onClick={() => handleCharClick(char.id)}
                    onMouseEnter={() => setPreviewChar(char.id)}
                    onMouseLeave={() => setPreviewChar(null)}
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      alignItems: "center",
                      gap: isMobile ? 8 : 14,
                      padding: isMobile ? "12px 8px" : "12px 16px",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: isActive ? `${char.accent}12` : "rgba(255,255,255,.025)",
                      border: `1px solid ${isActive ? char.accent : "rgba(255,255,255,.08)"}`,
                      boxShadow: isActive ? `0 8px 24px ${char.accent}22` : "none",
                      transition: "all .25s ease",
                      textAlign: isMobile ? "center" : "left",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? 52 : 58,
                        height: isMobile ? 52 : 58,
                        borderRadius: 6,
                        backgroundImage: `url(${char.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center top",
                        flexShrink: 0,
                        border: `1px solid ${isActive ? char.accent : "rgba(255,255,255,.12)"}`,
                        filter: isActive ? "none" : "grayscale(45%)",
                        transition: "filter .25s",
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 8, letterSpacing: ".16em", color: char.accent, textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>
                        {char.anime}
                      </div>
                      <div className="syne" style={{ fontSize: isMobile ? 11 : 14, fontWeight: 700, color: "#EEE", marginTop: 3, lineHeight: 1.2 }}>
                        {char.name}
                      </div>
                    </div>
                    {!isMobile && (
                      <div
                        style={{
                          fontSize: 9,
                          letterSpacing: ".1em",
                          fontFamily: "'DM Mono',monospace",
                          color: isActive ? char.accent : "rgba(255,255,255,.3)",
                          border: `1px solid ${isActive ? char.accent : "rgba(255,255,255,.12)"}`,
                          borderRadius: 3,
                          padding: "3px 8px",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        {isActive ? "Active" : "Select"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── MUSIC CONSOLE (slim bar) ── */}
            <div
              style={{
                background: "rgba(10,10,18,0.72)",
                border: `1px solid ${accent}22`,
                borderRadius: 8,
                padding: "16px 18px",
                backdropFilter: "blur(12px)",
                position: "relative",
                overflow: "hidden",
                transition: "border-color .4s",
              }}
            >
              <audio
                ref={audioRef}
                src={TRACKS[currentTrackIdx].url}
                onTimeUpdate={onTimeUpdate}
                onEnded={onTrackEnded}
                preload="none"
              />

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    border: `1.5px solid ${accent}`,
                    display: "grid",
                    placeItems: "center",
                    fontSize: 13,
                    animation: isPlaying ? "spin 3.5s linear infinite" : "none",
                    color: accent,
                    flexShrink: 0,
                    transition: "color .4s, border-color .4s",
                  }}
                >
                  ❂
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: accent, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", transition: "color .4s" }}>
                    {TRACKS[currentTrackIdx].name}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginTop: 1 }}>
                    Bleach Music Station · {TRACKS[currentTrackIdx].desc}
                  </div>
                </div>
              </div>

              <canvas
                ref={visualizerCanvasRef}
                style={{
                  width: "100%",
                  height: 40,
                  background: "rgba(255,255,255,0.015)",
                  borderRadius: 4,
                  marginBottom: 12,
                  border: "1px solid rgba(255,255,255,.03)",
                }}
              />

              {/* Progress Bar */}
              <div
                style={{ height: 3, background: "rgba(255,255,255,.05)", borderRadius: 2, cursor: "pointer", marginBottom: 14 }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  if (audioRef.current && audioRef.current.duration) {
                    audioRef.current.currentTime = pct * audioRef.current.duration;
                    setTrackProgress(pct * 100);
                  }
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: accent,
                    width: `${trackProgress}%`,
                    borderRadius: 2,
                    boxShadow: `0 0 6px ${accent}80`,
                    transition: "background .4s",
                  }}
                />
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button className="btn btn-outline" onClick={() => handleTrackChange(currentTrackIdx - 1)} style={{ padding: 6, width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, borderColor: "rgba(255,255,255,.08)" }} title="Prev Track">◀</button>
                  <button
                    onClick={handlePlayPause}
                    style={{
                      background: accent,
                      border: "none",
                      color: "#09090F",
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 14,
                      cursor: "pointer",
                      fontWeight: "bold",
                      boxShadow: `0 4px 12px ${accent}40`,
                      transition: "background .4s",
                    }}
                    title={isPlaying ? "Pause BGM" : "Play BGM"}
                  >
                    {isPlaying ? "⏸" : "▶"}
                  </button>
                  <button className="btn btn-outline" onClick={() => handleTrackChange(currentTrackIdx + 1)} style={{ padding: 6, width: 30, height: 30, borderRadius: "50%", display: "grid", placeItems: "center", fontSize: 11, borderColor: "rgba(255,255,255,.08)" }} title="Next Track">▶</button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>VOL</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{ flex: 1, height: 2, background: "rgba(255,255,255,.15)", accentColor: accent, cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", width: 26, textAlign: "right" }}>
                    {Math.round(volume * 100)}%
                  </span>
                </div>
              </div>

              {audioError && (
                <div style={{ marginTop: 10, fontSize: 8, color: "#ff4444", fontFamily: "monospace", textAlign: "center", lineHeight: 1.4 }}>
                  ⚠️ Streaming limited by browser policies. Playing simulation visualizer!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active-dimension notice */}
        {activeChar && (
          <div
            style={{
              marginTop: 20,
              padding: "10px 18px",
              background: `${accent}0D`,
              border: `1px solid ${accent}33`,
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              animation: "slideDown 0.3s ease",
            }}
          >
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontFamily: "monospace" }}>
              Spiritual frequency lock: <strong style={{ color: accent }}>{activeMeta.name}</strong> active.
            </span>
            <button
              onClick={() => handleCharClick(activeChar)}
              style={{
                background: "none",
                border: `1px solid ${accent}`,
                padding: "4px 10px",
                fontSize: 9,
                color: accent,
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "monospace",
                letterSpacing: ".08em",
              }}
            >
              RESET DIMENSION ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
