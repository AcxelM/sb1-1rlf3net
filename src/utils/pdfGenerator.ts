// Simple PDF generator utility
export const generateTicketPDF = (formData) => {
  // In a real application, this would generate a PDF
  // For this demo, we'll create a text file with the booking information
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const totalPrice = formData.selectedTicket ? formData.selectedTicket.price * formData.passengerCount : 0;
  
  // Create booking reference
  const bookingReference = Math.random().toString(36).substring(2, 10).toUpperCase();
  
  // Create text content
  const content = `
GTRAINCAR - TICKET DE VOYAGE
============================

RÉFÉRENCE DE RÉSERVATION: ${bookingReference}

DÉTAILS DU VOYAGE
----------------
Mode de transport: ${formData.transportMode === 'train' ? 'Train' : 'Voiture'} (${formData.transportType})
Départ: ${formData.departureCity}
Arrivée: ${formData.arrivalCity}
Date: ${formData.departureDate}
Heure de départ: ${formData.selectedTicket?.departureTime}
${formData.transportMode === 'train' ? `Numéro de train: ${formData.selectedTicket?.trainNumber}` : ''}
${formData.transportMode === 'train' ? `Classe: ${formData.travelClass === 'vip' ? 'VIP' : formData.travelClass === 'first' ? '1ère Classe' : '2ème Classe'}` : ''}

VOYAGEURS
---------
${formData.travelers.map((traveler, index) => `
Voyageur ${index + 1}${index === 0 ? ' (Principal)' : ''}:
Nom: ${traveler.lastName} ${traveler.firstName}
Date de naissance: ${traveler.dateOfBirth}
Lieu de naissance: ${traveler.placeOfBirth}
Numéro de document d'identité: ${traveler.idNumber}
Date d'expiration: ${traveler.idExpirationDate}
`).join('')}

DÉTAILS DU PRIX
--------------
Prix unitaire: ${formatPrice(formData.selectedTicket?.price)}
Nombre de passagers: ${formData.passengerCount}
Prix total: ${formatPrice(totalPrice)}

PAIEMENT
-------
Méthode de paiement: ${formData.paymentMethod === 'airtel' ? 'Airtel Money' : 
                      formData.paymentMethod === 'moov' ? 'Moov Money' : 
                      formData.paymentMethod === 'card' ? 'Carte Bancaire' : 
                      formData.paymentMethod === 'loyalty' ? 'Carte de Fidélité' : 
                      'Réservation (paiement différé)'}
Statut: ${formData.paymentMethod === 'reserve' ? 'En attente de paiement' : 'Payé'}

INFORMATIONS IMPORTANTES
----------------------
- Veuillez vous présenter à l'agence avec ce billet.
- Arrivez au moins 30 minutes avant le départ.
- Une pièce d'identité valide est requise pour tous les voyageurs.

Nous vous souhaitons un excellent voyage!
GTRAINCAR - réservez rapidement et en toute sécurité
  `;
  
  // Create a blob and download it
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `GTRAINCAR_Ticket_${bookingReference}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};