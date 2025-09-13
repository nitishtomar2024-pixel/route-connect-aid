import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { MapPin, Navigation, Bus } from 'lucide-react';
import { Card } from './ui/card';

// Mock bus data for demonstration
const mockBuses = [
  {
    id: '1',
    route: 'Route 42',
    direction: 'City Center → Airport',
    location: [77.2090, 28.6139], // New Delhi coordinates
    eta: '5 min',
    occupancy: 'Medium',
    type: 'regular'
  },
  {
    id: '2', 
    route: 'Route 15',
    direction: 'Metro Station → Mall',
    location: [77.2195, 28.6129],
    eta: '12 min',
    occupancy: 'Low',
    type: 'express'
  },
  {
    id: '3',
    route: 'Route 8A',
    direction: 'Hospital → University',
    location: [77.2000, 28.6100],
    eta: '8 min',
    occupancy: 'High',
    type: 'regular'
  }
];

interface TransportMapProps {
  onBusSelected?: (bus: typeof mockBuses[0]) => void;
}

const TransportMap: React.FC<TransportMapProps> = ({ onBusSelected }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map (using mapbox token placeholder - user will need to add their token)
    mapboxgl.accessToken = 'pk.YOUR_MAPBOX_TOKEN_HERE';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.2090, 28.6139], // New Delhi center
      zoom: 13,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [
            position.coords.longitude,
            position.coords.latitude
          ];
          setUserLocation(coords);
          
          // Add user location marker
          new mapboxgl.Marker({ color: '#3B82F6' })
            .setLngLat(coords)
            .setPopup(new mapboxgl.Popup().setHTML('<div class="text-sm font-medium">Your Location</div>'))
            .addTo(map.current!);
            
          // Center map on user location
          map.current?.setCenter(coords);
        },
        (error) => {
          console.log('Location access denied, using default location');
        }
      );
    }

    // Add bus markers
    mockBuses.forEach((bus) => {
      const marker = new mapboxgl.Marker({ 
        color: bus.type === 'express' ? '#F59E0B' : '#10B981' 
      })
        .setLngLat(bus.location as [number, number])
        .setPopup(
          new mapboxgl.Popup().setHTML(`
            <div class="p-2">
              <div class="font-semibold text-sm">${bus.route}</div>
              <div class="text-xs text-gray-600">${bus.direction}</div>
              <div class="text-xs mt-1">
                <span class="font-medium">ETA:</span> ${bus.eta} | 
                <span class="font-medium">Load:</span> ${bus.occupancy}
              </div>
            </div>
          `)
        )
        .addTo(map.current!);
        
      // Add click handler for bus selection
      marker.getElement().addEventListener('click', () => {
        if (onBusSelected) {
          onBusSelected(bus);
        }
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [onBusSelected]);

  const centerOnUser = () => {
    if (userLocation && map.current) {
      map.current.flyTo({
        center: userLocation,
        zoom: 15,
        duration: 1000
      });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-map">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={centerOnUser}
          className="shadow-button"
        >
          <Navigation className="h-4 w-4 mr-2" />
          My Location
        </Button>
      </div>

      {/* Token Warning */}
      <Card className="absolute bottom-4 left-4 right-4 p-3">
        <div className="flex items-center gap-2 text-sm text-warning">
          <MapPin className="h-4 w-4" />
          <span>Demo mode - Add your Mapbox token for full functionality</span>
        </div>
      </Card>
    </div>
  );
};

export default TransportMap;