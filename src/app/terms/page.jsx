"use client";

import LegalSection from "@/Components/shared/LegalSection";

export default function TermsPage() {
  return (
    <main>
      {/* ================= MINIMAL HEADER ================= */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200/70">
        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#FDECEF] blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#FFF0F2] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-3xl font-black text-[#171717] sm:text-4xl lg:text-5xl">
              Terms &amp; Conditions
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#6F6F6F] sm:text-base">
              These Terms &amp; Conditions govern your use of the BloodBridge platform.
              Please read them carefully before using our services.
            </p>
            <p className="mt-2 text-xs font-semibold text-slate-400">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* ================= TERMS CONTENT ================= */}
      <section className="bg-[#FFF9FA] py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-10 sm:space-y-12">
            <LegalSection number={1} title="Introduction">
              <p>
                Welcome to BloodBridge. These Terms &amp; Conditions (&quot;Terms&quot;)
                apply to your use of the BloodBridge website, mobile experience, and
                related services. By accessing or using the platform, you agree to be
                bound by these Terms.
              </p>
              <p className="mt-3">
                BloodBridge is a community-oriented platform designed to help connect
                people who need blood with willing donors. We are not a medical service,
                and the platform does not replace professional medical advice, diagnosis,
                or treatment.
              </p>
            </LegalSection>

            <LegalSection number={2} title="Acceptance of Terms">
              <p>
                By creating an account or using any part of BloodBridge, you confirm that
                you have read, understood, and agree to these Terms. If you do not agree
                with any part of these Terms, please do not use the platform.
              </p>
            </LegalSection>

            <LegalSection number={3} title="Using BloodBridge">
              <p>
                You may use BloodBridge only for lawful purposes and in accordance with
                these Terms. You agree not to use the platform in any way that violates
                applicable laws or regulations or that could harm, disable, or impair the
                platform or interfere with any other party&apos;s use and enjoyment of
                the platform.
              </p>
            </LegalSection>

            <LegalSection number={4} title="User Accounts">
              <p>
                To access certain features, you must create an account. You are
                responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account. Please notify us
                immediately of any unauthorized use or security breach.
              </p>
            </LegalSection>

            <LegalSection number={5} title="Blood Donation Requests">
              <p>
                Users may create and manage blood donation requests through the platform.
                All information provided in a request should be accurate, truthful, and
                relevant. BloodBridge does not guarantee the availability of donors or the
                outcome of any request.
              </p>
            </LegalSection>

            <LegalSection number={6} title="Donor and Volunteer Responsibilities">
              <p>
                Donors and volunteers should act responsibly and safely. Donors should
                ensure they meet eligibility requirements before donating and follow the
                guidance provided by certified healthcare professionals or donation
                centers. Volunteers should support the community with integrity and respect.
              </p>
            </LegalSection>

            <LegalSection number={7} title="Prohibited Activities">
              <p>
                You may not use BloodBridge to post false, misleading, or fraudulent
                requests; harass, abuse, or harm other users; interfere with the
                platform&apos;s operation; or attempt to gain unauthorized access to
                accounts or systems. Violations may result in account suspension or
                termination.
              </p>
            </LegalSection>

            <LegalSection number={8} title="User-Generated Information">
              <p>
                Users are responsible for the information they submit to BloodBridge,
                including profile details, request descriptions, and communications. We do
                not endorse or guarantee the accuracy of user-generated content. Please
                report any content that appears false, harmful, or inappropriate.
              </p>
            </LegalSection>

            <LegalSection number={9} title="Platform Availability">
              <p>
                We strive to keep BloodBridge available and functional, but we do not
                guarantee uninterrupted access. The platform may be temporarily unavailable
                due to maintenance, updates, or circumstances beyond our control. We are
                not liable for any loss or inconvenience arising from platform downtime.
              </p>
            </LegalSection>

            <LegalSection number={10} title="Limitation of Liability">
              <p>
                To the maximum extent permitted by law, BloodBridge and its operators shall
                not be liable for any indirect, incidental, special, consequential, or
                punitive damages, including loss of data, profits, or goodwill, arising
                from your use of or inability to use the platform.
              </p>
            </LegalSection>

            <LegalSection number={11} title="Third-Party Services">
              <p>
                BloodBridge may integrate with or link to third-party services, including
                authentication providers and mapping services. We are not responsible for
                the content, policies, or practices of third-party services.
              </p>
            </LegalSection>

            <LegalSection number={12} title="Changes to Terms">
              <p>
                We may revise these Terms from time to time. Material changes will be
                communicated through the platform or via email. Your continued use of
                BloodBridge after changes become effective constitutes acceptance of the
                revised Terms.
              </p>
            </LegalSection>

            <LegalSection number={13} title="Termination">
              <p>
                We reserve the right to suspend or terminate your account and access to
                BloodBridge at our discretion, without prior notice, for conduct that we
                believe violates these Terms or is harmful to other users, us, or the
                platform.
              </p>
            </LegalSection>

            <LegalSection number={14} title="Contact Information">
              <p>
                If you have questions or concerns about these Terms, please contact us:
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
