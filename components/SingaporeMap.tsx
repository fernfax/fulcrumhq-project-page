"use client"

import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, Minimize2 } from 'lucide-react';
import type { Project } from '@/types/project';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';

interface SingaporeMapProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  isExpanded?: boolean;
  onToggle?: () => void;
}

// Component to render markers with dynamic tooltip positioning
function DynamicTooltipMarker({ project, onProjectClick }: { project: Project; onProjectClick: (project: Project) => void }) {
  const map = useMap();
  const [tooltipDirection, setTooltipDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [tooltipOffset, setTooltipOffset] = useState<[number, number]>([0, -20]);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    // Wait for map to be fully ready
    if (!map || !map.getContainer()) {
      return;
    }

    setIsMapReady(true);

    const updateTooltipPosition = () => {
      try {
        const point = map.latLngToContainerPoint([project.latitude, project.longitude]);
        const mapSize = map.getSize();

        // Tooltip dimensions (approximate)
        const tooltipHeight = 240; // ~180px image + ~60px padding/text
        const tooltipWidth = 304; // 280px + 24px padding

        // Check if marker is near edges
        const nearTop = point.y < tooltipHeight + 30;
        const nearBottom = point.y > mapSize.y - tooltipHeight - 30;
        const nearLeft = point.x < tooltipWidth + 30;
        const nearRight = point.x > mapSize.x - tooltipWidth - 30;

        // Determine best direction - prioritize horizontal positioning for edge cases
        if (nearRight && !nearLeft) {
          // Near right edge - show tooltip to the left
          setTooltipDirection('left');
          setTooltipOffset([-20, 0]);
        } else if (nearLeft && !nearRight) {
          // Near left edge - show tooltip to the right
          setTooltipDirection('right');
          setTooltipOffset([20, 0]);
        } else if (nearTop && !nearBottom) {
          // Near top - show tooltip below
          setTooltipDirection('bottom');
          setTooltipOffset([0, 20]);
        } else if (nearBottom && !nearTop) {
          // Near bottom - show tooltip above
          setTooltipDirection('top');
          setTooltipOffset([0, -20]);
        } else {
          // Default to top
          setTooltipDirection('top');
          setTooltipOffset([0, -20]);
        }
      } catch {
        // Ignore errors during map initialization
      }
    };

    // Delay initial calculation to ensure map is fully rendered
    const timer = setTimeout(updateTooltipPosition, 100);

    map.on('moveend', updateTooltipPosition);
    map.on('zoomend', updateTooltipPosition);

    return () => {
      clearTimeout(timer);
      map.off('moveend', updateTooltipPosition);
      map.off('zoomend', updateTooltipPosition);
    };
  }, [map, project.latitude, project.longitude]);

  if (!isMapReady) {
    return null;
  }

  return (
    <Marker
      position={[project.latitude, project.longitude]}
      icon={createCustomIcon(project.status)}
    >
      <Tooltip direction={tooltipDirection} offset={tooltipOffset} opacity={1} className="custom-tooltip">
        <div style={{ width: '280px', padding: '12px' }}>
          <div style={{ width: '100%', height: '180px', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
            <img
              src={project.image}
              alt={project.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ fontWeight: '600', fontSize: '14px', lineHeight: '1.4', wordWrap: 'break-word', overflowWrap: 'break-word', color: '#1f2937' }}>{project.name}</div>
        </div>
      </Tooltip>
    </Marker>
  );
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

export function SingaporeMap({ projects, onProjectClick, isExpanded = true, onToggle }: SingaporeMapProps) {
  // Singapore center coordinates
  const center: [number, number] = [1.3521, 103.8198];

  // Dynamic height based on expanded state
  const height = isExpanded ? 'h-[500px]' : 'h-full';

  // Use key to force re-render when shrinking to reset view
  const mapKey = isExpanded ? 'expanded' : 'shrunk';

  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden border shadow-lg transition-all duration-300`}>
      {/* Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="absolute top-3 right-3 z-[1000] p-2 rounded-md bg-background/90 backdrop-blur-sm border shadow-md hover:bg-background transition-all"
          aria-label={isExpanded ? "Shrink map" : "Expand map"}
        >
          {isExpanded ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </button>
      )}

      <MapContainer
        key={mapKey}
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
          <DynamicTooltipMarker
            key={project.id}
            project={project}
            onProjectClick={onProjectClick}
          />
        ))}
      </MapContainer>
    </div>
  );
}
