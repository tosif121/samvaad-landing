'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { bookDemo } from '@/lib/api';
import { CheckCircle, Phone, Mail, User, Building2, ArrowRight, Loader2 } from 'lucide-react';

const USE_CASES = [
  { value: 'sales',        label: 'Outbound Sales' },
  { value: 'support',      label: 'Customer Support' },
  { value: 'collections',  label: 'Collections / Recovery' },
  { value: 'appointments', label: 'Appointment Booking' },
  { value: 'other',        label: 'Other' },
];

const VOLUMES = [
  { value: '<500',       label: '< 500 / month' },
  { value: '500-5000',   label: '500 – 5,000' },
  { value: '5000-50000', label: '5,000 – 50,000' },
  { value: '50000+',     label: '50,000+' },
];

const TRUST = [
  { stat: '< ₹2/min',  label: 'Cost per minute' },
  { stat: '850ms',     label: 'Avg response time' },
  { stat: '24/7',      label: 'Always available' },
  { stat: '3 langs',   label: 'Hindi · English · Hinglish' },
];

type FieldKey = 'name' | 'email' | 'phone' | 'company' | 'useCase' | 'callVolume' | 'message';

export default function DemoPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '',
    useCase: 'sales', callVolume: '<500', message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (field: FieldKey, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = () => {
    const e: Partial<Record<FieldKey, string>> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^\+?[\d\s\-]{8,15}$/.test(form.phone)) e.phone = 'Invalid number';
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
      setServerError('Could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Left ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28">

            <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
              Book a Demo
            </span>

            <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-black tracking-tight leading-none mb-5">
              Hear your AI agent<br />
              <span className="text-green-500">go live</span>
            </h1>

            <p className="text-black/55 text-base leading-relaxed mb-8 max-w-sm font-medium">
              30-minute live demo. We&apos;ll call a real number in front of you — in Hindi, English, or Hinglish — for your exact use case.
            </p>

            {/* What you get */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                'Live AI call on a real number',
                'Custom persona for your industry',
                'Cost breakdown for your volume',
                'Deploy in 48 hours — no hardware',
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm font-medium text-black/65">
                  <div className="w-5 h-5 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                    <CheckCircle size={11} className="text-green-600" />
                  </div>
                  {item}
                </motion.div>
              ))}
            </div>

            {/* Trust stats */}
            <div className="grid grid-cols-2 gap-3">
              {TRUST.map((t, i) => (
                <div key={i} className="glass-panel rounded-xl p-4">
                  <p className="font-['Bebas_Neue'] text-2xl text-green-600 leading-none">{t.stat}</p>
                  <p className="text-xs text-black/45 mt-1">{t.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="glass-panel rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={28} className="text-green-600" />
                  </div>
                  <h2 className="font-['Bebas_Neue'] text-4xl text-black mb-3">Demo Booked!</h2>
                  <p className="text-black/55 text-sm leading-relaxed mb-8">
                    We&apos;ll reach out to <span className="font-bold text-black">{form.email}</span> within 24 hours to confirm your slot.
                  </p>
                  <Link href="/"
                    className="inline-flex items-center gap-2 bg-green-500 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-green-600 transition-colors">
                    ← Back to home
                  </Link>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="glass-panel rounded-2xl p-8 flex flex-col gap-5">

                  <div className="mb-2">
                    <h2 className="font-['Bebas_Neue'] text-3xl text-black leading-none mb-1">Schedule your demo</h2>
                    <p className="text-xs text-black/40">Fill in your details and we&apos;ll be in touch within 24 hours.</p>
                  </div>

                  {serverError && (
                    <div className="text-red-500 text-xs border border-red-200 bg-red-50 px-4 py-3 rounded-xl">
                      {serverError}
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Full Name *" error={errors.name} icon={<User size={14} />}>
                      <input className={inp(!!errors.name)} placeholder="Rahul Sharma"
                        value={form.name} onChange={e => set('name', e.target.value)} />
                    </FormField>
                    <FormField label="Work Email *" error={errors.email} icon={<Mail size={14} />}>
                      <input className={inp(!!errors.email)} placeholder="rahul@company.com" type="email"
                        value={form.email} onChange={e => set('email', e.target.value)} />
                    </FormField>
                  </div>

                  {/* Phone + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Phone Number *" error={errors.phone} icon={<Phone size={14} />}>
                      <input 
                        type="tel"
                        inputMode="tel"
                        className={inp(!!errors.phone)} 
                        placeholder="+91 98765 43210"
                        value={form.phone} 
                        onChange={e => set('phone', e.target.value)} 
                      />
                    </FormField>
                    <FormField label="Company" icon={<Building2 size={14} />}>
                      <input className={inp(false)} placeholder="Acme Corp"
                        value={form.company} onChange={e => set('company', e.target.value)} />
                    </FormField>
                  </div>

                  {/* Use case */}
                  <FormField label="Primary Use Case">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {USE_CASES.map(u => (
                        <button key={u.value} type="button" onClick={() => set('useCase', u.value)}
                          className={`px-3 py-3.5 text-xs font-semibold rounded-xl border transition-all text-left min-h-[48px] ${
                            form.useCase === u.value
                              ? 'border-green-500/50 bg-green-500/10 text-green-700'
                              : 'border-black/8 text-black/50 hover:border-black/20 hover:text-black/70'
                          }`}>
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {/* Volume */}
                  <FormField label="Monthly Call Volume">
                    <div className="grid grid-cols-2 gap-2.5">
                      {VOLUMES.map(v => (
                        <button key={v.value} type="button" onClick={() => set('callVolume', v.value)}
                          className={`px-3 py-3.5 text-xs font-semibold rounded-xl border transition-all text-left min-h-[48px] ${
                            form.callVolume === v.value
                              ? 'border-green-500/50 bg-green-500/10 text-green-700'
                              : 'border-black/8 text-black/50 hover:border-black/20 hover:text-black/70'
                          }`}>
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </FormField>

                  {/* Message */}
                  <FormField label="What do you want to see?">
                    <textarea className={`${inp(false)} resize-none`} rows={3}
                      placeholder="e.g. A Hindi collections call for a ₹50,000 loan..."
                      value={form.message} onChange={e => set('message', e.target.value)} />
                  </FormField>

                  <button type="submit" disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl text-sm tracking-wide transition-all duration-200 hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {loading
                      ? <><Loader2 size={16} className="animate-spin" /> Booking...</>
                      : <>Book My Demo <ArrowRight size={16} /></>
                    }
                  </button>

                  <p className="text-black/30 text-xs text-center">
                    No credit card · No commitment · Response within 24 hours
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

function FormField({ label, error, icon, children }: {
  label: string; error?: string; icon?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-black/50 flex items-center gap-1.5">
        {icon && <span className="text-black/30">{icon}</span>}
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

const inp = (hasError: boolean) =>
  `w-full bg-white border ${hasError ? 'border-red-300' : 'border-black/10'} text-black text-sm px-4 py-3 rounded-xl outline-none focus:border-green-500/60 focus:bg-green-500/3 transition-all placeholder:text-black/30 min-h-[44px]`;
