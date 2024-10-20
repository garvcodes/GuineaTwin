import React, { useRef } from 'react';
import BubblyButton from './BubblyButton';

interface CustomFileInputProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept: string;
  required: boolean;
  text?: string;
  color?: string;
  bgColor?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  onChange,
  accept,
  required,
  text = "Choose File",
  color = '#fff',
  bgColor = '#ff0081'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={onChange}
        accept={accept}
        required={required}
        className="hidden"
      />
      <BubblyButton
        text={text}
        onClick={handleButtonClick}
        color={color}
        bgColor={bgColor}
      />
    </div>
  );
};

export default CustomFileInput;