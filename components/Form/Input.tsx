import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardTypeOptions,
} from 'react-native';
import React, { useState } from 'react';

import { icons } from '@/constants';

type InputProps = {
  title: string;
  value: string;
  otherStyle: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  handleChangeText: (value: string) => void;
};

const Input = ({
  title,
  value,
  placeholder,
  handleChangeText = () => {},
  otherStyle,
  ...rest
}: InputProps) => {
  const [showPassword, seShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyle}`}>
      <Text className="text-base text-gray-100 font-medium">{title}</Text>
      <View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          {...rest}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => seShowPassword((prev) => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
