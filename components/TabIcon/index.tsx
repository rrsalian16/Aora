import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => (
  <View className="items-center justify-center gap-2">
    <Image
      source={icon}
      resizeMethod="contain"
      tintColor={color}
      className="w-6 h-6"
    />
    <Text
      className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color: color }}
    >
      {name}
    </Text>
  </View>
);

export default TabIcon;
