import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = ({ navigateTo }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contactez-Nous</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-4">Contact de l'Entreprise</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="text-green-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-600">info@gtraincar.com</p>
                  <p className="text-gray-600">support@gtraincar.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-green-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-gray-600">+241 77 06 39 26 (Service Client)</p>
                  <p className="text-gray-600">+241 74 15 81 36 (Réservations)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-green-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-medium">Siège Social</p>
                  <p className="text-gray-600">Boulevard Triomphal</p>
                  <p className="text-gray-600">Libreville, Gabon</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-green-600 mt-1 mr-3" size={20} />
                <div>
                  <p className="font-medium">Horaires d'Ouverture</p>
                  <p className="text-gray-600">Lundi - Vendredi: 8h00 - 18h00</p>
                  <p className="text-gray-600">Samedi: 9h00 - 15h00</p>
                  <p className="text-gray-600">Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-medium text-gray-800 mb-4">Envoyez-Nous un Message</h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Votre Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez votre nom"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Votre Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez votre email"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Sujet</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Entrez le sujet"
                />
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Entrez votre message"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Envoyer le Message
              </button>
            </form>
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

export default ContactPage;