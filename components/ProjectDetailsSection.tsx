"use client"

import { X, Users as UsersIcon, Building, FileText, Calendar, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "@/types/project";

interface ProjectDetailsSectionProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsSection({ project, onClose }: ProjectDetailsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && sectionRef.current) {
      // Smooth scroll to the section when project is selected
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [project]);

  if (!project) return null;

  const getProgressColor = (progress: number) => {
    const hue = 222 - (progress / 100) * 80;
    const saturation = 80 - (progress / 100) * 10;
    const lightness = 50 - (progress / 100) * 5;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div
      ref={sectionRef}
      className="mb-8 rounded-lg border bg-card shadow-lg overflow-hidden animate-in slide-in-from-top-4 duration-300"
    >
      {/* Header with Close Button */}
      <div className="relative flex items-center justify-between bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60 px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Project Details</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-background/80 hover:shadow-md transition-all"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Project Image - Left Column */}
        <div className="lg:col-span-1">
          <div className="relative w-full h-64 lg:h-full min-h-[300px] overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border/50">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Project Details - Right Columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${project.statusColor}`}>
                {project.status}
              </span>
              <span className="text-sm text-muted-foreground">{project.id}</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">{project.name}</h2>
            <p className="text-lg text-muted-foreground">{project.location}</p>
          </div>

          {/* Progress */}
          <div className="space-y-2 p-4 rounded-xl bg-gradient-to-br from-muted/30 to-muted/60 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-2xl font-bold">{project.progress}%</span>
            </div>
            <div className="h-4 w-full overflow-hidden rounded-full bg-muted shadow-inner">
              <div
                className="h-full transition-all relative overflow-hidden rounded-full"
                style={{
                  width: `${project.progress}%`,
                  background: `linear-gradient(90deg, ${getProgressColor(project.progress)}, ${getProgressColor(project.progress)}dd)`,
                  boxShadow: `0 2px 4px ${getProgressColor(project.progress)}40`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
              <p className="text-lg font-semibold">{project.category}</p>
            </div>

            {/* Timeline */}
            {project.startDate && project.endDate && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Timeline</h3>
                </div>
                <p className="text-lg font-semibold">
                  {project.startDate} - {project.endDate}
                </p>
              </div>
            )}

            {/* Users */}
            {project.users && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/20 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <UsersIcon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold">Team Members</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(project.users, 5))].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 font-medium text-primary-foreground ring-3 ring-background text-sm shadow-md"
                      >
                        {['JD', 'SM', 'AL', 'RK', 'PT'][i]}
                      </div>
                    ))}
                  </div>
                  {project.moreUsers && (
                    <span className="text-sm font-medium text-muted-foreground bg-muted/50 px-2 py-1 rounded-full">+{project.moreUsers}</span>
                  )}
                </div>
              </div>
            )}

            {/* Companies */}
            {project.companies && project.companies.length > 0 && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/20 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-secondary/10">
                    <Building className="h-4 w-4 text-secondary" />
                  </div>
                  <h3 className="text-sm font-semibold">Companies</h3>
                </div>
                <div className="space-y-2">
                  {project.companies.map((company, i) => (
                    <div key={i} className="text-sm flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-secondary/60" />
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {project.totalDocs && (
              <div className="p-4 rounded-xl bg-gradient-to-br from-background to-muted/20 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="text-sm font-semibold">Submissions</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Documents</span>
                    <span className="font-bold text-lg bg-muted/50 px-3 py-1 rounded-lg">{project.totalDocs}</span>
                  </div>
                  {project.pendingDocs !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pending</span>
                      <span className="font-bold text-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-lg">{project.pendingDocs}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
