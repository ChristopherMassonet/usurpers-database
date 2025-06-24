import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

interface PinProps {
  color?: string;
  size?: number;
}

const Pin: React.FC<PinProps> = ({ color = '#00e1ff', size = 32 }) => (
  <FontAwesomeIcon icon={faMapMarkerAlt} color={color} size="lg" style={{ fontSize: size }} />
);

export default Pin; 