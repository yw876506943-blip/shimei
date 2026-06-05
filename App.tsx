
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DeviceControl from './pages/DeviceControl';
import SkinAnalysis from './pages/SkinAnalysis';
import Profile from './pages/Profile';
import NewProducts from './pages/NewProducts';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import OrderManagement from './pages/OrderManagement';
import BluetoothPairing from './pages/BluetoothPairing';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import CareLogs from './pages/CareLogs';
import FullHistory from './pages/FullHistory';
import AddressManagement from './pages/AddressManagement';
import ActivityCenter from './pages/ActivityCenter';
import ActivityDetail from './pages/ActivityDetail';
import MembershipBenefits from './pages/MembershipBenefits';
import ProductAuthentication from './pages/ProductAuthentication';
import BrandInfo from './pages/BrandInfo';
import Feedback from './pages/Feedback';
import EditProfile from './pages/EditProfile';
import SkinArchive from './pages/SkinArchive';
import SkinReportDetail from './pages/SkinReportDetail';
import CarePlan from './pages/CarePlan';
import Checkout from './pages/Checkout';
import DeviceSettings from './pages/DeviceSettings';
import Settings from './pages/Settings';

const NavIcon = ({ name, active }: { name: string; active: boolean }) => {
  const color = active ? '#FFFFFF' : 'rgba(255,255,255,0.6)';
  switch (name) {
    case 'home':
      return <svg className="w-6 h-6" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><text x="12" y="16" textAnchor="middle" fontSize="12" fill={color} stroke="none" fontWeight="bold">S</text></svg>;
    case 'new':
      return <svg className="w-6 h-6" fill={active ? color : "none"} stroke={color} viewBox="0 0 24 24" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'analysis':
      return <div className="w-[60px] h-[60px] rounded-full bg-[#E5D8CF] shadow-sm flex items-center justify-center -mt-8 border-[4px] border-[#FAF7F2]">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" strokeLinecap="round" strokeLinejoin="round"/><text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" stroke="none">A</text></svg>
      </div>;
    case 'shop':
      return <svg className="w-6 h-6" fill={active ? color : "none"} stroke={color} viewBox="0 0 24 24" strokeWidth="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'profile':
      return <svg className="w-6 h-6" fill={active ? color : "none"} stroke={color} viewBox="0 0 24 24" strokeWidth="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default: return null;
  }
};

const Header = () => {
  const location = useLocation();
  const hidePaths = [
    '/product/', '/orders', '/address', '/activity/',
    '/membership', '/auth', '/brand', '/feedback', '/edit-profile',
    '/skin-archive', '/skin-report/', '/care-plan', '/tutorial/', '/tutorials',
    '/full-history', '/care-logs', '/pairing', '/device', '/checkout', '/device-settings', '/settings'
  ];
  const shouldHide = hidePaths.some(p => location.pathname.startsWith(p));

  if (shouldHide) return null;

  return (
    <header className="px-6 py-4 flex justify-between items-center bg-[#FAF7F2] sticky top-0 z-40">
      <span className="text-xl font-medium tracking-tight text-[#4A3E3E] font-serif">SHEEN Me</span>
      <div className="flex items-center gap-2 bg-black/5 rounded-full px-3 py-1.5 backdrop-blur-sm">
        <div className="flex gap-1 items-center">
          <div className="w-1 h-1 rounded-full bg-[#4A3E3E]"></div>
          <div className="w-1 h-1 rounded-full bg-[#4A3E3E]"></div>
          <div className="w-1 h-1 rounded-full bg-[#4A3E3E]"></div>
        </div>
        <div className="w-[1px] h-3 bg-black/10 mx-1"></div>
        <div className="w-3.5 h-3.5 rounded-full border border-[#4A3E3E] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#4A3E3E]"></div>
        </div>
      </div>
    </header>
  );
};

const TabBar = () => {
  const location = useLocation();
  const tabs = [
    { path: '/', name: '首页', icon: 'home' },
    { path: '/new', name: '新品', icon: 'new' },
    { path: '/analysis', name: '测肤', icon: 'analysis' },
    { path: '/shop', name: '商城', icon: 'shop' },
    { path: '/profile', name: '我的', icon: 'profile' },
  ];

  const hideTabPaths = [
    '/product/', '/orders', '/address', '/activity/',
    '/membership', '/auth', '/brand', '/feedback', '/edit-profile',
    '/skin-archive', '/skin-report/', '/care-plan', '/tutorial/', '/tutorials',
    '/full-history', '/care-logs', '/pairing', '/device', '/checkout', '/device-settings', '/settings'
  ];
  const shouldHide = hideTabPaths.some(p => location.pathname.startsWith(p));

  if (shouldHide) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#CBBAB0] px-4 py-3 flex justify-between items-center z-50 rounded-t-[20px] pb-6">
      {tabs.map((tab) => (
        <Link key={tab.path} to={tab.path} className="flex flex-col items-center flex-1 relative">
          <NavIcon name={tab.icon} active={location.pathname === tab.path} />
          {tab.icon !== 'analysis' && (
            <span className={`text-[10px] mt-1 font-medium tracking-widest ${location.pathname === tab.path ? 'text-white' : 'text-white/60'}`}>
              {tab.name}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [isPaired, setIsPaired] = useState(() => localStorage.getItem('paired') === 'true');

  useEffect(() => {
    const handlePairedChange = () => {
      setIsPaired(localStorage.getItem('paired') === 'true');
    };
    window.addEventListener('storage', handlePairedChange);
    return () => window.removeEventListener('storage', handlePairedChange);
  }, []);

  return (
    <Router>
      <div className="max-w-md mx-auto min-h-screen bg-[#FAF7F2] relative pb-28 no-scrollbar selection:bg-[#D7C4B2]/30">
        <Header />

        <main>
          <Routes>
            <Route path="/" element={<Dashboard paired={isPaired} />} />
            <Route path="/device" element={<DeviceControl />} />
            <Route path="/device-settings" element={<DeviceSettings />} />
            <Route path="/new" element={<NewProducts />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/address" element={<AddressManagement />} />
            <Route path="/activities" element={<ActivityCenter />} />
            <Route path="/activity/:id" element={<ActivityDetail />} />
            <Route path="/membership" element={<MembershipBenefits />} />
            <Route path="/auth" element={<ProductAuthentication />} />
            <Route path="/brand" element={<BrandInfo />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/analysis" element={<SkinAnalysis />} />
            <Route path="/care-plan" element={<CarePlan />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/skin-archive" element={<SkinArchive />} />
            <Route path="/skin-report/:id" element={<SkinReportDetail />} />
            <Route path="/pairing" element={<BluetoothPairing />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorial/:id" element={<TutorialDetail />} />
            <Route path="/care-logs" element={<CareLogs />} />
            <Route path="/full-history" element={<FullHistory />} />
          </Routes>
        </main>

        <TabBar />
      </div>
    </Router>
  );
};

export default App;
