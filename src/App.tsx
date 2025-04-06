import React, { useState } from 'react';
import { Train, Bus, ArrowRight, Search, Users, Calendar, MapPin, CreditCard, Download, Phone, Mail, MapPin as Location, History, Star, Sparkles, Clock, UserCircle } from 'lucide-react';
import HomePage from './components/HomePage';
import TicketSearchPage from './components/TicketSearchPage';
import SearchResultsPage from './components/SearchResultsPage';
import TravelerInfoPage from './components/TravelerInfoPage';
import BookingSummaryPage from './components/BookingSummaryPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';
import Logo from './components/Logo';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ServicesPage from './components/ServicesPage';
import LoginPage from './components/LoginPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [formData, setFormData] = useState({
    transportMode: '',
    transportType: '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    tripType: 'one-way',
    passengerCount: 1,
    passengerType: 'adult',
    travelClass: 'second',
    selectedTicket: null,
    travelers: [],
    paymentMethod: ''
  });

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
      case 'search':
        return <TicketSearchPage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
      case 'results':
        return <SearchResultsPage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
      case 'travelerInfo':
        return <TravelerInfoPage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
      case 'summary':
        return <BookingSummaryPage formData={formData} navigateTo={navigateTo} />;
      case 'payment':
        return <PaymentPage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
      case 'confirmation':
        return <ConfirmationPage formData={formData} />;
      case 'about':
        return <AboutPage navigateTo={navigateTo} />;
      case 'contact':
        return <ContactPage navigateTo={navigateTo} />;
      case 'services':
        return <ServicesPage navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      default:
        return <HomePage formData={formData} updateFormData={updateFormData} navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-yellow-500 py-1 overflow-hidden">
        <div className="marquee">
          <div className="marquee-content flex items-center space-x-8">
            <div className="flex items-center">
              <Phone size={16} className="mr-1 text-green-800" />
              <span className="text-sm font-medium">Service Client: +241 77 06 39 26 (24/7)</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="mr-1 text-green-800" />
              <span className="text-sm font-medium">Obtenez notre carte de fidélité et économisez jusqu'à 5% sur vos voyages!</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-1 text-green-800" />
              <span className="text-sm font-medium">Horaires d'agence: Lundi-Samedi 8h-18h</span>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-1 text-green-800" />
              <span className="text-sm font-medium">Service Client: +241 77 06 39 26 (24/7)</span>
            </div>
            <div className="flex items-center">
              <Star size={16} className="mr-1 text-green-800" />
              <span className="text-sm font-medium">Obtenez notre carte de fidélité et économisez jusqu'à 5% sur vos voyages!</span>
            </div>
          </div>
        </div>
      </div>
      
      <header className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <Logo />
            <h1 className="text-2xl font-bold text-white">GTRAINCAR</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <button 
              className="text-white hover:text-yellow-200 transition"
              onClick={() => navigateTo('home')}
            >
              Accueil
            </button>
            <button 
              className="text-white hover:text-yellow-200 transition"
              onClick={() => navigateTo('search')}
            >
              Rechercher
            </button>
            <button 
              className="text-white hover:text-yellow-200 transition"
              onClick={() => navigateTo('about')}
            >
              À Propos
            </button>
            <button 
              className="text-white hover:text-yellow-200 transition"
              onClick={() => navigateTo('services')}
            >
              Services
            </button>
            <button 
              className="text-white hover:text-yellow-200 transition"
              onClick={() => navigateTo('contact')}
            >
              Contact
            </button>
            <button 
              className="bg-white text-green-600 hover:bg-yellow-200 px-4 py-1 rounded-full transition flex items-center"
              onClick={() => navigateTo('login')}
            >
              <UserCircle size={18} className="mr-1" />
              Connexion
            </button>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        {renderPage()}
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">GTRAINCAR</h3>
              <p className="text-gray-300">réservez rapidement et en toute sécurité</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-300 flex items-center"><Mail size={16} className="mr-2" /> Email: info@gtraincar.com</p>
              <p className="text-gray-300 flex items-center"><Phone size={16} className="mr-2" /> Téléphone: +241 7706 39 26</p>
              <p className="text-gray-300 flex items-center"><Location size={16} className="mr-2" /> Siège: Boulevard Triomphal, Libreville</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Mentions Légales</h3>
              <p className="text-gray-300">Conditions Générales</p>
              <p className="text-gray-300">Politique de Confidentialité</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} GTRAINCAR. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      <style jsx="true">{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

export default App;