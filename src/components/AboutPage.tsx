import React from 'react';
import { ArrowLeft, History, Target, Award } from 'lucide-react';

const AboutPage = ({ navigateTo }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">À Propos de Nous</h2>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <History size={24} className="text-green-600 mr-2" />
            <h3 className="text-xl font-medium text-gray-800">Notre Histoire</h3>
          </div>
          <p className="text-gray-700 mb-4">
            GTrainCar est le premier service de réservation de billets de train et de bus au Gabon, offrant une solution moderne et pratique pour vos déplacements à travers le pays.
          </p>
          <p className="text-gray-700 mb-4">
            Fondée en 2023, notre entreprise est née d'un constat simple : la difficulté de réserver des billets de transport au Gabon. Nous avons décidé de créer une plateforme unifiée qui simplifierait la vie des voyageurs en leur offrant un point d'accès unique à tous leurs besoins de voyage.
          </p>
          <p className="text-gray-700">
            Depuis notre lancement, nous nous sommes engagés à améliorer continuellement nos services pour offrir la meilleure expérience possible à nos clients.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Target size={24} className="text-blue-600 mr-2" />
            <h3 className="text-xl font-medium text-gray-800">Notre Mission</h3>
          </div>
          <p className="text-gray-700">
            Faciliter les déplacements des Gabonais en offrant une plateforme unique de réservation de billets de train et de bus, avec un service client disponible 24h/24 et 7j/7.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Award size={24} className="text-yellow-600 mr-2" />
            <h3 className="text-xl font-medium text-gray-800">Nos Valeurs</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Innovation</h4>
              <p className="text-gray-600">Une plateforme moderne pour simplifier vos réservations.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Accessibilité</h4>
              <p className="text-gray-600">Des services disponibles partout et à tout moment.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Service Client</h4>
              <p className="text-gray-600">Une équipe dédiée 24h/24 et 7j/7 pour vous accompagner.</p>
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

export default AboutPage;