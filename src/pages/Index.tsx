import React, { useState } from 'react';
import Dashboard from '../components/Dashboard';
import TransportMap from '../components/TransportMap';
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
        return (
          <div className="min-h-screen bg-background pb-20">
            <div className="p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">{t('nearby.title')}</h1>
                <p className="text-muted-foreground">{t('nearby.subtitle')}</p>
              </div>
              <div className="h-96 mb-4">
                <TransportMap onBusSelected={handleBusSelected} />
              </div>
              {selectedBus && (
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{t('nearby.selectedBus')}</h3>
                  <div className="flex items-center gap-2">
                    <Bus className="h-4 w-4 text-primary" />
                    <span>{selectedBus.route} - {selectedBus.direction}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t('nearby.arrivesIn')} {selectedBus.eta} • {t(`bus.occupancy.${selectedBus.occupancy.toLowerCase()}`)} {t('nearby.occupancy')}
                  </p>
                  <Button variant="transport" className="mt-3 w-full">
                    <NavigationIcon className="h-4 w-4 mr-2" />
                    {t('nearby.trackBus')}
                  </Button>
                </Card>
              )}
            </div>
          </div>
        );
      
      case 'routes':
        return (
          <div className="min-h-screen bg-background pb-20">
            <div className="p-4">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">{t('routes.title')}</h1>
                <p className="text-muted-foreground">{t('routes.subtitle')}</p>
              </div>
              <SearchBar onSearch={handleSearch} className="mb-6" />
              
              <Card className="p-4 mb-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Route className="h-4 w-4 text-primary" />
                  {t('routes.popularRoutes')}
                </h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-3" />
                    Meerut ↔ Hapur
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-3" />
                    Garh Mukteshwar ↔ Meerut
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-3" />
                    Hapur ↔ Meerut Cantt
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        );
      
      case 'map':
        return (
          <div className="min-h-screen bg-background pb-20">
            <div className="p-4">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-foreground mb-2">{t('map.title')}</h1>
                <p className="text-muted-foreground">{t('map.subtitle')}</p>
              </div>
              <div className="h-[calc(100vh-200px)]">
                <TransportMap onBusSelected={handleBusSelected} />
              </div>
            </div>
          </div>
        );
      
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
