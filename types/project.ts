export interface Project {
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
  description?: string;
  users?: number;
  moreUsers?: number;
  companies?: string[];
  totalDocs?: number;
  pendingDocs?: number;
  startDate?: string;
  endDate?: string;
}
