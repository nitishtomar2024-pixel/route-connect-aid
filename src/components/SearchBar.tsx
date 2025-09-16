import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, MapPin, Navigation, ArrowUpDown } from 'lucide-react';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';

interface SearchBarProps {
  onSearch?: (from: string, to: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const { t } = useLanguage();
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [suggestions] = useState([
    'Metro Station',
    'Airport',
    'City Center',
    'Hospital',
    'University',
    'Mall',
    'Railway Station',
    'Bus Terminal'
  ]);

  const handleSearch = () => {
    if (fromLocation.trim() && toLocation.trim()) {
      onSearch?.(fromLocation, toLocation);
    }
  };

  const swapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className={`p-4 shadow-card ${className}`}>
      <div className="space-y-3">
        {/* From Location */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
          </div>
          <Input
            placeholder={t('common.from')}
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 text-accessible touch-target"
            list="from-suggestions"
          />
          <datalist id="from-suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={swapLocations}
            className="w-8 h-8 p-0 rounded-full"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        {/* To Location */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
            <MapPin className="w-4 h-4 text-danger" />
          </div>
          <Input
            placeholder={t('common.to')}
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 text-accessible touch-target"
            list="to-suggestions"
          />
          <datalist id="to-suggestions">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full touch-target text-accessible"
          variant="transport"
          disabled={!fromLocation.trim() || !toLocation.trim()}
        >
          <Search className="h-4 w-4 mr-2" />
          {t('common.findRoutes')}
        </Button>
      </div>
    </Card>
  );
};

export default SearchBar;