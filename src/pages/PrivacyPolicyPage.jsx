import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-foreground"
    >
      <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl border border-border/20">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-6 sm:mb-8 text-center">Privacy Policy</h1>

        <p className="text-sm text-muted-foreground mb-6 text-center">Effective Date: May 30, 2025</p>
        
        <div className="space-y-6 text-muted-foreground">
          <p className="mb-4">
            <strong>Website:</strong> www.linkedin-smartleads.com <br />
            <strong>Product Owner:</strong> Smart Leads, a product of Digital Drive
          </p>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">1. Overview</h2>
            <p>
              At Smart Leads, your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit our website or use our platform, Smart Leads, hosted at www.linkedin-smartleads.com. By using our services, you agree to the terms outlined in this policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
            <p>We collect the following types of data:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>User-Provided Information:</strong> Name, email address, and profile photo; LinkedIn account data (through integrations like Dripify or Sales Navigator); Profile URL and public info; Uploaded content (e.g., banners, bios, copy); Calendar data (via Outlook or Calendly).
              </li>
              <li>
                <strong>Automated Information:</strong> IP address and browser type; Device identifiers; Usage patterns (e.g., page visits, time on platform); Campaign performance data (e.g., message delivery rates, meeting bookings).
              </li>
              <li>
                <strong>Third-Party Data:</strong> Data enriched via Seamless.ai or other integrations; Messaging assistance powered by ChatGPT.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p>We use your data to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Personalize and optimize your LinkedIn profile and outreach</li>
              <li>Automate AI-generated messages and drip campaigns</li>
              <li>Schedule meetings on your behalf via connected calendars</li>
              <li>Analyze campaign performance</li>
              <li>Communicate updates, product tips, and support messages</li>
              <li>Improve our platform and user experience</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">4. Third-Party Integrations</h2>
            <p>We integrate with trusted partners including:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>LinkedIn (via Dripify API or similar)</li>
              <li>ChatGPT (for smart messaging)</li>
              <li>Calendly / Outlook (calendar sync)</li>
              <li>Canva / Remove.bg (visual enhancements)</li>
              <li>Seamless.ai (data enrichment)</li>
            </ul>
            <p>Your data shared with these tools will be subject to their respective privacy policies.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">5. Data Storage and Security</h2>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>We use secure, encrypted servers to store your data.</li>
              <li>All sensitive information is encrypted in transit and at rest.</li>
              <li>Access to user data is limited to authorized personnel only.</li>
              <li>We implement regular security reviews and vulnerability assessments.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">6. Your Rights and Choices</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Access or request deletion of your data</li>
              <li>Opt out of email communications at any time</li>
              <li>Disconnect third-party integrations (e.g., LinkedIn or Calendly)</li>
              <li>Request a copy of your stored data in a portable format</li>
            </ul>
            <p>To exercise any of the above, contact us at: <a href="mailto:hello@digitaldrive.pk" className="text-primary hover:underline">hello@digitaldrive.pk</a></p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">7. Cookies</h2>
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Maintain session states</li>
              <li>Analyze site usage for improvements</li>
              <li>Track marketing campaign effectiveness</li>
            </ul>
            <p>You can modify cookie preferences through your browser settings.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">8. Children’s Privacy</h2>
            <p>
              Smart Leads is not intended for individuals under 18. We do not knowingly collect personal data from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">9. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time. The latest version will always be available at www.linkedin-smartleads.com/privacy with an effective date. Continued use of the platform after updates constitutes acceptance of the new policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">10. Contact Us</h2>
            <p>
              If you have questions or concerns regarding this Privacy Policy or data practices, reach out to us at:
            </p>
            <p>
              📧 <a href="mailto:hello@digitaldrive.pk" className="text-primary hover:underline">hello@digitaldrive.pk</a>
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPage;