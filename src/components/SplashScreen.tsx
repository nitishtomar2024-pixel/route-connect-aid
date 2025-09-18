import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages, Volume2, VolumeX } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import transportCover from '../assets/transport-cover.jpg';

interface SplashScreenProps {
  onGetStarted: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();
  const [voiceEnabled, setVoiceEnabled] = React.useState(false);

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      // Speak the app description in selected language
      const utterance = new SpeechSynthesisUtterance(
        `${t('app.name')} - ${t('app.tagline')}`
      );
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col items-center justify-center p-4">
      {/* Header Image */}
      <div className="relative w-full max-w-md mb-8">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-map">
          <img 
            src={transportCover}
            alt={t('app.coverAlt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* App Branding */}
      <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-sm border-2 shadow-card mb-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {t('app.name')}
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            {t('app.tagline')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('app.description')}
          </p>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="w-full max-w-md space-y-4">
        {/* Get Started Button */}
        <Button
          onClick={onGetStarted}
          size="lg"
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary shadow-button transition-all duration-300 hover:scale-105 touch-target"
        >
          <span className="flex items-center gap-3">
            🚌 {t('splash.getStarted')}
          </span>
        </Button>

        {/* Language Selection */}
        <div className="flex items-center gap-3">
          <Languages className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground flex-1">
            {t('language.select')}
          </span>
          <LanguageSelector />
        </div>

        {/* Voice Toggle */}
        <Button
          onClick={toggleVoice}
          variant="outline"
          size="lg"
          className="w-full h-12 border-2 hover:bg-accent/10 touch-target"
        >
          <span className="flex items-center gap-3">
            {voiceEnabled ? (
              <Volume2 className="h-5 w-5 text-success" />
            ) : (
              <VolumeX className="h-5 w-5 text-muted-foreground" />
            )}
            {t('splash.voiceGuide')}
          </span>
        </Button>
      </div>

      {/* Rural Accessibility Notice */}
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground max-w-xs mx-auto">
          {t('splash.accessibilityNote')}
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;