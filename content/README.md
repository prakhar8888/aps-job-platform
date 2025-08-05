# Akshya Patra Services - Job Consultancy Platform

A comprehensive, enterprise-grade job consultancy platform built with React, Vite, and TailwindCSS. This application provides separate portals for candidates, HR personnel, and administrators with advanced features like AI-powered resume parsing, real-time notifications, and comprehensive analytics.

## 🚀 Features

### Candidate Portal
- **Job Discovery**: Browse and search through available job opportunities
- **Smart Application**: Upload resume with AI-powered parsing and auto-fill forms
- **No Company Exposure**: Only designation, city, area, and salary details visible
- **Responsive Design**: Optimized for all devices with adaptive layouts

### HR Portal
- **Resume Management**: Upload, parse, and organize resumes with AI assistance
- **Smart Classification**: Automatic sector and designation assignment
- **Dashboard Customization**: Drag-and-drop widgets with voice commands
- **Advanced Search**: Filter and search resumes with keyword highlighting
- **Report Generation**: Daily reports with CSV export functionality
- **Real-time Updates**: Live notifications and status updates

### Admin Portal
- **Complete Control**: Manage all system aspects with super admin privileges
- **User Management**: CRUD operations for employees with permission matrix
- **System Configuration**: Toggle features, API settings, and operational modes
- **Analytics Dashboard**: Comprehensive insights with charts and metrics
- **Activity Monitoring**: Real-time logs and system health monitoring
- **Onboarding Wizard**: Guided setup for new accounts and integrations

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom theme
- **Routing**: React Router DOM
- **State Management**: Zustand + Context API
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Charts**: Chart.js + React Chart.js 2
- **Real-time**: Pusher (WebSocket alternative)
- **Offline Support**: Service Worker + localStorage
- **Testing**: Jest + React Testing Library
- **Error Tracking**: Sentry integration
- **Internationalization**: i18next

## 📱 Advanced Features

- **AI Resume Parsing**: Automatic data extraction from PDF/DOCX files
- **Voice Commands**: Navigate and control with voice interactions
- **Gesture Support**: Mobile-optimized touch gestures
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Real-time Notifications**: Live updates via WebSocket
- **Offline Functionality**: Full offline mode with localStorage
- **Progressive Web App**: Installable with service worker
- **Responsive Design**: Device-adaptive layouts (not just mobile-responsive)
- **Time-based Themes**: Dynamic backgrounds based on time of day
- **3D Effects**: Glassmorphism and 3D hover animations
- **Export Capabilities**: CSV export for all data sets
- **Search Highlighting**: Real-time search with result highlighting

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Extract the project**:
   ```bash
   # Extract the ZIP file to Main APS > finalFrontend
   cd "Main APS/finalFrontend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   ```bash
   cp .env.example .env
   # Update the .env file with your API keys and configuration
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

## 🔐 Demo Credentials

### HR Portal
- **Email**: hr@akshyapatra.com
- **Password**: hr123456

### Admin Portal
- **Email**: admin@akshyapatra.com
- **Password**: admin123456

## 📂 Project Structure

```
content/
├── public/
│   ├── manifest.json
│   ├── service-worker.js
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Common/
│   │   ├── Candidate/
│   │   ├── HR/
│   │   └── Admin/
│   ├── context/
│   ├── hooks/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── routes/
│   ├── styles/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎨 Design System

The application uses a custom design system based on the Akshya Patra Services brand colors:

- **Primary**: Blue gradient (#3b82f6 to #1e40af)
- **Secondary**: Blue variations
- **Accent**: Orange (#f59e0b)
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Error**: Red (#ef4444)

## 🔧 Configuration

### Environment Variables
All configuration is handled through environment variables. Copy `.env.example` to `.env` and update with your settings:

- API endpoints
- Cloudinary credentials
- Pusher configuration
- SendGrid settings
- Sentry DSN

### Feature Toggles
The application supports runtime feature toggling through the admin panel:

- Voice commands
- Real-time notifications
- Auto-approval mode
- Confidentiality mode
- Mock API mode

## 📊 Monitoring & Analytics

- **Error Tracking**: Sentry integration for production error monitoring
- **Performance**: Built-in performance metrics and monitoring
- **User Analytics**: Track user interactions and feature usage
- **System Health**: Real-time system status monitoring

## 🔒 Security Features

- **Role-based Access Control**: Separate permissions for each user type
- **Input Sanitization**: Protection against XSS and injection attacks
- **Secure Authentication**: Token-based auth with localStorage
- **Activity Logging**: Complete audit trail of all user actions
- **Data Privacy**: Configurable confidentiality modes

## 📱 Mobile Optimization

- **Touch Gestures**: Swipe, pinch, and touch interactions
- **Adaptive Layout**: Different layouts for mobile, tablet, and desktop
- **Offline Support**: Full functionality without internet connection
- **Performance**: Optimized for mobile networks and devices

## 🚀 Deployment

The application is ready for production deployment:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to your hosting provider**:
   - Static hosting: Netlify, Vercel, GitHub Pages
   - Cloud platforms: AWS S3, Google Cloud Storage
   - CDN: CloudFront, CloudFlare

## 🧪 Testing

Run the test suite:

```bash
npm test
```

The project includes comprehensive tests for:
- Component rendering
- User interactions
- API integrations
- Form validations
- Error handling

## 📈 Performance

- **Code Splitting**: Automatic chunking for optimal loading
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Responsive images with lazy loading
- **Caching**: Service worker for offline caching
- **Bundle Analysis**: Optimized bundle sizes

## 🔄 API Integration

The frontend is designed to work with the backend API endpoints:

- **Authentication**: `/api/auth/login`, `/api/auth/logout`
- **Candidates**: `/api/candidate/apply`, `/api/candidate/jobs`
- **HR**: `/api/hr/upload`, `/api/hr/parse`, `/api/hr/search`
- **Admin**: `/api/admin/users`, `/api/admin/settings`

Mock APIs are included for development and testing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- **Email**: support@akshyapatra.com
- **Documentation**: See inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests

---

**Built with ❤️ for Akshya Patra Services**