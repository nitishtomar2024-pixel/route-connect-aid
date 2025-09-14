import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import ThemeToggle from './ThemeToggle';
import { Bell, Wifi } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <Card className="fixed top-0 left-0 right-0 border-b border-border bg-card/95 backdrop-blur-sm z-50">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-lg font-semibold text-foreground">Transport</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs px-2 py-1">
            <Wifi className="w-3 h-3 mr-1" />
            Live
          </Badge>
          <ThemeToggle />
        </div>
      </div>
    </Card>
  );
};

export default Header;