import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { TabIcon } from '@/components';
import { tabBarList } from '@/constants/tabs';

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#161622',
          borderTopWidth: 1,
          borderTopColor: '#232533',
          height: 84,
        },
      }}
    >
      {tabBarList.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={tab.icon}
                color={color}
                name={tab.title}
                focused={focused}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsLayout;
