
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { BellRing, LogOut, Settings, Menu, X, MessageCircle, HelpCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-line-blue mr-1">
                Line Rescue Hub
              </h1>
              <div className="hidden md:flex h-6 px-2 bg-blue-100 text-blue-800 text-xs font-medium items-center justify-center rounded-full ml-2">
                Linesman Portal
              </div>
            </div>
            
            <nav className="hidden md:ml-8 md:flex md:space-x-6">
              <a href="#" className="text-gray-900 font-medium hover:text-line-blue transition-colors border-b-2 border-line-blue px-1">Dashboard</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors px-1">Reports</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors px-1">Map</a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors px-1">Team</a>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="relative p-1.5 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                  <BellRing className="h-5 w-5" />
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto">
                  <div className="p-3 text-sm hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium text-gray-800">New fault reported</p>
                    <p className="text-gray-500 text-xs mt-1">A new high severity fault has been reported in your area.</p>
                    <p className="text-gray-400 text-xs mt-2">5 minutes ago</p>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-3 text-sm hover:bg-gray-50 cursor-pointer">
                    <p className="font-medium text-gray-800">Weekly report</p>
                    <p className="text-gray-500 text-xs mt-1">Your weekly performance report is now available.</p>
                    <p className="text-gray-400 text-xs mt-2">2 hours ago</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2 text-center">
                  <button className="text-sm text-line-blue hover:underline">View all notifications</button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">Linesman</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                    <Avatar className="h-8 w-8 bg-line-blue">
                      <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in">
          <div className="px-4 pt-3 pb-3 space-y-1">
            <a href="#" className="block px-3 py-2 text-base font-medium text-line-blue bg-blue-50 rounded-md">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
              Reports
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
              Map
            </a>
            <a href="#" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
              Team
            </a>
          </div>
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="px-4 flex items-center">
              <div className="flex-shrink-0">
                <Avatar className="h-10 w-10 bg-line-blue">
                  <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">{user?.name}</div>
                <div className="text-sm font-medium text-gray-500">Linesman</div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-500 hover:bg-gray-100">
                <BellRing className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <Settings className="mr-3 h-5 w-5 text-gray-500" />
                  Profile Settings
                </div>
              </button>
              <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <MessageCircle className="mr-3 h-5 w-5 text-gray-500" />
                  Help & Support
                </div>
              </button>
              <button 
                onClick={logout}
                className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 rounded-md"
              >
                <div className="flex items-center">
                  <LogOut className="mr-3 h-5 w-5 text-red-500" />
                  Log Out
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
