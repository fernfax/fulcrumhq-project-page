export type OrganisationRole =
  | 'Main Contractor'
  | 'Sub Contractor A'
  | 'Sub Contractor B'
  | 'Consultant'
  | 'Architect'
  | 'Manufacturer';

export type OrganisationStatus = 'Active' | 'On Hold' | 'Completed';

export interface Organisation {
  id: string;
  name: string;
  role: OrganisationRole;
  documentsCount: number;
  teamMembers: number;
  pendingTasks: number;
  status: OrganisationStatus;
  statusColor: string;
}

// Static sample data for demo purposes
export const sampleOrganisations: Organisation[] = [
  {
    id: 'org-mc',
    name: 'BuildTech Construction Pte Ltd',
    role: 'Main Contractor',
    documentsCount: 245,
    teamMembers: 32,
    pendingTasks: 18,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 'org-sca',
    name: 'ElectroPower Systems',
    role: 'Sub Contractor A',
    documentsCount: 89,
    teamMembers: 12,
    pendingTasks: 7,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 'org-scb',
    name: 'HydroFlow Plumbing',
    role: 'Sub Contractor B',
    documentsCount: 67,
    teamMembers: 8,
    pendingTasks: 3,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 'org-consultant',
    name: 'StructureFirst Engineering',
    role: 'Consultant',
    documentsCount: 156,
    teamMembers: 15,
    pendingTasks: 11,
    status: 'Active',
    statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  {
    id: 'org-architect',
    name: 'ModernSpace Architects',
    role: 'Architect',
    documentsCount: 203,
    teamMembers: 18,
    pendingTasks: 5,
    status: 'Completed',
    statusColor: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  },
  {
    id: 'org-manufacturer',
    name: 'SteelCore Industries',
    role: 'Manufacturer',
    documentsCount: 134,
    teamMembers: 24,
    pendingTasks: 9,
    status: 'On Hold',
    statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  },
];
