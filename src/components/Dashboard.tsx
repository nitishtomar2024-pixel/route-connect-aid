import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bus, 
  Clock, 
  MapPin, 
  Navigation, 
  RefreshCw,
  User,
  Bell
} from 'lucide-react';
import BusCard from './BusCard';
import SearchBar from './SearchBar';
import heroImage from '../assets/transport-hero.jpg';

// Mock data for nearby buses in Meerut-Hapur region
const nearbyBuses = [
  {
    id: '1',
    route: 'Route 101',
    direction: 'Meerut → Hapur',
    location: [77.7064, 28.9845] as [number, number],
    eta: '3 min',
    occupancy: 'Medium' as const,
    type: 'regular' as const
  },
  {
    id: '2', 
    route: 'Route 205X',
    direction: 'Garh Mukteshwar → Meerut',
    location: [77.8500, 28.9200] as [number, number],
    eta: '7 min',
    occupancy: 'Low' as const,
    type: 'express' as const
  },
  {
    id: '3',
    route: 'Route 45A',
    direction: 'Hapur → Meerut Cantt',
    location: [77.7800, 28.7300] as [number, number],
    eta: '12 min',
    occupancy: 'High' as const,
    type: 'regular' as const
  }
];

interface DashboardProps {
  onOpenMap?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onOpenMap }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userName] = useState('User'); // In real app, get from auth

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleSearch = (from: string, to: string) => {
    console.log('Search routes from', from, 'to', to);
    // In real app, navigate to routes page or show results
  };

  const handleTrackBus = (bus: any) => {
    console.log('Track bus:', bus);
    onOpenMap?.();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <div 
        className="relative h-48 bg-gradient-primary overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(16, 185, 129, 0.8)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        
        <div className="relative p-6 h-full flex flex-col justify-between text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Hello, {userName}</h1>
              <p className="text-white/90 text-sm">Find your next ride</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Current Location</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Live Tracking
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 flex-1">
        {/* Quick Search */}
        <SearchBar onSearch={handleSearch} />

        {/* Buses Near Me Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Bus className="h-5 w-5 text-primary" />
              Buses Near You
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          <div className="space-y-3">
            {nearbyBuses.map((bus) => (
              <BusCard
                key={bus.id}
                bus={bus}
                onTrack={handleTrackBus}
                onViewRoute={(bus) => console.log('View route for:', bus)}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-card-foreground">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onOpenMap} className="h-12 text-accessible">
              <MapPin className="h-4 w-4 mr-2" />
              View Map
            </Button>
            <Button variant="outline" className="h-12 text-accessible">
              <Clock className="h-4 w-4 mr-2" />
              Trip History
            </Button>
          </div>
        </Card>

        {/* Service Status */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-card-foreground">Service Status</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Route 101</span>
              <Badge variant="success">On Time</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Route 205X</span>
              <Badge variant="warning">5 min delay</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Route 45A</span>
              <Badge variant="success">On Time</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;