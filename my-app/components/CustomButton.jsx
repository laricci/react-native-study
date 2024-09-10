import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}) => {

  containerStyles += 'bg-secondary rounded-xl min-h-[62px] justify-center items-center';

  if (isLoading) {
    containerStyles += 'opacity-50';
  }

  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={containerStyles}
        disabled={isLoading}
    >
        <Text 
            className={`text-primary font-psemibold text-lg ${textStyles}`}
        >
            {title}
        </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;