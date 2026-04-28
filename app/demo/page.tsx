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
    <main className="min-h-screen bg-white voice-grid flex items-center justify-center px-4 py-24">
      {/* Background glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,241,217,0.18),transparent_34rem),radial-gradient(circle_at_82%_24%,rgba(0,0,0,0.16),transparent_32rem)] pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">

        {/* Left — brand */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-20"
        >
          <Link href="/" className="inline-flex items-center gap-2 mb-10 group rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-black">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Samvaad Demo
          </Link>

          <h1 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-[-0.08em] leading-[0.82] text-black">
            Hear Your<br />
            AI Agent<br />
            <span className="bg-gradient-to-r from-black to-green-500 bg-clip-text text-transparent">Go Live</span>
          </h1>

          <p className="text-black/65 text-base mt-6 leading-relaxed max-w-sm">
            Book a 30-minute live demo. We&apos;ll show you a real AI agent calling a real number — in Hindi, English, or Hinglish — handling your exact use case.
          </p>

          <div className="mt-8 grid gap-3">
            {[
              '30-min live AI call demo',
              'Custom persona for your industry',
              'Real cost breakdown for your volume',
              'Deploy in 48 hours — no hardware',
            ].map(item => (
              <div key={item} className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-black/70">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-black/10">
            <p className="text-black/40 text-xs tracking-widest uppercase">Trusted by teams across India</p>
            <div className="flex gap-6 mt-4">
              {['Banking', 'Real Estate', 'Healthcare', 'E-commerce'].map(i => (
                <span key={i} className="text-black/55 text-xs">{i}</span>
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
                className="glass-panel rounded-[2rem] p-10 text-center"
              >
                <div className="w-14 h-14 rounded-full border-2 border-green-600 flex items-center justify-center mx-auto mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-[-0.04em] text-black">
                  DEMO BOOKED
                </h2>
                <p className="text-black/65 text-sm mt-3 leading-relaxed">
                  We&apos;ll reach out to <span className="text-black">{form.email}</span> within 24 hours to confirm your slot.
                </p>
                <Link href="/" className="inline-block mt-8 text-green-600 text-sm border border-green-600/30 px-6 py-2 hover:bg-green-600/10 transition-colors">
                  ← Back to home
                </Link>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass-panel rounded-[2rem] p-8 md:p-10 flex flex-col gap-5"
              >
                <div>
                  <p className="text-black text-xs font-black tracking-[0.24em] uppercase mb-2">Step 1 of 1</p>
                  <h2 className="text-3xl font-black uppercase tracking-[-0.04em] text-black">
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
                            ? 'border-green-500/70 bg-green-500/15 text-black font-black'
                            : 'border-black/10 text-black/55 hover:border-black/25 hover:text-black'
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
                            ? 'border-green-500/70 bg-green-500/15 text-black font-black'
                            : 'border-black/10 text-black/55 hover:border-black/25 hover:text-black'
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
                  className="w-full rounded-2xl bg-black text-white font-black py-4 text-sm tracking-widest uppercase hover:shadow-[0_20px_50px_rgba(8,17,31,0.22)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Booking...
                    </>
                  ) : 'Book My Demo →'}
                </button>

                <p className="text-black/40 text-xs text-center">
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
      <label className="text-xs text-black/55 tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );
}

const input = (hasError: boolean) =>
  `w-full rounded-xl bg-white/80 border ${hasError ? 'border-red-500/50' : 'border-black/10'} text-black text-sm px-4 py-3 outline-none focus:border-green-500/80 focus:bg-green-500/5 transition-all duration-150 placeholder:text-black/40`;
