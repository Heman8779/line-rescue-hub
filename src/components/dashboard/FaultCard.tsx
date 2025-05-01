
import React from 'react';
import { Fault, SeverityLevel } from '@/models/faults';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, Clock, MapPin, Clipboard, Phone } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface FaultCardProps {
  fault: Fault;
}

const FaultCard: React.FC<FaultCardProps> = ({ fault }) => {
  const { id, location, severity, description, otp, reportedAt, status } = fault;
  
  const handleAccept = () => {
    toast.success(`Accepted fault #${id.split('-')[1]}. OTP: ${otp}`);
  };

  const handleCopyOtp = () => {
    navigator.clipboard.writeText(otp);
    toast.success('OTP copied to clipboard');
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
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 font-normal">
            Pending
          </Badge>
        );
      case 'in-progress':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-normal">
            In Progress
          </Badge>
        );
      case 'resolved':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 font-normal">
            Resolved
          </Badge>
        );
    }
  };

  const getBorderColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'low':
        return 'before:bg-severity-low';
      case 'medium':
        return 'before:bg-severity-medium';
      case 'high':
        return 'before:bg-severity-high';
    }
  };

  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-shadow relative before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-1 ${getBorderColor(severity)}`}>
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
          
          <div className={`flex items-center space-x-2 text-sm font-medium ${getSeverityColor(severity)} p-2 rounded-md`}>
            {getSeverityIcon(severity)}
            <span className="capitalize">{severity} Severity</span>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            
            {description.length > 100 && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="text-xs text-line-blue hover:underline mt-1">Read more</button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <p className="text-sm text-gray-700">{description}</p>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>

          {status === 'pending' && (
            <div className="border border-gray-200 rounded-md bg-gray-50 overflow-hidden">
              <div className="bg-gray-100 px-3 py-1 text-xs text-gray-500 font-medium">One-Time Password (OTP)</div>
              <div className="px-3 py-2 flex items-center justify-between">
                <div className="text-lg font-mono font-bold tracking-wider">{otp}</div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={handleCopyOtp}
                >
                  <Clipboard className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <div className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formatDistanceToNow(new Date(reportedAt), { addSuffix: true })}
            </div>
            
            {status !== 'pending' && (
              <button className="text-xs text-line-blue hover:underline flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                Contact customer
              </button>
            )}
          </div>
        </div>
      </CardContent>
      
      {status === 'pending' && (
        <CardFooter className="bg-gray-50 border-t px-4 py-3">
          <Button 
            className="w-full bg-line-blue hover:bg-blue-700 font-medium transition-colors shadow-md shadow-blue-700/10" 
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
