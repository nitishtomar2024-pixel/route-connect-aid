import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'app.name': 'Grameen Yatra',
    'header.live': 'Live',
    
    // App branding
    'app.tagline': 'Easy Public Transport',
    'app.description': 'Smart transport solutions for rural connectivity',
    'app.coverAlt': 'Public transport buses on rural roads',

    // Splash screen
    'splash.getStarted': 'Get Started',
    'splash.voiceGuide': 'Voice Guide',
    'splash.accessibilityNote': 'Designed for rural accessibility with voice support and simple navigation',

    // Map interface  
    'map.yourLocation': 'Your Location',
    'map.bus': 'Bus',
    'map.eta': 'ETA',
    'map.occupancy': 'Occupancy',
    'map.express': 'Express',
    'map.regular': 'Regular',
    'map.distance': 'Distance',
    'map.routes': 'Routes',
    'map.all': 'All',
    'map.buses': 'Buses',
    'map.stops': 'Stops',
    'map.myLocation': 'My Location',
    'map.refresh': 'Refresh',
    'map.full': 'Full',
    'map.offlineMode': 'Offline Mode - Showing cached data',
    'map.demoNotice': 'Demo Mode - Connect Mapbox API for live data',
    
    // Navigation
    'nav.home': 'Home',
    'nav.nearby': 'Nearby',
    'nav.routes': 'Routes',
    'nav.map': 'Map',
    'nav.profile': 'Profile',
    
    // Dashboard
    'dashboard.greeting': 'Good morning',
    'dashboard.notification': 'Your bus Route 101 is arriving in 5 minutes',
    'dashboard.searchPlaceholder': 'Where do you want to go?',
    'dashboard.nearbyBuses': 'Buses Near You',
    'dashboard.viewAll': 'View All',
    'dashboard.quickActions': 'Quick Actions',
    'dashboard.viewMap': 'View Live Map',
    'dashboard.tripHistory': 'Trip History',
    'dashboard.serviceStatus': 'Service Status',
    
    // Routes
    'routes.title': 'Plan Your Route',
    'routes.subtitle': 'Find the best way to reach your destination',
    'routes.popularRoutes': 'Popular Routes',
    
    // Map
    'map.title': 'Live Map',
    'map.subtitle': 'Track buses in real-time',
    'map.demoMode': 'Demo mode - Add your Mapbox token for full functionality',
    
    // Nearby
    'nearby.title': 'Buses Near You',
    'nearby.subtitle': 'Real-time location of nearby buses',
    'nearby.selectedBus': 'Selected Bus',
    'nearby.arrivesIn': 'Arrives in',
    'nearby.trackBus': 'Track This Bus',
    
    // Profile
    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your account and preferences',
    'profile.personalInfo': 'Personal Information',
    'profile.name': 'Name',
    'profile.phone': 'Phone',
    'profile.email': 'Email',
    'profile.preferences': 'Preferences',
    'profile.notifications': 'Push Notifications',
    'profile.locationTracking': 'Location Tracking',
    'profile.quickActions': 'Quick Actions',
    'profile.editProfile': 'Edit Profile',
    'profile.travelHistory': 'Travel History',
    'profile.savedRoutes': 'Saved Routes',
    'profile.helpSupport': 'Help & Support',
    
    // Bus details
    'bus.onTime': 'On Time',
    'bus.delayed': 'min delay',
    'bus.eta': 'ETA',
    'bus.load': 'Load',
    'bus.track': 'Track',
    'bus.occupancy.low': 'Low',
    'bus.occupancy.medium': 'Medium',
    'bus.occupancy.high': 'High',
    
    // Language selector
    'language.select': 'Language',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.urdu': 'اردو',
    
    // Common
    'common.hello': 'Hello',
    'common.user': 'User',
    'common.findYourNextRide': 'Find your next ride',
    'common.currentLocation': 'Current Location',
    'common.liveTracking': 'Live Tracking',
    'common.totalTrips': 'Total Trips',
    'common.rating': 'Rating',
    'common.memberSince': 'Member Since',
    'common.thisMonth': 'This Month',
    'common.trips': 'trips',
    'common.completed': 'completed',
    'common.express': 'Express',
    'common.regular': 'Regular',
    'common.from': 'From (Your location)',
    'common.to': 'To (Destination)',
    'common.findRoutes': 'Find Routes',
    'common.searching': 'Searching...',
    'common.noResults': 'No routes found',
    'common.speakFrom': 'Please speak your starting location',
    'common.speakTo': 'Please speak your destination',
    'common.bus': 'Bus',
    
    // Profile specific
    'profile.quickStats': 'Quick Stats',
    'profile.favoriteRoute': 'Favorite Route',
    'profile.account': 'Account',
    'profile.settingsPreferences': 'Settings & Preferences',
    'profile.paymentMethods': 'Payment Methods',
    'profile.recentTrips': 'Recent Trips',
    'profile.frequentDestinations': 'Frequent Destinations',
    'profile.support': 'Support',
    'profile.callSupport': 'Call Support: 1800-123-4567',
    'profile.emailSupport': 'Email: support@transport.app',
    
    // Bus Card
    'busCard.from': 'from',
    'busCard.to': 'to',
    'busCard.departure': 'Departure',
    'busCard.arrival': 'Arrival',
    'busCard.duration': 'Duration',
    'busCard.price': 'Price',
    'busCard.selectBus': 'Select Bus'
  },
  
  hi: {
    // Header
    'app.name': 'ग्रामीण यात्रा',
    'header.live': 'लाइव',
    
    // App branding
    'app.tagline': 'आसान सार्वजनिक परिवहन',
    'app.description': 'ग्रामीण कनेक्टिविटी के लिए स्मार्ट परिवहन समाधान',
    'app.coverAlt': 'ग्रामीण सड़कों पर सार्वजनिक परिवहन बसें',

    // Splash screen
    'splash.getStarted': 'शुरू करें',
    'splash.voiceGuide': 'आवाज गाइड',
    'splash.accessibilityNote': 'आवाज सहायता और सरल नेवीगेशन के साथ ग्रामीण पहुंच के लिए डिज़ाइन किया गया',

    // Map interface
    'map.yourLocation': 'आपका स्थान',
    'map.bus': 'बस',
    'map.eta': 'पहुंचने का समय',
    'map.occupancy': 'भरावट',
    'map.express': 'एक्सप्रेस',
    'map.regular': 'नियमित',
    'map.distance': 'दूरी',
    'map.routes': 'मार्ग',
    'map.all': 'सभी',
    'map.buses': 'बसें',
    'map.stops': 'स्टॉप',
    'map.myLocation': 'मेरा स्थान',
    'map.refresh': 'रीफ्रेश',
    'map.full': 'भरी',
    'map.offlineMode': 'ऑफलाइन मोड - कैश्ड डेटा दिखा रहे हैं',
    'map.demoNotice': 'डेमो मोड - लाइव डेटा के लिए Mapbox API कनेक्ट करें',
    
    // Navigation
    'nav.home': 'होम',
    'nav.nearby': 'नजदीकी',
    'nav.routes': 'रूट',
    'nav.map': 'मैप',
    'nav.profile': 'प्रोफाइल',
    
    // Dashboard
    'dashboard.greeting': 'सुप्रभात',
    'dashboard.notification': 'आपकी बस रूट 101 5 मिनट में आ रही है',
    'dashboard.searchPlaceholder': 'आप कहाँ जाना चाहते हैं?',
    'dashboard.nearbyBuses': 'आपके नजदीकी बसें',
    'dashboard.viewAll': 'सभी देखें',
    'dashboard.quickActions': 'त्वरित कार्य',
    'dashboard.viewMap': 'लाइव मैप देखें',
    'dashboard.tripHistory': 'यात्रा इतिहास',
    'dashboard.serviceStatus': 'सेवा स्थिति',
    
    // Routes
    'routes.title': 'अपना रूट बनाएं',
    'routes.subtitle': 'अपने गंतव्य तक पहुंचने का सबसे अच्छा रास्ता खोजें',
    'routes.popularRoutes': 'लोकप्रिय रूट',
    
    // Map
    'map.title': 'लाइव मैप',
    'map.subtitle': 'बसों को रीयल-टाइम में ट्रैक करें',
    'map.demoMode': 'डेमो मोड - पूर्ण कार्यक्षमता के लिए अपना मैपबॉक्स टोकन जोड़ें',
    
    // Nearby
    'nearby.title': 'आपके नजदीकी बसें',
    'nearby.subtitle': 'नजदीकी बसों का रीयल-टाइम स्थान',
    'nearby.selectedBus': 'चुनी गई बस',
    'nearby.arrivesIn': 'में आएगी',
    'nearby.trackBus': 'इस बस को ट्रैक करें',
    
    // Profile
    'profile.title': 'प्रोफाइल',
    'profile.subtitle': 'अपना खाता और प्राथमिकताएं प्रबंधित करें',
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.name': 'नाम',
    'profile.phone': 'फोन',
    'profile.email': 'ईमेल',
    'profile.preferences': 'प्राथमिकताएं',
    'profile.notifications': 'पुश नोटिफिकेशन',
    'profile.locationTracking': 'स्थान ट्रैकिंग',
    'profile.quickActions': 'त्वरित कार्य',
    'profile.editProfile': 'प्रोफाइल संपादित करें',
    'profile.travelHistory': 'यात्रा इतिहास',
    'profile.savedRoutes': 'सहेजे गए रूट',
    'profile.helpSupport': 'सहायता और समर्थन',
    
    // Bus details
    'bus.onTime': 'समय पर',
    'bus.delayed': 'मिनट देरी',
    'bus.eta': 'पहुंचने का समय',
    'bus.load': 'भार',
    'bus.track': 'ट्रैक',
    'bus.occupancy.low': 'कम',
    'bus.occupancy.medium': 'मध्यम',
    'bus.occupancy.high': 'अधिक',
    
    // Language selector
    'language.select': 'भाषा',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.urdu': 'اردو',
    
    // Common
    'common.hello': 'नमस्ते',
    'common.user': 'उपयोगकर्ता',
    'common.findYourNextRide': 'अपनी अगली सवारी खोजें',
    'common.currentLocation': 'वर्तमान स्थान',
    'common.liveTracking': 'लाइव ट्रैकिंग',
    'common.totalTrips': 'कुल यात्राएं',
    'common.rating': 'रेटिंग',
    'common.memberSince': 'सदस्य बने',
    'common.thisMonth': 'इस महीने',
    'common.trips': 'यात्राएं',
    'common.completed': 'पूर्ण',
    'common.express': 'एक्सप्रेस',
    'common.regular': 'नियमित',
    'common.from': 'से (आपका स्थान)',
    'common.to': 'तक (गंतव्य)',
    'common.findRoutes': 'रूट खोजें',
    'common.searching': 'खोज रहे हैं...',
    'common.noResults': 'कोई रूट नहीं मिला',
    'common.speakFrom': 'कृपया अपना शुरुआती स्थान बोलें',
    'common.speakTo': 'कृपया अपना गंतव्य बोलें',
    'common.bus': 'बस',
    
    // Profile specific
    'profile.quickStats': 'त्वरित आंकड़े',
    'profile.favoriteRoute': 'पसंदीदा रूट',
    'profile.account': 'खाता',
    'profile.settingsPreferences': 'सेटिंग्स और प्राथमिकताएं',
    'profile.paymentMethods': 'भुगतान के तरीके',
    'profile.recentTrips': 'हाल की यात्राएं',
    'profile.frequentDestinations': 'बार-बार जाने वाले स्थान',
    'profile.support': 'सहायता',
    'profile.callSupport': 'सहायता कॉल करें: 1800-123-4567',
    'profile.emailSupport': 'ईमेल: support@transport.app',
    
    // Bus Card
    'busCard.from': 'से',
    'busCard.to': 'तक',
    'busCard.departure': 'प्रस्थान',
    'busCard.arrival': 'पहुंचना',
    'busCard.duration': 'अवधि',
    'busCard.price': 'कीमत',
    'busCard.selectBus': 'बस चुनें'
  },
  
  ur: {
    // Header
    'app.name': 'گرامین یاترا',
    'header.live': 'لائیو',
    
    // App branding
    'app.tagline': 'آسان پبلک ٹرانسپورٹ',
    'app.description': 'دیہی رابطے کے لیے سمارٹ ٹرانسپورٹ حل',
    'app.coverAlt': 'دیہی سڑکوں پر پبلک ٹرانسپورٹ بسیں',

    // Splash screen
    'splash.getStarted': 'شروع کریں',
    'splash.voiceGuide': 'آواز گائیڈ',
    'splash.accessibilityNote': 'آواز سپورٹ اور آسان نیویگیشن کے ساتھ دیہی رسائی کے لیے ڈیزائن کیا گیا',

    // Map interface
    'map.yourLocation': 'آپ کا مقام',
    'map.bus': 'بس',
    'map.eta': 'پہنچنے کا وقت',
    'map.occupancy': 'بھراؤ',
    'map.express': 'ایکسپریس',
    'map.regular': 'باقاعدہ',
    'map.distance': 'فاصلہ',
    'map.routes': 'راستے',
    'map.all': 'تمام',
    'map.buses': 'بسیں',
    'map.stops': 'اسٹاپ',
    'map.myLocation': 'میرا مقام',
    'map.refresh': 'ریفریش',
    'map.full': 'بھری',
    'map.offlineMode': 'آف لائن موڈ - کیشڈ ڈیٹا دکھا رہے ہیں',
    'map.demoNotice': 'ڈیمو موڈ - لائیو ڈیٹا کے لیے Mapbox API کنیکٹ کریں',
    
    // Navigation
    'nav.home': 'ہوم',
    'nav.nearby': 'قریبی',
    'nav.routes': 'روٹس',
    'nav.map': 'نقشہ',
    'nav.profile': 'پروفائل',
    
    // Dashboard
    'dashboard.greeting': 'صبح بخیر',
    'dashboard.notification': 'آپ کی بس روٹ ۱۰۱ ۵ منٹ میں آ رہی ہے',
    'dashboard.searchPlaceholder': 'آپ کہاں جانا چاہتے ہیں؟',
    'dashboard.nearbyBuses': 'آپ کے قریبی بسیں',
    'dashboard.viewAll': 'سب دیکھیں',
    'dashboard.quickActions': 'فوری اعمال',
    'dashboard.viewMap': 'لائیو نقشہ دیکھیں',
    'dashboard.tripHistory': 'سفر کی تاریخ',
    'dashboard.serviceStatus': 'سروس کی حالت',
    
    // Routes
    'routes.title': 'اپنا راستہ بنائیں',
    'routes.subtitle': 'اپنی منزل تک پہنچنے کا بہترین راستہ تلاش کریں',
    'routes.popularRoutes': 'مقبول راستے',
    
    // Map
    'map.title': 'لائیو نقشہ',
    'map.subtitle': 'بسوں کو ریئل ٹائم میں ٹریک کریں',
    'map.demoMode': 'ڈیمو موڈ - مکمل فعالیت کے لیے اپنا میپ باکس ٹوکن شامل کریں',
    
    // Nearby
    'nearby.title': 'آپ کے قریبی بسیں',
    'nearby.subtitle': 'قریبی بسوں کا ریئل ٹائم مقام',
    'nearby.selectedBus': 'منتخب بس',
    'nearby.arrivesIn': 'میں آئے گی',
    'nearby.trackBus': 'اس بس کو ٹریک کریں',
    
    // Profile
    'profile.title': 'پروفائل',
    'profile.subtitle': 'اپنا اکاؤنٹ اور ترجیحات کا انتظام کریں',
    'profile.personalInfo': 'ذاتی معلومات',
    'profile.name': 'نام',
    'profile.phone': 'فون',
    'profile.email': 'ای میل',
    'profile.preferences': 'ترجیحات',
    'profile.notifications': 'پش نوٹیفکیشن',
    'profile.locationTracking': 'مقام کی ٹریکنگ',
    'profile.quickActions': 'فوری اعمال',
    'profile.editProfile': 'پروفائل ایڈٹ کریں',
    'profile.travelHistory': 'سفر کی تاریخ',
    'profile.savedRoutes': 'محفوظ شدہ راستے',
    'profile.helpSupport': 'مدد اور سپورٹ',
    
    // Bus details
    'bus.onTime': 'وقت پر',
    'bus.delayed': 'منٹ دیری',
    'bus.eta': 'پہنچنے کا وقت',
    'bus.load': 'لوڈ',
    'bus.track': 'ٹریک',
    'bus.occupancy.low': 'کم',
    'bus.occupancy.medium': 'درمیانہ',
    'bus.occupancy.high': 'زیادہ',
    
    // Language selector
    'language.select': 'زبان',
    'language.english': 'English',
    'language.hindi': 'हिन्दी',
    'language.urdu': 'اردو',
    
    // Common
    'common.hello': 'السلام علیکم',
    'common.user': 'صارف',
    'common.findYourNextRide': 'اپنا اگلا سفر تلاش کریں',
    'common.currentLocation': 'موجودہ مقام',
    'common.liveTracking': 'لائیو ٹریکنگ',
    'common.totalTrips': 'کل سفر',
    'common.rating': 'ریٹنگ',
    'common.memberSince': 'ممبر بنے',
    'common.thisMonth': 'اس مہینے',
    'common.trips': 'سفر',
    'common.completed': 'مکمل',
    'common.express': 'ایکسپریس',
    'common.regular': 'باقاعدہ',
    'common.from': 'سے (آپ کا مقام)',
    'common.to': 'تک (منزل)',
    'common.findRoutes': 'راستے تلاش کریں',
    'common.searching': 'تلاش کر رہے ہیں...',
    'common.noResults': 'کوئی راستہ نہیں ملا',
    'common.speakFrom': 'براہ کرم اپنا ابتدائی مقام بولیں',
    'common.speakTo': 'براہ کرم اپنی منزل بولیں',
    'common.bus': 'بس',
    
    // Profile specific
    'profile.quickStats': 'فوری اعداد و شمار',
    'profile.favoriteRoute': 'پسندیدہ راستہ',
    'profile.account': 'اکاؤنٹ',
    'profile.settingsPreferences': 'سیٹنگز اور ترجیحات',
    'profile.paymentMethods': 'ادائیگی کے طریقے',
    'profile.recentTrips': 'حالیہ سفر',
    'profile.frequentDestinations': 'بار بار جانے والے مقامات',
    'profile.support': 'سپورٹ',
    'profile.callSupport': 'سپورٹ کال کریں: 1800-123-4567',
    'profile.emailSupport': 'ای میل: support@transport.app',
    
    // Bus Card
    'busCard.from': 'سے',
    'busCard.to': 'تک',
    'busCard.departure': 'روانگی',
    'busCard.arrival': 'آمد',
    'busCard.duration': 'مدت',
    'busCard.price': 'قیمت',
    'busCard.selectBus': 'بس منتخب کریں'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('transport-app-language');
    if (savedLanguage && translations[savedLanguage as keyof typeof translations]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('transport-app-language', lang);
  };

  const t = (key: string): string => {
    const langTranslations = translations[language as keyof typeof translations] || translations.en;
    return langTranslations[key as keyof typeof langTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};