"use client";

import LegalSection from "@/Components/shared/LegalSection";

export default function PrivacyPage() {
  return (
    <main>
      {/* ================= MINIMAL HEADER ================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/70">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#FFF0F2] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-black text-[#171717] sm:text-4xl lg:text-5xl">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#6F6F6F] sm:text-base">
              This Privacy Policy explains how BloodBridge collects, uses, and protects
              your information when you use our platform.
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= POLICY CONTENT ================= */}
      <section className="bg-[#FFF9FA] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-10 sm:space-y-12">
            <LegalSection number={1} title="Introduction">
              <p>
                BloodBridge is committed to protecting your privacy. This Privacy Policy
                describes how we handle information when you access and use our platform.
                By using BloodBridge, you agree to the practices described in this policy.
              </p>
            </LegalSection>

            <LegalSection number={2} title="Information We Collect">
              <p>
                We may collect information that you provide directly to us, such as when
                you create an account, update your profile, submit a blood request, or
                contact us for support. This may include your name, email address, phone
                number, location details, blood group, and any other information you choose
                to provide.
              </p>
            </LegalSection>

            <LegalSection number={3} title="How We Use Information">
              <p>
                The information we collect is used to operate and improve the BloodBridge
                platform, connect donors with recipients, process and display blood
                requests, provide customer support, and communicate important updates or
                notifications related to your account and activity on the platform.
              </p>
            </LegalSection>

            <LegalSection number={4} title="Information Sharing">
              <p>
                BloodBridge does not sell your personal information. We may share
                information with other users as necessary to facilitate blood donation
                requests and responses, such as displaying a donor&apos;s location,
                blood group, and contact details to a recipient who needs that
                information. We may also share information with service providers who
                assist with platform operations, subject to confidentiality obligations.
              </p>
            </LegalSection>

            <LegalSection number={5} title="Account Information">
              <p>
                You are responsible for maintaining the accuracy and security of your
                account information. Please keep your login credentials confidential and
                notify us immediately if you suspect any unauthorized use of your account.
                You may update or delete your account information at any time through your
                account settings.
              </p>
            </LegalSection>

            <LegalSection number={6} title="Blood Donation and Request Information">
              <p>
                Information submitted through blood donation requests, donor profiles, and
                related features is intended to support matching and coordination. Please
                be mindful of the information you share and only provide details you are
                comfortable making visible to other platform users.
              </p>
            </LegalSection>

            <LegalSection number={7} title="Data Security">
              <p>
                We implement reasonable technical and organizational measures to protect
                your information from unauthorized access, disclosure, or loss. However,
                no platform can guarantee absolute security. We encourage you to use
                strong passwords and to report any suspicious activity.
              </p>
            </LegalSection>

            <LegalSection number={8} title="Cookies and Similar Technologies">
              <p>
                BloodBridge may use cookies and similar technologies to improve your
                experience, analyze usage patterns, and support platform functionality.
                You can manage cookie preferences through your browser settings.
              </p>
            </LegalSection>

            <LegalSection number={9} title="Data Retention">
              <p>
                We retain information for as long as necessary to provide services,
                comply with legal obligations, resolve disputes, and enforce our
                agreements. When information is no longer needed, it is securely deleted
                or anonymized.
              </p>
            </LegalSection>

            <LegalSection number={10} title="User Rights">
              <p>
                Depending on your location, you may have rights regarding your personal
                information, such as the right to access, correct, or request deletion of
                your data. To exercise these rights, contact us through the contact
                information provided on this page.
              </p>
            </LegalSection>

            <LegalSection number={11} title="Children&apos;s Privacy">
              <p>
                BloodBridge is not intended for children under the age required by local
                law for blood donation or platform registration. We do not knowingly
                collect personal information from children. If you believe a child has
                provided information on our platform, please contact us.
              </p>
            </LegalSection>

            <LegalSection number={12} title="Changes to This Privacy Policy">
              <p>
                We may update this Privacy Policy from time to time. We will notify users
                of material changes through the platform or via email. Continued use of
                the platform after changes become effective constitutes acceptance of the
                updated policy.
              </p>
            </LegalSection>

            <LegalSection number={13} title="Contact Information">
              <p>
                If you have questions or concerns about this Privacy Policy, please reach
                out to us:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-[#6F6F6F]">
                <li>Email: hello@bloodbridge.com</li>
                <li>Phone: +880 1700-000000</li>
                <li>Location: Bangladesh</li>
              </ul>
            </LegalSection>
          </div>
        </div>
      </section>
    </main>
  );
}
