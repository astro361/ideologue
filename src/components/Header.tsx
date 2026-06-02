"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Circle } from "lucide-react";

interface HeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
}

export default function Header({ user }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="frosted-glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group smooth-transition">
            <div className="w-2 h-2 rounded-full bg-slate-900 group-hover:scale-125 smooth-transition"></div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">IdeaLogue</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-10">
            <Link
              href="/"
              className={`text-sm font-medium smooth-transition uppercase-premium ${
                pathname === "/"
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Explore
            </Link>

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`text-sm font-medium smooth-transition uppercase-premium ${
                    pathname === "/dashboard"
                      ? "text-slate-900"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Collection
                </Link>
                <Link
                  href="/submit"
                  className="px-6 py-2.5 rounded-full btn-accent text-sm font-medium"
                >
                  New Idea
                </Link>
                <div className="flex items-center gap-4 ml-2">
                  {user.image && (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-9 h-9 rounded-full border border-slate-200 smooth-transition hover:border-slate-300"
                    />
                  )}
                  <form action="/api/auth/signout" method="POST">
                    <button
                      type="submit"
                      className="text-sm font-medium text-slate-500 hover:text-slate-900 smooth-transition uppercase-premium"
                    >
                      Exit
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="px-6 py-2.5 rounded-full btn-minimal text-sm font-medium text-slate-700"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
