"use client";
import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Project } from "@/lib/content/types";
import { ProjectGrid } from "./project-grid";
import { cn } from "@/lib/utils";

export function WorkExplorer({ projects, categories }: { projects: Project[]; categories: string[] }) {
  const t = useTranslations("work");
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => (active === "all" ? projects : projects.filter((p) => p.category === active)), [active, projects]);

  return (
    <div>
      <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActive("all")}
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === "all" ? "border-ink bg-ink text-paper" : "border-stone text-graphite hover:border-ink hover:text-ink"
          )}
        >
          {t("filterAll")}
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat ? "border-ink bg-ink text-paper" : "border-stone text-graphite hover:border-ink hover:text-ink"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {filtered.length > 0 ? <ProjectGrid projects={filtered} /> : <p className="py-16 text-center text-graphite">{t("empty")}</p>}
      </div>
    </div>
  );
}
