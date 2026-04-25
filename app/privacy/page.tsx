
export const metadata = {
  title: "Privacy Policy — Rigko",
};

export default function PrivacyPage() {
  return (
    <div className="pt-16 md:pt-20">
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
              sys://legal/privacy-policy
            </span>
          </div>

          <div className="p-8 md:p-12 space-y-8 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            <div>
              <h1 className="text-2xl font-bold tracking-tighter uppercase text-black dark:text-white mb-2">
                Privacy Policy
              </h1>
              <p className="text-[10px] font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest">
                Last updated: April 19, 2026
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                1. Information We Collect
              </h2>
              <p>
                When you create an account, we collect your email address, username, and a hashed version of your password. We do not store plaintext passwords.
              </p>
              <p>
                We may also collect usage data such as pages visited, build configurations saved, and interaction patterns to improve our services.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                2. How We Use Your Information
              </h2>
              <p>
                Your information is used to provide and maintain the Rigko platform, including account authentication, saving your PC builds, and personalizing your experience with relevant component recommendations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                3. Data Storage & Security
              </h2>
              <p>
                Your data is stored securely using industry-standard encryption. Passwords are hashed using bcrypt. Session tokens are signed with HMAC-SHA256 and stored as httpOnly cookies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                4. Third-Party Services
              </h2>
              <p>
                We may use third-party services for hosting, analytics, and price data aggregation. These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                5. Cookies
              </h2>
              <p>
                We use a single session cookie (<code className="text-[#c2000b] font-mono text-xs">rigko_session</code>) for authentication. This cookie is httpOnly and cannot be accessed by client-side scripts.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                6. Your Rights
              </h2>
              <p>
                You may request deletion of your account and associated data at any time by contacting us. You may also update your profile information through your account settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                7. Contact
              </h2>
              <p>
                For questions regarding this policy, please reach out to us at{" "}
                <a href="mailto:privacy@rigko.com" className="text-[#c2000b] hover:underline font-bold">
                  privacy@rigko.com
                </a>.
              </p>
            </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
