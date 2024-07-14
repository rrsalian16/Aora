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

type SearchInputProps = {
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  handleChangeText: (value: string) => void;
};

const SearchInput = ({
  value,
  placeholder,
  handleChangeText = () => {},
  ...rest
}: SearchInputProps) => {
  const [showPassword, seShowPassword] = useState(false);

  return (
    <View className="border-2 border-black-500 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mb-5 text-white flex-1 font-pregular"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7B7B8B"
        onChangeText={handleChangeText}
        {...rest}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
