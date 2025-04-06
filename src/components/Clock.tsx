import React from 'react';
import { Clock as ClockIcon } from 'lucide-react';

const Clock = ({ size = 24, className = "text-yellow-600" }) => {
  return <ClockIcon size={size} className={className} />;
};

export default Clock;