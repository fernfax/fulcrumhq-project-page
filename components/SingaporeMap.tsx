"use client"

import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { Project } from '@/types/project';
import 'leaflet/dist/leaflet.css';

interface SingaporeMapProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

// Custom marker icon
const createCustomIcon = (status: string) => {
  let color = '#3b82f6'; // blue for Planning

  if (status === 'Active') color = '#22c55e'; // green
  else if (status === 'Hold') color = '#eab308'; // yellow
  else if (status === 'Completed') color = '#6b7280'; // gray

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        cursor: pointer;
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export function SingaporeMap({ projects, onProjectClick }: SingaporeMapProps) {
  // Singapore center coordinates
  const center: [number, number] = [1.3521, 103.8198];

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden border shadow-lg">
      <MapContainer
        center={center}
        zoom={11}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.latitude, project.longitude]}
            icon={createCustomIcon(project.status)}
            eventHandlers={{
              click: () => onProjectClick(project),
            }}
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
              <div className="text-sm font-medium">
                <div className="font-bold">{project.name}</div>
                <div className="text-xs text-gray-600">{project.id} • {project.status}</div>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
