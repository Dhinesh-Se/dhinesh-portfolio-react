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

  return (
    <section
      id="anime-dimension"
      style={{
        padding: "80px clamp(20px,7vw,120px)",
        background: "rgba(0, 0, 0, 0.3)",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255, 255, 255, 0.02)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.02)",
      }}
    >
      {/* Background radial highlight */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background: `radial-gradient(circle, ${
            activeChar ? CHARACTERS.find(c => c.id === activeChar).accent + "09" : "rgba(255, 230, 0, 0.03)"
          } 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="reel-divider">
          <span className="section-label" style={{ color: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600" }}>
            ⚔️ Anime Dimension ⚔️
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
            marginBottom: 44,
          }}
        >
          <div>
            <h2 className="section-h">
              Interactive<br />
              <span style={{ color: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600", textShadow: `0 0 40px ${activeChar ? CHARACTERS.find(c => c.id === activeChar).accent + "33" : "rgba(255,230,0,.15)"}` }}>
                Anime Laboratory
              </span>
            </h2>
            <p style={{ color: "#888", fontSize: 13, marginTop: 8, maxWidth: 550, fontFamily: "monospace" }}>
              Select a favorite character to undergo a **Dimensional Shift** and alter the energy grid. Hover to preview spiritual pressure!
            </p>
          </div>

        </div>

        {/* ── MUSIC player & CHARACTER GRID WRAPPER ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "3fr 1.5fr",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* 1. CHARACTER CARDS GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 16,
            }}
          >
            {CHARACTERS.map((char) => {
              const isActive = activeChar === char.id;
              const isHovered = false;
              return (
                <div
                  key={char.id}
                  onClick={() => handleCharClick(char.id)}
                  style={{
                    position: "relative",
                    borderRadius: 8,
                    overflow: "hidden",
                    border: `1px solid ${isActive ? char.accent : isHovered ? "rgba(255,255,255,.2)" : "rgba(255,255,255,.06)"}`,
                    height: 380,
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(.25, .8, .25, 1)",
                    transform: "none",
                    boxShadow: "none",
                    background: "#08080E",
                  }}
                >
                  {/* Card Background Character Image */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${char.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      opacity: isActive ? 0.64 : 0.42,
                      transition: "opacity 0.3s",
                      transform: "none",
                      filter: isActive ? "none" : "grayscale(30%)",
                    }}
                  />


                  {/* Dark Vignette Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(8,8,14,0.92) 20%, rgba(8,8,14,0.4) 60%, transparent 100%)",
                      zIndex: 2,
                    }}
                  />

                  {/* Active Border Glow */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        border: `2px solid ${char.accent}`,
                        borderRadius: 8,
                        pointerEvents: "none",
                        zIndex: 4,
                      }}
                    />
                  )}

                  {/* Character Info Overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 20,
                      zIndex: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono',monospace",
                        fontSize: 9,
                        letterSpacing: "0.15em",
                        color: char.accent,
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      {char.anime}
                    </span>
                    <h3
                      className="syne"
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#FFF",
                        marginTop: 4,
                        marginBottom: 6,
                      }}
                    >
                      {char.name}
                    </h3>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.45)",
                        marginBottom: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        display: "flex",
                        gap: 12,
                      }}
                    >
                      <span>Form: <strong style={{ color: "#eee" }}>{char.form}</strong></span>
                      <span>Ability: <strong style={{ color: "#eee" }}>{char.ability}</strong></span>
                    </div>
                    <p
                      style={{
                        fontSize: 11,
                        lineHeight: 1.6,
                        color: isActive || isHovered ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.38)",
                        fontStyle: "italic",
                        borderTop: `1px solid ${isActive ? "rgba(255,255,255,.12)" : "rgba(255,255,255,.05)"}`,
                        paddingTop: 10,
                        transition: "color 0.3s",
                      }}
                    >
                      "{char.quote}"
                    </p>

                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. BLEACH BGM MUSIC CONSOLE */}
          <div
            style={{
              background: "rgba(10,10,18,0.72)",
              border: `1px solid ${activeChar ? CHARACTERS.find(c => c.id === activeChar).accent + "33" : "rgba(255,255,255,.07)"}`,
              borderRadius: 8,
              padding: 20,
              boxShadow: "0 12px 32px rgba(0,0,0,.5)",
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Audio Node Element (Invisible) */}
            <audio
              ref={audioRef}
              src={TRACKS[currentTrackIdx].url}
              onTimeUpdate={onTimeUpdate}
              onEnded={onTrackEnded}
              preload="none"
            />

            {/* Header info */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: `1.5px solid ${activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600"}`,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 14,
                  animation: isPlaying ? "spin 3.5s linear infinite" : "none",
                  color: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600",
                }}
              >
                ❂
              </div>
              <div>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  Bleach Music Station
                </span>
                <h4 className="syne" style={{ fontSize: 13, color: "#fff", fontWeight: 700, marginTop: 2 }}>
                  Reiatsu Audio Player
                </h4>
              </div>
            </div>

            {/* Visualizer Canvas */}
            <canvas
              ref={visualizerCanvasRef}
              style={{
                width: "100%",
                height: 52,
                background: "rgba(255,255,255,0.015)",
                borderRadius: 4,
                marginBottom: 16,
                border: "1px solid rgba(255,255,255,.03)",
              }}
            />

            {/* Track Metadata */}
            <div style={{ textAlign: "center", margin: "14px 0" }}>
              <div
                style={{
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 12,
                  color: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {TRACKS[currentTrackIdx].name}
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", marginTop: 2 }}>
                {TRACKS[currentTrackIdx].desc}
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                height: 3,
                background: "rgba(255,255,255,.05)",
                borderRadius: 2,
                position: "relative",
                cursor: "pointer",
                marginBottom: 18,
              }}
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
                  background: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600",
                  width: `${trackProgress}%`,
                  borderRadius: 2,
                  position: "relative",
                  boxShadow: `0 0 6px ${activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600"}80`,
                }}
              />
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <button
                className="btn btn-outline"
                onClick={() => handleTrackChange(currentTrackIdx - 1)}
                style={{
                  padding: 8,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  borderColor: "rgba(255,255,255,.08)",
                }}
                title="Prev Track"
              >
                ◀
              </button>

              <button
                onClick={handlePlayPause}
                style={{
                  background: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600",
                  border: "none",
                  color: "#09090F",
                  padding: 10,
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 16,
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: `0 4px 12px ${activeChar ? CHARACTERS.find(c => c.id === activeChar).accent + "40" : "rgba(255, 230, 0, 0.3)"}`,
                }}
                title={isPlaying ? "Pause BGM" : "Play BGM"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <button
                className="btn btn-outline"
                onClick={() => handleTrackChange(currentTrackIdx + 1)}
                style={{
                  padding: 8,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  fontSize: 12,
                  borderColor: "rgba(255,255,255,.08)",
                }}
                title="Next Track"
              >
                ▶
              </button>
            </div>

            {/* Volume Control */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", width: 22 }}>VOL</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  height: 2,
                  background: "rgba(255,255,255,.15)",
                  accentColor: activeChar ? CHARACTERS.find(c => c.id === activeChar).accent : "#FFE600",
                  cursor: "pointer",
                }}
              />
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", width: 26, textAlign: "right" }}>
                {Math.round(volume * 100)}%
              </span>
            </div>

            {/* Fallback Notice */}
            {audioError && (
              <div
                style={{
                  marginTop: 12,
                  fontSize: 8,
                  color: "#ff4444",
                  fontFamily: "monospace",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                ⚠️ Streaming limited by browser policies. Playing simulation visualizer!
              </div>
            )}
          </div>
        </div>

        {/* Dynamic theme active notification */}
        {activeChar && (
          <div
            style={{
              marginTop: 24,
              padding: "10px 18px",
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${CHARACTERS.find(c => c.id === activeChar).accent}22`,
              borderRadius: 6,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              animation: "slideDown 0.3s ease",
            }}
          >
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.6)", fontFamily: "monospace" }}>
              Spiritual frequency lock: <strong style={{ color: CHARACTERS.find(c => c.id === activeChar).accent }}>{CHARACTERS.find(c => c.id === activeChar).name}</strong> active.
            </span>
            <button
              onClick={() => handleCharClick(activeChar)}
              style={{
                background: "none",
                border: `1px solid ${CHARACTERS.find(c => c.id === activeChar).accent}`,
                padding: "3px 8px",
                fontSize: 9,
                color: CHARACTERS.find(c => c.id === activeChar).accent,
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: "monospace",
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

