import Header from "@/app/components/header";
import HeaderAuth from "@/app/components/header-auth";
import Footer from "@/app/components/footer";

export const metadata = {
  title: "Terms of Service — Rigko",
};

export default function TermsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Header>
        <HeaderAuth />
      </Header>
      <div className="min-h-[calc(100vh-5rem)] px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[var(--chassis-border)] bg-[var(--chassis-gray)] shadow-lg">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--chassis-border)] bg-[var(--deck-secondary)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c2000b]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--chassis-highlight)]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[var(--chassis-highlight)]" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-2">
                sys://legal/terms-of-service
              </span>
            </div>

            <div className="p-8 md:p-12 space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              <div>
                <h1 className="text-2xl font-bold tracking-tighter uppercase text-black dark:text-white mb-2">
                  Terms of Service
                </h1>
                <p className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                  Last updated: April 19, 2026
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing or using the Rigko platform, you agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, do not use the service.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  2. Description of Service
                </h2>
                <p>
                  Rigko is a PC component comparison and build configuration
                  platform. We aggregate pricing data from Southeast Asian
                  retailers to help users plan and optimize their PC builds.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  3. User Accounts
                </h2>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials. You must provide accurate
                  information during registration. We reserve the right to
                  suspend accounts that violate these terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  4. Acceptable Use
                </h2>
                <p>
                  You agree not to misuse the platform, including but not
                  limited to: scraping price data for commercial purposes,
                  attempting to compromise system security, impersonating other
                  users, or using automated tools to access the service without
                  permission.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  5. Pricing Data Disclaimer
                </h2>
                <p>
                  Prices displayed on Rigko are sourced from third-party
                  retailers and may not reflect real-time availability or final
                  checkout prices. Rigko is not responsible for pricing
                  discrepancies between our platform and retailer websites.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  6. Intellectual Property
                </h2>
                <p>
                  All content, branding, and design elements on Rigko are the
                  property of Rigko and its creators. User-generated build
                  configurations remain the property of the user but may be
                  displayed publicly if shared.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  7. Limitation of Liability
                </h2>
                <p>
                  Rigko is provided &ldquo;as is&rdquo; without warranties of
                  any kind. We are not liable for any damages resulting from use
                  of the platform, including but not limited to hardware
                  compatibility issues or purchasing decisions made based on our
                  data.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  8. Modifications
                </h2>
                <p>
                  We reserve the right to modify these terms at any time.
                  Continued use of the platform after changes constitutes
                  acceptance of the updated terms.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                  9. Contact
                </h2>
                <p>
                  For questions about these terms, contact us at{" "}
                  <a
                    href="mailto:legal@rigko.com"
                    className="text-[#c2000b] hover:underline font-bold"
                  >
                    legal@rigko.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
