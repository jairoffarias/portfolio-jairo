import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "outline" | "link";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  showArrow?: boolean;
}

export function Button({ href, variant = "primary", className, children, type = "button", disabled, onClick, showArrow = true }: ButtonProps) {
  const base = "group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ease-editorial";
  const styles = {
    primary: "rounded-full bg-ink px-6 py-3 text-paper hover:bg-graphite disabled:opacity-50",
    outline: "rounded-full border border-ink px-6 py-3 text-ink hover:bg-ink hover:text-paper disabled:opacity-50",
    link: "text-ink border-b border-ink/30 pb-0.5 hover:border-ink",
  };

  const content = (
    <>
      {children}
      {showArrow && <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(base, styles[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cn(base, styles[variant], className)}>
      {content}
    </button>
  );
}
