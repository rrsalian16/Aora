import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 justify-center content-center items-center ">
      <Text className="text-3xl font-pblack">Hello Aora</Text>
      <Link href="/profile" style={{ color: 'blue' }}>
        Go to Profile
      </Link>
    </View>
  );
}
