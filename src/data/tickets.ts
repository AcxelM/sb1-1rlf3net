// Train schedules
const trainSchedules = {
  'Franceville-Owendo': [
    { day: 'Mardi', trainNumber: '232', trainType: 'Omnibus', departureTime: '20h00' },
    { day: 'Jeudi', trainNumber: '412', trainType: 'Express', departureTime: '13h30' },
    { day: 'Samedi', trainNumber: '632', trainType: 'Omnibus', departureTime: '13h30' },
    { day: 'Dimanche', trainNumber: '712', trainType: 'Express', departureTime: '13h30' }
  ],
  'Owendo-Franceville': [
    { day: 'Mardi', trainNumber: '232', trainType: 'Omnibus', departureTime: '20h00' },
    { day: 'Jeudi', trainNumber: '412', trainType: 'Express', departureTime: '13h30' },
    { day: 'Samedi', trainNumber: '632', trainType: 'Omnibus', departureTime: '13h30' },
    { day: 'Dimanche', trainNumber: '712', trainType: 'Express', departureTime: '13h30' }
  ]
};

// Train prices
const trainPrices = {
  'Omnibus': {
    'Moanda-Boué': { vip: 4000, first: 5400, second: 2370 },
    'Moanda-Owendo viré': { vip: 56300, first: 47200, second: 33100 },
    'Mboungou-Boué': { vip: 6400, first: 9500, second: 3770 },
    'Mboungou-Owendo viré': { vip: 56300, first: 47200, second: 33100 },
    'Franceville-Boué': { vip: 7400, first: 11600, second: 6900 },
    'Franceville-Owendo viré': { vip: 70000, first: 58900, second: 45000 }
  },
  'Express': {
    'Moanda-Boué': { vip: 4880, first: 4010, second: 3000 },
    'Moanda-Owendo viré': { vip: 64300, first: 56300, second: 42200 },
    'Mboungou-Boué': { vip: 6400, first: 9500, second: 3770 },
    'Mboungou-Owendo viré': { vip: 64300, first: 56300, second: 42200 },
    'Franceville-Boué': { vip: 18400, first: 14900, second: 12700 },
    'Franceville-Owendo viré': { vip: 60300, first: 56000, second: 43000 }
  }
};

// Car prices (random between 2000 and 20000 FCFA)
const generateCarPrice = () => {
  return Math.floor(Math.random() * (20000 - 2000 + 1)) + 2000;
};

// Function to get available tickets based on search criteria
export const getAvailableTickets = (formData) => {
  const {
    transportMode,
    transportType,
    departureCity,
    arrivalCity,
    departureDate,
    travelClass
  } = formData;

  if (!departureCity || !arrivalCity) {
    return [];
  }

  // Get day of the week from departure date
  const date = new Date(departureDate);
  const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const day = days[date.getDay()];

  if (transportMode === 'train') {
    // For train tickets
    const route = `${departureCity.replace('Gare de ', '')}-${arrivalCity.replace('Gare de ', '')}`;
    const reverseRoute = `${arrivalCity.replace('Gare de ', '')}-${departureCity.replace('Gare de ', '')}`;
    
    // Try to find the route in schedules
    let scheduleKey = Object.keys(trainSchedules).find(key => 
      key === route || key === reverseRoute
    );
    
    // If no exact route found, use default schedules
    if (!scheduleKey) {
      if (departureCity.includes('Franceville') || arrivalCity.includes('Owendo')) {
        scheduleKey = 'Franceville-Owendo';
      } else if (departureCity.includes('Owendo') || arrivalCity.includes('Franceville')) {
        scheduleKey = 'Owendo-Franceville';
      } else {
        // For other routes, use the Franceville-Owendo schedule
        scheduleKey = 'Franceville-Owendo';
      }
    }
    
    // Filter schedules by day and train type
    const availableSchedules = trainSchedules[scheduleKey].filter(schedule => 
      (day === schedule.day || !day) && 
      (transportType === schedule.trainType || !transportType)
    );
    
    // Calculate price for each available schedule
    return availableSchedules.map(schedule => {
      // Try to find exact price match
      const priceKey = `${departureCity.replace('Gare de ', '')}-${arrivalCity.replace('Gare de ', '')}`;
      const reversePriceKey = `${arrivalCity.replace('Gare de ', '')}-${departureCity.replace('Gare de ', '')}`;
      
      let price = 0;
      
      // Check if we have a price for this exact route
      if (trainPrices[schedule.trainType][priceKey]) {
        price = trainPrices[schedule.trainType][priceKey][travelClass] || 0;
      } else if (trainPrices[schedule.trainType][reversePriceKey]) {
        price = trainPrices[schedule.trainType][reversePriceKey][travelClass] || 0;
      } else {
        // If no exact price match, use a default price based on train type
        const defaultPrices = {
          'Omnibus': { vip: 35000, first: 25000, second: 15000 },
          'Express': { vip: 45000, first: 35000, second: 25000 }
        };
        price = defaultPrices[schedule.trainType][travelClass] || 0;
      }
      
      return {
        ...schedule,
        price
      };
    });
  } else {
    // For car tickets
    // Generate random departure times
    const departureTimes = ['08h00', '10h30', '13h00', '15h30', '18h00'];
    
    // Generate random car tickets
    return Array(3).fill().map((_, index) => ({
      day,
      departureTime: departureTimes[Math.floor(Math.random() * departureTimes.length)],
      transportType: transportType,
      price: generateCarPrice()
    }));
  }
};