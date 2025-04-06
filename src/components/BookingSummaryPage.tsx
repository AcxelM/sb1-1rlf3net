import React from 'react';
import { CreditCard, Users, Calendar, MapPin, Clock } from 'lucide-react';

const BookingSummaryPage = ({ formData, navigateTo }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const totalPrice = formData.selectedTicket ? 
    (formData.tripType === 'round-trip' ? 
      formData.selectedTicket.price * formData.passengerCount * 1.8 : 
      formData.selectedTicket.price * formData.passengerCount) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Résumé de la Réservation</h2>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">Détails du Voyage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="flex items-center text-gray-700 mb-2">
                <MapPin size={18} className="text-blue-600 mr-2" />
                <span className="font-medium mr-2">De:</span> {formData.departureCity}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <MapPin size={18} className="text-green-600 mr-2" />
                <span className="font-medium mr-2">À:</span> {formData.arrivalCity}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <Calendar size={18} className="text-yellow-600 mr-2" />
                <span className="font-medium mr-2">Date:</span> {formData.departureDate}
              </p>
              {formData.tripType === 'round-trip' && (
                <p className="flex items-center text-gray-700 mb-2">
                  <Calendar size={18} className="text-yellow-600 mr-2" />
                  <span className="font-medium mr-2">Retour:</span> {formData.returnDate}
                </p>
              )}
            </div>
            
            <div>
              <p className="flex items-center text-gray-700 mb-2">
                <Clock size={18} className="text-purple-600 mr-2" />
                <span className="font-medium mr-2">Heure de Départ:</span> {formData.selectedTicket?.departureTime}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <Users size={18} className="text-indigo-600 mr-2" />
                <span className="font-medium mr-2">Passagers:</span> {formData.passengerCount}
                {formData.transportMode === 'train' && ` (${formData.passengerType === 'child' ? 'Enfant' : 
                                                          formData.passengerType === 'student' ? 'Étudiant' : 
                                                          formData.passengerType === 'adult' ? 'Adulte' : 'Famille'})`}
              </p>
              <p className="flex items-center text-gray-700 mb-2">
                <span className="font-medium mr-2">Transport:</span> {formData.transportMode === 'train' ? 'Train' : 'Voiture'} ({formData.transportType})
              </p>
              {formData.transportMode === 'train' && (
                <p className="flex items-center text-gray-700 mb-2">
                  <span className="font-medium mr-2">Classe:</span> {formData.travelClass === 'vip' ? 'VIP' : formData.travelClass === 'first' ? '1ère Classe' : '2ème Classe'}
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">Informations des Voyageurs</h3>
          
          <div className="space-y-4">
            {formData.travelers.map((traveler, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <p className="font-medium mb-2">Voyageur {index + 1}{index === 0 ? ' (Principal)' : ''}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <p><span className="font-medium">Nom:</span> {traveler.lastName} {traveler.firstName}</p>
                  <p><span className="font-medium">Date de Naissance:</span> {traveler.dateOfBirth}</p>
                  <p><span className="font-medium">Lieu de Naissance:</span> {traveler.placeOfBirth}</p>
                  <p><span className="font-medium">N° Pièce d'Identité:</span> {traveler.idNumber}</p>
                  <p><span className="font-medium">Date d'Expiration:</span> {traveler.idExpirationDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b">Détails du Prix</h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="text-gray-700">
                {formData.transportMode === 'train' ? 'Train' : 'Voiture'} 
                {formData.tripType === 'round-trip' ? ' (Aller-Retour)' : ' (Aller Simple)'} 
                ({formData.passengerCount} x {formatPrice(formData.selectedTicket?.price)})
              </p>
              <p className="font-medium">{formatPrice(totalPrice)}</p>
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t border-gray-200">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold text-green-600">{formatPrice(totalPrice)}</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
            onClick={() => navigateTo('travelerInfo')}
          >
            Retour
          </button>
          
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
            onClick={() => navigateTo('payment')}
          >
            Procéder au Paiement
            <CreditCard size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryPage;