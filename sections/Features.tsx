'use client';
import { motion } from 'framer-motion';
import { FEATURES } from '../lib/constants';

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Features() {
  const large = FEATURES.find(f => f.large);
  const small = FEATURES.filter(f => !f.large);

  return (
    <section id="features" className="bg-[#050508] py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-['Bebas_Neue'] text-[56px] md:text-[72px] text-white leading-none">
            BUILT <span style={{ color: '#FF6B2B' }}>DIFFERENT</span>
          </h2>
          <p className="text-white/40 text-lg mt-2">Not a chatbot. Not a voicebot. <span style={{ color: '#00FFD1' }}>A workforce.</span></p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large card */}
          {large && (
            <motion.div
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ borderColor: 'rgba(0,255,209,0.5)', backgroundColor: 'rgba(26,5,51,0.4)' }}
              className="md:col-span-2 bg-[#0D0D14] border border-[#1E1E2E] p-8 flex flex-col justify-between min-h-[280px] group cursor-pointer transition-colors duration-300"
            >
              <div>
                <div className="w-10 h-10 border border-[#00FFD1]/30 flex items-center justify-center text-[#00FFD1] text-xl mb-6">
                  {large.icon}
                </div>
                <h3 className="font-['Bebas_Neue'] text-4xl text-white mb-3">{large.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-md">{large.desc}</p>
              </div>
              <div className="flex justify-end">
                <span className="text-[#00FFD1]/50 group-hover:text-[#00FFD1] group-hover:translate-x-1 transition-all duration-200 text-lg">→</span>
              </div>
            </motion.div>
          )}

          {/* Small cards */}
          {small.map((f, i) => (
            <motion.div
              key={f.id}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ borderColor: 'rgba(0,255,209,0.5)', backgroundColor: 'rgba(26,5,51,0.4)' }}
              className="bg-[#0D0D14] border border-[#1E1E2E] p-6 flex flex-col justify-between min-h-[200px] group cursor-pointer transition-colors duration-300"
            >
              <div>
                <div className="w-8 h-8 border border-[#00FFD1]/30 flex items-center justify-center text-[#00FFD1] text-base mb-4">
                  {f.icon}
                </div>
                <h3 className="font-['Bebas_Neue'] text-2xl text-white mb-2">{f.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
              </div>
              <div className="flex justify-end">
                <span className="text-[#00FFD1]/30 group-hover:text-[#00FFD1] group-hover:translate-x-1 transition-all duration-200">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
