
import React from 'react';
import { Fault, SeverityLevel } from '@/models/faults';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';

interface FaultCardProps {
  fault: Fault;
}

const FaultCard: React.FC<FaultCardProps> = ({ fault }) => {
  const { id, location, severity, description, otp, reportedAt, status } = fault;
  
  const handleAccept = () => {
    toast.success(`Accepted fault #${id.split('-')[1]}. OTP: ${otp}`);
  };
  
  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'low':
        return 'text-severity-low bg-green-50';
      case 'medium':
        return 'text-severity-medium bg-amber-50';
      case 'high':
        return 'text-severity-high bg-red-50';
    }
  };
  
  const getSeverityIcon = (severity: SeverityLevel) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-5 w-5" />;
      case 'medium':
        return <Clock className="h-5 w-5" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Resolved</Badge>;
    }
  };

  return (
    <Card className="overflow-hidden border-t-4" style={{ borderTopColor: severity === 'high' ? '#DC2626' : severity === 'medium' ? '#F59E0B' : '#10B981' }}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">
            Fault #{id.split('-')[1]}
          </CardTitle>
          {getStatusBadge(status)}
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium">{location.address}</p>
              <p className="text-sm text-gray-500">{location.city}</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-2 text-sm font-medium ${getSeverityColor(severity)} p-1.5 rounded-md`}>
            {getSeverityIcon(severity)}
            <span className="capitalize">{severity} Severity</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          {status === 'pending' && (
            <div className="border border-dashed border-gray-200 p-2 rounded-md bg-gray-50">
              <div className="text-xs text-gray-500">One-Time Password (OTP)</div>
              <div className="text-lg font-mono font-bold tracking-wider text-center">{otp}</div>
            </div>
          )}
          
          <div className="text-xs text-gray-500">
            Reported {formatDistanceToNow(new Date(reportedAt), { addSuffix: true })}
          </div>
        </div>
      </CardContent>
      
      {status === 'pending' && (
        <CardFooter className="bg-gray-50 border-t px-4 py-3">
          <Button 
            className="w-full bg-line-blue hover:bg-blue-700" 
            onClick={handleAccept}
          >
            Accept Job
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FaultCard;
