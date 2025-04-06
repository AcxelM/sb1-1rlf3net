import React, { useState } from 'react';
import { CreditCard, Phone, CheckCircle, ArrowRight, Clock, Star } from 'lucide-react';

const PaymentPage = ({ formData, updateFormData, navigateTo }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    loyaltyCardNumber: '',
    validationCode: ''
  });
  const [errors, setErrors] = useState({});

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    updateFormData({ paymentMethod: method });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!paymentMethod) {
      newErrors.paymentMethod = 'Veuillez sélectionner un mode de paiement';
      return newErrors;
    }
    
    switch (paymentMethod) {
      case 'airtel':
      case 'moov':
        if (!paymentDetails.phoneNumber) {
          newErrors.phoneNumber = 'Veuillez entrer un numéro de téléphone';
        } else if (!/^\d{8,9}$/.test(paymentDetails.phoneNumber)) {
          newErrors.phoneNumber = 'Veuillez entrer un numéro de téléphone valide';
        }
        break;
        
      case 'card':
        if (!paymentDetails.cardNumber) {
          newErrors.cardNumber = 'Veuillez entrer un numéro de carte';
        } else if (!/^\d{16}$/.test(paymentDetails.cardNumber.replace(/\s/g, ''))) {
          newErrors.cardNumber = 'Veuillez entrer un numéro de carte valide';
        }
        
        if (!paymentDetails.expiryDate) {
          newErrors.expiryDate = 'Veuillez entrer une date d\'expiration';
        }
        
        if (!paymentDetails.cvv) {
          newErrors.cvv = 'Veuillez entrer un CVV';
        } else if (!/^\d{3,4}$/.test(paymentDetails.cvv)) {
          newErrors.cvv = 'Veuillez entrer un CVV valide';
        }
        break;
        
      case 'loyalty':
        if (!paymentDetails.loyaltyCardNumber) {
          newErrors.loyaltyCardNumber = 'Veuillez entrer un numéro de carte de fidélité';
        }
        
        if (!paymentDetails.validationCode) {
          newErrors.validationCode = 'Veuillez entrer un code de validation';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      if (paymentMethod === 'reserve') {
        // For reserve and pay later option
        navigateTo('confirmation');
      } else {
        // For other payment methods
        navigateTo('confirmation');
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  const calculateTotalPrice = () => {
    const basePrice = formData.selectedTicket ? 
      (formData.tripType === 'round-trip' ? 
        formData.selectedTicket.price * formData.passengerCount * 1.8 : 
        formData.selectedTicket.price * formData.passengerCount) : 0;
    
    // Apply 15% discount if loyalty card is selected
    return paymentMethod === 'loyalty' ? basePrice * 0.85 : basePrice;
  };

  const totalPrice = calculateTotalPrice();
  const discountAmount = paymentMethod === 'loyalty' ? 
    (formData.selectedTicket ? 
      (formData.tripType === 'round-trip' ? 
        formData.selectedTicket.price * formData.passengerCount * 1.8 * 0.15 : 
        formData.selectedTicket.price * formData.passengerCount * 0.15) : 0) : 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Paiement</h2>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Montant Total:</span>
              </p>
              <p className="text-xl font-bold text-green-600">{formatPrice(totalPrice)}</p>
              {paymentMethod === 'loyalty' && (
                <p className="text-sm text-green-600">
                  Économie: {formatPrice(discountAmount)} (-15%)
                </p>
              )}
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Trajet:</span> {formData.departureCity} à {formData.arrivalCity}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Date:</span> {formData.departureDate}
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Sélectionnez le Mode de Paiement</h3>
            
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm mb-2">{errors.paymentMethod}</p>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === 'airtel' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'
                }`}
                onClick={() => handlePaymentMethodChange('airtel')}
              >
                <div className="bg-red-100 p-2 rounded-full mb-2">
                  <Phone size={24} className="text-red-600" />
                </div>
                <p className="font-medium">Airtel Money</p>
              </div>
              
              <div
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === 'moov' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => handlePaymentMethodChange('moov')}
              >
                <div className="bg-blue-100 p-2 rounded-full mb-2">
                  <Phone size={24} className="text-blue-600" />
                </div>
                <p className="font-medium">Moov Money</p>
              </div>
              
              <div
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === 'card' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                }`}
                onClick={() => handlePaymentMethodChange('card')}
              >
                <div className="bg-green-100 p-2 rounded-full mb-2">
                  <CreditCard size={24} className="text-green-600" />
                </div>
                <p className="font-medium">Carte Bancaire</p>
              </div>
              
              <div
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === 'loyalty' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => handlePaymentMethodChange('loyalty')}
              >
                <div className="bg-purple-100 p-2 rounded-full mb-2">
                  <Star size={24} className="text-purple-600" />
                </div>
                <p className="font-medium">Carte de Fidélité</p>
                <p className="text-xs text-purple-600 text-center mt-1">(-15% de réduction)</p>
              </div>
              
              <div
                className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                  paymentMethod === 'reserve' ? 'border-yellow-500 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'
                }`}
                onClick={() => handlePaymentMethodChange('reserve')}
              >
                <div className="bg-yellow-100 p-2 rounded-full mb-2">
                  <Clock size={24} className="text-yellow-600" />
                </div>
                <p className="font-medium">Réserver & Payer Plus Tard</p>
                <p className="text-xs text-gray-500 text-center mt-1">(Délai de 6 heures)</p>
              </div>
            </div>
          </div>
          
          {paymentMethod && paymentMethod !== 'reserve' && (
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Détails du Paiement</h3>
              
              {(paymentMethod === 'airtel' || paymentMethod === 'moov') && (
                <div className="max-w-md">
                  <label className="block text-gray-700 font-medium mb-2">
                    Numéro de Téléphone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={paymentDetails.phoneNumber}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ex: 074123456"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Vous recevrez un code de confirmation de paiement sur ce numéro.
                  </p>
                </div>
              )}
              
              {paymentMethod === 'card' && (
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Numéro de Carte
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Date d'Expiration
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentDetails.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/AA"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentDetails.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="XXX"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'loyalty' && (
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Numéro de Carte de Fidélité
                    </label>
                    <input
                      type="text"
                      name="loyaltyCardNumber"
                      value={paymentDetails.loyaltyCardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.loyaltyCardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                    />
                    {errors.loyaltyCardNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.loyaltyCardNumber}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Code de Validation
                    </label>
                    <input
                      type="text"
                      name="validationCode"
                      value={paymentDetails.validationCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.validationCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="XXXX"
                    />
                    {errors.validationCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.validationCode}</p>
                    )}
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-sm text-purple-800">
                      <span className="font-medium block mb-2">Avantages de la carte de fidélité:</span>
                      <ul className="list-disc ml-4 space-y-1">
                        <li>15% de réduction sur tous vos voyages</li>
                        <li>Accès prioritaire aux réservations</li>
                        <li>Points de fidélité cumulables</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => navigateTo('summary')}
            >
              Retour
            </button>
            
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
            >
              {paymentMethod === 'reserve' ? 'Réserver le Billet' : 'Payer Maintenant'}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;