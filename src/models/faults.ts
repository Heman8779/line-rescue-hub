
export type SeverityLevel = 'low' | 'medium' | 'high';

export interface Location {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Fault {
  id: string;
  location: Location;
  severity: SeverityLevel;
  description: string;
  otp: string;
  reportedAt: string;
  status: 'pending' | 'in-progress' | 'resolved';
  assignedTo?: string;
}

// Mock data for demonstration
export const mockFaults: Fault[] = [
  {
    id: 'fault-001',
    location: {
      address: '123 Main Street, Power District',
      city: 'Metropolis',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    severity: 'high',
    description: 'Power line down after storm, sparks reported',
    otp: '847291',
    reportedAt: new Date(Date.now() - 3600000).toISOString(),
    status: 'pending'
  },
  {
    id: 'fault-002',
    location: {
      address: '456 Grid Avenue, North Sector',
      city: 'Metropolis',
      coordinates: { lat: 40.7122, lng: -74.0055 }
    },
    severity: 'medium',
    description: 'Transformer making unusual noise, occasional power flickers',
    otp: '392481',
    reportedAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'in-progress',
    assignedTo: '1'
  },
  {
    id: 'fault-003',
    location: {
      address: '789 Electric Blvd, East Sector',
      city: 'Metropolis',
      coordinates: { lat: 40.7135, lng: -74.0045 }
    },
    severity: 'low',
    description: 'Utility pole leaning slightly after heavy winds',
    otp: '573921',
    reportedAt: new Date(Date.now() - 10800000).toISOString(),
    status: 'pending'
  }
];

// Mock service to fetch faults data
export const fetchFaults = async (): Promise<Fault[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockFaults;
};
