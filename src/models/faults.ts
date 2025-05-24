
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
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

// Convert Firestore document to Fault object
const convertDocToFault = (doc: any): Fault => {
  const data = doc.data();
  return {
    id: doc.id,
    location: data.location,
    severity: data.severity,
    description: data.description,
    otp: data.otp,
    reportedAt: data.reportedAt instanceof Timestamp ? data.reportedAt.toDate().toISOString() : data.reportedAt,
    status: data.status,
    assignedTo: data.assignedTo
  };
};

// Fetch faults from Firestore
export const fetchFaults = async (): Promise<Fault[]> => {
  try {
    const q = query(
      collection(db, 'faults'), 
      orderBy('reportedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const faults = querySnapshot.docs.map(convertDocToFault);
    
    return faults;
  } catch (error) {
    console.error('Error fetching faults:', error);
    return [];
  }
};

// Create a new fault
export const createFault = async (faultData: Omit<Fault, 'id' | 'otp' | 'reportedAt' | 'status'>): Promise<string | null> => {
  try {
    const newFault = {
      ...faultData,
      otp: generateOTP(),
      reportedAt: Timestamp.now(),
      status: 'pending'
    };
    
    const docRef = await addDoc(collection(db, 'faults'), newFault);
    return docRef.id;
  } catch (error) {
    console.error('Error creating fault:', error);
    return null;
  }
};

// Update fault status
export const updateFaultStatus = async (faultId: string, status: 'pending' | 'in-progress' | 'resolved', assignedTo?: string): Promise<boolean> => {
  try {
    const faultRef = doc(db, 'faults', faultId);
    const updateData: any = { status };
    if (assignedTo) {
      updateData.assignedTo = assignedTo;
    }
    await updateDoc(faultRef, updateData);
    return true;
  } catch (error) {
    console.error('Error updating fault:', error);
    return false;
  }
};
