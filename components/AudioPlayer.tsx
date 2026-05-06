'use client';
import { useRef, useState, useEffect, useCallback } from 'react';

// ─── TRANSCRIPT DATA ─────────────────────────────────────────────────────────
const TRANSCRIPT = [
  {
    id: 0,
    speaker: 'ai',
    name: 'Priya',
    start: 0,
    end: 4.5,
    text: 'हेलो, मैं फाइनेंस से प्रिया बात कर रही हूं। क्या मेरी बात दुर्गेश जी से हो रही है?',
  },
  { id: 1, speaker: 'user', name: 'Durgesh', start: 5, end: 8.5, text: 'हां, हो रही है।' },
  {
    id: 2,
    speaker: 'ai',
    name: 'Priya',
    start: 9,
    end: 17.5,
    text: 'जी दुर्गेश जी, आपका फाइनेंस में एक EMI पेंडिंग है, ₹5000 का। क्या आप आज पेमेंट कर पाएंगे?',
  },
  { id: 3, speaker: 'user', name: 'Durgesh', start: 18, end: 22.5, text: 'कौन सी डेट है? ड्यू डेट क्या है?' },
  {
    id: 4,
    speaker: 'ai',
    name: 'Priya',
    start: 23,
    end: 32,
    text: 'जी, ड्यू डेट निकल चुकी है। पिछले महीने की 26 तारीख थी। क्या आप आज पेमेंट करवा सकते हैं?',
  },
  {
    id: 5,
    speaker: 'user',
    name: 'Durgesh',
    start: 33,
    end: 36.5,
    text: 'आज नहीं हो पाएगा और इसमें कुछ क्वेरीज है तो किस के साथ बात कर सकते हैं हम?',
  },
  {
    id: 6,
    speaker: 'ai',
    name: 'Priya',
    start: 37,
    end: 44.5,
    text: 'क्वेरीज के लिए आप कस्टमर सर्विस पे बात कर सकते हैं, लेकिन पेमेंट का क्या होगा? क्या आप मुझे कमिटमेंट डेट दे सकते हैं?',
  },
  {
    id: 7,
    speaker: 'user',
    name: 'Durgesh',
    start: 45,
    end: 50.5,
    text: 'क्वेरी पेमेंट रिलेटेड, क्वेरी भी पेमेंट रिलेटेड ही है। अगर सरचार्ज लगा है तो क्या कर सकते हैं हम?',
  },
  {
    id: 8,
    speaker: 'ai',
    name: 'Priya',
    start: 51,
    end: 63,
    text: 'अच्छा, ठीक है। क्वेरीज के लिए आप कस्टमर सर्विस से बात कीजिए, मैं नोट कर लेती हूं। लेकिन पेमेंट का कमिटमेंट अभी दे दीजिए। कब तक पेमेंट करवाएंगे?',
  },
  { id: 9, speaker: 'user', name: 'Durgesh', start: 64, end: 65.5, text: 'हेलो?' },
  { id: 10, speaker: 'ai', name: 'Priya', start: 66, end: 67.5, text: 'जी, सुन रही हूं।' },
  {
    id: 11,
    speaker: 'user',
    name: 'Durgesh',
    start: 68,
    end: 74.5,
    text: 'हां, मेरी क्वेरी पेमेंट रिलेटेड है तो फिर पेमेंट कैसे करने का?',
  },
  {
    id: 12,
    speaker: 'ai',
    name: 'Priya',
    start: 75,
    end: 82.5,
    text: 'पेमेंट के लिए आपको पहले क्वेरीज रिजॉल्व करनी होंगी, उसके बाद पेमेंट करवा सकते हैं। क्या आप कस्टमर सर्विस से बात कर लेंगे?',
  },
  { id: 13, speaker: 'user', name: 'Durgesh', start: 83, end: 86.5, text: 'नहीं, कस्टमर सर्विस से क्यों बात करेंगे?' },
  { id: 14, speaker: 'ai', name: 'Priya', start: 87, end: 91, text: 'क्योंकि आपकी पेमेंट के लिए क्वेरी की है,' },
  {
    id: 15,
    speaker: 'ai',
    name: 'Priya',
    start: 92,
    end: 106,
    text: 'जी, क्वेरीज के लिए अलग टीम है। मैं सिर्फ पेमेंट कलेक्शन के लिए बात कर रही हूं। क्या आप कंफर्म कर सकते हैं कि पेमेंट कब तक करवाएंगे?',
  },
  {
    id: 16,
    speaker: 'user',
    name: 'Durgesh',
    start: 107,
    end: 113,
    text: 'नहीं, जब तक क्वेरी सॉल्व नहीं होगी, पेमेंट नहीं हो पाएगा।',
  },
  {
    id: 17,
    speaker: 'ai',
    name: 'Priya',
    start: 114,
    end: 117,
    text: 'ठीक है, मैं आपकी क्वेरी कंसल्ट करवा देती हूं। क्या आपको कॉल कनेक्ट करवा दूं या आप खुद से कॉल करेंगे?',
  },
  { id: 18, speaker: 'user', name: 'Durgesh', start: 118, end: 121, text: 'वो कनेक्ट करवा सकते हैं आप।' },
  {
    id: 19,
    speaker: 'ai',
    name: 'Priya',
    start: 122,
    end: 127,
    text: 'ठीक है, मैं कनेक्ट करवाती हूं। और कोशिश कीजिए कि पेमेंट आज ही हो जाए। गुड बाय।',
  },
];

const BARS = 120;
const SPEEDS = [1, 1.5, 2, 0.75];

function fmtTime(s: number) {
  const sec = Math.round(s);
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
}

// ─── WAVEFORM CANVAS ─────────────────────────────────────────────────────────
function Waveform({ progress, onSeek, duration }: { progress: number; onSeek: (p: number) => void; duration: number }) {
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
    return TRANSCRIPT.some((l) => l.speaker === 'ai' && t >= l.start && t <= l.end);
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
    // playhead
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(progress * W - 0.75, 4, 1.5, H - 8);
  }, [progress, duration]);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    onSeek((e.clientX - rect.left) / rect.width);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className="w-full cursor-pointer"
      style={{ height: 64, display: 'block' }}
    />
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function AudioPlayer({ src = '/audio/example.mp3' }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const bubbleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const speedIdx = useRef(0);
  const lastScrolledIdx = useRef(-1);

  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(127.15);
  const [speed, setSpeed] = useState(1);
  const [activeIdx, setActiveIdx] = useState(-1);

  const progress = duration > 0 ? current / duration : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setPlaying(false);

    const onTime = () => {
      const t = audio.currentTime;
      setCurrent(t);

      if (audio.paused) return;

      // Precise active line detection:
      // 1. Find line where time is exactly within start/end
      // 2. If not found, find the last line that has started
      let idx = TRANSCRIPT.findIndex((l) => t >= l.start && t <= l.end);

      if (idx < 0) {
        // Fallback: stay on the line that just finished until the next one starts
        for (let i = TRANSCRIPT.length - 1; i >= 0; i--) {
          if (t >= TRANSCRIPT[i].start) {
            idx = i;
            break;
          }
        }
      }

      if (idx < 0 || idx === activeIdx) {
        if (idx >= 0) setActiveIdx(idx);
        return;
      }

      setActiveIdx(idx);

      // Only scroll when the active line index actually changes
      if (idx === lastScrolledIdx.current) return;
      lastScrolledIdx.current = idx;

      // Always scroll to center the active bubble
      const container = transcriptRef.current;
      const bubble = bubbleRefs.current[idx];
      if (!container || !bubble) return;

      const line = TRANSCRIPT[idx];
      const targetTop = bubble.offsetTop - container.clientHeight / 2 + bubble.offsetHeight / 2;
      const startTop = container.scrollTop;
      const distance = targetTop - startTop;

      // Calculate duration based on the line's actual time window
      const dur = (line.end - line.start) * 3000;

      let startTime: number | null = null;
      const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const animateScroll = (ts: number) => {
        if (audio.paused) return; // STOP SCROLLING IF PAUSED
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / Math.max(dur, 500), 1);
        container.scrollTop = startTop + distance * ease(p);
        if (p < 1) requestAnimationFrame(animateScroll);
      };
      requestAnimationFrame(animateScroll);
    };

    const onPlay = () => {
      // Force a scroll sync when resuming
      lastScrolledIdx.current = -1;
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('play', onPlay);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('play', onPlay);
    };
  }, []);

  const cycleSpeed = () => {
    speedIdx.current = (speedIdx.current + 1) % SPEEDS.length;
    const s = SPEEDS[speedIdx.current];
    setSpeed(s);
    if (audioRef.current) audioRef.current.playbackRate = s;
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      await audio.play();
      setPlaying(true);
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

  return (
    <div className="mt-6 border border-black/10 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-black/8 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-xs font-black text-green-800">
            PR
          </div>
          <div>
            <p className="text-sm font-black text-black">Priya (AI Agent)</p>
            <p className="text-[11px] text-black/45 font-medium">EMI Collection · Namde Finance</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-green-50 text-green-800 border border-green-200">
            Live call
          </span>
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
            Hinglish
          </span>
          <span className="text-[10px] font-black px-3 py-1 rounded-full bg-black/5 text-black/50">
            {fmtTime(duration)}
          </span>
        </div>
      </div>

      {/* Waveform + controls */}
      <div className="px-5 py-4 border-b border-black/8">
        <div className="flex justify-between mb-2">
          <span className="text-[10px] font-black tracking-widest uppercase text-green-600">● AI Agent (Priya)</span>
          <span className="text-[10px] font-black tracking-widest uppercase text-blue-500">● Customer</span>
        </div>
        <Waveform progress={progress} onSeek={handleSeek} duration={duration} />

        {/* Controls row */}
        <div className="flex items-center gap-3 mt-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center flex-shrink-0 transition-colors"
          >
            {playing ? (
              <div className="flex gap-[3px]">
                <div className="w-[3px] h-3.5 bg-white rounded-sm" />
                <div className="w-[3px] h-3.5 bg-white rounded-sm" />
              </div>
            ) : (
              <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[10px] border-l-white ml-0.5" />
            )}
          </button>

          {/* Time */}
          <span className="text-xs font-black text-black/45 tabular-nums min-w-[80px]">
            {fmtTime(current)} / {fmtTime(duration)}
          </span>

          {/* Seekbar */}
          <div
            className="flex-1 relative h-1 bg-black/8 rounded-full cursor-pointer"
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              handleSeek((e.clientX - r.left) / r.width);
            }}
          >
            <div
              className="absolute left-0 top-0 h-full bg-green-500 rounded-full pointer-events-none"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 w-3 h-3 bg-green-500 rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none"
              style={{ left: `${progress * 100}%` }}
            />
          </div>

          {/* Speed */}
          <button
            onClick={cycleSpeed}
            className="text-[11px] font-black px-2 py-1 border border-black/15 rounded-lg text-black/50 hover:bg-black/5 transition-colors"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* Transcript */}
      <div ref={transcriptRef} className="p-5 flex flex-col gap-3 max-h-72 overflow-y-auto">
        {TRANSCRIPT.map((line, i) => (
          <div key={line.id} className={`flex gap-2 items-end ${line.speaker === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                line.speaker === 'ai' ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'
              }`}
            >
              {line.speaker === 'ai' ? 'PR' : 'DG'}
            </div>
            <div className={`flex flex-col ${line.speaker === 'user' ? 'items-end' : ''}`}>
              <span className="text-[10px] font-black tracking-wider uppercase text-black/35 mb-1">
                {line.name} · {line.speaker === 'ai' ? 'AI' : 'Customer'}
              </span>
              <div
                ref={(el) => {
                  bubbleRefs.current[i] = el;
                }}
                onClick={() => handleSeek(line.start / duration)}
                className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed cursor-pointer transition-all ${
                  line.speaker === 'ai'
                    ? 'bg-green-50 text-green-900 rounded-2xl rounded-bl-sm border border-green-100'
                    : 'bg-blue-50 text-blue-900 rounded-2xl rounded-br-sm border border-blue-100'
                } ${
                  activeIdx === i
                    ? line.speaker === 'ai'
                      ? 'ring-2 ring-green-400'
                      : 'ring-2 ring-blue-400'
                    : 'hover:brightness-95'
                }`}
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
          { val: '₹3.74', label: 'Call cost', color: 'text-black' },
          { val: '94%', label: 'Intent match', color: 'text-blue-600' },
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
