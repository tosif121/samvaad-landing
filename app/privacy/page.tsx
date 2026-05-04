import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Samvaad by Iotcom.io',
  description: 'Privacy Policy for Samvaad AI Voice Bot by Iotcom.io. Learn how we collect, use, and protect your personal data in compliance with Indian DPDP Act 2023.',
};

const SECTIONS = [
  {
    title: '1. Who We Are',
    content: `Samvaad is an AI Voice Bot platform developed and operated by Iotcom.io, a technology company headquartered at 84 Tilak Vihar A, Gokulpura, Jaipur, Rajasthan, India.

For any privacy-related queries, contact us at: contact@iotcom.io or +91 93585 35763.`,
  },
  {
    title: '2. Information We Collect',
    content: `We collect the following categories of information:

**Account & Contact Information**: Name, email address, phone number, company name when you register or book a demo.

**Call Data**: When you use Samvaad for voice automation, we process call recordings, transcripts, caller phone numbers, call duration, and call outcomes on behalf of our business customers.

**Usage Data**: IP address, browser type, pages visited, time spent on the platform, and interaction logs.

**Payment Information**: Billing details processed securely through our payment partners. We do not store card numbers on our servers.

**Device Information**: Device type, operating system, and unique device identifiers for security and analytics purposes.`,
  },
  {
    title: '3. How We Use Your Information',
    content: `We use your information to:

- Provide, operate, and improve the Samvaad platform
- Process demo bookings and respond to enquiries
- Send transactional communications (call reports, billing, account alerts)
- Detect and prevent fraud, abuse, and security incidents
- Comply with legal obligations under Indian law
- Analyse usage patterns to improve our AI models (using anonymised data only)
- Send product updates and marketing communications (with your consent, which you may withdraw at any time)`,
  },
  {
    title: '4. Call Recordings & Transcripts',
    content: `Samvaad processes voice calls on behalf of our business customers. In this capacity:

- Call recordings and transcripts are stored on Indian servers
- Recordings are retained for a maximum of 90 days unless the customer requests deletion
- Recordings are accessible only to the business customer who initiated the call and authorised Iotcom.io personnel
- We do not use call content to train AI models without explicit written consent
- All call data is encrypted at rest (AES-256) and in transit (TLS 1.3)`,
  },
  {
    title: '5. Data Sharing',
    content: `We do not sell your personal data. We share data only in the following circumstances:

**Service Providers**: We share data with trusted third-party providers (cloud infrastructure, payment processors, analytics) who are contractually bound to protect your data.

**Google Gemini API**: Voice data is processed through Google's Gemini Live API for AI inference. Google's data processing terms apply. Audio is not retained by Google beyond the session.

**Legal Requirements**: We may disclose data when required by Indian law, court order, or government authority.

**Business Transfer**: In the event of a merger or acquisition, data may be transferred to the successor entity with prior notice to users.`,
  },
  {
    title: '6. Data Storage & Security',
    content: `All data is stored on servers located in India. We implement industry-standard security measures including:

- AES-256 encryption at rest
- TLS 1.3 encryption in transit
- Role-based access controls
- Regular security audits
- Intrusion detection systems

While we take all reasonable precautions, no system is 100% secure. We will notify affected users within 72 hours of discovering a data breach as required by the DPDP Act 2023.`,
  },
  {
    title: '7. Your Rights Under DPDP Act 2023',
    content: `Under the Digital Personal Data Protection Act 2023, you have the right to:

- **Access**: Request a copy of the personal data we hold about you
- **Correction**: Request correction of inaccurate or incomplete data
- **Erasure**: Request deletion of your personal data (subject to legal retention requirements)
- **Grievance Redressal**: Lodge a complaint with our Data Protection Officer
- **Nomination**: Nominate another individual to exercise your rights in case of death or incapacity

To exercise any of these rights, email us at contact@iotcom.io with the subject line "DPDP Rights Request".`,
  },
  {
    title: '8. Cookies',
    content: `We use cookies and similar tracking technologies to:

- Maintain your session and preferences
- Analyse website traffic (Google Analytics)
- Improve user experience

You can control cookies through your browser settings. Disabling cookies may affect some functionality of the platform. We do not use cookies for cross-site advertising.`,
  },
  {
    title: '9. Children\'s Privacy',
    content: `Samvaad is not intended for use by individuals under the age of 18. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, please contact us immediately at contact@iotcom.io.`,
  },
  {
    title: '10. Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or by posting a prominent notice on our website at least 30 days before the changes take effect. Continued use of Samvaad after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    title: '11. Contact Us',
    content: `For any privacy concerns, data requests, or complaints:

**Iotcom.io — Data Protection Officer**
84 Tilak Vihar A, Gokulpura
Jaipur, Rajasthan 302015, India

Email: contact@iotcom.io
Phone: +91 93585 35763
Website: https://iotcom.io`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            Legal
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-black tracking-tight leading-none mb-4">
            Privacy Policy
          </h1>
          <p className="text-black/50 text-sm font-medium">
            Last updated: <span className="text-black font-bold">May 1, 2026</span>
          </p>
          <p className="text-black/50 text-sm mt-2 leading-relaxed">
            This policy explains how Iotcom.io collects, uses, and protects your personal data in compliance with the Digital Personal Data Protection (DPDP) Act 2023 and applicable Indian law.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">

          {/* TOC */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 glass-panel rounded-2xl p-5">
              <p className="text-[10px] font-black tracking-[0.2em] uppercase text-black/40 mb-4">Contents</p>
              <nav className="flex flex-col gap-2">
                {SECTIONS.map((s, i) => (
                  <a key={i} href={`#section-${i}`}
                    className="text-xs font-medium text-black/50 hover:text-green-600 transition-colors leading-snug">
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Sections */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            {SECTIONS.map((s, i) => (
              <div key={i} id={`section-${i}`} className="glass-panel rounded-2xl p-7">
                <h2 className="font-['Bebas_Neue'] text-2xl text-black mb-4 leading-none">{s.title}</h2>
                <div className="text-sm text-black/60 leading-relaxed space-y-3">
                  {s.content.split('\n\n').map((para, j) => (
                    <p key={j} dangerouslySetInnerHTML={{
                      __html: para
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-black font-bold">$1</strong>')
                        .replace(/\n/g, '<br />')
                    }} />
                  ))}
                </div>
              </div>
            ))}

            {/* Footer links */}
            <div className="flex gap-4 pt-4 border-t border-black/6">
              <Link href="/terms" className="text-sm font-semibold text-green-600 hover:underline">Terms of Service →</Link>
              <Link href="/" className="text-sm font-medium text-black/40 hover:text-black transition-colors">← Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
