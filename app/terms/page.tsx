import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Samvaad by Iotcom.io',
  description: 'Terms of Service for Samvaad AI Voice Bot by Iotcom.io. Read our terms governing the use of our AI voice automation platform.',
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using Samvaad ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you are using Samvaad on behalf of a business, you represent that you have the authority to bind that business to these Terms.

If you do not agree to these Terms, do not use the Platform. These Terms constitute a legally binding agreement between you and Iotcom.io.`,
  },
  {
    title: '2. Description of Service',
    content: `Samvaad is an AI-powered voice automation platform that enables businesses to automate inbound and outbound telephone calls using artificial intelligence. The Platform includes:

- AI voice agents capable of natural language conversation
- Campaign management tools for outbound calling
- Call recording, transcription, and analytics
- CRM integration capabilities
- An administrative dashboard for managing agents and campaigns

The Platform is provided as a Software-as-a-Service (SaaS) on a subscription or pay-per-use basis.`,
  },
  {
    title: '3. Eligibility & Account Registration',
    content: `To use Samvaad, you must:

- Be at least 18 years of age
- Be a registered business entity or individual operating a legitimate business
- Provide accurate and complete registration information
- Maintain the security of your account credentials

You are responsible for all activity that occurs under your account. Notify us immediately at contact@iotcom.io if you suspect unauthorised access.`,
  },
  {
    title: '4. Permitted Use & Restrictions',
    content: `**Permitted Use**: You may use Samvaad solely for lawful business communication purposes, including customer support, sales outreach, appointment booking, and service notifications.

**Prohibited Uses**: You must not use Samvaad to:

- Make calls to numbers on the National Do Not Call (NDNC) Registry without prior consent
- Conduct fraudulent, deceptive, or misleading communications
- Harass, threaten, or abuse any individual
- Violate the Telecom Commercial Communications Customer Preference Regulations (TCCCPR)
- Impersonate any person, company, or government authority
- Transmit spam, unsolicited bulk messages, or automated calls without consent
- Violate any applicable law, including the IT Act 2000, DPDP Act 2023, or TRAI regulations
- Reverse engineer, decompile, or attempt to extract the source code of the Platform`,
  },
  {
    title: '5. Calling Compliance',
    content: `You are solely responsible for ensuring your use of Samvaad complies with all applicable telecom regulations, including:

- **TRAI TCCCPR**: Obtaining prior consent before making promotional calls
- **NDNC Registry**: Scrubbing your lead lists against the Do Not Call registry before each campaign
- **Calling Hours**: Restricting calls to permitted hours (8 AM – 9 PM as per TRAI guidelines)
- **Caller ID**: Using only registered and approved Caller IDs (CLIs)
- **Consent Records**: Maintaining records of customer consent for a minimum of 3 years

Iotcom.io provides tools to assist with compliance but is not responsible for your failure to comply with applicable regulations. Violations may result in immediate account suspension.`,
  },
  {
    title: '6. Pricing & Payment',
    content: `**Subscription Plans**: Samvaad is available on monthly subscription plans as described on our pricing page. Subscriptions auto-renew unless cancelled before the renewal date.

**Pay-As-You-Go**: Usage beyond your plan's included minutes is billed at the applicable per-minute rate.

**Payment**: All payments are due in advance. We accept major credit/debit cards and UPI. Invoices are issued in INR.

**Refunds**: Subscription fees are non-refundable except where required by law. Unused minutes do not roll over to the next billing period.

**Price Changes**: We will provide 30 days' notice before changing subscription prices. Continued use after the effective date constitutes acceptance.

**Taxes**: All prices are exclusive of GST. Applicable GST will be added to your invoice.`,
  },
  {
    title: '7. Data & Privacy',
    content: `Your use of Samvaad is also governed by our Privacy Policy, which is incorporated into these Terms by reference.

You retain ownership of all data you input into the Platform, including call recordings, transcripts, and lead data. You grant Iotcom.io a limited licence to process this data solely to provide the Platform services.

You are responsible for obtaining all necessary consents from individuals whose data you process through Samvaad, including consent to record calls where required by law.`,
  },
  {
    title: '8. Intellectual Property',
    content: `**Iotcom.io IP**: The Platform, including its software, AI models, user interface, and documentation, is owned by Iotcom.io and protected by Indian and international intellectual property laws. You receive a limited, non-exclusive, non-transferable licence to use the Platform during your subscription.

**Your IP**: You retain all rights to your content, data, and materials uploaded to the Platform.

**Feedback**: If you provide feedback or suggestions about the Platform, you grant Iotcom.io a perpetual, royalty-free licence to use that feedback without obligation to you.`,
  },
  {
    title: '9. Service Availability & SLA',
    content: `We target 99.9% monthly uptime for the Platform. Scheduled maintenance will be communicated at least 48 hours in advance.

In the event of downtime exceeding our SLA targets, Enterprise customers are eligible for service credits as specified in their Enterprise Agreement. Standard and Pro plan customers are not entitled to service credits but may contact support for assistance.

We are not liable for downtime caused by third-party services (including telecom providers, Google Gemini API, or internet infrastructure), force majeure events, or your own actions.`,
  },
  {
    title: '10. Limitation of Liability',
    content: `To the maximum extent permitted by Indian law:

- Iotcom.io's total liability to you for any claim arising from these Terms or your use of the Platform shall not exceed the amount you paid to us in the 3 months preceding the claim.

- We are not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.

- We are not liable for the content of AI-generated conversations, which may occasionally be inaccurate or inappropriate. You are responsible for reviewing and approving all scripts and personas before deployment.`,
  },
  {
    title: '11. Indemnification',
    content: `You agree to indemnify and hold harmless Iotcom.io, its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:

- Your use of the Platform in violation of these Terms
- Your violation of any applicable law or regulation
- Your infringement of any third-party rights
- Any calls made through your account that violate TRAI regulations or consumer protection laws`,
  },
  {
    title: '12. Termination',
    content: `**By You**: You may cancel your subscription at any time through the dashboard. Cancellation takes effect at the end of the current billing period.

**By Us**: We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent activity, or fail to pay amounts due. We will provide notice where reasonably practicable.

**Effect of Termination**: Upon termination, your access to the Platform ceases. Your data will be retained for 30 days after termination, after which it will be permanently deleted. You may request an export of your data before termination.`,
  },
  {
    title: '13. Governing Law & Dispute Resolution',
    content: `These Terms are governed by the laws of India. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Jaipur, Rajasthan.

Before initiating legal proceedings, both parties agree to attempt resolution through good-faith negotiation for a period of 30 days. If unresolved, disputes shall be referred to arbitration under the Arbitration and Conciliation Act 1996, with a single arbitrator appointed by mutual agreement.`,
  },
  {
    title: '14. Changes to Terms',
    content: `We may update these Terms from time to time. We will notify you of material changes by email or prominent notice on the Platform at least 30 days before the changes take effect.

Your continued use of the Platform after the effective date of updated Terms constitutes your acceptance of the changes.`,
  },
  {
    title: '15. Contact',
    content: `For questions about these Terms:

**Iotcom.io**
84 Tilak Vihar A, Gokulpura
Jaipur, Rajasthan 302015, India

Email: contact@iotcom.io
Phone: +91 93585 35763`,
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24">

        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <span className="inline-block text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 rounded-full px-4 py-1.5 text-black/40 mb-5">
            Legal
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-black tracking-tight leading-none mb-4">
            Terms of Service
          </h1>
          <p className="text-black/50 text-sm font-medium">
            Last updated: <span className="text-black font-bold">May 1, 2026</span>
          </p>
          <p className="text-black/50 text-sm mt-2 leading-relaxed">
            Please read these Terms carefully before using Samvaad. By using the Platform, you agree to be bound by these Terms.
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
              <Link href="/privacy" className="text-sm font-semibold text-green-600 hover:underline">Privacy Policy →</Link>
              <Link href="/" className="text-sm font-medium text-black/40 hover:text-black transition-colors">← Back to home</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
