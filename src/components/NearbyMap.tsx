import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  MapPin, 
  RotateCcw, 
  Bus, 
  Navigation as NavigationIcon,
  Filter,
  Wifi,
  WifiOff
} from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mock nearby transport data
const nearbyBuses = [
  {
    id: 'bus-1',
    number: '52A',
    route: 'Connaught Place - Mehrauli',
    location: { lat: 28.6139, lng: 77.2090 },
    eta: '3 min',
    occupancy: 75,
    type: 'regular'
  },
  {
    id: 'bus-2', 
    number: '764',
    route: 'AIIMS - Karol Bagh',
    location: { lat: 28.6129, lng: 77.2095 },
    eta: '7 min',
    occupancy: 45,
    type: 'express'
  },
  {
    id: 'bus-3',
    number: '181',
    route: 'Red Fort - Nehru Place',
    location: { lat: 28.6145, lng: 77.2085 },
    eta: '12 min',
    occupancy: 90,
    type: 'regular'
  }
];

const nearbyStops = [
  {
    id: 'stop-1',
    name: 'Central Secretariat',
    location: { lat: 28.6135, lng: 77.2088 },
    routes: ['52A', '764', '181'],
    distance: '200m'
  },
  {
    id: 'stop-2',
    name: 'Rajiv Gandhi Chowk', 
    location: { lat: 28.6142, lng: 77.2092 },
    routes: ['764', '181'],
    distance: '350m'
  }
];

interface NearbyMapProps {
  onBusSelected?: (bus: any) => void;
}

const NearbyMap: React.FC<NearbyMapProps> = ({ onBusSelected }) => {
  const { t } = useLanguage();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [filter, setFilter] = useState<'all' | 'buses' | 'stops'>('all');
  const [selectedBus, setSelectedBus] = useState<any>(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes, using a placeholder token
    // In production, this should be stored in Supabase secrets
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImRlbW8tdG9rZW4ifQ.demo-token';

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.2090, 28.6139], // Delhi coordinates
      zoom: 15,
      pitch: 0,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
        
        // User location marker
        new mapboxgl.Marker({ 
          color: '#3B82F6',
          scale: 1.2 
        })
        .setLngLat(userLocation)
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-2">
            <h3 class="font-bold text-sm">${t('map.yourLocation')}</h3>
          </div>
        `))
        .addTo(map.current!);

        map.current?.flyTo({
          center: userLocation as [number, number],
          zoom: 16
        });
      });
    }

    // Add bus markers
    nearbyBuses.forEach(bus => {
      const busMarker = new mapboxgl.Marker({ 
        color: bus.type === 'express' ? '#F59E0B' : '#10B981',
        scale: 0.8
      })
      .setLngLat([bus.location.lng, bus.location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div class="p-3 min-w-48">
          <h3 class="font-bold text-sm mb-2">${t('map.bus')} ${bus.number}</h3>
          <p class="text-xs text-gray-600 mb-2">${bus.route}</p>
          <div class="flex justify-between text-xs">
            <span>${t('map.eta')}: ${bus.eta}</span>
            <span>${t('map.occupancy')}: ${bus.occupancy}%</span>
          </div>
          <div class="mt-2">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              ${bus.type === 'express' ? t('map.express') : t('map.regular')}
            </span>
          </div>
        </div>
      `))
      .addTo(map.current!);

      // Add click event for bus selection
      busMarker.getElement().addEventListener('click', () => {
        setSelectedBus(bus);
        onBusSelected?.(bus);
      });
    });

    // Add bus stop markers
    nearbyStops.forEach(stop => {
      new mapboxgl.Marker({ 
        color: '#6B7280',
        scale: 0.6
      })
      .setLngLat([stop.location.lng, stop.location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div class="p-3 min-w-44">
          <h3 class="font-bold text-sm mb-2">${stop.name}</h3>
          <p class="text-xs text-gray-600 mb-1">${t('map.distance')}: ${stop.distance}</p>
          <p class="text-xs text-gray-600">${t('map.routes')}: ${stop.routes.join(', ')}</p>
        </div>
      `))
      .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [t, onBusSelected]);

  const centerOnUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation: [number, number] = [position.coords.longitude, position.coords.latitude];
        map.current?.flyTo({
          center: userLocation,
          zoom: 16,
          duration: 1500
        });
      });
    }
  };

  const refreshData = () => {
    // Simulate data refresh
    window.location.reload();
  };

  return (
    <div className="relative w-full h-full bg-background">
      {/* Offline Indicator */}
      {!isOnline && (
        <div className="absolute top-4 left-4 right-4 z-20">
          <Card className="p-3 bg-warning/90 backdrop-blur-sm border-warning">
            <div className="flex items-center gap-2 text-warning-foreground">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm font-medium">{t('map.offlineMode')}</span>
            </div>
          </Card>
        </div>
      )}

      {/* Filter Controls */}
      <Card className="absolute top-4 right-4 z-10 p-2 bg-card/95 backdrop-blur-sm">
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'ghost'}
            onClick={() => setFilter('all')}
            className="h-8 px-2 text-xs touch-target"
          >
            <Filter className="h-3 w-3 mr-1" />
            {t('map.all')}
          </Button>
          <Button
            size="sm"
            variant={filter === 'buses' ? 'default' : 'ghost'}
            onClick={() => setFilter('buses')}
            className="h-8 px-2 text-xs touch-target"
          >
            <Bus className="h-3 w-3 mr-1" />
            {t('map.buses')}
          </Button>
          <Button
            size="sm"
            variant={filter === 'stops' ? 'default' : 'ghost'}
            onClick={() => setFilter('stops')}
            className="h-8 px-2 text-xs touch-target"
          >
            <MapPin className="h-3 w-3 mr-1" />
            {t('map.stops')}
          </Button>
        </div>
      </Card>

      {/* Map Container */}
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Control Buttons */}
      <div className="absolute bottom-20 right-4 z-10 space-y-2">
        <Button
          onClick={centerOnUser}
          size="sm"
          className="h-12 w-12 rounded-full shadow-button touch-target"
          aria-label={t('map.myLocation')}
        >
          <NavigationIcon className="h-4 w-4" />
        </Button>
        
        <Button
          onClick={refreshData}
          size="sm"
          variant="outline"
          className="h-12 w-12 rounded-full shadow-button bg-card/90 backdrop-blur-sm touch-target"
          aria-label={t('map.refresh')}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        {isOnline && (
          <div className="flex items-center justify-center h-8 w-12">
            <Wifi className="h-4 w-4 text-success" />
          </div>
        )}
      </div>

      {/* Selected Bus Info */}
      {selectedBus && (
        <Card className="absolute bottom-20 left-4 right-20 z-10 p-4 bg-card/95 backdrop-blur-sm shadow-card">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-sm">{t('map.bus')} {selectedBus.number}</h3>
              <p className="text-xs text-muted-foreground">{selectedBus.route}</p>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedBus(null)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
          
          <div className="flex gap-2 text-xs">
            <Badge variant="secondary">
              {t('map.eta')}: {selectedBus.eta}
            </Badge>
            <Badge 
              variant={selectedBus.occupancy > 80 ? "destructive" : "secondary"}
            >
              {selectedBus.occupancy}% {t('map.full')}
            </Badge>
          </div>
        </Card>
      )}

      {/* Demo Notice */}
      <div className="absolute bottom-2 left-4 right-4 z-10">
        <p className="text-xs text-muted-foreground text-center bg-card/80 rounded p-2">
          {t('map.demoNotice')}
        </p>
      </div>
    </div>
  );
};

export default NearbyMap;