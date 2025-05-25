
import { 
  ref, 
  push, 
  get, 
  update, 
  serverTimestamp,
  query,
  orderByChild
} from 'firebase/database';
import { db } from '@/config/firebase';

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

// Generate a random OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Convert Realtime Database snapshot to Fault object
const convertSnapshotToFault = (key: string, data: any): Fault => {
  return {
    id: key,
    location: data.location,
    severity: data.severity,
    description: data.description,
    otp: data.otp,
    reportedAt: data.reportedAt,
    status: data.status,
    assignedTo: data.assignedTo
  };
};

// Fetch faults from Realtime Database
export const fetchFaults = async (): Promise<Fault[]> => {
  try {
    const faultsRef = ref(db, 'faults');
    const q = query(faultsRef, orderByChild('reportedAt'));
    const snapshot = await get(q);
    
    if (snapshot.exists()) {
      const faultsData = snapshot.val();
      const faults = Object.keys(faultsData)
        .map(key => convertSnapshotToFault(key, faultsData[key]))
        .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime());
      
      return faults;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching faults:', error);
    return [];
  }
};

// Create a new fault
export const createFault = async (faultData: Omit<Fault, 'id' | 'otp' | 'reportedAt' | 'status'>): Promise<string | null> => {
  try {
    const faultsRef = ref(db, 'faults');
    const newFault = {
      ...faultData,
      otp: generateOTP(),
      reportedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    const newFaultRef = await push(faultsRef, newFault);
    return newFaultRef.key;
  } catch (error) {
    console.error('Error creating fault:', error);
    return null;
  }
};

// Update fault status
export const updateFaultStatus = async (faultId: string, status: 'pending' | 'in-progress' | 'resolved', assignedTo?: string): Promise<boolean> => {
  try {
    const faultRef = ref(db, `faults/${faultId}`);
    const updateData: any = { status };
    if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }
    await update(faultRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating fault:', error);
    return false;
  }
};
