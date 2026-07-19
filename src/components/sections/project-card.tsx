"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/content/types";
import { Reveal } from "@/components/animations/reveal";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link href={`/work/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone">
          <Image
            src={project.cover.url}
            alt={project.cover.alt || project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-ink" />
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-xl text-ink">{project.title}</p>
            <p className="mt-1 text-sm text-graphite">{project.category}</p>
          </div>
          <span className="shrink-0 text-sm text-graphite">{project.year}</span>
        </div>
      </Link>
    </Reveal>
  );
}
