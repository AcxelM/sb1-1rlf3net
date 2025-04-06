import React, { useState, useEffect } from 'react';
import { User, Plus, ArrowRight, Trash2 } from 'lucide-react';

const TravelerForm = ({ index, traveler, updateTraveler, removeTraveler, isRemovable, passengerType }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateTraveler(index, { ...traveler, [name]: value });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Voyageur {index + 1} {index === 0 ? '(Principal)' : ''}
        </h3>
        {isRemovable && (
          <button 
            type="button" 
            className="text-red-500 hover:text-red-700"
            onClick={() => removeTraveler(index)}
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Nom</label>
          <input
            type="text"
            name="lastName"
            value={traveler.lastName || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Prénom</label>
          <input
            type="text"
            name="firstName"
            value={traveler.firstName || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Date de Naissance</label>
          <input
            type="date"
            name="dateOfBirth"
            value={traveler.dateOfBirth || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Lieu de Naissance</label>
          <input
            type="text"
            name="placeOfBirth"
            value={traveler.placeOfBirth || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Numéro de Pièce d'Identité</label>
          <input
            type="text"
            name="idNumber"
            value={traveler.idNumber || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Date d'Expiration</label>
          <input
            type="date"
            name="idExpirationDate"
            value={traveler.idExpirationDate || ''}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-medium mb-1">Type de Voyageur</label>
        <select
          name="passengerType"
          value={traveler.passengerType || 'adult'}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="adult">Adulte</option>
          <option value="student">Étudiant</option>
          <option value="child">Enfant</option>
        </select>
      </div>
    </div>
  );
};

const TravelerInfoPage = ({ formData, updateFormData, navigateTo }) => {
  const [travelers, setTravelers] = useState([]);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Initialize travelers array based on passenger count or existing data
    if (formData.travelers.length === 0) {
      const initialTravelers = [{ passengerType: 'adult' }]; // Start with one adult traveler
      setTravelers(initialTravelers);
      updateFormData({ passengerCount: 1 });
    } else {
      setTravelers(formData.travelers);
    }
  }, []);

  useEffect(() => {
    // Check if all required fields are filled for all travelers
    const allFieldsFilled = travelers.every(traveler => 
      traveler.firstName && 
      traveler.lastName && 
      traveler.dateOfBirth && 
      traveler.placeOfBirth && 
      traveler.idNumber && 
      traveler.idExpirationDate &&
      traveler.passengerType
    );
    
    setIsFormValid(allFieldsFilled);
  }, [travelers]);

  const updateTraveler = (index, updatedTraveler) => {
    const updatedTravelers = [...travelers];
    updatedTravelers[index] = updatedTraveler;
    setTravelers(updatedTravelers);
    updateFormData({ travelers: updatedTravelers, passengerCount: updatedTravelers.length });
  };

  const addTraveler = () => {
    const newTraveler = { passengerType: 'adult' };
    const updatedTravelers = [...travelers, newTraveler];
    setTravelers(updatedTravelers);
    updateFormData({ travelers: updatedTravelers, passengerCount: updatedTravelers.length });
  };

  const removeTraveler = (index) => {
    if (travelers.length > 1) {
      const updatedTravelers = travelers.filter((_, i) => i !== index);
      setTravelers(updatedTravelers);
      updateFormData({ travelers: updatedTravelers, passengerCount: updatedTravelers.length });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid) {
      updateFormData({ travelers });
      navigateTo('summary');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informations des Voyageurs</h2>
        
        <form onSubmit={handleSubmit}>
          {travelers.map((traveler, index) => (
            <TravelerForm
              key={index}
              index={index}
              traveler={traveler}
              updateTraveler={updateTraveler}
              removeTraveler={removeTraveler}
              isRemovable={index !== 0 && travelers.length > 1}
              passengerType={traveler.passengerType}
            />
          ))}
          
          <div className="mb-6">
            <button
              type="button"
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              onClick={addTraveler}
            >
              <Plus size={18} className="mr-1" />
              Ajouter un Voyageur
            </button>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
              onClick={() => navigateTo('results')}
            >
              Retour
            </button>
            
            <button
              type="submit"
              className={`${
                isFormValid 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-gray-400 cursor-not-allowed'
              } text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors`}
              disabled={!isFormValid}
            >
              Continuer vers le Résumé
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelerInfoPage;