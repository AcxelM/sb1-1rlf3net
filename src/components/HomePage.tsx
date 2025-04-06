import React, { useState } from 'react';
import { Train, Bus, Ship, Plane, ArrowRight } from 'lucide-react';

const HomePage = ({ formData, updateFormData, navigateTo }) => {
  const [error, setError] = useState('');

  const handleTransportModeChange = (mode) => {
    updateFormData({ 
      transportMode: mode,
      transportType: '',
      passengerType: mode === 'train' ? formData.passengerType : 'adult'
    });
  };

  const handleTransportTypeChange = (type) => {
    updateFormData({ transportType: type });
  };

  const handleNext = () => {
    if (!formData.transportMode) {
      setError('Veuillez sélectionner un mode de transport');
      return;
    }
    
    if (!formData.transportType) {
      setError('Veuillez sélectionner un type de transport');
      return;
    }
    
    setError('');
    navigateTo('search');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative mb-12 overflow-hidden">
        <div className="flex animate-slide" style={{
          animation: 'slide 20s linear infinite',
          width: '200%'
        }}>
          <img 
            src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Train" 
            className="w-full h-64 object-cover flex-shrink-0"
          />
          <img 
            src="https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Bus" 
            className="w-full h-64 object-cover flex-shrink-0"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/70 via-transparent to-blue-600/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center drop-shadow-lg">
            Pour une réservation simplifiée et sécurisée 
          </h1>
        </div>
        <style>
          {`
            @keyframes slide {
              0% {
                transform: translateX(0);
              }
              50% {
                transform: translateX(-50%);
              }
              100% {
                transform: translateX(0);
              }
            }
          `}
        </style>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sélectionnez Votre Mode de Transport</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div 
            className={`border-2 rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
              formData.transportMode === 'train' 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-200 hover:border-green-300'
            }`}
            onClick={() => handleTransportModeChange('train')}
          >
            <Train size={48} className="text-green-600 mb-4" />
            <h3 className="text-xl font-medium">Train</h3>
          </div>
          
          <div 
            className={`border-2 rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
              formData.transportMode === 'car' 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => handleTransportModeChange('car')}
          >
            <Bus size={48} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-medium">Voiture</h3>
          </div>

          <div 
            className={`border-2 rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
              formData.transportMode === 'boat' 
                ? 'border-cyan-500 bg-cyan-50' 
                : 'border-gray-200 hover:border-cyan-300'
            }`}
            onClick={() => handleTransportModeChange('boat')}
          >
            <Ship size={48} className="text-cyan-600 mb-4" />
            <h3 className="text-xl font-medium">Bateau</h3>
          </div>

          <div 
            className={`border-2 rounded-lg p-6 flex flex-col items-center cursor-pointer transition-all ${
              formData.transportMode === 'plane' 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handleTransportModeChange('plane')}
          >
            <Plane size={48} className="text-purple-600 mb-4" />
            <h3 className="text-xl font-medium">Avion</h3>
          </div>
        </div>
        
        {formData.transportMode && (
          <div className="mb-8">
            <h3 className="text-xl font-medium text-gray-800 mb-4">
              Sélectionnez le Type de {
                formData.transportMode === 'train' ? 'Train' : 
                formData.transportMode === 'car' ? 'Voiture' :
                formData.transportMode === 'boat' ? 'Bateau' : 'Vol'
              }
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.transportMode === 'train' && (
                <>
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Omnibus' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Omnibus')}
                  >
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <Train size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Omnibus</h4>
                      <p className="text-sm text-gray-500">Arrêt sur toutes les gares</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Express' 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Express')}
                  >
                    <div className="bg-green-100 p-2 rounded-full mr-4">
                      <Train size={24} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Express</h4>
                      <p className="text-sm text-gray-500">Train rapide avec moins d'arrêts</p>
                    </div>
                  </div>
                </>
              )}

              {formData.transportMode === 'car' && (
                <>
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Mini bus' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Mini bus')}
                  >
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Bus size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Mini Bus</h4>
                      <p className="text-sm text-gray-500">Véhicule plus petit pour moins de passagers</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Coaster' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Coaster')}
                  >
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Bus size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Coaster</h4>
                      <p className="text-sm text-gray-500">Véhicule plus grand pour plus de passagers</p>
                    </div>
                  </div>
                </>
              )}

              {formData.transportMode === 'boat' && (
                <>
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Ferry' 
                        ? 'border-cyan-500 bg-cyan-50' 
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Ferry')}
                  >
                    <div className="bg-cyan-100 p-2 rounded-full mr-4">
                      <Ship size={24} className="text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Ferry</h4>
                      <p className="text-sm text-gray-500">Transport régulier entre les ports</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Speed Boat' 
                        ? 'border-cyan-500 bg-cyan-50' 
                        : 'border-gray-200 hover:border-cyan-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Speed Boat')}
                  >
                    <div className="bg-cyan-100 p-2 rounded-full mr-4">
                      <Ship size={24} className="text-cyan-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Speed Boat</h4>
                      <p className="text-sm text-gray-500">Transport rapide pour petits groupes</p>
                    </div>
                  </div>
                </>
              )}

              {formData.transportMode === 'plane' && (
                <>
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Commercial' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Commercial')}
                  >
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Plane size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Vol Commercial</h4>
                      <p className="text-sm text-gray-500">Vols réguliers entre les grandes villes</p>
                    </div>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer transition-all ${
                      formData.transportType === 'Charter' 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                    onClick={() => handleTransportTypeChange('Charter')}
                  >
                    <div className="bg-purple-100 p-2 rounded-full mr-4">
                      <Plane size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Vol Charter</h4>
                      <p className="text-sm text-gray-500">Vols privés sur demande</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="flex justify-end">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
            onClick={handleNext}
          >
            Suivant
            <ArrowRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;