import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  User, 
  MapPin, 
  Clock, 
  Settings, 
  Bell,
  CreditCard,
  History,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProfileProps {
  onClose?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const userData = {
    name: 'John Doe',
    phone: '+91 98765 43210',
    email: 'john.doe@example.com',
    joinDate: 'March 2024',
    totalTrips: 47,
    favoriteRoute: 'Route 42',
    frequentDestinations: ['City Center', 'Airport', 'Metro Station']
  };

  const recentTrips = [
    {
      id: '1',
      route: 'Route 42',
      from: 'Home',
      to: 'City Center',
      date: '2024-09-12',
      time: '09:30 AM',
      status: 'completed'
    },
    {
      id: '2',
      route: 'Route 15X',
      from: 'Metro Station',
      to: 'Tech Park',
      date: '2024-09-11',
      time: '08:15 AM',
      status: 'completed'
    },
    {
      id: '3',
      route: 'Route 8A',
      from: 'University',
      to: 'Hospital',
      date: '2024-09-10',
      time: '02:45 PM',
      status: 'completed'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="gradient-primary text-white p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{userData.name}</h1>
            <p className="text-white/90 text-sm">{userData.phone}</p>
            <p className="text-white/90 text-sm">{userData.email}</p>
          </div>
        </div>
        
        <div className="mt-4 flex gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-lg">{userData.totalTrips}</div>
            <div className="text-white/80">{t('common.totalTrips')}</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">4.8</div>
            <div className="text-white/80 flex items-center gap-1">
              <Star className="h-3 w-3 fill-current" />
              {t('common.rating')}
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg">{userData.joinDate}</div>
            <div className="text-white/80">{t('common.memberSince')}</div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 text-card-foreground">{t('profile.quickStats')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted rounded-lg">
              <MapPin className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-sm font-medium">{t('profile.favoriteRoute')}</div>
              <div className="text-xs text-muted-foreground">{userData.favoriteRoute}</div>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <Clock className="h-5 w-5 text-primary mx-auto mb-1" />
              <div className="text-sm font-medium">{t('common.thisMonth')}</div>
              <div className="text-xs text-muted-foreground">12 {t('common.trips')}</div>
            </div>
          </div>
        </Card>

        {/* Account Actions */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 text-card-foreground">{t('profile.account')}</h2>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start h-12">
              <Settings className="h-4 w-4 mr-3" />
              {t('profile.settingsPreferences')}
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              <Bell className="h-4 w-4 mr-3" />
              {t('profile.notifications')}
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              <CreditCard className="h-4 w-4 mr-3" />
              {t('profile.paymentMethods')}
            </Button>
            <Button variant="ghost" className="w-full justify-start h-12">
              <History className="h-4 w-4 mr-3" />
              {t('profile.travelHistory')}
            </Button>
          </div>
        </Card>

        {/* Recent Trips */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 text-card-foreground">{t('profile.recentTrips')}</h2>
          <div className="space-y-3">
            {recentTrips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" size="sm">{trip.route}</Badge>
                    <Badge variant="success" size="sm">{t('common.completed')}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {trip.from} → {trip.to}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {trip.date} at {trip.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Frequent Destinations */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 text-card-foreground">{t('profile.frequentDestinations')}</h2>
          <div className="flex flex-wrap gap-2">
            {userData.frequentDestinations.map((destination, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1">
                <MapPin className="h-3 w-3 mr-1" />
                {destination}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Contact Support */}
        <Card className="p-4">
          <h2 className="font-semibold mb-3 text-card-foreground">{t('profile.support')}</h2>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start h-12">
              <Phone className="h-4 w-4 mr-3" />
              {t('profile.callSupport')}
            </Button>
            <Button variant="outline" className="w-full justify-start h-12">
              <Mail className="h-4 w-4 mr-3" />
              {t('profile.emailSupport')}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;