"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface AuthNavProps {
  user: { username: string } | null;
}

export default function AuthNav({ user }: AuthNavProps) {
  const [pending, startTransition] = useTransition();

  if (!user) {
    return (
      <Link
        href="/login"
        className="relative flex items-center bg-[#f5f5f5] dark:bg-black border-2 border-[#c2000b]/50 hover:border-[#c2000b] text-black dark:text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:bg-[#c2000b] dark:hover:bg-[#c2000b] hover:text-white transition-all shadow-[0_0_20px_rgba(194,0,11,0.2)] dark:shadow-[0_0_20px_rgba(194,0,11,0.4)]"
      >
        <span>LOGIN</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 dark:text-gray-400 hidden md:block">
        {user.username}
      </span>
      <button
        onClick={() => startTransition(() => logout())}
        disabled={pending}
        className="relative flex items-center gap-2 bg-[#f5f5f5] dark:bg-black border-2 border-[var(--chassis-border)] text-black dark:text-white pl-4 pr-5 py-2 rounded-full text-[11px] font-black uppercase tracking-tighter hover:border-[#c2000b] hover:bg-[#c2000b] dark:hover:bg-[#c2000b] hover:text-white transition-all"
      >
        <Icon icon="solar:logout-3-bold" className="text-sm" />
        <span>{pending ? "..." : "LOGOUT"}</span>
      </button>
    </div>
  );
}
