'use client';
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, TrendingDown, Clock, UserCheck, PhoneMissed, Activity } from 'lucide-react';

const IMPACT = [
  { icon: Phone, value: 90, suffix: '%', label: 'Automates Inbound/Outbound Calls', color: '#22c55e' },
  { icon: UserCheck, value: 80, suffix: '%', label: 'Reduces Customer Effort Score (CES)', color: '#3b82f6' },
  { icon: TrendingDown, value: 50, suffix: '%', label: 'Brings down Errors & Inaccuracies', color: '#f59e0b' },
  { icon: Clock, value: 70, suffix: '%', label: 'Decreases Average Handling Time (AHT)', color: '#06b6d4' },
  { icon: PhoneMissed, value: 55, suffix: '%', label: 'Drops Call Abandonment Rates', color: '#ec4899' },
];

const PERF = [
  { category: 'Capacity', metric: 'Response Time', value: '< 1s', sub: '15,000 Concurrent Calls' },
  { category: 'Accuracy', metric: 'Speech Recognition', value: '99%', sub: '100k calls/day' },
  { category: 'Reliability', metric: 'Uptime', value: '99.99%', sub: '24/7/365' },
  { category: 'Resilience', metric: 'Failover Time', value: '50ms', sub: 'Auto-recovery' },
  { category: 'Resolution', metric: 'First-call Resolution', value: '98%', sub: 'All calls' },
  { category: 'Recovery', metric: 'Recovery Time', value: '< 1s', sub: 'Full-context retained' },
  { category: 'Efficiency', metric: 'Queue Time', value: '200ms', sub: 'Peak hours' },
];

function CountUp({
  target,
  suffix,
  inView,
  duration = 1400,
}: {
  target: number;
  suffix: string;
  inView: boolean;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * ease));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.current);
  }, [inView, target, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 bg-white" id="metrics">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 md:mb-16 text-center"
        >
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-4">
            Performance
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-black tracking-tight leading-none mb-4">
            Numbers that <span className="text-green-500">speak</span>
          </h2>
          <p className="text-black/50 text-lg max-w-xl mx-auto">
            Real performance metrics from production deployments across Indian businesses.
          </p>
        </motion.div>

        {/* Impact stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {IMPACT.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-panel rounded-2xl p-5 flex flex-col items-center text-center gap-3"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <span className="font-['Bebas_Neue'] text-4xl md:text-5xl leading-none" style={{ color: item.color }}>
                <CountUp target={item.value} suffix={item.suffix} inView={inView} />
              </span>
              <p className="text-xs text-black/50 font-medium leading-snug">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Performance table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-2xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-black/6 flex items-center gap-2">
            <Activity size={15} className="text-green-600" />
            <span className="text-xs font-black tracking-widest uppercase text-black/50">System Performance</span>
          </div>
          <div className="divide-y divide-black/5">
            {PERF.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="grid grid-cols-3 px-6 py-4 hover:bg-green-50/40 active:bg-green-100/50 transition-colors"
              >
                <span className="text-xs text-black/35 font-medium">{row.category}</span>
                <span className="text-xs text-black/70 font-semibold">{row.metric}</span>
                <div className="flex items-center justify-end gap-2 text-right">
                  <span className="text-sm font-black text-green-600">{row.value}</span>
                  <span className="text-xs text-black/30 hidden md:block">· {row.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
