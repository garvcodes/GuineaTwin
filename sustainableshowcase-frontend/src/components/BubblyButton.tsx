import React from 'react';
import ReactBubblyEffectButton from "react-bubbly-effect-button";

interface BubblyButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  bgColor?: string;
}

const BubblyButton: React.FC<BubblyButtonProps> = ({ 
  text, 
  onClick, 
  color = '#fff', 
  bgColor = '#ff0081' 
}) => {
  return (
    <ReactBubblyEffectButton 
      text={text} 
      color={color} 
      bgColor={bgColor} 
      onClick={onClick} 
    />
  );
};

export default BubblyButton;