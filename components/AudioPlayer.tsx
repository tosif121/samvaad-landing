'use client';
import { useRef, useState, useEffect, useCallback } from 'react';

const BARS = 120;
const SPEEDS = [1, 1.5, 2, 0.75];

export type TranscriptLine = {
  id: number;
  speaker: 'ai' | 'user';
  name: string;
  start: number;
  end: number;
  text: string;
};

function fmtTime(s: number) {
  const sec = Math.round(s);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

// ─── WAVEFORM ────────────────────────────────────────────────────────────────
function Waveform({
  progress, onSeek, duration, transcript,
}: {
  progress: number; onSeek: (p: number) => void; duration: number; transcript: TranscriptLine[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heights = useRef(
    Array.from({ length: BARS }, (_, i) => {
      const base = 0.25 + (Math.sin(i * 127.1) * 0.5 + 0.5) * 0.75;
      const env = Math.sin((i / BARS) * Math.PI);
      return base * env * 0.7 + 0.2;
    }),
  );

  const isAI = (barIdx: number) => {
    const t = (barIdx / BARS) * duration;
    return transcript.some((l) => l.speaker === 'ai' && t >= l.start && t <= l.end);
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = 64;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);
    const bw = W / BARS;
    for (let i = 0; i < BARS; i++) {
      const h = heights.current[i] * H * 0.85;
      const y = (H - h) / 2;
      const past = i / BARS <= progress;
      const ai = isAI(i);
      ctx.fillStyle = ai ? (past ? '#22c55e' : '#dcfce7') : past ? '#38bdf8' : '#e0f2fe';
      ctx.beginPath();
      ctx.roundRect(i * bw + bw * 0.15, y, bw * 0.65, h, 2);
      ctx.fill();
    }
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(progress * W - 0.75, 4, 1.5, H - 8);
  }, [progress, duration, transcript]);

  useEffect(() => { draw(); }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onSeek((e.clientX - rect.left) / rect.width);
      }}
      className="w-full cursor-pointer"
      style={{ height: 64, display: 'block' }}
    />
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AudioPlayer({
  src,
  transcript,
  agentName = 'Priya',
  agentInitials = 'PR',
  agentRole = 'AI Agent',
  callType = 'Live call',
  language = 'Hindi',
  defaultDuration = 100,
  onPlayingChange,
}: {
  src: string;
  transcript: TranscriptLine[];
  agentName?: string;
  agentInitials?: string;
  agentRole?: string;
  callType?: string;
  language?: string;
  defaultDuration?: number;
  onPlayingChange?: (playing: boolean) => void;
}) {
  const audioRef       = useRef<HTMLAudioElement>(null);
  const bubbleRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const transcriptRef  = useRef<HTMLDivElement>(null);
  const speedIdx       = useRef(0);
  const lastScrolledIdx = useRef(-1);

  const [playing,  setPlaying]  = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(defaultDuration);
  const [speed,    setSpeed]    = useState(1);
  const [activeIdx,setActiveIdx]= useState(-1);

  const progress = duration > 0 ? current / duration : 0;

  // Reset when src changes
  useEffect(() => {
    setCurrent(0);
    setActiveIdx(-1);
    lastScrolledIdx.current = -1;
    if (transcriptRef.current) transcriptRef.current.scrollTop = 0;
    const audio = audioRef.current;
    if (audio) { audio.pause(); audio.currentTime = 0; setPlaying(false); }
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded  = () => { setPlaying(false); onPlayingChange?.(false); };
    const onPlay   = () => { lastScrolledIdx.current = -1; };

    const onTime = () => {
      const t = audio.currentTime;
      setCurrent(t);
      if (audio.paused) return;

      let idx = transcript.findIndex((l) => t >= l.start && t <= l.end);
      if (idx < 0) {
        for (let i = transcript.length - 1; i >= 0; i--) {
          if (t >= transcript[i].start) { idx = i; break; }
        }
      }
      if (idx < 0) return;
      setActiveIdx(idx);
      if (idx === lastScrolledIdx.current) return;
      lastScrolledIdx.current = idx;

      const container = transcriptRef.current;
      const bubble    = bubbleRefs.current[idx];
      if (!container || !bubble) return;

      const targetTop = bubble.offsetTop - container.clientHeight / 2 + bubble.offsetHeight / 2;
      const startTop  = container.scrollTop;
      const distance  = targetTop - startTop;
      const dur       = Math.max((transcript[idx].end - transcript[idx].start) * 3000, 600);
      let startTime: number | null = null;
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
      const animateScroll = (ts: number) => {
        if (audio.paused) return;
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / dur, 1);
        container.scrollTop = startTop + distance * ease(p);
        if (p < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    };

    audio.addEventListener('timeupdate',     onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended',          onEnded);
    audio.addEventListener('play',           onPlay);
    return () => {
      audio.removeEventListener('timeupdate',     onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended',          onEnded);
      audio.removeEventListener('play',           onPlay);
    };
  }, [transcript, onPlayingChange]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause(); setPlaying(false); onPlayingChange?.(false);
    } else {
      await audio.play(); setPlaying(true); onPlayingChange?.(true);
    }
  };

  const handleSeek = (p: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const t = p * duration;
    audio.currentTime = t;
    setCurrent(t);
    lastScrolledIdx.current = -1;
  };

  const cycleSpeed = () => {
    speedIdx.current = (speedIdx.current + 1) % SPEEDS.length;
    const s = SPEEDS[speedIdx.current];
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/8 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-xs font-black text-green-800">
            {agentInitials}
          </div>
          <div>
            <p className="text-sm font-black text-black">{agentName} (AI Agent)</p>
            <p className="text-[11px] text-black/45 font-medium">{agentRole}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-200">{callType}</span>
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">{language}</span>
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-black/5 text-black/50">{fmtTime(duration)}</span>
        </div>
      </div>

      {/* Waveform + controls */}
      <div className="px-5 py-4 border-b border-black/8">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-black tracking-widest uppercase text-green-600">● AI Agent ({agentName})</span>
          <span className="text-[10px] font-black tracking-widest uppercase text-blue-500">● Customer</span>
        </div>
        <Waveform progress={progress} onSeek={handleSeek} duration={duration} transcript={transcript} />
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shrink-0 transition-colors"
          >
            {playing ? (
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-3.5 bg-white rounded-sm" />
                <div className="w-[3px] h-3.5 bg-white rounded-sm" />
              </div>
            ) : (
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-10 border-l-white ml-0.5" />
            )}
          </button>
          <span className="text-xs font-black text-black/45 tabular-nums min-w-[80px]">
            {fmtTime(current)} / {fmtTime(duration)}
          </span>
          <div
            className="flex-1 relative h-1 bg-black/8 rounded-full cursor-pointer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              handleSeek((e.clientX - r.left) / r.width);
            }}
          >
            <div className="absolute left-0 top-0 h-full bg-green-500 rounded-full pointer-events-none" style={{ width: `${progress * 100}%` }} />
            <div className="absolute top-1/2 w-3 h-3 bg-green-500 rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ left: `${progress * 100}%` }} />
          </div>
          <button onClick={cycleSpeed} className="text-[11px] font-black px-2 py-1 border border-black/15 rounded-lg text-black/50 hover:bg-black/5 transition-colors">
            {speed}x
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div ref={transcriptRef} className="p-5 flex flex-col gap-3 max-h-72 overflow-y-auto">
        {transcript.map((line, i) => (
          <div key={line.id} className={`flex gap-2 items-end ${line.speaker === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${line.speaker === 'ai' ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'}`}>
              {line.speaker === 'ai' ? agentInitials : line.name.slice(0, 2).toUpperCase()}
            </div>
            <div className={`flex flex-col ${line.speaker === 'user' ? 'items-end' : ''}`}>
              <span className="text-[10px] font-black tracking-wider uppercase text-black/35 mb-1">
                {line.name} · {line.speaker === 'ai' ? 'AI' : 'Customer'}
              </span>
              <div
                ref={(el) => { bubbleRefs.current[i] = el; }}
                onClick={() => handleSeek(line.start / duration)}
                className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed cursor-pointer transition-all ${
                  line.speaker === 'ai'
                    ? 'bg-green-50 text-green-900 rounded-2xl rounded-bl-sm border border-green-100'
                    : 'bg-blue-50 text-blue-900 rounded-2xl rounded-br-sm border border-blue-100'
                } ${activeIdx === i ? (line.speaker === 'ai' ? 'ring-2 ring-green-400' : 'ring-2 ring-blue-400') : 'hover:brightness-95'}`}
              >
                {line.text}
                <span className="block text-[10px] font-bold opacity-40 mt-1">{fmtTime(line.start)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats footer */}
      <div className="grid grid-cols-3 border-t border-black/8">
        {[
          { val: '847ms', label: 'Avg latency', color: 'text-green-600' },
          { val: '₹3.74', label: 'Call cost',   color: 'text-black'     },
          { val: '94%',   label: 'Intent match', color: 'text-blue-600' },
        ].map((s, i) => (
          <div key={i} className={`py-3 text-center ${i < 2 ? 'border-r border-black/8' : ''}`}>
            <p className={`text-base font-black ${s.color}`}>{s.val}</p>
            <p className="text-[10px] font-black tracking-widest uppercase text-black/35 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
