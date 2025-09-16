import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bus, Clock, Users, Navigation, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BusData {
  id: string;
  route: string;
  direction: string;
  location: [number, number];
  eta: string;
  occupancy: 'Low' | 'Medium' | 'High';
  type: 'regular' | 'express';
}

interface BusCardProps {
  bus: BusData;
  onTrack?: (bus: BusData) => void;
  onViewRoute?: (bus: BusData) => void;
}

const BusCard: React.FC<BusCardProps> = ({ bus, onTrack, onViewRoute }) => {
  const { t } = useLanguage();
  const getOccupancyColor = (occupancy: string) => {
    switch (occupancy) {
      case 'Low': return 'success';
      case 'Medium': return 'warning';
      case 'High': return 'danger';
      default: return 'secondary';
    }
  };

  const getBusTypeColor = (type: string) => {
    return type === 'express' ? 'transport-express' : 'transport-bus';
  };

  return (
    <Card className="p-4 shadow-card hover:shadow-lg transition-smooth">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {/* Bus Icon */}
          <div 
            className={`p-2 rounded-lg bg-opacity-10`}
            style={{ backgroundColor: getBusTypeColor(bus.type) }}
          >
            <Bus className="h-5 w-5" style={{ color: getBusTypeColor(bus.type) }} />
          </div>
          
          {/* Bus Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-card-foreground">{bus.route}</h3>
              <Badge variant={bus.type === 'express' ? 'secondary' : 'outline'}>
                {bus.type === 'express' ? t('common.express') : t('common.regular')}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {bus.direction}
            </p>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-primary font-medium">{bus.eta}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-muted-foreground" />
                <Badge variant={getOccupancyColor(bus.occupancy)} size="sm">
                  {t(`bus.occupancy.${bus.occupancy.toLowerCase()}`)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-2 ml-2">
            <Button
              variant="transport"
              size="sm"
              onClick={() => onTrack?.(bus)}
              className="whitespace-nowrap"
            >
              <Navigation className="h-3 w-3 mr-1" />
              {t('bus.track')}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewRoute?.(bus)}
              className="whitespace-nowrap"
            >
              Route
            </Button>
        </div>
      </div>
    </Card>
  );
};

export default BusCard;