import React from 'react';
import { Pin as LucidePin } from 'lucide-react';

interface PinProps {
  color?: string;
  size?: number;
}

const Pin: React.FC<PinProps> = ({ color = '#00e1ff', size = 32 }) => (
  <LucidePin color={color} size={size} fill={color} style={{ display: 'block' }} />
);

export default Pin; 