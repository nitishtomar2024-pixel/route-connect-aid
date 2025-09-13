# Transit Tracker - Real-time Public Transportation App

A beautiful, accessible public transportation tracking application inspired by One Delhi and DMRC Momentum apps. Designed specifically for rural and semi-urban populations with a focus on accessibility and ease of use.

## 🚌 Features

- **Real-time Bus Tracking**: Live location tracking with interactive map integration
- **Buses Near Me**: Find nearby buses with arrival times and occupancy levels
- **Route Planning**: Smart route suggestions with source and destination search
- **User Profile**: Trip history, favorite routes, and personalized settings
- **Accessibility-First Design**: Large touch targets, clear typography, and intuitive icons
- **Mobile-Optimized**: Responsive design perfect for mobile devices
- **Clean UI/UX**: Minimalistic design with transport-themed colors and gradients

## 🎨 Design System

The app uses a comprehensive design system optimized for transport applications:

- **Primary Colors**: Blues and greens inspired by transport branding
- **Transport-Specific Variants**: Route colors for different transport types
- **Accessibility**: High contrast, large text, and touch-friendly interface
- **Rural-Friendly**: Icon-driven navigation suitable for all literacy levels

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Maps**: Mapbox GL JS integration
- **UI Components**: Shadcn/ui with transport-specific variants
- **State Management**: React Query for API state
- **Build Tool**: Vite for fast development and building

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Mapbox account (for map functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd transit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Mapbox (Required for maps)**
   - Sign up for a free account at [mapbox.com](https://mapbox.com)
   - Get your public access token from the dashboard
   - Replace `'pk.YOUR_MAPBOX_TOKEN_HERE'` in `src/components/TransportMap.tsx` with your actual token

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:8080`
   - The app will reload automatically as you make changes

## 📱 App Structure

### Main Components

- **Dashboard**: Home screen with nearby buses and quick actions
- **TransportMap**: Interactive map with real-time bus locations
- **BusCard**: Individual bus information with tracking options
- **SearchBar**: Route planning with auto-suggestions
- **Navigation**: Bottom navigation bar optimized for mobile
- **Profile**: User account and trip history

### Key Features Implemented

1. **Real-time Tracking**: Mock data simulation with live updates
2. **Map Integration**: Mapbox GL JS with custom markers and popups
3. **Responsive Design**: Mobile-first approach with touch optimization
4. **Accessibility**: WCAG-compliant design with rural user considerations
5. **Transport Branding**: Color-coded routes and transport types

## 🎯 For Rural/Semi-Urban Users

The app is specifically designed with rural communities in mind:

- **Large Touch Targets**: Minimum 44px for easy tapping
- **Icon-Driven Interface**: Visual icons alongside text for low-literacy users
- **Simple Navigation**: Clear, predictable navigation patterns
- **High Contrast**: Easy to read in various lighting conditions
- **Offline Fallback**: Graceful degradation for poor connectivity (ready for implementation)

## 🔧 Customization

### Adding Real Backend Integration

1. **Replace Mock Data**: Update bus data sources in components
2. **API Integration**: Connect to your transport API endpoints
3. **Real-time Updates**: Implement WebSocket connections for live data
4. **Authentication**: Add phone number OTP login system
5. **Database**: Connect to your preferred database (MongoDB/PostgreSQL)

### Extending Features

- **Multi-language Support**: Add i18n for regional languages
- **Offline Mode**: Implement service workers for cached data
- **Push Notifications**: Add arrival alerts and service updates
- **Payment Integration**: Connect to payment gateways for ticketing

## 🌟 Next Steps for Production

1. **Backend Development**: 
   - Set up Node.js/Express or Django REST API
   - Implement real-time GPS tracking
   - Add user authentication and data persistence

2. **Advanced Features**:
   - WebSocket connections for live updates
   - Push notification system
   - Offline data caching
   - Multi-language support

3. **Mobile App**:
   - Convert to React Native for native mobile app
   - Add device-specific features (GPS, notifications)

## 📖 API Documentation

The app is structured to easily integrate with REST APIs:

```typescript
// Example API endpoints expected:
GET /api/buses/nearby?lat=28.6139&lng=77.2090
GET /api/routes/search?from=location1&to=location2
GET /api/buses/:id/track
POST /api/auth/login
GET /api/user/profile
```

## 🤝 Contributing

This codebase is designed for extensibility. Key areas for contribution:

- **Real API Integration**: Connect to actual transport APIs
- **Accessibility Improvements**: Further enhance rural user experience
- **Performance Optimization**: Implement caching and offline capabilities
- **Testing**: Add comprehensive test coverage

## 📄 License

This project is designed as a template for public transportation apps serving rural and urban communities.

---

**Built with ❤️ for accessible public transportation**
