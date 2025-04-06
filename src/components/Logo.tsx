import React from 'react';
import { Train, Bus } from 'lucide-react';

const Logo = () => {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute top-0 right-0 bg-yellow-500 rounded-md p-1">
        <Train className="w-6 h-6 text-black" />
      </div>
      <div className="absolute bottom-0 left-0 bg-red-500 rounded-md p-1">
        <Bus className="w-6 h-6 text-black" />
      </div>
    </div>
  );
};

export default Logo;