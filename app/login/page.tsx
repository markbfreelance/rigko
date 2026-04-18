"use client";

import { useActionState } from "react";
import { login, type AuthResult } from "@/app/actions/auth";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<AuthResult | null, FormData>(login, null);

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Terminal-style card */}
        <div className="border border-[var(--chassis-border)] bg-[var(--chassis-gray)] shadow-lg">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--chassis-border)] bg-[var(--deck-secondary)]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#c2000b]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--chassis-highlight)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--chassis-highlight)]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-2">
              sys://auth/login
            </span>
          </div>

          <div className="p-8">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative h-10 w-10 mb-3">
                <Image src="/rigko-logo.svg" alt="Rigko" fill className="object-contain" />
              </div>
              <h1 className="text-xl font-bold tracking-tighter uppercase text-black dark:text-white">
                Access Terminal
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-1">
                authenticate to continue
              </p>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="mb-6 flex items-center gap-2 px-3 py-2 bg-[#c2000b]/10 border border-[#c2000b]/30 text-[#c2000b] text-xs font-mono">
                <Icon icon="mdi:alert-circle-outline" className="text-sm shrink-0" />
                {state.error}
              </div>
            )}

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2.5 bg-[var(--background)] border border-[var(--chassis-border)] text-sm font-mono text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-[#c2000b] transition-colors"
                  placeholder="user@rigko.com"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full px-3 py-2.5 bg-[var(--background)] border border-[var(--chassis-border)] text-sm font-mono text-[var(--foreground)] placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-[#c2000b] transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full py-2.5 bg-[#c2000b] text-white text-xs font-black uppercase tracking-widest hover:bg-[#a0000a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-[0_0_20px_rgba(194,0,11,0.3)]"
              >
                {pending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="mdi:loading" className="animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                No account?{" "}
                <Link href="/register" className="text-[#c2000b] hover:underline font-bold">
                  Register
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
