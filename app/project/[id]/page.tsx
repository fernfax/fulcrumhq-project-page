"use client"

import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { OrganisationCard } from "@/components/OrganisationCard";
import { ThemeToggle } from "@/components/theme-toggle";
import { sampleOrganisations } from "@/types/organisation";

// This would normally come from a database or API
const projectsMap: Record<string, { name: string; id: string }> = {
  AMKI: { name: "Ang Mo Kio Infra", id: "AMKI" },
  TL4: { name: "Infra at Tuas Link 4", id: "TL4" },
  LDI: { name: "Loyang Drive (North) Infra", id: "LDI" },
  LNS: { name: "Loyang North Substation", id: "LNS" },
  AS4D: { name: "Aerospace 4 (Design) - Multiple", id: "AS4D" },
  BP2C: { name: "Bulim Ph2 Main Infra (Construction)", id: "BP2C" },
  BP2D: { name: "Bulim Ph2 Main Infra (Design) - Multiple", id: "BP2D" },
  AMK2D: { name: "Space @ AMK2 (Design) - Multiple", id: "AMK2D" },
  KAEC: { name: "Infrastructure at Kolam Ayer Estate (Construction)", id: "KAEC" },
  KAED: { name: "Infrastructure at Kolam Ayer Estate (Design) - Multiple", id: "KAED" },
  ARPE: { name: "Ayer Rajah Precinct Enhancements", id: "ARPE" },
  BLS: { name: "Bulim Square", id: "BLS" },
  AMGI2A: { name: "Ground Improvement Works at Ayer Merbau Road", id: "AMGI2A" },
  RRG1BA: { name: "Group 1B R&R (Part A) – MIE", id: "RRG1BA" },
  RRG1BB: { name: "Group 1B R&R (Part B) – EIE, GBIE, GEIE, AIE", id: "RRG1BB" },
  WSSX: { name: "Wessex R&R", id: "WSSX" },
  G3RRA: { name: "R&R Group 3 Part A", id: "G3RRA" },
  G3RRB: { name: "R&R Group 3 Part B", id: "G3RRB" },
  SAP3B2: { name: "SAP3B2 Infra", id: "SAP3B2" },
  BGS: { name: "Benoi-Gul Sewer (Construction)", id: "BGS" },
  BIP1: { name: "Bulim Infra Phase 1 (Construction)", id: "BIP1" },
  DLN: { name: "DLN Ramp (Construction)", id: "DLN" },
  FABT: { name: "Fascia A&A BIPE TIPA (Construction)", id: "FABT" },
  JEG: { name: "JEG (Construction)", id: "JEG" },
  F1RR: { name: "F1 R&R (Construction)", id: "F1RR" },
  FPB: { name: "Fascia Package B (Construction)", id: "FPB" },
  SITC: { name: "SITC FY21-22 (Construction)", id: "SITC" },
  CTL: { name: "CleanTech Linkway (Construction)", id: "CTL" },
  MIP2A: { name: "Merbau Infra Ph2a (Construction)", id: "MIP2A" },
  PRID1: { name: "Pasir Ris Industrial Drive 1 Cul De Sac (Construction)", id: "PRID1" },
};

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const project = projectsMap[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="text-primary hover:underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back to Projects</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 ml-4 pl-4 border-l">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                {project.id}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, Evan</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              EV
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 md:px-8 py-8">
        {/* Project Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <p className="text-muted-foreground">
            Organisations & Workspaces within this project
          </p>
        </div>

        {/* Organisation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleOrganisations.map((org) => (
            <OrganisationCard key={org.id} organisation={org} />
          ))}
        </div>
      </main>
    </div>
  );
}
