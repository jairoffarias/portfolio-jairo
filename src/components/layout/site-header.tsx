"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { SiteSettings } from "@/lib/content/types";
import { cn } from "@/lib/utils";

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const links = [
    { href: "/work", label: t("work") },
    { href: "/web-development", label: t("webDevelopment") },
    { href: "/playground", label: t("playground") },
    { href: "/about", label: t("about") },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-stone/70 bg-paper/90 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-xl font-medium tracking-tight text-ink">
            {settings.logoText || "JF"}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium text-graphite transition-colors hover:text-ink",
                  pathname === link.href && "text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <LocaleSwitcher />
            <Link href="/contact" className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-graphite">
              {t("startProject")}
            </Link>
          </div>

          <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          >
            <div className="container flex h-20 items-center justify-between border-b border-stone/70">
              <span className="font-display text-xl font-medium text-ink">{settings.logoText || "JF"}</span>
              <button onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center" aria-label="Fechar menu">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container flex flex-1 flex-col justify-center gap-2">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} onClick={() => setOpen(false)} className="font-display text-4xl font-medium text-ink">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="container flex items-center justify-between border-t border-stone/70 py-6">
              <LocaleSwitcher />
              <Link href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper">
                {t("startProject")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
