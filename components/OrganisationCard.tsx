"use client"

import { FileText, Users, CheckSquare, Building2 } from "lucide-react";
import type { Organisation } from "@/types/organisation";

interface OrganisationCardProps {
  organisation: Organisation;
  onClick?: () => void;
}

export function OrganisationCard({ organisation, onClick }: OrganisationCardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col rounded-xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Header with Role Badge */}
      <div className="bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60 px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            {organisation.role}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-4 flex-1 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Organisation Name */}
        <div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {organisation.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{organisation.role}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-2">
          {/* Documents */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-background to-muted/20 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">{organisation.documentsCount}</div>
            <div className="text-xs text-muted-foreground">Documents</div>
          </div>

          {/* Team Members */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-background to-muted/20 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">{organisation.teamMembers}</div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>

          {/* Pending Tasks */}
          <div className="p-3 rounded-lg bg-gradient-to-br from-background to-muted/20 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <CheckSquare className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">{organisation.pendingTasks}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
