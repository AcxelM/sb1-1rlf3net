import React from 'react';
import { CheckCircle, Download } from 'lucide-react';
import { generateTicketPDF } from '../utils/pdfGenerator';

const ConfirmationPage = ({ formData }) => {
  const handleDownloadTicket = () => {
    generateTicketPDF(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle size={64} className="text-green-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Paiement Réussi!</h2>
        
        {formData.paymentMethod === 'reserve' ? (
          <p className="text-gray-600 mb-8">
            Votre réservation a été confirmée. Veuillez compléter votre paiement dans les 6 heures pour sécuriser votre billet.
          </p>
        ) : (
          <p className="text-gray-600 mb-8">
            Votre paiement a été effectué avec succès. Veuillez vous rendre à l'agence avec votre billet. Bon voyage!
          </p>
        )}
        
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg flex items-center mx-auto transition-colors"
          onClick={handleDownloadTicket}
        >
          <Download size={18} className="mr-2" />
          Télécharger Votre Billet
        </button>
        
        <div className="mt-12 p-6 border border-gray-200 rounded-lg text-left">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Détails de la Réservation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p><span className="font-medium">Référence de Réservation:</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              <p><span className="font-medium">Transport:</span> {formData.transportMode === 'train' ? 'Train' : 'Voiture'} ({formData.transportType})</p>
              <p><span className="font-medium">De:</span> {formData.departureCity}</p>
              <p><span className="font-medium">À:</span> {formData.arrivalCity}</p>
            </div>
            <div>
              <p><span className="font-medium">Date:</span> {formData.departureDate}</p>
              {formData.tripType === 'round-trip' && (
                <p><span className="font-medium">Retour:</span> {formData.returnDate}</p>
              )}
              <p><span className="font-medium">Heure:</span> {formData.selectedTicket?.departureTime}</p>
              <p><span className="font-medium">Passagers:</span> {formData.passengerCount}</p>
              {formData.transportMode === 'train' && (
                <p><span className="font-medium">Classe:</span> {formData.travelClass === 'vip' ? 'VIP' : formData.travelClass === 'first' ? '1ère Classe' : '2ème Classe'}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;