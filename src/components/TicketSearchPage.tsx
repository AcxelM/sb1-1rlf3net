import React, { useState } from 'react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { trainCities, carCities } from '../data/cities';

const TicketSearchPage = ({ formData, updateFormData, navigateTo }) => {
  const [errors, setErrors] = useState({});

  const cities = formData.transportMode === 'train' ? trainCities : carCities;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.departureCity) newErrors.departureCity = 'Veuillez sélectionner une ville de départ';
    if (!formData.arrivalCity) newErrors.arrivalCity = 'Veuillez sélectionner une ville d\'arrivée';
    if (formData.departureCity === formData.arrivalCity && formData.departureCity) 
      newErrors.arrivalCity = 'Les villes de départ et d\'arrivée ne peuvent pas être identiques';
    if (!formData.departureDate) newErrors.departureDate = 'Veuillez sélectionner une date de départ';
    if (formData.tripType === 'round-trip' && !formData.returnDate) 
      newErrors.returnDate = 'Veuillez sélectionner une date de retour';
    if (!formData.passengerCount || formData.passengerCount < 1) 
      newErrors.passengerCount = 'Veuillez entrer un nombre valide de passagers';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      navigateTo('results');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Rechercher des Billets</h2>
        
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville de Départ</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <select
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.departureCity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une ville de départ</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              {errors.departureCity && <p className="text-red-500 text-sm mt-1">{errors.departureCity}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville d'Arrivée</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                <select
                  name="arrivalCity"
                  value={formData.arrivalCity}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.arrivalCity ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Sélectionner une ville d'arrivée</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              {errors.arrivalCity && <p className="text-red-500 text-sm mt-1">{errors.arrivalCity}</p>}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type de Voyage</label>
              <select
                name="tripType"
                value={formData.tripType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="one-way">Aller Simple</option>
                <option value="round-trip">Aller-Retour</option>
              </select>
            </div>
            
            {formData.transportMode === 'train' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Type de Passager</label>
                <select
                  name="passengerType"
                  value={formData.passengerType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="child">Enfant</option>
                  <option value="student">Étudiant</option>
                  <option value="adult">Adulte</option>
                  <option value="family">Famille</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date de Départ</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.departureDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
            </div>
            
            {formData.tripType === 'round-trip' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Date de Retour</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.returnDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nombre de Passagers</label>
              <div className="relative">
                <Users className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="number"
                  name="passengerCount"
                  value={formData.passengerCount}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.passengerCount ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.passengerCount && <p className="text-red-500 text-sm mt-1">{errors.passengerCount}</p>}
            </div>
            
            {formData.transportMode === 'train' && (
              <div>
                <label className="block text-gray-700 font-medium mb-2">Classe de Voyage</label>
                <select
                  name="travelClass"
                  value={formData.travelClass}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="vip">Classe VIP</option>
                  <option value="first">Première Classe</option>
                  <option value="second">Deuxième Classe</option>
                </select>
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => navigateTo('home')}
            >
              Retour
            </button>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
            >
              Rechercher
              <Search size={18} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketSearchPage;