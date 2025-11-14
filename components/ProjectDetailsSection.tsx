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
      <div className="relative flex items-center justify-between bg-muted/50 px-6 py-3 border-b">
        <div className="flex items-center gap-2">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Project Details</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-background transition-all"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Project Image - Left Column */}
        <div className="lg:col-span-1">
          <div className="relative w-full h-64 lg:h-full min-h-[300px] overflow-hidden rounded-lg bg-muted">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-2xl font-bold">{project.progress}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full transition-all"
                style={{
                  width: `${project.progress}%`,
                  backgroundColor: getProgressColor(project.progress)
                }}
              />
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
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Team Members</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(project.users, 5))].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-medium text-primary-foreground ring-2 ring-background text-sm"
                      >
                        {['JD', 'SM', 'AL', 'RK', 'PT'][i]}
                      </div>
                    ))}
                  </div>
                  {project.moreUsers && (
                    <span className="text-sm text-muted-foreground">+{project.moreUsers} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Companies */}
            {project.companies && project.companies.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Companies</h3>
                </div>
                <div className="space-y-2">
                  {project.companies.map((company, i) => (
                    <div key={i} className="text-sm">
                      • {company}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Documents */}
            {project.totalDocs && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium text-muted-foreground">Submissions</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Documents</span>
                    <span className="font-semibold">{project.totalDocs}</span>
                  </div>
                  {project.pendingDocs !== undefined && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pending Review</span>
                      <span className="font-semibold">{project.pendingDocs}</span>
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
