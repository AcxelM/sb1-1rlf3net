import React from 'react';
import { ArrowLeft, Sparkles, Clock, Shield, CreditCard, Star, HelpCircle } from 'lucide-react';

const ServicesPage = ({ navigateTo }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nos Services</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Nos Valeurs</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <Sparkles size={24} className="text-green-600" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Innovation</h4>
              <p className="text-gray-600">Une plateforme moderne pour simplifier vos réservations.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Clock size={24} className="text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Accessibilité</h4>
              <p className="text-gray-600">Des services disponibles partout et à tout moment.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <HelpCircle size={24} className="text-yellow-600" />
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Service Client</h4>
              <p className="text-gray-600">Une équipe dédiée 24h/24 et 7j/7 pour vous accompagner.</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Ce Que Nous Offrons</h3>
          
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <CreditCard size={20} className="text-green-600" />
                </div>
                <h4 className="font-medium text-gray-800">Réservation de Billets en Ligne</h4>
              </div>
              <p className="text-gray-600 ml-12">
                Réservez vos billets de train et de bus en ligne depuis n'importe où, à tout moment. Plus besoin d'attendre en file à la gare.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Shield size={20} className="text-blue-600" />
                </div>
                <h4 className="font-medium text-gray-800">Paiements Sécurisés</h4>
              </div>
              <p className="text-gray-600 ml-12">
                Plusieurs options de paiement sécurisées, y compris mobile money, cartes bancaires et notre option de réservation maintenant, paiement plus tard.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <Star size={20} className="text-yellow-600" />
                </div>
                <h4 className="font-medium text-gray-800">Programme de Fidélité</h4>
              </div>
              <p className="text-gray-600 ml-12">
                Rejoignez notre programme de fidélité et gagnez des points à chaque voyage. Échangez vos points contre des réductions sur vos prochaines réservations.
              </p>
              <div className="mt-4 ml-12 p-4 bg-yellow-50 rounded-lg">
                <h5 className="font-medium text-gray-800 mb-2">Comment Obtenir une Carte de Fidélité</h5>
                <ol className="list-decimal list-inside text-gray-600 space-y-1">
                  <li>Visitez n'importe quelle agence avec une pièce d'identité valide</li>
                  <li>Remplissez le formulaire d'adhésion au programme de fidélité</li>
                  <li>Payez des frais uniques de 2 000 FCFA</li>
                  <li>Recevez votre carte immédiatement</li>
                  <li>Enregistrez votre carte en ligne pour commencer à gagner des points</li>
                </ol>
                <p className="mt-2 text-sm text-gray-500">
                  Pour plus d'informations, contactez notre service client au +241 77 12 34 56
                </p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center mb-3">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <HelpCircle size={20} className="text-purple-600" />
                </div>
                <h4 className="font-medium text-gray-800">Support Client 24/7</h4>
              </div>
              <p className="text-gray-600 ml-12">
                Notre équipe de service client dédiée est disponible 24h/24 et 7j/7 pour vous aider avec toutes vos questions ou problèmes.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-start">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg flex items-center transition-colors"
            onClick={() => navigateTo('home')}
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour à l'Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;