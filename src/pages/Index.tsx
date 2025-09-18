import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TransportMap from '../components/TransportMap';
import NearbyMap from '../components/NearbyMap';
import Profile from '../components/Profile';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { MapPin, Search, Bus, Route, Navigation as NavigationIcon } from 'lucide-react';

const Index = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBus, setSelectedBus] = useState(null);

  const handleSearch = (from: string, to: string) => {
    console.log('Planning route from', from, 'to', to);
    // In a real app, this would navigate to route results
    setActiveTab('routes');
  };

  const handleBusSelected = (bus: any) => {
    setSelectedBus(bus);
    console.log('Bus selected:', bus);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard onOpenMap={() => setActiveTab('map')} />;
      
      case 'nearby':
        return <NearbyMap onBusSelected={handleBusSelected} />;
      case 'map':
        return <TransportMap onBusSelected={handleBusSelected} />;
      
      case 'profile':
        return <Profile />;
      
      default:
        return <Dashboard onOpenMap={() => setActiveTab('map')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors">
      <Header />
      <main className="pt-16 pb-16">
        {renderContent()}
      </main>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
