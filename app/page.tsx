"use client"

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, ChevronLeft, ChevronRight, Users as UsersIcon, Building, FileText, LayoutGrid, Star } from "lucide-react";
import { useState, useMemo } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import dynamic from 'next/dynamic';
import { ProjectDetailsSection } from "@/components/ProjectDetailsSection";
import type { Project } from "@/types/project";
import 'swiper/css';
import 'swiper/css/navigation';

// Dynamically import the map component with SSR disabled (Leaflet requires window object)
const SingaporeMap = dynamic(
  () => import('@/components/SingaporeMap').then(mod => mod.SingaporeMap),
  { ssr: false }
);

const projects: Project[] = [
  {
    id: "AMKI",
    name: "Ang Mo Kio Infra",
    location: "Singapore",
    latitude: 1.3691,
    longitude: 103.8454,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 68,
    category: "Construction",
    image: "/project-images/2020_aerial_view_of_punggol_digital_district.jpg",
    users: 5,
    moreUsers: 7,
    companies: ['Main Contractor Ltd', 'Design Consultants', 'Engineering Partners'],
    totalDocs: 142,
    pendingDocs: 8,
    startDate: "Jan 2024",
    endDate: "Dec 2025",
  },
  {
    id: "TL4",
    name: "Infra at Tuas Link 4",
    location: "Singapore",
    latitude: 1.2943,
    longitude: 103.6359,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 45,
    category: "Design",
    image: "/project-images/jtc-space-tuas-hero-2.jpg",
    users: 4,
    moreUsers: 3,
    companies: ['Design Consultants', 'Engineering Partners'],
    totalDocs: 89,
    pendingDocs: 12,
    startDate: "Mar 2024",
    endDate: "Sep 2025",
  },
  {
    id: "LDI",
    name: "Loyang Drive (North) Infra",
    location: "Singapore",
    latitude: 1.3812,
    longitude: 103.9665,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 72,
    category: "Construction",
    image: "/project-images/img_story127_1.jpg",
    startDate: "Jun 2023",
    endDate: "Mar 2025",
  },
  {
    id: "LNS",
    name: "Loyang North Substation",
    location: "Singapore",
    latitude: 1.3754,
    longitude: 103.9701,
    status: "Hold",
    statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    progress: 22,
    category: "CENTEX",
    image: "/project-images/CPID.png",
    startDate: "Feb 2024",
    endDate: "Aug 2025",
  },
  {
    id: "AS4D",
    name: "Aerospace 4 (Design) - Multiple",
    location: "Singapore",
    latitude: 1.3521,
    longitude: 103.7234,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 35,
    category: "Design",
    image: "/project-images/2020_artist_impression_of_sungei_kadut_central.jpg",
  },
  {
    id: "BP2C",
    name: "Bulim Ph2 Main Infra (Construction)",
    location: "Singapore",
    latitude: 1.3423,
    longitude: 103.7101,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 58,
    category: "Construction",
    image: "/project-images/bulim-phase-2-hero-1.jpg",
  },
  {
    id: "BP2D",
    name: "Bulim Ph2 Main Infra (Design) - Multiple",
    location: "Singapore",
    latitude: 1.3398,
    longitude: 103.7165,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 42,
    category: "Design",
    image: "/project-images/bulim-phase-2-hero-1.jpg",
  },
  {
    id: "AMK2D",
    name: "Space @ AMK2 (Design) - Multiple",
    location: "Singapore",
    latitude: 1.3645,
    longitude: 103.8521,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 28,
    category: "Design",
    image: "/project-images/Kienta@-Tampines-JTC-NanoSpace-scaled.jpg",
  },
  {
    id: "KAEC",
    name: "Infrastructure at Kolam Ayer Estate (Construction)",
    location: "Singapore",
    latitude: 1.3189,
    longitude: 103.8701,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 65,
    category: "Construction",
    image: "/project-images/dream_factories_main_banner.jpg",
  },
  {
    id: "KAED",
    name: "Infrastructure at Kolam Ayer Estate (Design) - Multiple",
    location: "Singapore",
    latitude: 1.3167,
    longitude: 103.8745,
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    progress: 51,
    category: "Design",
    image: "/project-images/dream_factories_main_banner.jpg",
  },
  {
    id: "ARPE",
    name: "Ayer Rajah Precinct Enhancements",
    location: "Singapore",
    latitude: 1.2967,
    longitude: 103.7865,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 83,
    category: "CENTEX",
    image: "/project-images/jtc-space-tuas-hero-2.jpg",
  },
  {
    id: "BLS",
    name: "Bulim Square",
    location: "Singapore",
    latitude: 1.3512,
    longitude: 103.7187,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 47,
    category: "Construction",
    image: "/project-images/de458ead54cd54a724463bbbc1c70c9eefd566155d48225c90832c946b662830.webp",
  },
  {
    id: "AMGI2A",
    name: "Ground Improvement Works at Ayer Merbau Road",
    location: "Singapore",
    latitude: 1.3234,
    longitude: 103.7123,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 91,
    category: "CENTEX",
    image: "/project-images/JTC-Timmac.jpg",
  },
  {
    id: "RRG1BA",
    name: "Group 1B R&R (Part A) – MIE",
    location: "Singapore",
    latitude: 1.3298,
    longitude: 103.8623,
    status: "Hold",
    statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    progress: 76,
    category: "Design",
    image: "/project-images/CPID.png",
  },
  {
    id: "RRG1BB",
    name: "Group 1B R&R (Part B) – EIE, GBIE, GEIE, AIE",
    location: "Singapore",
    latitude: 1.3321,
    longitude: 103.8589,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 62,
    category: "Construction",
    image: "/project-images/2020_artist_impression_of_sungei_kadut_central.jpg",
  },
  {
    id: "WSSX",
    name: "Wessex R&R",
    location: "Singapore",
    latitude: 1.4189,
    longitude: 103.8345,
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    progress: 54,
    category: "Design",
    image: "/project-images/The-LakeGarden-Residences-Panoramic-View-min.jpeg",
  },
  {
    id: "G3RRA",
    name: "R&R Group 3 Part A",
    location: "Singapore",
    latitude: 1.3567,
    longitude: 103.9432,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 38,
    category: "CENTEX",
    image: "/project-images/2020_aerial_view_of_punggol_digital_district.jpg",
  },
  {
    id: "G3RRB",
    name: "R&R Group 3 Part B",
    location: "Singapore",
    latitude: 1.3545,
    longitude: 103.9501,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 18,
    category: "Design",
    image: "/project-images/jtc-cleantech-three-cleantech-park-aerial-view-2-1.png",
  },
  {
    id: "SAP3B2",
    name: "SAP3B2 Infra",
    location: "Singapore",
    latitude: 1.2876,
    longitude: 103.7234,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 71,
    category: "Construction",
    image: "/project-images/img_story127_1.jpg",
  },
  {
    id: "BGS",
    name: "Benoi-Gul Sewer (Construction)",
    location: "Singapore",
    latitude: 1.3145,
    longitude: 103.6754,
    status: "Hold",
    statusColor: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    progress: 85,
    category: "Construction",
    image: "/project-images/dream_factories_main_banner.jpg",
  },
  {
    id: "BIP1",
    name: "Bulim Infra Phase 1 (Construction)",
    location: "Singapore",
    latitude: 1.3456,
    longitude: 103.7089,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 93,
    category: "Construction",
    image: "/project-images/bulim-phase-2-hero-1.jpg",
  },
  {
    id: "DLN",
    name: "DLN Ramp (Construction)",
    location: "Singapore",
    latitude: 1.2765,
    longitude: 103.8234,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 67,
    category: "CENTEX",
    image: "/project-images/JTC-Timmac.jpg",
  },
  {
    id: "FABT",
    name: "Fascia A&A BIPE TIPA (Construction)",
    location: "Singapore",
    latitude: 1.3612,
    longitude: 103.9876,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 44,
    category: "Design",
    image: "/project-images/Kienta@-Tampines-JTC-NanoSpace-scaled.jpg",
  },
  {
    id: "JEG",
    name: "JEG (Construction)",
    location: "Singapore",
    latitude: 1.4234,
    longitude: 103.7654,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 79,
    category: "Construction",
    image: "/project-images/2020_artist_impression_of_sungei_kadut_central.jpg",
  },
  {
    id: "F1RR",
    name: "F1 R&R (Construction)",
    location: "Singapore",
    latitude: 1.3087,
    longitude: 103.6912,
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    progress: 88,
    category: "Construction",
    image: "/project-images/jtc-space-tuas-hero-2.jpg",
  },
  {
    id: "FPB",
    name: "Fascia Package B (Construction)",
    location: "Singapore",
    latitude: 1.2987,
    longitude: 103.7876,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 56,
    category: "CENTEX",
    image: "/project-images/de458ead54cd54a724463bbbc1c70c9eefd566155d48225c90832c946b662830.webp",
  },
  {
    id: "SITC",
    name: "SITC FY21-22 (Construction)",
    location: "Singapore",
    latitude: 1.3543,
    longitude: 103.7654,
    status: "Completed",
    statusColor: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    progress: 100,
    category: "Construction",
    image: "/project-images/jtc-cleantech-three-cleantech-park-aerial-view-2-1.png",
  },
  {
    id: "CTL",
    name: "CleanTech Linkway (Construction)",
    location: "Singapore",
    latitude: 1.3501,
    longitude: 103.7589,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 61,
    category: "Design",
    image: "/project-images/jtc-cleantech-three-cleantech-park-aerial-view-2-1.png",
  },
  {
    id: "MIP2A",
    name: "Merbau Infra Ph2a (Construction)",
    location: "Singapore",
    latitude: 1.3201,
    longitude: 103.7198,
    status: "Planning",
    statusColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    progress: 73,
    category: "Construction",
    image: "/project-images/img_story127_1.jpg",
  },
  {
    id: "PRID1",
    name: "Pasir Ris Industrial Drive 1 Cul De Sac (Construction)",
    location: "Singapore",
    latitude: 1.3712,
    longitude: 103.9523,
    status: "Active",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    progress: 49,
    category: "Design",
    image: "/project-images/CPID.png",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [typeFilter, setTypeFilter] = useState("All Project Types");
  const [gridColumns, setGridColumns] = useState(3);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMapExpanded, setIsMapExpanded] = useState(true);

  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const getProgressColor = (progress: number) => {
    // Blue (hsl(222, 80%, 50%)) to Green (hsl(142, 70%, 45%))
    // Interpolate hue from 222 to 142
    const hue = 222 - (progress / 100) * 80; // 222 at 0%, 142 at 100%
    const saturation = 80 - (progress / 100) * 10; // 80% at 0%, 70% at 100%
    const lightness = 50 - (progress / 100) * 5; // 50% at 0%, 45% at 100%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All Statuses" || project.status === statusFilter;

      const matchesType =
        typeFilter === "All Project Types" || project.category === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Sort: favorites first, then by name
    return filtered.sort((a, b) => {
      const aFav = favorites.has(a.id);
      const bFav = favorites.has(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [searchQuery, statusFilter, typeFilter, favorites]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/fulcrum-logo.webp"
              alt="FulcrumHQ Logo"
              width={180}
              height={40}
              className="h-8 w-auto"
            />
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
      <main className="container mx-auto max-w-7xl px-6 py-12">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Projects</h1>
          <p className="text-muted-foreground">Shaping the future, one landmark at a time.</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects by name, ID, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Planning</option>
              <option>Hold</option>
              <option>Completed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option>All Project Types</option>
              <option>Design</option>
              <option>Construction</option>
              <option>CENTEX</option>
            </select>
            <div className="flex items-center gap-1 rounded-md border bg-background p-1">
              <button
                onClick={() => setGridColumns(3)}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                  gridColumns === 3 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                title="3 columns"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>3</span>
              </button>
              <button
                onClick={() => setGridColumns(5)}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                  gridColumns === 5 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                title="5 columns"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>5</span>
              </button>
              <button
                onClick={() => setGridColumns(7)}
                className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                  gridColumns === 7 ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                title="7 columns"
              >
                <LayoutGrid className="h-4 w-4" />
                <span>7</span>
              </button>
            </div>
          </div>
        </div>

        {/* Project Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredProjects.length} of {projects.length} projects shown
        </div>

        {/* Singapore Map - Expanded (full width above grid) */}
        {isMapExpanded && (
          <div className="mb-8">
            <SingaporeMap
              projects={filteredProjects}
              onProjectClick={(project) => setSelectedProject(project)}
              isExpanded={isMapExpanded}
              onToggle={() => setIsMapExpanded(!isMapExpanded)}
            />
          </div>
        )}

        {/* Project Details Section - Unfurls below map */}
        <ProjectDetailsSection
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        {/* Project Grid */}
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`
          }}
        >
          {/* Singapore Map - Shrunk (first item in grid) */}
          {!isMapExpanded && (
            <Card className="relative overflow-hidden flex flex-col">
              <SingaporeMap
                projects={filteredProjects}
                onProjectClick={(project) => setSelectedProject(project)}
                isExpanded={isMapExpanded}
                onToggle={() => setIsMapExpanded(!isMapExpanded)}
              />
            </Card>
          )}

          {filteredProjects.map((project) => (
            <Card key={project.id} className="relative overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
              <div className="flex-1 overflow-hidden">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    nextEl: `.swiper-button-next-${project.id}`,
                    prevEl: `.swiper-button-prev-${project.id}`,
                  }}
                  className="h-full"
                >
                  {/* Page 1: Main Project Info */}
                  <SwiperSlide>
                    {/* Project Image */}
                    <div className={`relative w-full overflow-hidden bg-muted flex-shrink-0 ${gridColumns >= 5 ? 'h-24' : 'h-32'}`}>
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(project.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all z-10"
                        aria-label={favorites.has(project.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <Star
                          className={`h-4 w-4 transition-all ${
                            favorites.has(project.id)
                              ? 'fill-yellow-500 text-yellow-500'
                              : 'text-muted-foreground hover:text-yellow-500'
                          }`}
                        />
                      </button>
                    </div>

                    <div className={gridColumns >= 5 ? 'p-3 pb-2' : 'p-6 pb-3'}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <div className={`${gridColumns >= 5 ? 'mb-1' : 'mb-2'} flex items-center gap-2`}>
                            <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${project.statusColor}`}>
                              {project.status}
                            </span>
                            <span className="text-xs text-muted-foreground">{project.id}</span>
                          </div>
                          <h3 className={`${gridColumns >= 5 ? 'text-sm' : 'text-lg'} font-semibold leading-tight truncate`}>{project.name}</h3>
                          <p className={`${gridColumns >= 5 ? 'mt-0.5 text-xs' : 'mt-1 text-sm'} text-muted-foreground`}>{project.location}</p>
                        </div>
                      </div>
                    </div>

                    <div className={gridColumns >= 5 ? 'px-3 pb-3 space-y-2' : 'px-6 pb-6 space-y-3'}>
                      {/* Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className={`${gridColumns >= 5 ? 'h-1.5' : 'h-2'} w-full overflow-hidden rounded-full bg-muted`}>
                          <div
                            className="h-full transition-all"
                            style={{
                              width: `${project.progress}%`,
                              backgroundColor: getProgressColor(project.progress)
                            }}
                          />
                        </div>
                      </div>

                      {/* Project Category */}
                      <div className={`flex items-center justify-between ${gridColumns >= 5 ? 'pt-1' : 'pt-2'}`}>
                        <div className={gridColumns >= 5 ? 'flex -space-x-1' : 'flex -space-x-2'}>
                          <div className={`flex ${gridColumns >= 5 ? 'h-5 w-5 text-[10px]' : 'h-7 w-7 text-xs'} items-center justify-center rounded-full bg-orange-500 font-medium text-white ring-2 ring-background`}>
                            JS
                          </div>
                          <div className={`flex ${gridColumns >= 5 ? 'h-5 w-5 text-[10px]' : 'h-7 w-7 text-xs'} items-center justify-center rounded-full bg-cyan-500 font-medium text-white ring-2 ring-background`}>
                            AL
                          </div>
                          <div className={`flex ${gridColumns >= 5 ? 'h-5 w-5 text-[10px]' : 'h-7 w-7 text-xs'} items-center justify-center rounded-full bg-blue-500 font-medium text-white ring-2 ring-background`}>
                            MY
                          </div>
                        </div>
                        <span className={`${gridColumns >= 5 ? 'text-[10px]' : 'text-xs'} text-muted-foreground truncate ml-2`}>{project.category}</span>
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Page 2: Project Details */}
                  <SwiperSlide>
                    <div className={gridColumns >= 5 ? 'p-3 space-y-2' : 'p-6 space-y-4'}>
                      <div>
                        <h3 className={`${gridColumns >= 5 ? 'text-sm' : 'text-lg'} font-semibold leading-tight truncate`}>{project.name}</h3>
                        <p className={`${gridColumns >= 5 ? 'text-xs mt-0.5' : 'text-sm mt-1'} text-muted-foreground`}>Project Details</p>
                      </div>

                      {/* Users */}
                      <div>
                        <div className={`flex items-center gap-1.5 ${gridColumns >= 5 ? 'mb-1' : 'mb-2'}`}>
                          <UsersIcon className={gridColumns >= 5 ? 'h-3 w-3' : 'h-4 w-4'} />
                          <span className={`${gridColumns >= 5 ? 'text-xs' : 'text-sm'} font-medium`}>Users</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={gridColumns >= 5 ? 'flex -space-x-1' : 'flex -space-x-2'}>
                            {[...Array(Math.min(project.users || 4, gridColumns >= 5 ? 3 : 4))].map((_, i) => (
                              <div key={i} className={`flex ${gridColumns >= 5 ? 'h-6 w-6 text-[10px]' : 'h-8 w-8 text-xs'} items-center justify-center rounded-full bg-primary font-medium text-primary-foreground ring-2 ring-background`}>
                                {['JD', 'SM', 'AL', 'RK', 'PT'][i]}
                              </div>
                            ))}
                          </div>
                          <span className={`${gridColumns >= 5 ? 'text-[10px]' : 'text-xs'} text-muted-foreground`}>+{project.moreUsers || 5}</span>
                        </div>
                      </div>

                      {/* Companies */}
                      <div>
                        <div className={`flex items-center gap-1.5 ${gridColumns >= 5 ? 'mb-1' : 'mb-2'}`}>
                          <Building className={gridColumns >= 5 ? 'h-3 w-3' : 'h-4 w-4'} />
                          <span className={`${gridColumns >= 5 ? 'text-xs' : 'text-sm'} font-medium`}>Companies</span>
                        </div>
                        <div className={gridColumns >= 5 ? 'space-y-0.5' : 'space-y-1'}>
                          {(project.companies || ['Main Contractor Ltd', 'Design Consultants']).slice(0, gridColumns >= 5 ? 2 : 3).map((company, i) => (
                            <div key={i} className={`${gridColumns >= 5 ? 'text-[10px]' : 'text-xs'} text-muted-foreground truncate`}>• {company}</div>
                          ))}
                        </div>
                      </div>

                      {/* Submissions */}
                      <div>
                        <div className={`flex items-center gap-1.5 ${gridColumns >= 5 ? 'mb-1' : 'mb-2'}`}>
                          <FileText className={gridColumns >= 5 ? 'h-3 w-3' : 'h-4 w-4'} />
                          <span className={`${gridColumns >= 5 ? 'text-xs' : 'text-sm'} font-medium`}>Submissions</span>
                        </div>
                        <div className={`flex items-center justify-between ${gridColumns >= 5 ? 'text-xs' : 'text-sm'}`}>
                          <span className="text-muted-foreground truncate">{gridColumns >= 5 ? 'Total' : 'Total Documents'}</span>
                          <span className="font-medium">{project.totalDocs || 95}</span>
                        </div>
                        <div className={`flex items-center justify-between ${gridColumns >= 5 ? 'text-xs mt-0.5' : 'text-sm mt-1'}`}>
                          <span className="text-muted-foreground truncate">Pending</span>
                          <span className="font-medium">{project.pendingDocs || 7}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Navigation Arrows - Bottom of Card */}
              <div className="flex justify-center gap-2 py-2 flex-shrink-0 border-t">
                <button
                  className={`swiper-button-prev-${project.id} flex h-8 w-8 items-center justify-center rounded-full bg-background hover:bg-muted border border-border transition-all cursor-pointer`}
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  className={`swiper-button-next-${project.id} flex h-8 w-8 items-center justify-center rounded-full bg-background hover:bg-muted border border-border transition-all cursor-pointer`}
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
