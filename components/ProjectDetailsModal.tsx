"use client"

import { X, Users as UsersIcon, Building, FileText, Calendar } from "lucide-react";
import Image from "next/image";

interface Project {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  status: string;
  statusColor: string;
  progress: number;
  category: string;
  image: string;
  users?: number;
  moreUsers?: number;
  companies?: string[];
  totalDocs?: number;
  pendingDocs?: number;
  startDate?: string;
  endDate?: string;
}

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailsModal({ project, onClose }: ProjectDetailsModalProps) {
  if (!project) return null;

  const getProgressColor = (progress: number) => {
    const hue = 222 - (progress / 100) * 80;
    const saturation = 80 - (progress / 100) * 10;
    const lightness = 50 - (progress / 100) * 5;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-lg shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project Image */}
        <div className="relative w-full h-64 overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
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
