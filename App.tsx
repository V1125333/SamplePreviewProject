
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Truck, 
  Users, 
  AlertTriangle, 
  FileCheck, 
  BarChart3, 
  Search, 
  Bell, 
  User, 
  LogOut,
  Menu,
  X,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardHome from './screens/DashboardHome';
import OperationsControl from './screens/OperationsControl';
import VendorIntelligence from './screens/VendorIntelligence';
import VendorDetail from './screens/VendorDetail';
import ExceptionPrediction from './screens/ExceptionPrediction';
import ExceptionDetail from './screens/ExceptionDetail';
import PODViewer from './screens/PODViewer';
import AnalyticsScreen from './screens/AnalyticsScreen';
import GlobalSearch from './screens/GlobalSearch';

// Components
import ChatAssistant from './components/ChatAssistant';

const SidebarItem = ({ icon: Icon, label, to, active }: any) => (
  <Link 
    to={to} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

const AppLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  if (location.pathname === '/') return <>{children}</>;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-slate-200 transition-all duration-300 z-30 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
            {sidebarOpen && <span className="text-xl font-bold text-slate-800 tracking-tight">LogiIntel</span>}
          </div>
          
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={location.pathname === '/dashboard'} />
            <SidebarItem icon={Truck} label="Operations" to="/operations" active={location.pathname === '/operations'} />
            <SidebarItem icon={Users} label="Vendors" to="/vendors" active={location.pathname.startsWith('/vendors')} />
            <SidebarItem icon={AlertTriangle} label="Exceptions" to="/exceptions" active={location.pathname.startsWith('/exceptions')} />
            <SidebarItem icon={FileCheck} label="POD Viewer" to="/pod" active={location.pathname === '/pod'} />
            <SidebarItem icon={BarChart3} label="Analytics" to="/analytics" active={location.pathname === '/analytics'} />
            <SidebarItem icon={Search} label="Global Search" to="/search" active={location.pathname === '/search'} />
          </nav>

          <div className="p-4 border-t border-slate-100">
            <SidebarItem icon={LogOut} label="Sign Out" to="/" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
            {sidebarOpen ? <Menu size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="relative group">
              <Bell className="text-slate-400 group-hover:text-indigo-600 cursor-pointer transition-colors" size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">3</span>
            </div>
            <div className="flex items-center space-x-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Alex Rivers</p>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Operations Lead</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-indigo-50 flex items-center justify-center overflow-hidden">
                <img src="https://picsum.photos/seed/alex/100/100" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Area */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>

        {/* Floating AI Assistant */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-indigo-600 rounded-full shadow-2xl shadow-indigo-400 flex items-center justify-center text-white hover:bg-indigo-700 transition-all hover:scale-105 active:scale-95"
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </button>
          {isChatOpen && <ChatAssistant onClose={() => setIsChatOpen(false)} />}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<AppLayout><DashboardHome /></AppLayout>} />
        <Route path="/operations" element={<AppLayout><OperationsControl /></AppLayout>} />
        <Route path="/vendors" element={<AppLayout><VendorIntelligence /></AppLayout>} />
        <Route path="/vendors/:id" element={<AppLayout><VendorDetail /></AppLayout>} />
        <Route path="/exceptions" element={<AppLayout><ExceptionPrediction /></AppLayout>} />
        <Route path="/exceptions/:id" element={<AppLayout><ExceptionDetail /></AppLayout>} />
        <Route path="/pod" element={<AppLayout><PODViewer /></AppLayout>} />
        <Route path="/analytics" element={<AppLayout><AnalyticsScreen /></AppLayout>} />
        <Route path="/search" element={<AppLayout><GlobalSearch /></AppLayout>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
