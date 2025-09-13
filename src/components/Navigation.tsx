import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Home, 
  Search, 
  MapPin, 
  User, 
  Bus,
  Navigation as NavigationIcon 
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'nearby', label: 'Nearby', icon: NavigationIcon },
    { id: 'routes', label: 'Routes', icon: Search },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm z-50">
      <div className="flex items-center justify-around p-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant={isActive ? "transport" : "ghost"}
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 max-w-20 h-12 flex-col gap-1 ${
                isActive ? 'text-white' : 'text-muted-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default Navigation;