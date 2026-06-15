export const metadata = {
  title: 'Privacy Policy — BillSlash',
  description: 'How BillSlash handles your data.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 20, fontWeight: 700, color: '#2563eb', marginBottom: 12 }}>{title}</h2>
    <div style={{ color: '#374151', lineHeight: 1.7, fontSize: 15 }}>{children}</div>
  </section>
)

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 80px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ color: '#64748b', marginBottom: 48, fontSize: 14 }}>Last updated: June 2025</p>
      <Section title="Data We Collect">
        <p>We collect bill details, provider names, and amounts you enter to generate negotiation scripts. No financial account credentials or payment data are ever requested or stored.</p>
      </Section>
      <Section title="How We Use Data">
        <p>Bill information is processed by AI to write your negotiation script. We do not store your bill details, provider names, or amounts after your session ends.</p>
      </Section>
      <Section title="Cookies">
        <p>We use minimal session cookies for functionality and usage limits. No advertising or tracking cookies are used.</p>
      </Section>
      <Section title="Third-Party Services">
        <p>AI script generation uses Groq and/or OpenAI APIs. Bill details are transmitted to these services and subject to their privacy policies. We do not sell your data to any third party.</p>
      </Section>
      <Section title="Data Retention">
        <p>Bill and provider data is not retained after your session. Generated scripts are not saved on our servers.</p>
      </Section>
      <Section title="Your Rights">
        <p>Email <a href="mailto:privacy@billslash.app" style={{ color: '#2563eb' }}>privacy@billslash.app</a> to request deletion of any data we hold about you.</p>
      </Section>
      <Section title="Children&apos;s Privacy">
        <p>This service is not directed at children under 13. We do not knowingly collect data from minors.</p>
      </Section>
      <Section title="Contact">
        <p>Questions about this policy? Email <a href="mailto:privacy@billslash.app" style={{ color: '#2563eb' }}>privacy@billslash.app</a></p>
      </Section>
    </main>
  )
}
