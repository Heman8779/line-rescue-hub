
import React, { useState, useEffect } from 'react';
import Header from './Header';
import FaultCard from './FaultCard';
import { fetchFaults, Fault } from '@/models/faults';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard: React.FC = () => {
  const [faults, setFaults] = useState<Fault[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadFaults = async () => {
      try {
        const data = await fetchFaults();
        setFaults(data);
      } catch (error) {
        console.error('Error fetching faults:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadFaults();
  }, []);
  
  return (
    <div className="min-h-screen bg-line-gray">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Reported Faults</h2>
          <p className="text-gray-600">View and manage power line faults reported in your area</p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {faults.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <p className="text-gray-600">No faults reported at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faults.map((fault) => (
                  <FaultCard key={fault.id} fault={fault} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
