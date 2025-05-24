
import React, { useState, useEffect } from 'react';
import Header from './Header';
import FaultCard from './FaultCard';
import { fetchFaults, Fault } from '@/models/faults';
import { Skeleton } from '@/components/ui/skeleton';
import { Settings, HelpCircle, AlertCircle, ListFilter } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Dashboard: React.FC = () => {
  const [faults, setFaults] = useState<Fault[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    const loadFaults = async () => {
      try {
        setLoading(true);
        const data = await fetchFaults();
        setFaults(data);
      } catch (error) {
        console.error('Error fetching faults:', error);
        toast.error('Failed to load faults. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    loadFaults();
  }, []);

  // Function to refresh faults data
  const refreshFaults = async () => {
    try {
      const data = await fetchFaults();
      setFaults(data);
    } catch (error) {
      console.error('Error refreshing faults:', error);
      toast.error('Failed to refresh faults.');
    }
  };
  
  const filteredFaults = filter === 'all' 
    ? faults 
    : faults.filter(fault => fault.severity === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Reported Faults</h2>
              <p className="text-gray-600">View and manage power line faults reported in your area</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${filter === 'all' ? 'bg-line-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('high')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${filter === 'high' ? 'bg-severity-high text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  High
                </button>
                <button 
                  onClick={() => setFilter('medium')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${filter === 'medium' ? 'bg-severity-medium text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => setFilter('low')}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${filter === 'low' ? 'bg-severity-low text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Low
                </button>
              </div>
              
              <button 
                onClick={refreshFaults}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                title="Refresh faults"
              >
                <ListFilter className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredFaults.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center border border-gray-200 shadow-md">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  {filter === 'all' ? (
                    <Settings className="h-8 w-8 text-line-blue" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-line-blue" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No faults found</h3>
                <p className="text-gray-600">
                  {filter === 'all' 
                    ? 'There are no faults reported at this time.' 
                    : `No ${filter} severity faults reported at this time.`}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-500 mb-4">Showing {filteredFaults.length} result{filteredFaults.length !== 1 ? 's' : ''}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFaults.map((fault) => (
                    <FaultCard key={fault.id} fault={fault} onUpdate={refreshFaults} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="mt-12 bg-white rounded-lg p-6 border border-gray-100 shadow-md">
          <div className="flex items-start gap-4">
            <div className="bg-blue-50 p-2 rounded-full">
              <HelpCircle className="h-6 w-6 text-line-blue" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Need Help?</h3>
              <p className="text-gray-600 mt-1">If you have any questions or need assistance with a fault, contact the support team.</p>
              <button className="mt-3 text-sm font-medium text-line-blue hover:text-blue-700 hover:underline transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
