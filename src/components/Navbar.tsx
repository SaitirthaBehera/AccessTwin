import React, { useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { 
  Building2, 
  Map, 
  AlertTriangle, 
  Scan, 
  Navigation, 
  ShieldCheck, 
  Lock, 
  HelpCircle, 
  Camera, 
  User,
  Menu,
  X
} from 'lucide-react';
import { Building } from '../types';
import { BuildingSelector } from './BuildingSelector';
import { UserMenu } from './UserMenu';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHowItWorks: () => void;
  isAdminLoggedIn?: boolean;
  onLogoutAdmin?: () => void;
  onSelectBuilding: (buildingId: string) => void;
  selectedBuildingId: string | null;
  buildings: Building[];
  session: Session | null;
  onOpenAuth: () => void;
  profile: any;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHowItWorks,
  isAdminLoggedIn = false,
  onLogoutAdmin,
  onSelectBuilding,
  selectedBuildingId,
  buildings,
  session,
  onOpenAuth,
  profile
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Building2 },
    { id: 'digital-twin', label: 'Digital Twin Map', icon: Map },
    { id: 'report-issue', label: 'Report Issue', icon: AlertTriangle },
    { id: 'ai-detection', label: 'AI Detection', icon: Scan },
    { id: 'navigation', label: 'Accessible Route', icon: Navigation },
    { id: 'admin', label: 'Admin Dashboard', icon: ShieldCheck },
  ];

  return (
    <header id="main-navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white px-4 py-1.5 text-xs flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="bg-indigo-700 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
            SOAIDEATHON S37
          </span>
          <span className="hidden md:inline font-medium text-indigo-100">
            Crowdsourced Accessibility Digital Twin for Public Buildings
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            id="btn-how-it-works"
            onClick={onOpenHowItWorks}
            className="flex items-center space-x-1 hover:text-indigo-200 transition-colors text-xs font-medium cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>How AccessTwin Works</span>
          </button>
          <span className="hidden sm:inline-block text-indigo-300">|</span>
          <div className="flex items-center space-x-1.5 text-indigo-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px]">SOA Campus Online</span>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Access</span>
                <span className="text-lg sm:text-xl font-bold text-blue-600 tracking-tight">Twin</span>
                <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-200">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Making Every Building Accessible.
              </p>
            </div>
          </div>

          {/* Controls: Building Selector + Desktop Buttons + Mobile Hamburger */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* ITER C BLOCK Dropdown - Stays outside on both Mobile and Desktop! */}
            <div className="shrink-0">
              <BuildingSelector 
                selectedBuildingId={selectedBuildingId}
                onSelect={onSelectBuilding}
                buildings={buildings}
              />
            </div>
            
            {/* Desktop Buttons (Hidden on mobile) */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                id="btn-nav-twingram"
                onClick={() => setActiveTab('twingram')}
                className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5 text-slate-500" />
                <span>TwinGram</span>
              </button>

              {session ? (
                <UserMenu user={session.user} profile={profile} setActiveTab={setActiveTab} />
              ) : (
                <button
                  id="btn-nav-user-signin"
                  onClick={onOpenAuth}
                  className="flex items-center space-x-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-blue-200 transition-all cursor-pointer shadow-2xs"
                >
                  <User className="w-3.5 h-3.5 text-blue-500" />
                  <span>Sign In</span>
                </button>
              )}
              
              {isAdminLoggedIn ? (
                <button
                  id="btn-nav-admin-logout"
                  onClick={onLogoutAdmin}
                  className="flex items-center space-x-1.5 bg-emerald-100 hover:bg-rose-100 text-emerald-800 hover:text-rose-800 border border-emerald-200 hover:border-rose-300 font-bold text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs"
                  title="Sign out of Admin Mode"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin Mode (Sign Out)</span>
                </button>
              ) : (
                <button
                  id="btn-nav-admin-login"
                  onClick={() => setActiveTab('admin')}
                  className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-3 py-1.5 rounded-lg border border-slate-200 transition-all cursor-pointer shadow-2xs"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Admin Login</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button (Visible only on mobile) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-700" />
              ) : (
                <Menu className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-4 py-3 space-y-2.5 shadow-lg rounded-b-xl animate-in slide-in-from-top-2">
            <button
              onClick={() => {
                setActiveTab('twingram');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center space-x-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4 text-indigo-600" />
              <span>TwinGram Community Feed</span>
            </button>

            {session ? (
              <div className="pt-1">
                <UserMenu 
                  user={session.user} 
                  profile={profile} 
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }} 
                />
              </div>
            ) : (
              <button
                onClick={() => {
                  onOpenAuth();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-sm px-3.5 py-2.5 rounded-lg border border-blue-200 transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-600" />
                <span>Sign In to Account</span>
              </button>
            )}

            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  onLogoutAdmin?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 font-semibold text-sm px-3.5 py-2.5 rounded-lg transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                <span>Sign Out of Admin Mode</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-3.5 py-2.5 rounded-lg border border-slate-200 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4 text-slate-500" />
                <span>Admin Login Portal</span>
              </button>
            )}
          </div>
        )}

        {/* Navigation Tabs Bar (Scrollable on mobile) */}
        <nav id="nav-tab-list" className="flex items-center space-x-1 overflow-x-auto no-scrollbar border-t border-slate-100 py-2 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200/60 shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};