import React from 'react';
import { Clock, Users, CreditCard } from 'lucide-react';
import { getAvailableTickets } from '../data/tickets';

const SearchResultsPage = ({ formData, updateFormData, navigateTo }) => {
  const availableTickets = getAvailableTickets(formData);

  const handleSelectTicket = (ticket) => {
    updateFormData({ selectedTicket: ticket });
    navigateTo('travelerInfo');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Billets Disponibles</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Critères de Recherche</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Transport:</span> {formData.transportMode === 'train' ? 'Train' : 'Voiture'} ({formData.transportType})</p>
              <p><span className="font-medium">De:</span> {formData.departureCity}</p>
              <p><span className="font-medium">À:</span> {formData.arrivalCity}</p>
            </div>
            <div>
              <p><span className="font-medium">Date:</span> {formData.departureDate}</p>
              {formData.tripType === 'round-trip' && (
                <p><span className="font-medium">Retour:</span> {formData.returnDate}</p>
              )}
              <p><span className="font-medium">Passagers:</span> {formData.passengerCount}</p>
              {formData.transportMode === 'train' && (
                <>
                  <p><span className="font-medium">Type:</span> {formData.passengerType === 'child' ? 'Enfant' : 
                                                              formData.passengerType === 'student' ? 'Étudiant' : 
                                                              formData.passengerType === 'adult' ? 'Adulte' : 'Famille'}</p>
                  <p><span className="font-medium">Classe:</span> {formData.travelClass === 'vip' ? 'VIP' : 
                                                                formData.travelClass === 'first' ? '1ère Classe' : '2ème Classe'}</p>
                </>
              )}
            </div>
          </div>
        </div>
        
        {availableTickets.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-600 mb-4">Aucun billet disponible pour vos critères de recherche.</p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => navigateTo('search')}
            >
              Modifier la Recherche
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {availableTickets.map((ticket, index) => (
                <div key={index} className="border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-3 p-4">
                    <div className="mb-4 md:mb-0">
                      <p className="text-sm text-gray-500">{ticket.day}</p>
                      <div className="flex items-center mt-1">
                        <Clock size={18} className="text-gray-400 mr-2" />
                        <span className="font-medium">{ticket.departureTime}</span>
                      </div>
                      {formData.transportMode === 'train' && (
                        <p className="text-sm text-gray-500 mt-1">Train #{ticket.trainNumber}</p>
                      )}
                    </div>
                    
                    <div className="mb-4 md:mb-0">
                      <div className="flex flex-col">
                        <p className="font-medium">{formData.departureCity}</p>
                        <div className="border-l-2 border-dashed border-gray-300 h-6 ml-2 my-1"></div>
                        <p className="font-medium">{formData.arrivalCity}</p>
                      </div>
                      
                      {formData.tripType === 'round-trip' && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-sm text-gray-500">Retour: {formData.returnDate}</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col items-end justify-between">
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">{formatPrice(ticket.price)}</p>
                        {formData.tripType === 'round-trip' && (
                          <p className="text-sm text-gray-600">Aller-retour: {formatPrice(ticket.price * 1.8)}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {formData.transportMode === 'train' 
                            ? `${ticket.trainType} - ${formData.travelClass === 'vip' ? 'VIP' : formData.travelClass === 'first' ? '1ère Classe' : '2ème Classe'}`
                            : ticket.transportType}
                        </p>
                      </div>
                      
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg mt-4 transition-colors flex items-center"
                        onClick={() => handleSelectTicket(ticket)}
                      >
                        <CreditCard size={18} className="mr-2" />
                        Sélectionner
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
        <div className="flex justify-between">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
            onClick={() => navigateTo('search')}
          >
            Retour à la Recherche
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;