'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bookDemo } from '@/lib/api';
import Link from 'next/link';

const USE_CASES = [
  { value: 'sales',        label: 'Outbound Sales' },
  { value: 'support',      label: 'Customer Support' },
  { value: 'collections',  label: 'Collections / Recovery' },
  { value: 'appointments', label: 'Appointment Booking' },
  { value: 'other',        label: 'Other' },
];

const VOLUMES = [
  { value: '<500',       label: '< 500 calls/month' },
  { value: '500-5000',   label: '500 – 5,000 calls/month' },
  { value: '5000-50000', label: '5,000 – 50,000 calls/month' },
  { value: '50000+',     label: '50,000+ calls/month' },
];

type Field = 'name' | 'email' | 'phone' | 'company' | 'useCase' | 'callVolume' | 'message';

export default function DemoPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    useCase: 'sales', callVolume: '<500', message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (field: Field, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e: Partial<Record<Field, string>> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = 'Invalid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError('');
    try {
      const res = await bookDemo(form);
      if (res.success) setDone(true);
      else setServerError(res.error || 'Something went wrong');
    } catch {
      setServerError('Could not connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050508] flex items-center justify-center px-4 py-20">
      {/* Background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,209,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* Left — brand */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-20"
        >
          <Link href="/" className="inline-flex items-center gap-1 mb-10 group">
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#fff', letterSpacing: 2 }}>SAMWAD</span>
            <span className="w-2 h-2 rounded-full bg-[#00FFD1] mt-0.5" />
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: '#fff', letterSpacing: 2 }}>BOT</span>
          </Link>

          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 0.92, color: '#fff', letterSpacing: 1 }}>
            SEE THE<br />
            VOICE<br />
            <span style={{ color: '#00FFD1' }}>IN ACTION</span>
          </h1>

          <p className="text-white/50 text-base mt-6 leading-relaxed max-w-sm">
            Book a 30-minute live demo. We'll show you a real AI agent calling a real number — in Hindi, English, or Hinglish — handling your exact use case.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {[
              '30-min live AI call demo',
              'Custom persona for your industry',
              'Real cost breakdown for your volume',
              'Deploy in 48 hours — no hardware',
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FFD1] shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <p className="text-white/20 text-xs tracking-widest uppercase">Trusted by teams across India</p>
            <div className="flex gap-6 mt-4">
              {['Banking', 'Real Estate', 'Healthcare', 'E-commerce'].map(i => (
                <span key={i} className="text-white/30 text-xs">{i}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-[#00FFD1]/20 bg-[#00FFD1]/5 p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#00FFD1] flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#00FFD1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#fff', letterSpacing: 1 }}>
                  DEMO BOOKED
                </h2>
                <p className="text-white/50 text-sm mt-3 leading-relaxed">
                  We'll reach out to <span className="text-white">{form.email}</span> within 24 hours to confirm your slot.
                </p>
                <Link href="/" className="inline-block mt-8 text-[#00FFD1] text-sm border border-[#00FFD1]/30 px-6 py-2 hover:bg-[#00FFD1]/10 transition-colors">
                  ← Back to home
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="border border-white/10 bg-white/2 p-8 flex flex-col gap-5"
              >
                <div>
                  <p className="text-white/40 text-xs tracking-widest uppercase mb-1">Step 1 of 1</p>
                  <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: '#fff', letterSpacing: 1 }}>
                    SCHEDULE YOUR DEMO
                  </h2>
                </div>

                {serverError && (
                  <div className="text-red-400 text-xs border border-red-500/20 bg-red-500/10 px-4 py-3">
                    {serverError}
                  </div>
                )}

                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" error={errors.name}>
                    <input className={input(!!errors.name)} placeholder="Rahul Sharma"
                      value={form.name} onChange={e => set('name', e.target.value)} />
                  </Field>
                  <Field label="Work Email *" error={errors.email}>
                    <input className={input(!!errors.email)} placeholder="rahul@company.com" type="email"
                      value={form.email} onChange={e => set('email', e.target.value)} />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone Number *" error={errors.phone}>
                    <input className={input(!!errors.phone)} placeholder="+91 98765 43210"
                      value={form.phone} onChange={e => set('phone', e.target.value)} />
                  </Field>
                  <Field label="Company Name">
                    <input className={input(false)} placeholder="Acme Corp"
                      value={form.company} onChange={e => set('company', e.target.value)} />
                  </Field>
                </div>

                {/* Use case */}
                <Field label="Primary Use Case">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {USE_CASES.map(u => (
                      <button key={u.value} type="button"
                        onClick={() => set('useCase', u.value)}
                        className={`px-3 py-2 text-xs border transition-all duration-150 text-left ${
                          form.useCase === u.value
                            ? 'border-[#00FFD1]/60 bg-[#00FFD1]/10 text-[#00FFD1]'
                            : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                        }`}>
                        {u.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Call volume */}
                <Field label="Monthly Call Volume">
                  <div className="grid grid-cols-2 gap-2">
                    {VOLUMES.map(v => (
                      <button key={v.value} type="button"
                        onClick={() => set('callVolume', v.value)}
                        className={`px-3 py-2 text-xs border transition-all duration-150 text-left ${
                          form.callVolume === v.value
                            ? 'border-[#00FFD1]/60 bg-[#00FFD1]/10 text-[#00FFD1]'
                            : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white/70'
                        }`}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Message */}
                <Field label="Anything specific you want to see?">
                  <textarea className={`${input(false)} resize-none`} rows={3}
                    placeholder="e.g. Show me a Hindi collections call for a ₹50,000 loan..."
                    value={form.message} onChange={e => set('message', e.target.value)} />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00FFD1] text-black font-bold py-4 text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(0,255,209,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : 'Book My Demo →'}
                </button>

                <p className="text-white/20 text-xs text-center">
                  No credit card · No commitment · Response within 24 hours
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}

// ── helpers ──────────────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/40 tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const input = (hasError: boolean) =>
  `w-full bg-white/5 border ${hasError ? 'border-red-500/50' : 'border-white/10'} text-white text-sm px-4 py-3 outline-none focus:border-[#00FFD1]/50 focus:bg-[#00FFD1]/5 transition-all duration-150 placeholder:text-white/20`;
