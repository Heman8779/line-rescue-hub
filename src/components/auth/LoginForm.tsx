
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    if (!email || !password) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-lg shadow-blue-900/5 overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-line-blue to-line-lightBlue" />
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Welcome Back
        </CardTitle>
        <p className="text-center text-sm text-gray-500">Enter your credentials to access your account</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 p-3 rounded-md flex items-start text-red-700 mb-4 animate-fade-in">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="yourname@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                className="pl-10 transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <button type="button" className="text-xs text-line-blue hover:text-blue-700 hover:underline transition-colors">
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitting}
                required
                className="pl-10 transition-all"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-line-blue hover:bg-blue-700 transition-colors font-medium shadow-md shadow-blue-700/10"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-5 pb-6">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <button 
            onClick={onToggleForm} 
            className="text-line-blue hover:text-blue-700 font-medium hover:underline transition-colors"
            type="button"
          >
            Create account
          </button>
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
